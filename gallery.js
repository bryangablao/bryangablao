// Hamburger Menu
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
}

// Close menu on outside click
document.addEventListener("click", function(event) {
    const sidebar = document.getElementById("sidebar");
    const hamburger = document.querySelector(".hamburger");

    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        sidebar.style.width = "0";
    }
});

// Modal
function openModal(imgElement) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const downloadBtn = document.getElementById("downloadBtn");

    modal.style.display = "block";
    modalImg.src = imgElement.src;
    downloadBtn.href = imgElement.src;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// Show category
function showCategory(category) {
    const images = document.querySelectorAll(".gallery-grid img");
    images.forEach(img => {
        if (category === "all" || img.dataset.category === category) {
            img.style.display = "block";
        } else {
            img.style.display = "none";
        }
    });
}
