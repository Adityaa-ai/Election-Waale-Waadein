const tbody = document.getElementById("tbody");

async function loadAdmin() {
  try {
    const res = await fetch("http://localhost:5000/api/complaints");
    const data = await res.json();

    tbody.innerHTML = "";

    data.forEach(item => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${item.title}</td>
        <td>${item.description}</td>
        <td>${item.status}</td>
        <td>
          <button onclick="updateStatus(${item.id})">
            Mark Resolved
          </button>
        </td>
      `;

      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error("Error loading admin:", err);
  }
}

// 🔄 update status
window.updateStatus = async function (id) {
  try {
    console.log("Updating ID:", id);

    const res = await fetch(`http://localhost:5000/api/complaints/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: "resolved" })
    });

    console.log("Response status:", res.status);

    if (res.status === 404) {
      alert("❌ PUT route not found (backend issue)");
      return;
    }

    if (!res.ok) {
      alert("❌ Failed to update");
      return;
    }

    alert("✅ Updated successfully");

    loadAdmin();

  } catch (err) {
    console.error("Update error:", err);
  }
};

// initial load
loadAdmin();

loadAdmin();