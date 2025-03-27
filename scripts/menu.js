const menuBtn = document.getElementById('menu-btn');
const navList = document.getElementById('nav-list');

menuBtn.addEventListener('click', () => {
  navList.classList.toggle('open');
  menuBtn.classList.toggle('active');

  if (menuBtn.classList.contains('active')) {
    menuBtn.innerHTML = '&#10006;';
  } else {
    menuBtn.innerHTML = '&#9776;';
  }
});