const projectTitles = document.querySelectorAll(".project-title");

projectTitles.forEach(title => {
    title.addEventListener("click", (e) => {

        // Ignore GitHub link clicks
        if (e.target.closest(".project-link")) return;

        const currentCard = title.closest(".project-card");
        const details = currentCard.querySelector(".project-details");
        const icon = title.querySelector(".toggle-icon");

        // Close all other projects
        document.querySelectorAll(".project-card").forEach(card => {
            const d = card.querySelector(".project-details");
            const i = card.querySelector(".toggle-icon");

            if (d !== details) {
                d.classList.remove("active");
                i.textContent = "+";
            }
        });

        // Toggle current
        if (details.classList.contains("active")) {
            details.classList.remove("active");
            icon.textContent = "+";
        } else {
            details.classList.add("active");
            icon.textContent = "−";
        }
    });
});


const skillBars = document.querySelectorAll(".skill-progress");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.width = bar.getAttribute("data-width");
        }
    });
}, { threshold: 0.6 });

skillBars.forEach(bar => {
    observer.observe(bar);
});

const resumeBtn = document.getElementById("resumeBtn");

if (resumeBtn) {
    resumeBtn.addEventListener("click", () => {
        const text = resumeBtn.querySelector(".resume-text");
        const icon = resumeBtn.querySelector(".resume-icon");

        text.textContent = "Downloading...";
        icon.textContent = "⬇️";

        setTimeout(() => {
            text.textContent = "Download Resume";
            icon.textContent = "📄";
        }, 2500);
    });
}


// Global scroll reveal for sections
const revealElements = document.querySelectorAll(".reveal");

const sectionObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                sectionObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealElements.forEach(el => sectionObserver.observe(el));

function toggleSidebar() {
    document.querySelector(".sidebar").classList.toggle("active");
    document.querySelector(".sidebar-overlay").classList.add("active");
    document.body.classList.add("sidebar-open");
}

function closeSidebar() {
    document.querySelector(".sidebar").classList.remove("active");
    document.querySelector(".sidebar-overlay").classList.remove("active");
    document.body.classList.remove("sidebar-open");
}

/* Close on nav click */
document.querySelectorAll(".sidebar .nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelectorAll(".sidebar .nav-links a")
            .forEach(l => l.classList.remove("active"));

        link.classList.add("active");
        closeSidebar();
    });
});

// ===== SMOOTH EDUCATION DOT DRAG (MOBILE + DESKTOP) =====
const dot = document.querySelector(".edu-dot");
const eduItem = document.querySelector(".education-item");

let isDragging = false;
let startY = 0;
let currentY = 0;
let lastY = 0;
let rafId = null;

if (dot && eduItem) {

    const onStart = (e) => {
        isDragging = true;
        dot.style.cursor = "grabbing";

        startY = e.touches ? e.touches[0].clientY : e.clientY;
        lastY = dot.getBoundingClientRect().top;

        document.addEventListener("mousemove", onMove);
        document.addEventListener("touchmove", onMove, { passive: false });
        document.addEventListener("mouseup", onEnd);
        document.addEventListener("touchend", onEnd);
    };

    const onMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();

        currentY = e.touches ? e.touches[0].clientY : e.clientY;

        if (!rafId) {
            rafId = requestAnimationFrame(updatePosition);
        }
    };

    const updatePosition = () => {
        const delta = currentY - startY;
        let newY = lastY + delta;

        const parentRect = eduItem.getBoundingClientRect();
        const dotRect = dot.getBoundingClientRect();

        const minY = parentRect.top;
        const maxY = parentRect.bottom - dotRect.height;

        newY = Math.max(minY, Math.min(maxY, newY));

        dot.style.transform = `translateY(${newY - parentRect.top}px)`;

        rafId = null;
    };

    const onEnd = () => {
        isDragging = false;
        dot.style.cursor = "grab";
        cancelAnimationFrame(rafId);
        rafId = null;

        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("mouseup", onEnd);
        document.removeEventListener("touchend", onEnd);
    };

    dot.addEventListener("mousedown", onStart);
    dot.addEventListener("touchstart", onStart, { passive: false });
}


// ===== SCROLLSPY FOR SIDEBAR (DESKTOP + MOBILE) =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function activateNavLink() {
    let scrollPos = window.scrollY + 150; // offset for header

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

window.addEventListener("scroll", activateNavLink);

// ===== TYPING TEXT EFFECT =====
const typer = document.querySelector(".typer");

if (typer) {
    const words = typer.getAttribute("data-words").split(", ");
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        if (!isDeleting) {
            typer.textContent = currentWord.slice(0, charIndex++);
            if (charIndex > currentWord.length) {
                setTimeout(() => isDeleting = true, 1200);
            }
        } else {
            typer.textContent = currentWord.slice(0, charIndex--);
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }
        setTimeout(typeEffect, isDeleting ? 60 : 90);
    }

    typeEffect();
}

// ===== PROJECT STAGGER REVEAL =====
const projectCards = document.querySelectorAll(".reveal-project");

const projectObserver = new IntersectionObserver(
    entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("active");
                }, index * 150);
            }
        });
    },
    { threshold: 0.2 }
);

projectCards.forEach(card => projectObserver.observe(card));

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + "%";
});

// ===== SECTION TITLE REVEAL =====
const sectionTitles = document.querySelectorAll(".section-title");

const titleObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    { threshold: 0.4 }
);

sectionTitles.forEach(title => titleObserver.observe(title));

// ===== DARK MODE (PERSISTENT + SYSTEM AWARE) =====
const toggleBtn = document.getElementById("themeToggle");

// Apply saved or system preference on load
(function applyInitialTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
        document.body.classList.toggle("dark", savedTheme === "dark");
    } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.body.classList.toggle("dark", prefersDark);
    }

    updateToggleText();
})();

function updateToggleText(animated = false) {
    if (!toggleBtn) return;

    const isDark = document.body.classList.contains("dark");

    if (animated) {
        toggleBtn.classList.add("switching");

        setTimeout(() => {
            if (window.innerWidth <= 768) {
                toggleBtn.textContent = isDark ? "☀️" : "🌙";
            } else {
                toggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
            }

            toggleBtn.classList.remove("switching");
        }, 180);
    } else {
        if (window.innerWidth <= 768) {
            toggleBtn.textContent = isDark ? "☀️" : "🌙";
        } else {
            toggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
        }
    }
}


// Toggle on click
if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        const theme = document.body.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("theme", theme);

        updateToggleText(true);
    });
}

