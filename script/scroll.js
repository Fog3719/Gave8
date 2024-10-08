let currentSection = 0; // 当前显示的部分
const sections = document.querySelectorAll('.section');

function scrollToSection(index) {
    sections[index].scrollIntoView({ behavior: 'smooth' });
    
    // 使用 setTimeout 来确保滚动完成后触发事件
    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('sectionChanged', { 
            detail: { currentSection: index } 
        }));
    }, 100); // 100ms 延迟，你可能需要根据实际情况调整这个值
}

let isScrolling = false; // 标记是否正在处理滚动事件

function handleScroll(event) {
    if (isScrolling) return; // 如果正在处理滚动事件，则直接返回

    isScrolling = true; // 标记正在处理滚动事件

    if (event.deltaY > 0 && currentSection < sections.length - 1) {
        currentSection++;
        scrollToSection(currentSection);
    } else if (event.deltaY < 0 && currentSection > 0) {
        currentSection--;
        scrollToSection(currentSection);
    }

    event.preventDefault(); // 阻止默认滚动行为

    // 在滚动完成后重置状态
    setTimeout(() => {
        isScrolling = false;
    }, 500); // 500ms 延迟，你可能需要根据实际情况调整这个值
}

// 使用 requestAnimationFrame 来优化滚动处理
let ticking = false;
window.addEventListener('wheel', (event) => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll(event);
            ticking = false;
        });
        ticking = true;
    }
});
