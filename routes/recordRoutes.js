const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const allowRoles = require("../middleware/role");
const { createRecord, getRecords, updateRecord, deleteRecord } = require("../models/recordModel");

// CREATE: single or multiple records
router.post("/", auth, allowRoles("admin"), (req, res) => {
  let records = req.body;

  // Ensure array
  if (!Array.isArray(records)) records = [records];

  try {
    records.forEach(record => createRecord(record));
    res.json({ message: `${records.length} record(s) added successfully` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: filtered records
router.get("/", auth, (req, res) => {
  const filters = {
    type: req.query.type,
    category: req.query.category,
    startDate: req.query.startDate,
    endDate: req.query.endDate
  };

  const records = getRecords(filters);
  res.json(records);
});

// UPDATE
router.put("/:id", auth, allowRoles("admin"), (req, res) => {
  try {
    updateRecord(req.params.id, req.body);
    res.json({ message: "Record updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", auth, allowRoles("admin"), (req, res) => {
  try {
    deleteRecord(req.params.id);
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;