const projectTitles = document.querySelectorAll(".project-title");

projectTitles.forEach(title => {
    title.addEventListener("click", (e) => {

        // Ignore GitHub link clicks
        if (e.target.closest(".project-link")) return;

        const details = title.nextElementSibling.querySelector(".project-details");
        const icon = title.querySelector(".toggle-icon");

        // Close others
        projectTitles.forEach(other => {
            const otherDetails = other.nextElementSibling.querySelector(".project-details");
            const otherIcon = other.querySelector(".toggle-icon");

            if (otherDetails !== details) {
                otherDetails.classList.remove("active");
                otherIcon.textContent = "+";
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

function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}

/* CLOSE menu after clicking a link (mobile) */
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".nav-links").classList.remove("active");
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
