// Modal
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

// Gallery Filter
const filterButtons = document.querySelectorAll('.gallery-filters button');
const sections = document.querySelectorAll('.gallery-section');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const target = btn.getAttribute('data-target');
        sections.forEach(sec => {
            if(target === 'all') {
                sec.style.display = 'block';
            } else {
                sec.id === target ? sec.style.display = 'block' : sec.style.display = 'none';
            }
        });
    });
});
