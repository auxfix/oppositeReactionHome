import {Response} from 'express';
import mongoose from 'mongoose';
const userModel = mongoose.model('UserItem');



export function getUser(req: any, res: Response) {

    const userInfo = req['user'];

    if (userInfo) {

        const user: any = userModel.findById(userInfo.sub);

        res.status(200).json({id: user._id, login: user.login });
    } else {
        res.sendStatus(204);
    }
}
