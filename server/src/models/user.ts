import mongoose from 'mongoose';

interface IUser {
    login: string;
    passwordDigest: string;
}

interface IUserModel extends IUser, mongoose.Document {}

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login: String,
    passwordDigest: String,
});

export const UserModel = mongoose.model<IUserModel>('User', UserSchema);
