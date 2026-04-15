const complaintModel = require("../models/complaintModel");

exports.getComplaints = async (req, res) => {
  try {
    const data = await complaintModel.getAllComplaints();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.createComplaint = async (req, res) => {
  try {
    const complaint = await complaintModel.createComplaint(req.body);
    res.json(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};