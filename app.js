const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

module.exports = app;