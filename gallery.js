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

// Smooth scroll when clicking sidebar links
const navLinks = document.querySelectorAll(".sidebar ul li a");
navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        if (this.getAttribute("href").startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Highlight active section on scroll
const sections = document.querySelectorAll(".gallery-section");

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
