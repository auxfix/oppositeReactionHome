// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';

// Connect to mongodb
mongoose.connect(dbHost);


let multer = require('multer');
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
let db = mongoose.connection;
let mongoDriver = mongoose.mongo;
let gfs = new Grid(db, mongoDriver);



router.get('/', (req, res) => {
    res.send('api works 3');
});

let storage = GridFsStorage({
    gfs : gfs,

    filename: (req, file, cb) => {
        let date = Date.now();
        // The way you want to store your file in database
        cb(null, file.trackName + '-' + date + '.');
    },

    // Additional Meta-data that you want to store
    metadata: function(req, file, cb) {
        cb(null, { originalName: file.trackName });
    },

    root: 'tracks' // Root collection name
});

// Multer configuration for single file uploads
let upload = multer({
    storage: storage
}).single('file');

// Route for file upload
app.post('/tracks', (req, res) => {
    upload(req,res, (err) => {
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        res.json({error_code:0, error_desc: null, file_uploaded: true});
    });
});

app.get('/tracks', (req, res) => {
    let filesData = [];
    let count = 0;
    gfs.collection('tracks'); // set the collection to look up into

    gfs.tracks.find({}).toArray((err, files) => {
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
                originalName: file.metadata.originalName,
                contentType: file.contentType
            }
        });
        res.json(filesData);
    });
});

module.exports = router;
