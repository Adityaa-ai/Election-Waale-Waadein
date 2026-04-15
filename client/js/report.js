const form = document.getElementById("reportForm");
const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");

let imageData = "";

// 📸 Preview image
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    imageData = e.target.result;
    preview.src = imageData;
    preview.style.display = "block";
  };

  reader.readAsDataURL(file);
});

// 🚀 Submit form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    await fetch("http://https://election-waale-waadein.onrender.com/api/complaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        lat,
        lng,
        image: imageData // 👈 store image
      })
    });

    alert("Complaint Submitted!");
    window.location.href = "dashboard.html";
  });
});