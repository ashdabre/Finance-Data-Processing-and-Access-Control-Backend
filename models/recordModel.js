const db = require("../db");

// CREATE single record
function createRecord(data) {
  const { userId, amount, type, category, date, notes } = data;

  if (!userId || !amount || !type || !category || !date) {
    throw new Error("Missing required fields");
  }

  return db.prepare(`
    INSERT INTO records (user_id, amount, type, category, date, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(userId, amount, type, category, date, notes || null);
}

// GET records with optional filters
function getRecords(filters = {}) {
  let query = "SELECT * FROM records WHERE 1=1";
  const params = [];

  if (filters.type) {
    query += " AND type = ?";
    params.push(filters.type);
  }

  if (filters.category) {
    query += " AND category = ?";
    params.push(filters.category);
  }

  if (filters.startDate && filters.endDate) {
    query += " AND date BETWEEN ? AND ?";
    params.push(filters.startDate, filters.endDate);
  }

  return db.prepare(query).all(...params);
}

// UPDATE record by ID
function updateRecord(id, data) {
  const { amount, type, category, date, notes } = data;

  return db.prepare(`
    UPDATE records
    SET amount=?, type=?, category=?, date=?, notes=?
    WHERE id=?
  `).run(amount, type, category, date, notes, id);
}

// DELETE record by ID
function deleteRecord(id) {
  return db.prepare(`DELETE FROM records WHERE id=?`).run(id);
}

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
};