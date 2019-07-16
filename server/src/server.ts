import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import logger from './utils/logger';
import {retrieveUserIdFromRequest} from './middleware/get-user.middleware';

mongoose.set('useNewUrlParser', true);
mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`, { useNewUrlParser: true });





import './models/newsItem';
import './models/track';
import './models/user';

import newsRoutes from './routes/news';
import tracksRoutes from './routes/tracks';
import userRoutes from './routes/user';

const app = express();

const corsOptions = {
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    origin:  true,
};

app.use(cookieParser());
app.use(retrieveUserIdFromRequest);
app.use(cors(corsOptions));
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Set our api routes
app.use('/', tracksRoutes);
app.use('/', newsRoutes);
app.use('/', userRoutes);

app.use((req, res, next) => {
    // @ts-ignore
    res.header('Access-Control-Allow-Credentials', true);
    // @ts-ignore
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => logger.info(`API running on localhost:${port}`));
