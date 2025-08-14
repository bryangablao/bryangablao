// Gallery categories and images
const galleryData = {
    "Friends": [
        "images/Gallery/Friends/friend1.jpg",
        "images/Gallery/Friends/friend2.jpg"
    ],
    "Family": [
        "images/Gallery/Family/family1.jpg",
        "images/Gallery/Family/family2.jpg"
    ],
    "Colleagues": [
        "images/Gallery/Colleagues/colleague1.jpg",
        "images/Gallery/Colleagues/colleague2.jpg"
    ],
    "Me": [
        "images/Gallery/Me/me1.jpg",
        "images/Gallery/Me/me2.jpg"
    ],
    "Others": [
        "images/Gallery/Others/other1.jpg",
        "images/Gallery/Others/other2.jpg"
    ]
};

// Show images based on category
function showCategory(category) {
    const gallery = document.getElementById("gallery-container");
    gallery.innerHTML = ""; // Clear previous images

    galleryData[category].forEach(imgSrc => {
        let img = document.createElement("img");
        img.src = imgSrc;
        img.alt = category;
        img.onclick = () => openModal(imgSrc);
        gallery.appendChild(img);
    });
}

// Modal handling
function openModal(src) {
    document.getElementById("imageModal").style.display = "block";
    document.getElementById("modalImage").src = src;
    document.getElementById("downloadBtn").href = src;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// Load default category
showCategory("Friends");
