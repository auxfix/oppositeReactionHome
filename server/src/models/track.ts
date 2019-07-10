import mongoose from 'mongoose';

interface ITrack {
    logoId: mongoose.Schema.Types.ObjectId;
    songId: mongoose.Schema.Types.ObjectId;
    order: number;
    bandName: string;
    trackName: string;
    isFrontPageTrack: boolean;
}

interface ITrackModel extends ITrack, mongoose.Document {}

const TrackSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    logoId:  mongoose.Schema.Types.ObjectId,
    songId:  mongoose.Schema.Types.ObjectId,
    order: Number,
    bandName: String,
    trackName: String,
    isFrontPageTrack: Boolean,
});

export const TrackModel = mongoose.model<ITrackModel>('Track', TrackSchema);
