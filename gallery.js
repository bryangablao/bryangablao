// Modal functionality
function openModal(img) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImg");
    var downloadBtn = document.getElementById("downloadBtn");

    modal.style.display = "block";
    modalImg.src = img.src;
    downloadBtn.href = img.src;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// Sidebar toggle for mobile
function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}

// Highlight active section as you scroll
const sections = document.querySelectorAll(".gallery-section");
const navLinks = document.querySelectorAll(".sidebar ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80; // adjust offset
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});
