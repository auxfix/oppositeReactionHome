import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';

const RSA_PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '../keys/private.key'));

const RSA_PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '../keys/public.key'));

function signAsync(user: any) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {},
            RSA_PRIVATE_KEY,
            {algorithm: 'RS256', subject: user._id.toString()},
            (err, token) => {
            resolve(token);
        });
    });
}

export async function createSessionToken(user: any) {
    return await signAsync(user);
}

export async function decodeJwt(token: string) {
    return await jwt.verify(token, RSA_PUBLIC_KEY);
}
