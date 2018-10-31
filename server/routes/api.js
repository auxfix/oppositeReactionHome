// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schema
const songSchema = new mongoose.Schema({
  time: Number,
  name: String
});

// create mongoose model
const Song = mongoose.model('Song', songSchema);

router.get('/', (req, res) => {
    res.send('api works 3');
});

router.get('/songs', (req, res) => {
    Song.find({}, (err, songs) => {
		if (err) res.status(500).send(error);

		res.status(200).json(songs);
	});
});

module.exports = router;
