import express from 'express';
import mongoose from 'mongoose';
import GridFSStorage from 'multer-gridfs-storage';
const router = express.Router();
import mongodb, {MongoClient, ObjectID} from 'mongodb';
import multer from 'multer';
import { checkIfAuthenticated } from '../middleware/authentication.middleware';
const trackModel = mongoose.model('Track');

mongoose.Promise = global.Promise;

const dbHost = 'mongodb://database/mean-docker';
const db = mongoose.createConnection(dbHost);

MongoClient.connect('mongodb://database', (err, client) => {
    if (err) {
        process.exit(1);
    }
    const dbRaw = client.db('mean-docker');

    router.get('/tracks/play/:trackID', (req, res) => {

        const trackID = new ObjectID(req.params.trackID);

        res.set('content-type', 'audio/mp3');
        res.set('accept-ranges', 'bytes');

        const bucket = new mongodb.GridFSBucket(dbRaw, {
            bucketName: 'tracks'
        });

        const downloadStream = bucket.openDownloadStream(trackID);

        downloadStream.on('data', (chunk) => {
            res.write(chunk);
        });

        downloadStream.on('error', () => {
            res.sendStatus(404);
        });

        downloadStream.on('end', () => {
            res.end();
        });
    });
});

db.once('open', () => {
    const storage = new GridFSStorage({
        db,
        file: (req: any, file) => {
            return {
                bucketName: 'tracks',
                filename: 'file_' + file.originalname + "_" + Date.now(),
                metadata: {
                    bandName: req.body.bandName,
                    trackName: req.body.trackName,
                }
            };
        }
    });

    const upload = multer({
        storage
    }).single('file');

    router.get('/', (req, res) => {
        res.send('api works 3');
    });

    // Route for file upload
    router.post( '/tracks', checkIfAuthenticated, async (req, res, next) => {

        const allTracks: any = await trackModel.find({});
        let maxOrder = 0;
        if (!!allTracks && allTracks.length > 0) {
           maxOrder = Math.max.apply(null, allTracks.map((track: any) => track.order));
        }
        upload(req, res, (err) => {
            if (err) {
                res.json({error_code: 1, err_desc: err});
                return;
            }

            const TrackInstance = new trackModel({
                _id: new mongoose.Types.ObjectId(),
                logoId: null,
                order: maxOrder + 1,
                songId: res.req.file.id,
                bandName: res.req.file.metadata.bandName,
                trackName: res.req.file.metadata.trackName,
                isFrontPageTrack: false}
                );
            TrackInstance.save().then(() => {
                res.json({error_code: 0, error_desc: null, file_uploaded: true});
            }).catch((error) => res.send(error));
        });
    });
});

// Get all routes
router.get('/tracks', (req, res) => {
    trackModel.find({}).sort({order: 1}).exec((err, tracks) => {res.send(tracks); });
});

// Delete track
router.delete('/tracks/delete/:trackId', checkIfAuthenticated, async (req, res, next) => {
    await trackModel.deleteOne({ _id: req.params.trackId });

    const allTracks = await trackModel.find({}, null, {sort: {order: 1}});
    for (let i = 0; i < allTracks.length; i++) {
        const trackToUpdate: any  = allTracks[i];
        trackToUpdate.order = i + 1;
        trackToUpdate.save();
    }
    res.send(allTracks);
});

// Edit track
router.post('/tracks/edit/:trackId', checkIfAuthenticated, (req, res, next) => {
    trackModel.findById(req.params.trackId, (err, track: any) => {
        if (!track) {
            return next(new Error('Could not load track'));
        } else {
            // do your updates here
            track.bandName = req.body.bandName;
            track.trackName = req.body.trackName;

            track.save((saveError: any) => {
                if (saveError) {
                    return next(new Error('Could not load save track'));
                } else {
                    res.send(track);
                }
            });
        }
    });
});

router.post('/tracks/shift/:order/:way', checkIfAuthenticated, async (req, res, next) => {
    const allTracks = await trackModel.find({}, null, {sort: {order: 1}});
    const allTracksLength = allTracks.length;

    if (req.params.way === 'down') {
        if (Number(req.params.order) > (allTracksLength - 1) || Number(req.params.order) < 1) {
            return res.send(allTracks);
        }
        const itemToMove: any = await trackModel.findOne({order: req.params.order});
        const downItem: any = await trackModel.findOne({order: Number(req.params.order) + 1});
        await trackModel.findByIdAndUpdate(itemToMove._id, {$set: {order: Number(req.params.order) + 1}});
        await trackModel.findByIdAndUpdate(downItem._id, {$set: {order: Number(req.params.order)}});
        trackModel.find({}).sort({order: 1}).exec((err, tracks) => { res.send(tracks); });
    } else if (req.params.way === 'up') {
        if (Number(req.params.order) < 2 || (Number(req.params.order) > allTracks.length)) {
            return res.send(allTracks);
        }
        const itemToMove: any = await trackModel.findOne({order: req.params.order});
        const upItem: any = await trackModel.findOne({order: Number(req.params.order) - 1});
        await trackModel.findByIdAndUpdate(itemToMove._id, {$set: {order: Number(req.params.order) - 1}});
        await trackModel.findByIdAndUpdate(upItem._id, {$set: {order: Number(req.params.order)}});
        trackModel.find({}).sort({order: 1}).exec((err, tracks) => { res.send(tracks); });
    } else {
        res.send(allTracks);
    }
});

// set front page track
router.post('/tracks/front/:trackId', checkIfAuthenticated, async (req, res, next) => {
    try {
        await trackModel.updateMany(
            { isFrontPageTrack: true },
            { $set:
                    {
                        isFrontPageTrack: false,
                    }
            },
            {upsert: true}
            );
        await trackModel.updateMany(
            { _id: req.params.trackId },
            { $set:
                    {
                        isFrontPageTrack: true,
                    }
            },
            {upsert: true}
            );
        res.sendStatus(200);
    } catch (exception) {
        res.status(500).json({ error: JSON.stringify(exception) });
    }
});

// get front page track
router.get('/tracks/front', async (req, res, next) => {
    try {
        const frontPageTrack = await trackModel.findOne({isFrontPageTrack: true});

        res.send(frontPageTrack);
    } catch (exception) {
        res.status(500).json({ error: JSON.stringify(exception) });
    }
});

export default router;
