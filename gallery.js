function openModal(imgElement) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImg");
    var downloadBtn = document.getElementById("downloadBtn");

    modal.style.display = "block";
    modalImg.src = imgElement.src;
    downloadBtn.href = imgElement.src;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}
