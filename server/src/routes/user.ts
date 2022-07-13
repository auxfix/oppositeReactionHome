import * as argon2 from 'argon2';
import express from 'express';
import mongoose from 'mongoose';
import {UserModel as userModel} from '../models/user';
const router = express.Router();

import { createSessionToken } from '../utils/security.utils';

router.post('/user/login', async (req: any, res: any) => {
    const credentials = req.body;
    const user = await userModel.findOne({login: credentials.login});
    if (!user) {
        res.sendStatus(403);
    } else {
        await loginAndBuildResponse(credentials, user, res);
    }
});

router.post('/user/logout', (req: any, res: any) => {
    res.clearCookie('SESSIONID');
    res.sendStatus(200);
});

router.get('/user', async (req: any, res: any) => {
    const userInfo = req['user'];

    if (userInfo) {
        const user: any = await userModel.findOne(new mongoose.Types.ObjectId(userInfo.sub));

        res.send({login: user.login, id: user._id});
    } else {
        res.sendStatus(204);
    }
});

async function loginAndBuildResponse(credentials: any, user: any,  res: any) {

    try {

        const sessionToken = await attemptLogin(credentials, user);
        res.cookie('SESSIONID', sessionToken, {httpOnly: true});

        res.send({id: user._id, login: user.login});

    } catch (err) {
        res.sendStatus(403);
    }
}

async function attemptLogin(credentials: any, user: any) {

    const isPasswordValid = await argon2.verify(user.passwordDigest,
        credentials.password);

    if (!isPasswordValid) {
        throw new Error('Password Invalid');
    }

    return createSessionToken(user);
}

export default router;
