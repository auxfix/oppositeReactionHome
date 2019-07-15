import {NextFunction} from 'express';
import {decodeJwt} from '../utils/security.utils';

export function retrieveUserIdFromRequest(req: any, res: any, next: NextFunction) {

    const jwt = req.cookies['SESSIONID'];

    if (jwt) {
        handleSessionCookie(jwt, req)
            .then(() => next())
            .catch((err) => {
                next();
            });
    } else {
        next();
    }
}

async function handleSessionCookie(jwt: string, req: any) {
    try {

        req['user'] = await decodeJwt(jwt);

    } catch (err) {
        console.log('Error: Could not extract user from request:', err.message);
    }
}
