const express = require("express");
const router = express.Router();
const controller = require("../controllers/complaintController");

router.post("/", controller.createComplaint);
router.get("/", controller.getComplaints);

module.exports = router;