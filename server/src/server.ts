import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

mongoose.connect('mongodb://database/mean-docker');

import './models/newsItem';
import './models/track';
import './models/user';

import newsRoutes from './routes/news';
import tracksRoutes from './routes/tracks';

const app = express();

const corsOptions = {
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    origin: 'http://localhost:4200',
};
app.use(cookieParser);
app.use(cors(corsOptions));
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set our api routes
app.use('/', tracksRoutes);
app.use('/', newsRoutes);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log(`API running on localhost:${port}`)); // tslint:disable-line
