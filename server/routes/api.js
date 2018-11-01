// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';
let multer = require('multer');
let GridFSStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');

// Connect to mongodb
const connection = mongoose.createConnection(dbHost);
connection.once('open', function () {

    let gfs = Grid(connection.db, mongoose.mongo);

    let storage = GridFSStorage({
        db: connection,

        file: (req, file) => {
            return {
                filename: 'file_' + file.trackName + Date.now(),
                bucketName: 'tracks',
                metadata: {
                    trackName: file.trackName
                }
            };
        }
    });

// Multer configuration for single file uploads
    let upload = multer({
        storage: storage
    }).single('file');

    router.get('/', (req, res) => {
        res.send('api works 3');
    });

// Route for file upload
    router.post('/tracks', (req, res) => {
        upload(req,res, (err) => {
            if(err){
                res.json({error_code:1,err_desc:err});
                return;
            }
            res.json({error_code:0, error_desc: null, file_uploaded: true});
        });
    });

    router.get('/tracks', (req, res) => {
        let filesData = [];
        let count = 0;
        gfs.collection('tracks'); // set the collection to look up into

        gfs.files.find({}).toArray((err, files) => {
            // Error checking
            if(!files || files.length === 0){
                return res.status(404).json({
                    responseCode: 1,
                    responseMessage: "error"
                });
            }
            // Loop through all the files and fetch the necessary information
            files.forEach((file) => {
                filesData[count++] = {
                    fileName: file.filename,
                    trackName: file.metadata.trackName,
                    contentType: file.contentType
                }
            });
            res.json(filesData);
        });
    });

});

module.exports = router;
