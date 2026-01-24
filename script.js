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

// Scroll reveal animation
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.2 });

reveals.forEach(el => revealObserver.observe(el));

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

const dot = document.querySelector(".edu-dot");
const eduItem = document.querySelector(".education-item");

let isDragging = false;
let startY = 0;
let startTop = 0;

dot.addEventListener("mousedown", startDrag);
dot.addEventListener("touchstart", startDrag);

function startDrag(e) {
    isDragging = true;
    dot.style.cursor = "grabbing";

    startY = e.touches ? e.touches[0].clientY : e.clientY;
    startTop = dot.offsetTop;

    document.addEventListener("mousemove", dragDot);
    document.addEventListener("touchmove", dragDot);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchend", stopDrag);
}

function dragDot(e) {
    if (!isDragging) return;

    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = currentY - startY;

    let newTop = startTop + deltaY;

    // limits (stay inside education item)
    const minTop = 0;
    const maxTop = eduItem.offsetHeight - dot.offsetHeight;

    newTop = Math.max(minTop, Math.min(maxTop, newTop));
    dot.style.top = newTop + "px";
}

function stopDrag() {
    isDragging = false;
    dot.style.cursor = "grab";

    document.removeEventListener("mousemove", dragDot);
    document.removeEventListener("touchmove", dragDot);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchend", stopDrag);
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


