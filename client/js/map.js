const map = L.map('map').setView([19.0330, 73.0297], 13);

const markers = {}; // store markers

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

// load complaints
async function loadMap() {
  const res = await fetch("http://https://election-waale-waadein.onrender.com/api/complaints");
  const data = await res.json();

  data.forEach(c => {
    let color = c.status === "resolved" ? "green" : "orange";

    const marker = L.circleMarker([c.lat, c.lng], {
      color,
      radius: 10
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

    markers[c.id] = marker; // store marker
  });
}

// 🔥 global function (important)
window.focusOnMap = function (id) {
  const marker = markers[id];
  if (marker) {
    map.setView(marker.getLatLng(), 16);
    marker.openPopup();
  }
};

loadMap();