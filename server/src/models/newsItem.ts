import mongoose from 'mongoose';

interface INewItem {
    title: string;
    text: string;
    date: Date;
}

interface INewItemModel extends INewItem, mongoose.Document {}

const NewsItemSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

export const NewsItemModel = mongoose.model<INewItemModel>('NewsItem', NewsItemSchema);
