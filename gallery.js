
const imageFolders = {
    Friends: "images/Gallery/Friends",
    Family: "images/Gallery/Family",
    Colleagues: "images/Gallery/Colleagues",
    Me: "images/Gallery/Me",
    Others: "images/Gallery/Others"
};

// Preload image lists (replace numbers with actual count of images in each folder)
const imageCounts = {
    Friends: 5,
    Family: 5,
    Colleagues: 5,
    Me: 5,
    Others: 5
};

function loadGallery(category) {
    const container = document.getElementById("gallery-container");
    container.innerHTML = "";

    const folder = imageFolders[category];
    const count = imageCounts[category];

    for (let i = 1; i <= count; i++) {
        let img = document.createElement("img");
        img.src = `${folder}/${i}.jpg`; // Image format: 1.jpg, 2.jpg, etc.
        img.alt = `${category} ${i}`;
        img.onclick = () => openModal(img.src);
        container.appendChild(img);
    }
}

function openModal(src) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const downloadBtn = document.getElementById("downloadBtn");

    modal.style.display = "block";
    modalImg.src = src;
    downloadBtn.href = src;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// Load default category
window.onload = () => loadGallery("Friends");
