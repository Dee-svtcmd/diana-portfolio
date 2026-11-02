// 1. Show/hide the menu on small screens
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("open");
  });

  // Close the menu after clicking a link
  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("open");
    });
  });
}

// 2. Show the current year in the footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

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

// 5. Project showcase: loop the track so it scrolls without a gap
const track = document.getElementById("marqueeTrack");
if (track) {
  const firstSet = track.querySelector(".marquee-set");
  if (firstSet) {
    const copy = firstSet.cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    track.appendChild(copy);
  }
}

// 6. Click a project to open its full details in a popup
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalDesc = document.getElementById("modalDesc");
const modalClose = document.getElementById("modalClose");

function openProject(slide) {
  const img = slide.querySelector("img");
  const title = slide.querySelector("h3");
  const meta = slide.querySelector(".meta");
  const desc = slide.querySelector(".slide-info p:not(.meta)");
  if (!modal || !img || !title) return;

  modalImg.src = img.src;
  modalImg.alt = img.alt;
  modalTitle.textContent = title.textContent;
  modalMeta.textContent = meta ? meta.textContent : "";
  modalDesc.textContent = desc ? desc.textContent : "";

  document.body.classList.add("modal-open"); // pauses the marquee
  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.setAttribute("open", ""); // fallback for very old browsers
  }
}

function closeProject() {
  if (!modal) return;
  if (typeof modal.close === "function") {
    modal.close();
  } else {
    modal.removeAttribute("open");
  }
  document.body.classList.remove("modal-open");
}

if (track) {
  // Click a project card
  track.addEventListener("click", function (e) {
    const slide = e.target.closest(".slide");
    if (slide) openProject(slide);
  });

  // Press Enter or Space on a focused project card
  track.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      const slide = e.target.closest(".slide");
      if (slide) {
        e.preventDefault();
        openProject(slide);
      }
    }
  });
}

if (modalClose) modalClose.addEventListener("click", closeProject);

if (modal) {
  // Clicking the dark area outside the box closes the popup
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeProject();
  });

  // Runs when the popup closes by any method (X, outside click, Esc)
  modal.addEventListener("close", function () {
    document.body.classList.remove("modal-open");
  });
}