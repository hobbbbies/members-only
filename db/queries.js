const pool = require('./pool');

async function createUser(fname, lname, email, hash, status) {
    await pool.query(
        `
            INSERT INTO members (fname, lname, email, password, status) VALUES 
            ($1, $2, $3, $4, $5)
        `, [fname, lname, email, hash, status]);
}

module.exports = { createUser };