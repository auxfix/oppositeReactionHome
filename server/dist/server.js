"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const get_user_middleware_1 = require("./middleware/get-user.middleware");
mongoose_1.default.set('useNewUrlParser', true);
mongoose_1.default.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`, { useNewUrlParser: true });
require("./models/newsItem");
require("./models/track");
require("./models/user");
const news_1 = __importDefault(require("./routes/news"));
const tracks_1 = __importDefault(require("./routes/tracks"));
const user_1 = __importDefault(require("./routes/user"));
const app = express_1.default();
const corsOptions = {
    credentials: true,
    optionsSuccessStatus: 200,
    origin: process.env.CORS_ORIGIN,
};
app.use(cookie_parser_1.default());
app.use(get_user_middleware_1.retrieveUserIdFromRequest);
app.use(cors_1.default(corsOptions));
// Parsers for POST data
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Set our api routes
app.use('/', tracks_1.default);
app.use('/', news_1.default);
app.use('/', user_1.default);
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
const server = http_1.default.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`)); // tslint:disable-line
//# sourceMappingURL=server.js.map