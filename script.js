const loader = document.getElementById("loader");
const welcome = document.getElementById("welcome");
const main = document.getElementById("main");
const enter = document.getElementById("enter");
const envelope = document.getElementById("mainEnvelope");
const hello = document.getElementById("hello");

document.body.classList.add("no-scroll");

window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("done"), 1200);
});

const greeting = [
  ["Halo,", "user!"],
  ["Hello,", "user!"],
  ["Bonjour,", "user!"],
  ["Hola,", "user!"],
  ["Ciao,", "user!"],
  ["Hallo,", "user!"],
  ["こんにちは,", "user!"],
  ["안녕,", "user!"],
  ["你好,", "user!"]
];

let greetingIndex = 0;
setInterval(() => {
    hello.classList.add("changing");
    setTimeout(() => {
        greetingIndex = (greetingIndex + 1) % greetings.length;
        hello.innerHTML = `${greetings[greetingIndex][0]}<br><i>${greetings[greetingIndex][1]}</i>`;
        hello.classList.remove("changing");
    }, 220);
}, 1700);

enter.addEventListener("click", () => {
    welcome.classList.add("leave");
    document.body.classList.remove("no-scroll");
    setTimeout(() => {
        welcome.style.display = "none";
    }, 1100);
});

envelope.addEventListener("click", () => {
    welcome.classList.add("leave");
    document.body.classList.remove("no-scroll");
    setTimeout(() => {
        welcome.style.display = "none";
    }, 1100);
});

envelope.addEventListener("click", () => {
    if (envelope.classList.contains("open")) return;
    envelope.classList.add("open");

    setTimeout(() => {
        document.getElementById("about").scrollIntoView({
            behaviour: "smooth",
            unlock: "start"
        })
    }, 1350);
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
    });
}, {threshold:.12, rootMargin:"0px 0px -60px"});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

window.addEventListener("mousemove", e => {
    if (envelope.classList.contains("open")) return;
    const x = (e.clientX / innerWidth - .5) * 5;
    const y = (e.clientY / innerHeight - .5) * 5;
    envelope.style.transform = `translate(${x}px, ${y}px) rotate(-2deg)`;
});

document.addEventListener("mouseleave", () => {
    if (!envelope.classList.contains("open")) {
        envelope.style.transform = "rotate(-2deg)";
    }
});

document.addEventListener("mouseleave", () => {
    if (!envelope.classList.contains("open")) {
        envelope.style.transform = "rotate(-2deg)";
    }
});

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("cheri-theme");
if (savedTheme === "dark") document.body.setAttribute("data-theme", "dark");

themeToggle.addEventListener("click", () => {
    const dark = document.body.getAttribute("data-theme") === "dark";
    if (dark) {
        document.body.removeAttribute("data-theme");
        localStorage.setItem("cheri-theme", "light");
    } else {
         document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("cheri-theme", "dark");
    }
});

const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");
const cursorLabel = document.getElementById("cursorLabel");
let mouseX = innerWidth / 2, mouseY = innerHeight / 2;
let ringX = mouseX, ringY = mouseY;
let lastSpark = 0;

function moveCursor() {
    ringX += (mouseX - ringX) * .16;
    ringY += (mouseY - ringY) * .16;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    cursorLabel.style.left = `${ringX}px`;
    cursorLabel.style.top = `${ringY}px`;
    requestAnimationFrame(moveCursor);
}
requestAnimationFrame(moveCursor);

window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.body.classList.add("cursor-ready");

    const sections = document.querySelectorAll(".hero,.about,.work,.galley");
    sections.forEach(section => {
        const r =section.getBoundingClientRect();
        if (e.clientY >= r.top && e.clientY <= r.bottom) {
            section.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
            section.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
        }
    });

    if (performance.now() - lastSpark > 55) {
        createSpark(e.clientX, e.clientY);
        lastSpark = performance.now();
    }
});

function createSpark(x, y) {
    const spark = document.createElement("span");
    spark.className = "cursor-spark";
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    const angle = Math.random() * Math.PI * 2;
    const distance = 10 + Math.random() * 18;
    spark.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 700);
}

