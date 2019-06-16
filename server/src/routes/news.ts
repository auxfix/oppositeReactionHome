import express from "express";
import mongoose from "mongoose";
const router = express.Router();
const newsModel = mongoose.model("NewsItem");

// get all news
router.get("/news", (req, res, next) => {
    newsModel.find({}).sort({date: -1}).exec((err, news) => {res.send(news); });
});

router.get("/news/:id", async (req, res, next) => {
    try {
        const newsItem = await newsModel.findById(req.params.id);
        res.send(newsItem);
    } catch (exception) {
        res.status(500).json({ error: JSON.stringify(exception) });
    }
});

// post news
router.post("/news", async (req, res, next) => {
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
router.put("/news/:id", async (req, res, next) => {
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
router.delete("/news/:id", async (req, res, next) => {
    try {
        await newsModel.deleteOne({_id: req.params.id})
        res.sendStatus(200);
    } catch (exception) {
        res.status(500).json({ error: JSON.stringify(exception) });
    }
});

export default router;
