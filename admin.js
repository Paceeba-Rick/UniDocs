// Initialize Admin Map
function initMap() {
    const map = L.map('adminMap').setView([6.5244, 3.3792], 10);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    // Mock school data
    const schools = [
        {name: "University of Ghana", lat: 6.5244, lng: 3.3792, requests: 3},
        {name: "Kings College", lat: 6.4556, lng: 3.4481, requests: 1}
    ];

    schools.forEach(school => {
        L.marker([school.lat, school.lng])
            .bindPopup(`<b>${school.name}</b><br>${school.requests} request(s)`)
            .addTo(map);
    });
}

// Load requests
function loadRequests() {
    const requests = [
        {id: 1, school: "University of Ghana", document: "Transcript", status: "Pending"},
        {id: 2, school: "Kings College", document: "Certificate", status: "Pending"}
    ];

    let html = '';
    requests.forEach(req => {
        html += `
        <div class="request-item">
            <span>#${req.id}</span>
            <strong>${req.school}</strong>
            <span>${req.document}</span>
            <button class="btn small">Assign</button>
        </div>`;
    });

    document.getElementById('requestList').innerHTML = html;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    loadRequests();
});

