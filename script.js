// 1. Show/hide the menu on small screens
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
menuBtn.addEventListener("click", function () {
  navMenu.classList.toggle("open");
});

// Close the menu after clicking a link
navMenu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("open");
  });
});

// 2. Show the current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// 3. Fade-in effect when a section scrolls into view
const sections = document.querySelectorAll("main section:not(.hero)");
sections.forEach(function (s) { s.classList.add("hidden"); });

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      entry.target.classList.remove("hidden");
    }
  });
}, { threshold: 0.15 });
sections.forEach(function (s) { observer.observe(s); });

// 4. Highlight the nav link of the section you are viewing
const links = document.querySelectorAll("nav a");
window.addEventListener("scroll", function () {
  let current = "";
  document.querySelectorAll("main section").forEach(function (sec) {
    if (window.scrollY >= sec.offsetTop - 120) { current = sec.id; }
  });
  links.forEach(function (a) {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});