const BASE_URL = "https://election-waale-waadein.onrender.com/api/complaints";

export async function getComplaints() {
  const res = await fetch(`${BASE_URL}/complaints`);
  return res.json();
}

export async function addComplaint(data) {
  const res = await fetch(`${BASE_URL}/complaints`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}