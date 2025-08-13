function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    // Toggle open/close
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "250px";
    }
}

// Close menu when clicking outside
document.addEventListener("click", function (event) {
    const sidebar = document.getElementById("sidebar");
    const hamburger = document.querySelector(".hamburger");

    // If sidebar is open and clicking outside both sidebar & hamburger
    if (sidebar.style.width === "250px" && 
        !sidebar.contains(event.target) && 
        !hamburger.contains(event.target)) {
        sidebar.style.width = "0";
    }
});
