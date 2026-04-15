let complaints = [
  {
    id: 1,
    user_id: 1,
    title: "Garbage Issue",
    description: "Garbage near road",
    lat: 19.03,
    lng: 73.02,
    status: "pending"
  },
  {
    id: 2,
    user_id: 1,
    title: "Pothole",
    description: "Big pothole here",
    lat: 19.04,
    lng: 73.01,
    status: "resolved"
  }
];

exports.getAllComplaints = async () => {
  return complaints;
};

exports.createComplaint = async (data) => {
  const newComplaint = {
    id: complaints.length + 1,
    ...data,
    status: "pending"
  };

  complaints.push(newComplaint);
  return newComplaint;
};