const menuBtn = document.getElementById('menu-btn');
const navList = document.getElementById('nav-list');

menuBtn.addEventListener('click', () => {
  navList.classList.toggle('open');
  menuBtn.classList.toggle('active');
});

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

    const controls = document.createElement('div');
    controls.classList.add('carousel-controls');
    controls.innerHTML = `
          <button class="prev">Previous</button>
          <button class="next">Next</button>
      `;
    carousel.appendChild(controls);

    const indicators = document.createElement('div');
    indicators.classList.add('carousel-indicators');
    images.forEach(() => {
      const indicator = document.createElement('button');
      indicators.appendChild(indicator);
    });
    carousel.appendChild(indicators);

    images[currentImage].classList.add('active');
    indicators.children[currentImage].classList.add('active');

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

      currentImage = (newIndex + images.length) % images.length;

      images[currentImage].classList.add('active');
      indicators.children[currentImage].classList.add('active');
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav ul li a");
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});