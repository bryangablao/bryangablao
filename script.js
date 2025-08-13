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
