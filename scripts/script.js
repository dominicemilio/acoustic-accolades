let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots-container');
const [prevBtn, nextBtn] = [document.getElementById('prev'), document.getElementById('next')];
const carousel = document.getElementById('carousel');

slides.forEach((_, index) => {
  dotsContainer.innerHTML += `<span></span>`;
});

const dots = dotsContainer.querySelectorAll('span');

const showSlide = (index) => {
  currentIndex = (index + slides.length) % slides.length;
  carousel.style.transform = `translateX(${-currentIndex * 100}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
};

const nextSlide = () => showSlide(currentIndex + 1);
const prevSlide = () => showSlide(currentIndex - 1);

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

let interval = setInterval(nextSlide, 6000);
const resetInterval = () => {
  clearInterval(interval);
  interval = setInterval(nextSlide, 6000);
};

showSlide(currentIndex);

