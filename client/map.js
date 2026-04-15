const map = L.map('map').setView([19.0330, 73.0297], 13);

// ✅ BASE URL
const BASE_URL = "https://election-waale-waadein.onrender.com";

const markers = {}; 
let markerLayer = []; // store markers to clear later

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

// 📍 user location
navigator.geolocation.getCurrentPosition(pos => {
  const userLat = pos.coords.latitude;
  const userLng = pos.coords.longitude;

  L.marker([userLat, userLng])
    .addTo(map)
    .bindPopup("📍 You are here");
});

// 🗺️ load complaints
async function loadMap() {
  try {
    const res = await fetch(`${BASE_URL}/api/complaints`);
    const data = await res.json();

    // 🧹 clear old markers (important)
    markerLayer.forEach(m => map.removeLayer(m));
    markerLayer = [];

    data.forEach(c => {
      let color = c.status === "resolved" ? "green" : "orange";

      const marker = L.circleMarker([c.lat, c.lng], {
        color,
        radius: 10,
        fillOpacity: 0.7
      }).addTo(map)
        .bindPopup(`
          <b>${c.title}</b><br>
          ${c.description}<br>
          ${
            c.image
              ? `<img src="${c.image}" style="width:100px; border-radius:8px; margin-top:5px;" />`
              : ""
          }
        `);

      markers[c.id] = marker;
      markerLayer.push(marker);
    });

  } catch (err) {
    console.error("Map load error:", err);
  }
}

// 🔥 focus on marker
window.focusOnMap = function (id) {
  const marker = markers[id];
  if (marker) {
    map.setView(marker.getLatLng(), 16);
    marker.openPopup();
  }
};

// 🚀 initial load
loadMap();

// 🔄 auto refresh map
setInterval(loadMap, 5000);