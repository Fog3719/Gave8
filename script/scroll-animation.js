document.addEventListener('DOMContentLoaded', function() {
    const scrollElements = document.querySelectorAll('.scroll-animation');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                displayScrollElement(entry.target);
            } else {
                hideScrollElement(entry.target);
            }
        });
    }, {
        threshold: 0.1 // 当元素10%可见时触发
    });

    scrollElements.forEach(el => {
        observer.observe(el);
    });

    function displayScrollElement(element) {
        const index = Array.from(scrollElements).indexOf(element);
        element.style.transitionDelay = `${index * 0.1}s`; // 每个元素增加 0.2 秒的延迟
        element.classList.add('active');
    }

    function hideScrollElement(element) {
        element.classList.remove('active');
    }

    // 监听自定义事件，在每次滚动到新的 section 后触发
    document.addEventListener('sectionChanged', function(e) {
        const currentSectionIndex = e.detail.currentSection;
        const currentSection = document.querySelectorAll('.section')[currentSectionIndex];
        
        // 触发当前 section 内所有 scroll-animation 元素的检查
        const animElements = currentSection.querySelectorAll('.scroll-animation');
        animElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                displayScrollElement(el);
            }
        });
    });
});
