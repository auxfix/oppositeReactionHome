import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import { checkIfAuthenticated } from '../middleware/authentication.middleware';

import { NewsItemModel as newsModel } from '../models/newsItem';

// health check
router.get('/', (req, res) => {
    res.sendStatus(200);
});

// server version
router.get('/version', (req, res) => {
    res.send('v_0.0.1.5');
});

// get all news
router.get('/news', (req, res, next) => {
    newsModel.find({}).sort({date: -1}).exec((err, news) => {res.send(news); });
});

router.get('/news/:id', checkIfAuthenticated, async (req, res, next) => {
    try {
        const newsItem = await newsModel.findById(req.params.id);
        res.send(newsItem);
    } catch (exception) {
        res.status(500).json({ error: JSON.stringify(exception) });
    }
});

// post news
router.post('/news', checkIfAuthenticated, async (req, res, next) => {
    try {
        const newNews = new newsModel({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            text: req.body.text,
            date: new Date(),
        });
        await newNews.save();
        res.sendStatus(200);
    } catch (exception) {
        res.status(500).json({ error: JSON.stringify(exception) });
    }
});

// update news
router.put('/news/:id', checkIfAuthenticated, async (req, res, next) => {
    try {
        const newsItem: any = await newsModel.findById(req.params.id);
        newsItem.title = req.body.title;
        newsItem.text = req.body.text;
        await newsItem.save();
        res.sendStatus(200);
    } catch (exception) {
        res.status(500).json({ error: JSON.stringify(exception) });
    }
});

// delete news
router.delete('/news/:id', checkIfAuthenticated, async (req, res, next) => {
    try {
        await newsModel.deleteOne({_id: req.params.id})
        res.sendStatus(200);
    } catch (exception) {
        res.status(500).json({ error: JSON.stringify(exception) });
    }
});

export default router;
