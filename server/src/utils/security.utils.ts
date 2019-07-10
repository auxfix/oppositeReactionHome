import * as jwt from 'jsonwebtoken';

function signAsync(user: any) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {},
            process.env.PRIVATE_KEY,
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
    return await jwt.verify(token, process.env.PUBLIC_KEY);
}
