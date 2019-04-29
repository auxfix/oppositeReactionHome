"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gridfs_stream_1 = __importDefault(require("gridfs-stream"));
const mongoose_1 = __importDefault(require("mongoose"));
const multer_gridfs_storage_1 = __importDefault(require("multer-gridfs-storage"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const dbHost = "mongodb://database/mean-docker";
// Connect to mongodb
const connection = mongoose_1.default.createConnection(dbHost);
connection.once("open", () => {
    const gfs = gridfs_stream_1.default(connection.db, mongoose_1.default.mongo);
    const storage = new multer_gridfs_storage_1.default({
        db: connection,
        file: (req, file) => {
            return {
                bucketName: "tracks",
                filename: "file_" + file.originalname + "_" + Date.now(),
                metadata: {
                    bandName: req.body.bandName,
                    trackName: req.body.trackName,
                }
            };
        }
    });
    const upload = multer_1.default({
        storage
    }).single("file");
    router.get("/", (req, res) => {
        res.send("api works 3");
    });
    // Route for file upload
    router.post("/tracks", (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                res.json({ error_code: 1, err_desc: err });
                return;
            }
            res.json({ error_code: 0, error_desc: null, file_uploaded: true });
        });
    });
    router.get("/tracks", (req, res) => {
        const filesData = [];
        let count = 0;
        gfs.collection("tracks"); // set the collection to look up into
        gfs.files.find({}).toArray((err, files) => {
            // Error checking
            if (!files || files.length === 0) {
                return res.status(404).json({
                    responseCode: 1,
                    responseMessage: "error"
                });
            }
            // Loop through all the files and fetch the necessary information
            files.forEach((file) => {
                filesData[count++] = {
                    bandName: file.metadata.bandName,
                    contentType: file.contentType,
                    fileName: file.filename,
                    trackName: file.metadata.trackName,
                };
            });
            res.json(filesData);
        });
    });
});
exports.default = router;
//# sourceMappingURL=api.js.map