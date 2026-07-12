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
    const isOpen = document.querySelector(".sidebar").classList.toggle("active");
    document.querySelector(".sidebar-overlay").classList.toggle("active", isOpen);
}

function closeSidebar() {
    document.querySelector(".sidebar").classList.remove("active");
    document.querySelector(".sidebar-overlay").classList.remove("active");
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


// Toggle on click (with circular wipe where supported)
if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        const applyTheme = () => {
            document.body.classList.toggle("dark");

            const theme = document.body.classList.contains("dark") ? "dark" : "light";
            localStorage.setItem("theme", theme);

            updateToggleText(true);
        };

        if (document.startViewTransition) {
            const r = toggleBtn.getBoundingClientRect();
            document.documentElement.style.setProperty("--tt-x", (r.left + r.width / 2) + "px");
            document.documentElement.style.setProperty("--tt-y", (r.top + r.height / 2) + "px");
            document.startViewTransition(applyTheme);
        } else {
            applyTheme();
        }
    });
}

// ===== EMAILJS CONTACT FORM =====

// Initialize EmailJS (it loads deferred, so wait for it if needed)
(function () {
    const initEmail = () => {
        if (typeof emailjs !== "undefined") {
            emailjs.init("lZo0PhQGtWFgkDazC");
        }
    };

    if (typeof emailjs !== "undefined") {
        initEmail();
    } else {
        window.addEventListener("DOMContentLoaded", initEmail);
    }
})();

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

      emailjs.sendForm(
    "service_oej6k53",
    "template_1nz6ujn",
    this
).then(function() {
            contactForm.reset();
            if (window.showToast) {
                window.showToast("✅ Message sent successfully!", true);
            } else {
                alert("Message sent successfully!");
            }
        }, function(error) {
            if (window.showToast) {
                window.showToast("❌ Failed to send message. Please try again.", false);
            } else {
                alert("Failed to send message. Please try again.");
            }
            console.log(error);
        });
    });
}

