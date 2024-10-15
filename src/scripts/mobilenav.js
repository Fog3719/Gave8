const menuToggle = document.getElementById('menu-toggle');
const sidePanel = document.getElementById('side-panel');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
  sidePanel.classList.toggle('translate-x-full');
  mainNav.classList.toggle('hidden');
});