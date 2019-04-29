import express from "express";
import Grid from "gridfs-stream";
import mongoose from "mongoose";
import GridFSStorage from "multer-gridfs-storage";
const router = express.Router();

import multer from "multer";

const dbHost = "mongodb://database/mean-docker";

// Connect to mongodb
const connection = mongoose.createConnection(dbHost);
connection.once("open", () => {

    const gfs = Grid(connection.db, mongoose.mongo);

    const storage = new GridFSStorage({
        db: connection,
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
    router.post("/tracks", (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                res.json({error_code: 1, err_desc: err});
                return;
            }
            res.json({error_code: 0, error_desc: null, file_uploaded: true});
        });
    });

    router.get("/tracks", (req, res) => {
        const filesData: any[] | Array<{ fileName: any; trackName: any; bandName: any; contentType: any; }> = [];
        let count = 0;
        gfs.collection("tracks"); // set the collection to look up into

        gfs.files.find({}).toArray((err, files) => {
            // Error checking
            if (!files || files.length === 0) {
                return res.status(404).json({
                    responseCode: 1,
                    responseMessage: "error"
                });
            }
            // Loop through all the files and fetch the necessary information
            files.forEach((file) => {
                filesData[count++] = {
                    bandName: file.metadata.bandName,
                    contentType: file.contentType,
                    fileName: file.filename,
                    trackName: file.metadata.trackName,
                };
            });
            res.json(filesData);
        });
    });

});

export default router;
