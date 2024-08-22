let currentSection = 0; // 当前显示的部分
const sections = document.querySelectorAll('.section');

function scrollToSection(index) {
    sections[index].scrollIntoView({ behavior: 'smooth' });
}

window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0 && currentSection < sections.length - 1) {
        currentSection++;
    } else if (event.deltaY < 0 && currentSection > 0) {
        currentSection--;
    }
    scrollToSection(currentSection);
    event.preventDefault(); // 阻止默认滚动行为
});
