const sidebar = document.getElementById("sidebar");

// Toggle sidebar when hamburger clicked
function toggleMenu() {
    sidebar.style.left = (sidebar.style.left === "0px") ? "-250px" : "0px";
}

// Filter gallery sections
function filterGallery(category) {
    const sections = document.querySelectorAll(".gallery-section");
    sections.forEach(sec => {
        if (category === "all" || sec.id === category) {
            sec.style.display = "block";
        } else {
            sec.style.display = "none";
        }
    });

    // Highlight active category
    const items = sidebar.querySelectorAll("ul li");
    items.forEach(li => li.classList.remove("active"));
    const selected = Array.from(items).find(li => li.getAttribute("data-category") === category);
    if (selected) selected.classList.add("active");

    // Close sidebar on mobile
    if (window.innerWidth <= 600) {
        sidebar.style.left = "-250px";
    }
}

// Modal functions
function openModal(img) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const downloadBtn = document.getElementById("downloadBtn");

    modal.style.display = "flex";
    modalImg.src = img.src;
    downloadBtn.href = img.src;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// Close modal if clicking outside the image
document.getElementById("imageModal").addEventListener("click", function(e) {
    if (e.target.id === "imageModal") closeModal();
});
