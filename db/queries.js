const pool = require('./pool');

 async function createUser(fname, lname, email, hash, admin) {
    let status = "guest";
    if (admin === 1) {
        status = "member"
    }
    await pool.query(
        `
            INSERT INTO members (fname, lname, email, password, status, admin) VALUES 
            ($1, $2, $3, $4, $5, $6)
        `, [fname, lname, email, hash, status, admin]);
}

 // Used to deserialize user
 async function findUserByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM members WHERE email = $1', [email]);
    return rows[0];
 }

 // Used in /create to add msg to db
 async function createMessage(email, message, date) {
    const user = findUserByEmail(email);
    await pool.query('INSERT INTO messages (email, message, date) VALUES ($1, $2, $3)', [email, message, date]);
 }

 // Used for rendering messages
 async function getAllMessages() {
    const { rows } = await pool.query('SELECT * FROM messages JOIN members ON messages.email = members.email ORDER BY messages.date DESC');
    return rows;
 }
 
 // Used for editing messages
 async function getMessage(id) {
    const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [id]);
    return rows[0];
 }

 // Edits message from POST request
 async function updateMessage(newMsg, id) {
    await pool.query('UPDATE messages SET message = $1 WHERE id = $2', [newMsg, id]);
 }

 async function deleteMessage(id) {
    await pool.query('DELETE FROM messages WHERE id = $1', [id]);
 }
 
 async function registerMember(email, code) {
    await pool.query('UPDATE members SET status = $1 WHERE email = $2', ['member', email]);
 }
module.exports = { createUser, findUserByEmail, createMessage, getAllMessages, updateMessage, getMessage, deleteMessage, registerMember };