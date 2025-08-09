function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.width = (sidebar.style.width === "250px") ? "0" : "250px";
}

// Close menu when clicking outside
document.addEventListener("click", function (event) {
    const sidebar = document.getElementById("sidebar");
    const hamburger = document.querySelector(".hamburger");

    // If clicking outside the sidebar and hamburger, close it
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        sidebar.style.width = "0";
    }
});