const hoverTargets = document.querySelectorAll("a, button, .project__visual, skill-card, .portrait-frame");
hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursorRing.classList.add("is-hover");
        if (el.matches(".project__visual")) {
            cursorLabel.textContent = "VIEW";
            cursorLabel.classList.add("show");
        }
    });
    el.addEventListener("mouseleave", () => {
    cursorRing.classList.remove("is-hover");
    cursorLabel.classList.remove("show");
    });
})

window.addEventListener("mousedown", () => cursorRing.classList.add("is-click"));
window.addEventListener("mouseup", () => cursorRing.classList.remove("is-click"));

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxLabel = document.getElementById("lightboxLabel");
const lightboxDescription = document.getElementById("lightboxDescription");
const lightboxCounter = document.getElementById("lightboxCounter");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

const projectData = [
    {
      title: "Modul No. 1",
      label: "01 / MODUL-1",
      description: "The first trial of HTML skills by learning the basics.",
      image: "image/modul1.png"
    },
    {
      title: "Modul No. 2",
      label: "02 / MODUL-2",
      description: "Seccond trial or HTML mixed with CSS.",
      image: "image/modul2.png"
    },
    {
      title: "Modul No. 3",
      label: "03 / MODUL-3",
      description: "Third trial or HTML mixed with CSS and JS.",
      image: "image/modul3.png"
    },
    {
      title: "Art collaboration",
      label: "04 / ART COLLABORATION",
      description: "Collaboration art made by me and my friend.",
      image: "image/collab art.png"
    }
];

const galleryData = [
    {
        title:"Character Illustration.",
        label:"VISUAL DIARY · 01",
        description:"A character of my friend's that i drew an illustration for them.",
        image:"image/jacob.png"
    },
    {
        title:"Full themed illustration.",
        label:"VISUAL DIARY · 02",
        description:"An illustration made by me for a competition.", 
        image:"image/Future is not always about technology..png"
    },
    {
        title:"My own character design.", 
        label:"VISUAL DIARY · 03", 
        description:"A character made by me.", 
        image:"image/oc gweh.png"
    },
    {
        title:"Art trends", 
        label:"VISUAL DIARY · 04", 
        description:"Some internet art trends.", 
        image:"image/Trends.png"
    }
];

let popupItems = projectData;
let popupIndex = 0;
let popupType = "project";

function openLightbox(index, type = "project") {
    popupType = type;
    popupItems = type === "gallery" ? galleryData : projectData;
    popupIndex = (index + popupItems.length) % popupItems.length;
    renderLightbox();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lightboxClose.focus();
}

function renderLightbox() {
    const item = popupItems[popupIndex];
    lightboxImage.src = item.image;
    lightboxImage.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxLabel.textContent = item.label;
    lightboxDescription.textContent = item.description;
    lightboxCounter.textContent = `${String(popupIndex + 1).padStart(2, "0")} / ${String(popupItems.length).padStart(2, "0")}`;
}

function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
}

document.querySelectorAll(".project__visual").forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(Number(item.dataset.project ?? index), "project"));
});

document.querySelectorAll(".gallery-click").forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(Number(item.dataset.gallery ?? index) - 1, "gallery"));
});

lightboxClose.addEventListener("click", closeLightbox);
document.querySelector("[data-close-lightbox]").addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => {
    popupIndex = (popupIndex - 1 + popupItems.length) % popupItems.length;
    renderLightbox();
});
lightboxNext.addEventListener("click", () => {
    popupIndex = (popupIndex + 1) % popupItems.length;
    renderLightbox();
});

document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") {
        popupIndex = (popupIndex - 1 + popupItems.length) % popupItems.length;
         renderLightbox();
  }
    if (event.key === "ArrowRight") {
        popupIndex = (popupIndex + 1) % popupItems.length;
        renderLightbox();
  }
});

document.querySelectorAll(".project__visual, .gallery-click").forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursorRing.classList.add("is-hover");
        cursorLabel.textContent = "VIEW";
        cursorLabel.classList.add("show");
    });
    el.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("is-hover");
        cursorLabel.classList.remove("show");
    });
});

document.querySelectorAll('a[href="#').forEach(link => {
    link.addEventListener("click", e => e.preventDefault());
});