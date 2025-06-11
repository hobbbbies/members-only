const bcrypt = require('bcryptjs');

// async function validPassword(password, hash, salt) {
async function validPassword(password, hash) {
    // const hashVerify = await bcrypt.hash(password, 10);
    // const hashverify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString('hex');
    // return hash === hashverify;
    const valid = await bcrypt.compare(password, hash)
    return valid;
}
async function genPassword(password) {
    // const salt = crypto.randomBytes(32).toString('hex');
    const genHash = await bcrypt.hash(password, 10);
    // var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString('hex');

    // return {
    //     salt: salt,
    //     hash: genHash
    // };
    return genHash;
}

module.exports = { validPassword, genPassword };
