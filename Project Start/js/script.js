window.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader");
    setTimeout(function() {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 1500);
    }, 2000);
});