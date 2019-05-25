import express from "express";
import Grid from "gridfs-stream";
import { ObjectID } from "mongodb";
import mongoose from "mongoose";
import GridFSStorage from "multer-gridfs-storage";
const router = express.Router();
import multer from "multer";
import { TrackSchema } from "../Schemas/track";

mongoose.Promise = global.Promise;

const dbHost = "mongodb://database/mean-docker";
const db = mongoose.createConnection(dbHost);

db.once("open", () => {

    const gfs = Grid(db.db, mongoose.mongo);

    const storage = new GridFSStorage({
        db,
        file: (req: any, file) => {
            return {
                bucketName: "tracks",
                filename: "file_" + file.originalname + "_" + Date.now(),
                metadata: {
                    bandName: req.body.bandName,
                    trackName: req.body.trackName,
                }
            };
        }
    });

    const upload = multer({
        storage
    }).single("file");

    router.get("/", (req, res) => {
        res.send("api works 3");
    });

    // Route for file upload
    router.post("/tracks", async (req, res, next) => {
        const AllTracksModel = db.model("tracks", TrackSchema);

        const allTracks: any = await AllTracksModel.find();
        let maxOrder = 0;
        if (!!allTracks) {
           maxOrder = Math.max(allTracks.map((track: any) => track.order));
        }

        upload(req, res, (err) => {
            if (err) {
                res.json({error_code: 1, err_desc: err});
                return;
            }

            const TrackModel = db.model("tracks", TrackSchema);

            const TrackInstance = new TrackModel({
                _id: new mongoose.Types.ObjectId(),
                logoId: null,
                order: maxOrder + 1,
                songId: res.req.file.id,
                bandName: res.req.file.metadata.bandName,
                trackName: res.req.file.metadata.trackName, }
                );
            TrackInstance.save().then(() => {
                console.log('SAVED_FILE_DATA:', res.req.file) // tslint:disable-line
                res.json({error_code: 0, error_desc: null, file_uploaded: true});
            }).catch((error) => res.send(error));
        });
    });

    // Get all routes
    router.get("/tracks", (req, res) => {
        const TrackModel = db.model("tracks", TrackSchema);

        TrackModel.find({}).sort({order: 1}).exec((err, tracks) => {res.send(tracks); });
    });

    // Delete track
    router.get("/tracks/delete/:trackId", (req, res, next) => {
        const TrackModel = db.model("tracks", TrackSchema);

        TrackModel.find({ id: req.params.trackId}).remove( () => next() );
    });

    // Edit track
    router.post("/tracks/edit/:trackId", (req, res, next) => {
        const TrackModel = db.model("tracks", TrackSchema);
        TrackModel.findById(req.params.trackId, (err, track: any) => {
            if (!track) {
                return next(new Error("Could not load track"));
            } else {
                // do your updates here
                track.bandName = req.body.bandName;
                track.trackName = req.body.trackName;

                track.save((saveError: any) => {
                    if (saveError) {
                        return next(new Error("Could not load save track"));
                    } else {
                        res.send(track);
                    }
                });
            }
        });
    });

    router.post("/tracks/shift/:order/:way", async (req, res, next) => {
        const TrackModel = db.model("tracks", TrackSchema);
        const allTracks = await TrackModel.find({}, null, {sort: {order: 1}});
        const allTracksLength = allTracks.length;

        if (req.params.way === "down") {
            if (Number(req.params.order) > (allTracksLength - 1) || Number(req.params.order) < 1) {
                return res.send(allTracks);
            }
            const itemToMove: any = await TrackModel.findOne({order: req.params.order});
            const downItem: any = await TrackModel.findOne({order: Number(req.params.order) + 1});
            await TrackModel.findByIdAndUpdate(itemToMove._id, {$set: {order: Number(req.params.order) + 1}});
            await TrackModel.findByIdAndUpdate(downItem._id, {$set: {order: Number(req.params.order)}});
            TrackModel.find({}).sort({order: 1}).exec((err, tracks) => { res.send(tracks); });
        } else if (req.params.way === "up") {
            if (Number(req.params.order) < 2 || (Number(req.params.order) > allTracks.length)) {
                return res.send(allTracks);
            }
            const itemToMove: any = await TrackModel.findOne({order: req.params.order});
            const upItem: any = await TrackModel.findOne({order: Number(req.params.order) - 1});
            await TrackModel.findByIdAndUpdate(itemToMove._id, {$set: {order: Number(req.params.order) - 1}});
            await TrackModel.findByIdAndUpdate(upItem._id, {$set: {order: Number(req.params.order)}});
            TrackModel.find({}).sort({order: 1}).exec((err, tracks) => { res.send(tracks); });
        } else {
            res.send(allTracks);
        }
    });
});

export default router;
