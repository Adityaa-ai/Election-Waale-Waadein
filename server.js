const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Dummy data (NO DB)
let complaints = [
  {
    id: 1,
    title: "Garbage Issue",
    description: "Garbage near road",
    lat: 19.03,
    lng: 73.02,
    status: "pending"
  },
  {
    id: 2,
    title: "Pothole",
    description: "Big pothole here",
    lat: 19.04,
    lng: 73.01,
    status: "resolved"
  }
];

// GET complaints
app.get("/api/complaints", (req, res) => {
  res.json(complaints);
});

// ADD complaint
app.post("/api/complaints", (req, res) => {
  const newComplaint = {
    id: complaints.length + 1,
    ...req.body,
    status: "pending"
  };

  complaints.push(newComplaint);
  res.json(newComplaint);
});

// UPDATE STATUS

app.put("/api/complaints/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const complaint = complaints.find(c => c.id === id);

  if (complaint) {
    complaint.status = status;
    res.json(complaint);
  } else {
    res.status(404).json({ msg: "Complaint not found" });
  }
});


app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});