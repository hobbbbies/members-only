const pool = require('./pool');

 async function createUser(fname, lname, email, hash, status) {
    await pool.query(
        `
            INSERT INTO members (fname, lname, email, password, status) VALUES 
            ($1, $2, $3, $4, $5)
        `, [fname, lname, email, hash, status]);
}

 async function findUserByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM members WHERE email = $1', [email]);
    return rows[0];
 }
 
module.exports = { createUser, findUserByEmail };