// =====================================================
// ✨ PREMIUM FX — spotlight, 3D tilt, magnetic buttons,
//    particle network, counters, back-to-top
// =====================================================
(function () {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ----- CURSOR SPOTLIGHT ON CARDS -----
    const spotlightEls = document.querySelectorAll(
        ".project-card, .skill-item, .contact-info, .contact-form, .cert-card"
    );

    spotlightEls.forEach(el => el.classList.add("spotlight"));

    spotlightEls.forEach(el => {
        if (finePointer) {
            el.addEventListener("mousemove", e => {
                const r = el.getBoundingClientRect();
                el.style.setProperty("--mx", (e.clientX - r.left) + "px");
                el.style.setProperty("--my", (e.clientY - r.top) + "px");
            });
        }

        // Touch devices: glow appears where the card is tapped
        el.addEventListener("touchstart", e => {
            const t = e.touches[0];
            const r = el.getBoundingClientRect();
            el.style.setProperty("--mx", (t.clientX - r.left) + "px");
            el.style.setProperty("--my", (t.clientY - r.top) + "px");
            el.classList.add("touch-active");
        }, { passive: true });

        ["touchend", "touchcancel"].forEach(ev =>
            el.addEventListener(ev, () => {
                setTimeout(() => el.classList.remove("touch-active"), 400);
            })
        );
    });

    // ----- 3D TILT ON CARDS (mouse + touch) -----
    if (!reducedMotion) {
        document.querySelectorAll(".project-card, .skill-item, .cert-card").forEach(el => {
            let raf = null;

            if (finePointer) {
                el.addEventListener("mouseenter", () => {
                    el.style.transition =
                        "transform 0.12s ease-out, box-shadow 0.35s ease, border-color 0.35s ease";
                });

                el.addEventListener("mousemove", e => {
                    if (raf) return;
                    raf = requestAnimationFrame(() => {
                        const r = el.getBoundingClientRect();
                        const x = (e.clientX - r.left) / r.width - 0.5;
                        const y = (e.clientY - r.top) / r.height - 0.5;
                        el.style.transform =
                            `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg)` +
                            ` rotateY(${(x * 8).toFixed(2)}deg) translateY(-5px)`;
                        raf = null;
                    });
                });

                el.addEventListener("mouseleave", () => {
                    if (raf) { cancelAnimationFrame(raf); raf = null; }
                    el.style.transition = "";
                    el.style.transform = "";
                });
            }

            // Touch devices: card presses down in 3D toward the finger
            el.addEventListener("touchstart", e => {
                const t = e.touches[0];
                const r = el.getBoundingClientRect();
                const x = (t.clientX - r.left) / r.width - 0.5;
                const y = (t.clientY - r.top) / r.height - 0.5;
                el.style.transition = "transform 0.18s ease-out";
                el.style.transform =
                    `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg)` +
                    ` rotateY(${(x * 6).toFixed(2)}deg) scale(0.985)`;
            }, { passive: true });

            ["touchend", "touchcancel"].forEach(ev =>
                el.addEventListener(ev, () => {
                    el.style.transition = "transform 0.35s ease";
                    el.style.transform = "";
                })
            );
        });
    }

    // ----- MAGNETIC BUTTONS -----
    if (finePointer && !reducedMotion) {
        document.querySelectorAll(".resume-btn, .btn-ghost, .send-btn").forEach(btn => {
            btn.addEventListener("mousemove", e => {
                const r = btn.getBoundingClientRect();
                const x = e.clientX - r.left - r.width / 2;
                const y = e.clientY - r.top - r.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.25 - 3}px)`;
            });
            btn.addEventListener("mouseleave", () => {
                btn.style.transform = "";
            });
        });
    }

    // ----- BACK TO TOP -----
    const toTop = document.getElementById("toTop");

    if (toTop) {
        window.addEventListener("scroll", () => {
            toTop.classList.toggle("visible", window.scrollY > 500);
        });

        toTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ----- PARTICLE NETWORK BACKGROUND -----
    if (!reducedMotion) {
        const canvas = document.createElement("canvas");
        canvas.id = "fx-canvas";
        document.body.appendChild(canvas);
        const ctx = canvas.getContext("2d");

        let W, H, points;

        function resize() {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
            const count = Math.min(70, Math.floor((W * H) / 22000));
            points = Array.from({ length: count }, () => ({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.6 + 0.6
            }));
        }
        resize();
        window.addEventListener("resize", resize);

        const LINK_DIST = 130;

        function frame() {
            ctx.clearRect(0, 0, W, H);
            const dark = document.body.classList.contains("dark");
            const dotColor = dark ? "rgba(88,166,255,0.5)" : "rgba(0,102,204,0.35)";
            const lineRGB = dark ? "88,166,255" : "0,102,204";
            const lineAlpha = dark ? 0.16 : 0.12;

            for (const p of points) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > W) p.vx *= -1;
                if (p.y < 0 || p.y > H) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = dotColor;
                ctx.fill();
            }

            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < LINK_DIST * LINK_DIST) {
                        const fade = 1 - Math.sqrt(distSq) / LINK_DIST;
                        ctx.strokeStyle = `rgba(${lineRGB},${(fade * lineAlpha).toFixed(3)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(frame);
        }
        frame();
    }
})();

// =====================================================
// 🖼 IMAGE LIGHTBOX — tap/click profile photos to view
//    fullscreen, like a social media DP viewer
// =====================================================
(function () {
    const viewableImgs = document.querySelectorAll(".hero-image img, .profile-img img, .project-shot");
    if (!viewableImgs.length) return;

    const overlay = document.createElement("div");
    overlay.id = "lightbox";
    overlay.innerHTML =
        '<button id="lightbox-close" aria-label="Close">&times;</button>' +
        '<img id="lightbox-img" src="" alt="">' +
        '<span id="lightbox-caption"></span>';
    document.body.appendChild(overlay);

    const lbImg = overlay.querySelector("#lightbox-img");
    const lbCaption = overlay.querySelector("#lightbox-caption");

    function openLightbox(src, alt) {
        lbImg.src = src;
        lbImg.alt = alt || "";
        lbCaption.textContent = alt || "";
        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        overlay.classList.remove("open");
        document.body.style.overflow = "";
    }

    viewableImgs.forEach(img => {
        img.addEventListener("click", e => {
            e.stopPropagation();
            openLightbox(img.src, img.alt);
        });
    });

    // click anywhere (except the photo itself) closes
    overlay.addEventListener("click", e => {
        if (e.target !== lbImg) closeLightbox();
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeLightbox();
    });
})();

// =====================================================
// ✨ PREMIUM FX ROUND 2 — name wave, hero 3D parallax,
//    ripples, skill % count-up, project stagger
// =====================================================
(function () {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ----- HERO NAME LETTER WAVE -----
    const nameEl = document.querySelector(".hero-content h1:not(.typer)");

    if (nameEl && !reducedMotion) {
        const text = nameEl.textContent;
        nameEl.textContent = "";
        [...text].forEach(ch => {
            const s = document.createElement("span");
            s.className = "wave-letter";
            s.textContent = ch === " " ? " " : ch;
            nameEl.appendChild(s);
        });
    }

    // ----- HERO PHOTO 3D PARALLAX (desktop) -----
    const heroWrap = document.querySelector(".hero-image");
    const heroImg = document.querySelector(".hero-image img");

    if (heroWrap && heroImg && finePointer && !reducedMotion) {
        heroWrap.addEventListener("mousemove", e => {
            const r = heroWrap.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            heroImg.classList.add("tilting");
            heroImg.style.transform =
                `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg)` +
                ` rotateY(${(x * 9).toFixed(2)}deg) scale(1.03)`;
        });

        heroWrap.addEventListener("mouseleave", () => {
            heroImg.style.transform = "";
            heroImg.classList.remove("tilting");
        });
    }

    // ----- BUTTON CLICK RIPPLE -----
    document.querySelectorAll(".resume-btn, .btn-ghost, .send-btn, #toTop").forEach(btn => {
        btn.addEventListener("click", e => {
            const r = btn.getBoundingClientRect();
            const size = Math.max(r.width, r.height) * 2;
            const rip = document.createElement("span");
            rip.className = "ripple";
            rip.style.width = rip.style.height = size + "px";
            rip.style.left = (e.clientX - r.left - size / 2) + "px";
            rip.style.top = (e.clientY - r.top - size / 2) + "px";
            btn.appendChild(rip);
            setTimeout(() => rip.remove(), 700);
        });
    });

    // ----- SKILL PERCENTAGE COUNT-UP -----
    const skillItems = document.querySelectorAll(".skill-item");

    if (skillItems.length && !reducedMotion) {
        const pctObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                pctObserver.unobserve(entry.target);

                const label = entry.target.querySelector(".skill-header span:last-child");
                if (!label) return;

                const target = parseInt(label.textContent, 10);
                if (isNaN(target)) return;

                const duration = 1300;
                const start = performance.now();

                const tick = now => {
                    const p = Math.min((now - start) / duration, 1);
                    label.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + "%";
                    if (p < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            });
        }, { threshold: 0.6 });

        skillItems.forEach(item => pctObserver.observe(item));
    }

    // ----- PROJECT CARD STAGGERED ENTRANCE -----
    const cards = document.querySelectorAll(".project-card");

    if (cards.length && !reducedMotion) {
        const cardList = [...cards];
        cardList.forEach(c => c.classList.add("reveal-project"));

        const cardObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                cardObserver.unobserve(entry.target);
                const idx = cardList.indexOf(entry.target);
                setTimeout(() => entry.target.classList.add("active"), (idx % 3) * 150);
            });
        }, { threshold: 0.15 });

        cardList.forEach(c => cardObserver.observe(c));
    }
})();

