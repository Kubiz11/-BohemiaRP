const DISCORD_LINK = "https://discord.gg/kajxBFR44f";
const FIVEM_CONNECT = "fivem://connect/IP-TVÉHO-SERVERU";

function openDiscord() {
    window.open(DISCORD_LINK, "_blank");
}

function connectServer() {
    window.location.href = FIVEM_CONNECT;
}

function updatePlayerCount() {
    const playerCount = document.getElementById("playerCount");

    if (!playerCount) return;

    const players = Math.floor(Math.random() * 20) + 35;
    playerCount.textContent = players + " / 128";
}

setInterval(updatePlayerCount, 30000);

updatePlayerCount();

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.classList.add("hidden");
    } else {
        navbar.classList.remove("hidden");
    }

    lastScrollY = currentScrollY;
});

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("open");

        if (mainNav.classList.contains("open")) {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }

    });

}