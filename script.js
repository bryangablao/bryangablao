// Toggle the sidebar menu
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}

// Close menu when clicking outside of it
document.addEventListener("click", function (event) {
    const sidebar = document.getElementById("sidebar");
    const hamburger = document.querySelector(".hamburger");

    // If the sidebar is open and the click is outside both sidebar and hamburger
    if (sidebar.classList.contains("open") &&
        !sidebar.contains(event.target) &&
        !hamburger.contains(event.target)) {
        sidebar.classList.remove("open");
    }
});
// Handle submenu toggle
document.querySelectorAll(".submenu-toggle").forEach(toggle => {
    toggle.addEventListener("click", function (e) {
        e.preventDefault();
        let submenu = this.nextElementSibling;
        submenu.classList.toggle("active");

        // Change caret direction
        if (submenu.classList.contains("active")) {
            this.innerHTML = this.innerHTML.replace("▸", "▾");
        } else {
            this.innerHTML = this.innerHTML.replace("▾", "▸");
        }
    });
});
