// scripts/scripts.js
const menuBtn = document.getElementById('menu-btn');
const navList = document.getElementById('nav-list');

menuBtn.addEventListener('click', () => {
  navList.classList.toggle('open');
  menuBtn.classList.toggle('active'); // Toggle active class for the button
});

// Close the menu if a link is clicked (optional)
navList.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    navList.classList.remove('open');
    menuBtn.classList.remove('active');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('img');
    let currentImage = 0;

    // Create navigation controls (previous/next buttons)
    const controls = document.createElement('div');
    controls.classList.add('carousel-controls');
    controls.innerHTML = `
          <button class="prev">Previous</button>
          <button class="next">Next</button>
      `;
    carousel.appendChild(controls);

    // Create image selection indicators
    const indicators = document.createElement('div');
    indicators.classList.add('carousel-indicators');
    images.forEach(() => {
      const indicator = document.createElement('button');
      indicators.appendChild(indicator);
    });
    carousel.appendChild(indicators);

    // Show initial image and set active indicator
    images[currentImage].classList.add('active');
    indicators.children[currentImage].classList.add('active');

    // Event listeners for controls
    controls.querySelector('.prev').addEventListener('click', () => {
      changeImage(currentImage - 1);
    });

    controls.querySelector('.next').addEventListener('click', () => {
      changeImage(currentImage + 1);
    });

    // Event listeners for indicators
    indicators.querySelectorAll('button').forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        changeImage(index);
      });
    });

    function changeImage(newIndex) {
      images[currentImage].classList.remove('active');
      indicators.children[currentImage].classList.remove('active');

      currentImage = (newIndex + images.length) % images.length; // Handle wrapping

      images[currentImage].classList.add('active');
      indicators.children[currentImage].classList.add('active');
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav ul li a"); // Select all nav links
  const currentPage = window.location.pathname.split("/").pop(); // Get current page filename

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active"); // Add the active class to the matching link
    }
  });
});