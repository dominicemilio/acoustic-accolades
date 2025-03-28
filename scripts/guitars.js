document.addEventListener('DOMContentLoaded', () => {

  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('img');
    let currentImage = 0;

    if (images.length === 0) return;


    const controls = document.createElement('div');
    controls.classList.add('carousel-controls');
    controls.innerHTML = `
                <button class="prev" aria-label="Previous image">Previous</button>
                <button class="next" aria-label="Next image">Next</button>
            `;
    carousel.appendChild(controls);

    const indicators = document.createElement('div');
    indicators.classList.add('carousel-indicators');
    images.forEach((_, index) => {
      const indicator = document.createElement('button');

      indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);

      indicators.appendChild(indicator);

      indicator.addEventListener('click', () => {
        changeImage(index);
      });
    });
    carousel.appendChild(indicators);

    if (images.length > 0 && indicators.children.length > currentImage) {
      images[currentImage].classList.add('active');
      indicators.children[currentImage].classList.add('active');
    }

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

    function changeImage(newIndex) {
      if (images.length === 0 || !indicators.children) return;

      if (images[currentImage]) images[currentImage].classList.remove('active');
      if (indicators.children[currentImage]) indicators.children[currentImage].classList.remove('active');


      currentImage = (newIndex + images.length) % images.length;

      if (images[currentImage]) images[currentImage].classList.add('active');
      if (indicators.children[currentImage]) indicators.children[currentImage].classList.add('active');

    }
  });

  const navLinks = document.querySelectorAll("nav ul li a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const linkHref = (link.getAttribute("href") || "").replace("./", "");

    if (linkHref === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });

  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});