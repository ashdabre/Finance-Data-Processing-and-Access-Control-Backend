const db = require("../db");

function createUser(username, password, role) {
  return db.prepare(`
    INSERT INTO users (username, password, role, status)
    VALUES (?, ?, ?, 'active')
  `).run(username, password, role);
}

function getUserByUsername(username) {
  return db.prepare(`
    SELECT * FROM users WHERE username = ?
  `).get(username);
}

function getUserById(id) {
  return db.prepare(`
    SELECT * FROM users WHERE id = ?
  `).get(id);
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById
};