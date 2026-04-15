const BASE_URL = "http://https://election-waale-waadein.onrender.com/api";

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