// =====================================================
// ✨ PREMIUM FX ROUND 3 — preloader, toast, scroll hint
// =====================================================
(function () {
    // ----- PRELOADER -----
    const pre = document.getElementById("preloader");

    if (pre) {
        const hide = () => pre.classList.add("done");

        if (document.readyState === "complete") {
            setTimeout(hide, 400);
        } else {
            window.addEventListener("load", () => setTimeout(hide, 400));
        }
        setTimeout(hide, 2500); // safety net
    }

    // ----- TOAST NOTIFICATION -----
    window.showToast = function (msg, ok = true) {
        let t = document.getElementById("toast");
        if (!t) {
            t = document.createElement("div");
            t.id = "toast";
            document.body.appendChild(t);
        }
        t.textContent = msg;
        t.classList.toggle("toast-err", !ok);

        requestAnimationFrame(() => t.classList.add("show"));
        clearTimeout(t._hideTimer);
        t._hideTimer = setTimeout(() => t.classList.remove("show"), 3500);
    };

    // ----- SCROLL-DOWN INDICATOR -----
    const scrollHint = document.querySelector(".scroll-indicator");

    if (scrollHint) {
        window.addEventListener("scroll", () => {
            scrollHint.classList.toggle("hidden", window.scrollY > 150);
        });
    }
})();

// =====================================================
// ✨ PREMIUM FX ROUND 4 — staggered content reveals
// =====================================================
(function () {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    // About paragraphs and the education entry slide in one after another
    const items = [
        ...document.querySelectorAll("#about p"),
        ...document.querySelectorAll(".education-item")
    ];

    if (!items.length) return;

    items.forEach((el, i) => {
        el.classList.add("reveal");
        el.style.transitionDelay = (i % 3) * 0.12 + "s";
    });

    const staggerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("active");
            staggerObserver.unobserve(entry.target);
        });
    }, { threshold: 0.15 });

    items.forEach(el => staggerObserver.observe(el));
})();
