// --- Combined JavaScript Logic ---

// --- Hamburger Menu Logic ---
const menuBtn = document.getElementById('menu-btn');
const navList = document.getElementById('nav-list');

if (menuBtn && navList) { // Check if elements exist
  // Set initial aria-expanded state on load
  menuBtn.setAttribute('aria-expanded', 'false');

  menuBtn.addEventListener('click', () => {
    navList.classList.toggle('open');
    menuBtn.classList.toggle('active');
    // Toggle aria-expanded attribute for accessibility
    const isExpanded = navList.classList.contains('open');
    menuBtn.setAttribute('aria-expanded', isExpanded);
  });

  // Close menu when a nav link is clicked
  navList.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      navList.classList.remove('open');
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false'); // Ensure state is correct when closed
    }
  });
} else {
  console.warn("Hamburger menu button or nav list not found.");
}

// --- Carousel, Active Nav Link, and Copyright Year Logic ---
document.addEventListener('DOMContentLoaded', () => {

  // --- Carousel Logic ---
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('img');
    let currentImage = 0;

    if (images.length === 0) return; // Don't setup controls if no images

    // --- Controls (Previous/Next Buttons) ---
    const controls = document.createElement('div');
    controls.classList.add('carousel-controls');
    // *** ACCESSIBILITY FIX: Added aria-label to Prev/Next buttons ***
    controls.innerHTML = `
                <button class="prev" aria-label="Previous image">Previous</button>
                <button class="next" aria-label="Next image">Next</button>
            `;
    carousel.appendChild(controls);

    // --- Indicators (Dots/Buttons) ---
    const indicators = document.createElement('div');
    indicators.classList.add('carousel-indicators');
    images.forEach((_, index) => { // Loop through each image
      const indicator = document.createElement('button'); // Creates a button element

      // *** ACCESSIBILITY FIX: Added aria-label to indicator buttons ***
      indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
      // *** END FIX ***

      indicators.appendChild(indicator); // Adds the button (now with a label)

      // Event listener for clicking the indicator
      indicator.addEventListener('click', () => {
        changeImage(index);
      });
    });
    carousel.appendChild(indicators);

    // --- Initial State ---
    // Check images and indicators exist before setting active class
    if (images.length > 0 && indicators.children.length > currentImage) {
      images[currentImage].classList.add('active');
      indicators.children[currentImage].classList.add('active');
    }


    // --- Event Listeners for Prev/Next ---
    const prevButton = controls.querySelector('.prev');
    const nextButton = controls.querySelector('.next');

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        changeImage(currentImage - 1);
      });
    }
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        changeImage(currentImage + 1);
      });
    }

    // --- Change Image Function ---
    function changeImage(newIndex) {
      if (images.length === 0 || !indicators.children) return; // Don't do anything if no images/indicators

      // Check bounds before removing classes
      if (images[currentImage]) images[currentImage].classList.remove('active');
      if (indicators.children[currentImage]) indicators.children[currentImage].classList.remove('active');


      currentImage = (newIndex + images.length) % images.length; // Wraps around

      // Check bounds before adding classes
      if (images[currentImage]) images[currentImage].classList.add('active');
      if (indicators.children[currentImage]) indicators.children[currentImage].classList.add('active');

    }
  }); // end carousels.forEach

  // --- Active Nav Link Logic ---
  const navLinks = document.querySelectorAll("nav ul li a");
  // Get filename, default to 'index.html' if path is just '/' or empty
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    // Get href, remove './' if present
    const linkHref = (link.getAttribute("href") || "").replace("./", "");

    if (linkHref === currentPage) {
      link.classList.add("active");
      // Optionally add aria-current="page" for better accessibility
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current"); // Remove if not current
    }
  }); // end navLinks.forEach

  // --- Dynamic Copyright Year ---
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

}); // end DOMContentLoaded

// --- Dark Mode Logic (assuming it's in darkmode.js) ---
// Include the content of darkmode.js here if needed,
// or keep the separate script tag below if preferred.

// --- Pricing Table Logic (assuming it's in acoustic_pricing.js) ---
// Include the content of acoustic_pricing.js here if needed,
// or keep the separate script tag below if preferred.