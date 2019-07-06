import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login:  mongoose.Schema.Types.ObjectId,
    password:  mongoose.Schema.Types.ObjectId,
});

mongoose.model('User', UserSchema);
