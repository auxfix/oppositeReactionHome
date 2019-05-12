import mongoose from "mongoose";

const TrackSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    logoId:  mongoose.Schema.Types.ObjectId,
    songId:  mongoose.Schema.Types.ObjectId,
    bandName: String,
    trackName: String,
});

export { TrackSchema };
