// Modal Functionality
function openModal(img) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const downloadBtn = document.getElementById("downloadBtn");

    modal.style.display = "block";
    modalImg.src = img.src;
    downloadBtn.href = img.src;
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

// Close modal if clicked outside the image
window.onclick = function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
