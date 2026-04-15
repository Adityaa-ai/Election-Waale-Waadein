const list = document.getElementById("complaintList");
const searchInput = document.getElementById("search");

// ✅ BASE URL (correct)
const BASE_URL = "https://election-waale-waadein.onrender.com";

async function loadComplaints() {
  try {
    // 🔄 Loading state
    list.innerHTML = "<p>Server waking up... please wait ⏳</p>";

    const res = await fetch(`${BASE_URL}/api/complaints`);
    const data = await res.json();

    // 📊 Update stats
    document.getElementById("total").innerText = data.length;
    document.getElementById("pending").innerText =
      data.filter(c => c.status === "pending").length;
    document.getElementById("resolved").innerText =
      data.filter(c => c.status === "resolved").length;

    // 🔍 Apply search filter
    const filtered = data.filter(item =>
      item.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );

    // 🧹 Clear list
    list.innerHTML = "";

    // ❌ No results
    if (filtered.length === 0) {
      list.innerHTML = "<p>No issues found 🚫</p>";
      return;
    }

    // 📋 Render cards
    filtered.forEach(item => {
      const div = document.createElement("div");
      div.className = "card";

      const statusColor =
        item.status === "resolved" ? "green" : "orange";

      div.innerHTML = `
        <h4>${item.title}</h4>
        <p>${item.description}</p>

        ${
          item.image
            ? `<img src="${item.image}" style="width:100%; border-radius:8px; margin:5px 0;" />`
            : ""
        }

        <span style="
          padding:5px 10px;
          background:${statusColor};
          border-radius:5px;
          font-size:12px;
        ">
          ${item.status}
        </span>
        <br><br>
        <button onclick="event.stopPropagation(); updateStatus(${item.id})">
          Mark Resolved
        </button>
      `;

      div.style.cursor = "pointer";

      // 🔥 click → focus map
      div.onclick = () => {
        if (window.focusOnMap) {
          window.focusOnMap(item.id);
        }
      };

      list.appendChild(div);
    });

  } catch (error) {
    console.error(error);
    list.innerHTML = "<p style='color:red;'>Error loading data ❌</p>";
  }
}

// 🔄 update status
window.updateStatus = async function (id) {
  await fetch(`${BASE_URL}/api/complaints/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status: "resolved" })
  });

  loadComplaints();
};

// 🔍 Live search
searchInput.addEventListener("input", loadComplaints);

// 🚀 Initial load
loadComplaints();

// 🔄 Auto refresh
setInterval(loadComplaints, 5000);