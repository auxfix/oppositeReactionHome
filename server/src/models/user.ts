import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login: String,
    passwordDigest: String,
});

mongoose.model('User', UserSchema);
