document.addEventListener('DOMContentLoaded', () => {
    const scrollAnimations = document.querySelectorAll('.scroll-animation');

    const options = {
        root: null, // 使用视口作为根元素
        rootMargin: '0px',
        threshold: 0.3 // 当元素进入视口 30% 时触发
    };

    const baseDelay = 300; // 基础延迟时间（以毫秒为单位）

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = baseDelay * index; // 每个元素的延迟为基础延迟乘以其索引
                setTimeout(() => {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // 停止观察已触发动画的元素
                }, delay);
            }
        });
    }, options);

    scrollAnimations.forEach(animation => {
        observer.observe(animation);
    });
});
