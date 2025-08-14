const sidebar = document.getElementById("sidebar");
let activeCategory = null;

function toggleSidebar() {
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px";
    } else {
        sidebar.style.left = "0px";
    }
}

function filterGallery(category) {
    const sections = document.querySelectorAll(".gallery-section");
    sections.forEach(sec => {
        if (sec.id === category || category === "all") {
            sec.style.display = "block";
        } else {
            sec.style.display = "none";
        }
    });

    // Highlight active category
    const items = sidebar.querySelectorAll("ul li");
    items.forEach(li => li.classList.remove("active"));
    const selected = Array.from(items).find(li => li.textContent.toLowerCase() === category);
    if (selected) selected.classList.add("active");
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
