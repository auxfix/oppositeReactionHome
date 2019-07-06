import crypto from 'crypto';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import util from 'util';
import {DbUser} from "./db-user";

export const randomBytes = util.promisify(crypto.randomBytes);

export const signJwt = util.promisify(jwt.sign);

const RSA_PRIVATE_KEY = fs.readFileSync('../keys/private.key');

const RSA_PUBLIC_KEY = fs.readFileSync('../keys/public.key');

export async function createSessionToken(user: DbUser) {
    return signJwt({
            roles: user.roles
        },
        RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: 7200,
            subject: user.id.toString()
        });
}

export async function decodeJwt(token: string) {

    return await jwt.verify(token, RSA_PUBLIC_KEY);
}

export async function createCsrfToken() {
    return await randomBytes(32).then((bytes) => bytes.toString('hex'));
}