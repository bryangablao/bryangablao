const imageFolders = {
    Friends: "images/Gallery/Friends",
    Family: "images/Gallery/Family",
    Colleagues: "images/Gallery/Colleagues",
    Me: "images/Gallery/Me",
    Others: "images/Gallery/Others"
};

function loadGallery(category) {
    const container = document.getElementById("gallery-container");
    container.innerHTML = "<p>Loading...</p>";

    fetch(`load_images.php?category=${category}`)
        .then(response => response.json())
        .then(images => {
            container.innerHTML = "";
            images.forEach(src => {
                let img = document.createElement("img");
                img.src = src;
                img.alt = category;
                img.onclick = () => openModal(src);
                container.appendChild(img);
            });
        })
        .catch(() => {
            container.innerHTML = "<p>Failed to load images.</p>";
        });
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
