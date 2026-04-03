require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();

// CORS using .env
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/users", userRoutes);
app.use("/records", recordRoutes);
app.use("/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));