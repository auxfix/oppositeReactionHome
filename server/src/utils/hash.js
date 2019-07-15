const argon2  = require('argon2');

argon2.hash("pass1").then(result => {
    console.log('digest:', result);
    argon2.verify(result, "pass1").then(result => console.log('verify', result));
});
