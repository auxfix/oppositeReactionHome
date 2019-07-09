import * as jwt from 'jsonwebtoken';

function signAsync(user: any) {
    console.log('process.env.PRIVATE_KEY: ', process.env.PRIVATE_KEY);
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
    console.log('process.env.PUBLIC_KEY: ', process.env.PUBLIC_KEY);
    return await jwt.verify(token, process.env.PUBLIC_KEY);
}
