import * as jwt from 'jsonwebtoken';

function signAsync(user: any) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {},
          // tslint:disable-next-line:max-line-length
            process.env.NODE_ENV === 'dev' ? process.env.PRIVATE_KEY : process.env.PRIVATE_KEY.split('\\n').concat().join('\n'),
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
  // tslint:disable-next-line:max-line-length
    return await jwt.verify(token, process.env.NODE_ENV === 'dev'? process.env.PUBLIC_KEY : process.env.PUBLIC_KEY.split('\\n').concat().join('\n'),);
}
