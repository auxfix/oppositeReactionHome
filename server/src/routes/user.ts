import * as argon2 from 'argon2';
import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
const userModel = mongoose.model('User');

import { createSessionToken } from '../utils/security.utils';

router.post('/user/login', async (req: any, res: any) => {
    const credentials = req.body;
    console.log('1 credentials', credentials);
    const user = await userModel.findOne({login: credentials.login});
    console.log('2 user', user);

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

    console.log('6 userInfo', userInfo);

    if (userInfo) {
        const user: any = await userModel.findOne(mongoose.Types.ObjectId(userInfo.sub));
        console.log('7 userInfo', user);

        res.send({login: user.login, id: user._id});
    } else {
        res.sendStatus(204);
    }
});

async function loginAndBuildResponse(credentials: any, user: any,  res: any) {

    try {

        const sessionToken = await attemptLogin(credentials, user);
        console.log('3 sessionToken', sessionToken);
        res.cookie('SESSIONID', sessionToken, {httpOnly: false});
        console.log('4 user', user);

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
