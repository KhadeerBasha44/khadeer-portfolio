// Projects accordion - allow only ONE open at a time
const projectTitles = document.querySelectorAll(".project-title");

projectTitles.forEach(title => {
    title.addEventListener("click", (e) => {

        // If GitHub link is clicked, do nothing
        if (e.target.closest(".project-link")) return;

        const currentContent = title.nextElementSibling;
        const currentIcon = title.querySelector(".toggle-icon");

        // Close all other open projects
        projectTitles.forEach(otherTitle => {
            const otherContent = otherTitle.nextElementSibling;
            const otherIcon = otherTitle.querySelector(".toggle-icon");

            if (otherContent !== currentContent) {
                otherContent.style.display = "none";
                otherIcon.textContent = "+";
            }
        });

        // Toggle current project
        if (currentContent.style.display === "block") {
            currentContent.style.display = "none";
            currentIcon.textContent = "+";
        } else {
            currentContent.style.display = "block";
            currentIcon.textContent = "−";
        }
    });
});
