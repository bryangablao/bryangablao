// Hamburger toggle
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("open");
}

// Modal
function openModal(img) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const downloadBtn = document.getElementById("downloadBtn");
    modal.style.display = "block";
    modalImg.src = img.src;
    downloadBtn.href = img.src;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}
