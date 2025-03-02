const menuBtn = document.getElementById('menu-btn');
const navList = document.getElementById('nav-list');

// Toggle the nav menu visibility on button click
menuBtn.addEventListener('click', () => {
  navList.classList.toggle('open');  // Show/hide the nav links
  menuBtn.classList.toggle('active');  // Toggle active class for the button

  // Change the button icon between hamburger and X
  if (menuBtn.classList.contains('active')) {
    menuBtn.innerHTML = '&#10006;';  // Unicode for 'X'
  } else {
    menuBtn.innerHTML = '&#9776;';   // Unicode for hamburger menu
  }
});

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots-container');
const [prevBtn, nextBtn] = [document.getElementById('prev'), document.getElementById('next')];
const carousel = document.getElementById('carousel');

// Create dots dynamically
slides.forEach((_, index) => {
  dotsContainer.innerHTML += `<span></span>`;
});

const dots = dotsContainer.querySelectorAll('span');

const showSlide = (index) => {
  currentIndex = (index + slides.length) % slides.length; // Handles wrapping both directions
  carousel.style.transform = `translateX(${-currentIndex * 100}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
};

const nextSlide = () => showSlide(currentIndex + 1);
const prevSlide = () => showSlide(currentIndex - 1);

// Event listeners
[nextBtn, prevBtn].forEach((btn, idx) =>
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    idx === 0 ? nextSlide() : prevSlide();
    resetInterval();
  })
);

dots.forEach((dot, index) =>
  dot.addEventListener('click', () => {
    showSlide(index);
    resetInterval();
  })
);

let interval = setInterval(nextSlide, 5000);
const resetInterval = () => {
  clearInterval(interval);
  interval = setInterval(nextSlide, 5000);
};

// Initialize carousel
showSlide(currentIndex);

