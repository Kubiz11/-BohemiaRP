const DISCORD_LINK = "https://discord.gg/kajxBFR44f";
const FIVEM_CONNECT = "fivem://connect/IP-TVÉHO-SERVERU";

function openDiscord() {
    window.open(DISCORD_LINK, "_blank");
}

function connectServer() {
    window.location.href = FIVEM_CONNECT;
}

const STATUS_API = "https://bohemia-rp-status.jakubhajek11.workers.dev";

async function updateServerStatus() {
    const playerCount = document.getElementById("playerCount");
    const serverStatus = document.getElementById("serverStatus");
    const serverStatusText = document.getElementById("serverStatusText");

    try {
        const response = await fetch(STATUS_API, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("API neodpovídá");
        }

        const data = await response.json();

        if (data.online) {
            // SERVER JE ONLINE
            playerCount.textContent = `${data.players} / ${data.maxPlayers}`;
            serverStatusText.textContent = "ONLINE";

            serverStatus.classList.add("server-online");
            serverStatus.classList.remove("server-offline");

        } else {
            // SERVER JE OFFLINE
            playerCount.textContent = `0 / ${data.maxPlayers || 32}`;
            serverStatusText.textContent = "OFFLINE";

            serverStatus.classList.add("server-offline");
            serverStatus.classList.remove("server-online");
        }

    } catch (error) {
        // Když se nepodaří zjistit stav serveru
        playerCount.textContent = "0 / 32";
        serverStatusText.textContent = "OFFLINE";

        serverStatus.classList.add("server-offline");
        serverStatus.classList.remove("server-online");

        console.error("Chyba při načítání FiveM serveru:", error);
    }
}

// Spustí se hned
updateServerStatus();

// Potom kontroluje server každých 30 sekund
setInterval(updateServerStatus, 30000);

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

    // Zavře mobilní menu po kliknutí na odkaz
    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            menuToggle.textContent = "☰";
        });
    });
}