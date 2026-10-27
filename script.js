// ==============================
// PORTFOLIO JAVASCRIPT
// ==============================

// ==============================
// LIGHT MODE AND DARK MODE
// ==============================
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");
const savedTheme = localStorage.getItem("portfolio-theme");

// Use the saved theme if available. Otherwise, start in light mode.
function applyTheme(theme) {
    const isDark = theme === "dark";

    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");

    if (themeToggle && themeIcon && themeLabel) {
        themeIcon.textContent = isDark ? "☀️" : "🌙";
        themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
        themeToggle.setAttribute("aria-pressed", String(isDark));
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
    }
}

applyTheme(savedTheme === "dark" ? "dark" : "light");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isCurrentlyDark = document.documentElement.getAttribute("data-theme") === "dark";
        const nextTheme = isCurrentlyDark ? "light" : "dark";

        applyTheme(nextTheme);
        localStorage.setItem("portfolio-theme", nextTheme);
    });
}

// Update the footer year automatically.
const yearElement = document.getElementById("currentYear");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Close the mobile navigation after someone chooses a section.
const navElement = document.getElementById("portfolioNav");
const navLinks = document.querySelectorAll("#portfolioNav .nav-link");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (window.innerWidth < 992 && navElement.classList.contains("show")) {
            const collapse = bootstrap.Collapse.getOrCreateInstance(navElement);
            collapse.hide();
        }
    });
});

// Replace this with your real email address before publishing.
const portfolioEmail = "onidoJ7@gmail.com";
const emailLink = document.getElementById("emailLink");

if (emailLink && portfolioEmail !== "onidoJ7@gmail.com") {
    emailLink.href = `mailto:${portfolioEmail}`;
    emailLink.textContent = portfolioEmail;
}

// Project summaries shown in the Bootstrap modal.
const projectDetails = {
    edupedia: {
        title: "HOOPEDIA - The Basketball Knowledge Library",
        text: "A basketball information website designed to provide users with knowledge about basketball, including its history, rules, positions, teams, and players. The website features organized content and a simple, user-friendly design to make basketball information easy to access and understand.."
    },
    studentMs: {
        title: "Student Management System",
        text: "A web-based system designed to manage student records efficiently. It allows administrators to add, edit, delete, search, and view student information. The system includes login authentication, input validation, and a MySQL database to keep student records organized and secure."
    },
    techFixHub: {
        title: "TechFix Hub",
        text: "A responsive IT troubleshooting website with searchable hardware, software, network, and security guides, saved bookmarks, and an interactive quiz."
    }
};

const projectModalElement = document.getElementById("projectModal");

if (projectModalElement && typeof bootstrap !== "undefined") {
    const projectModal = bootstrap.Modal.getOrCreateInstance(projectModalElement);
    const modalTitle = document.getElementById("projectModalTitle");
    const modalBody = document.getElementById("projectModalBody");

    document.querySelectorAll(".project-detail-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const project = projectDetails[button.dataset.project];

            if (!project) return;

            modalTitle.textContent = project.title;
            modalBody.textContent = project.text;
            projectModal.show();
        });
    });
}


// Fill the skill bars once, when the skills panel scrolls into view.
const skillPanel = document.getElementById("skillPanel");

if (skillPanel && "IntersectionObserver" in window) {
    skillPanel.classList.add("skills-animate");

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    skillObserver.observe(skillPanel);
}