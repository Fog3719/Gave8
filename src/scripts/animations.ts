// 微妙的滚动触发动画系统
// 使用 IntersectionObserver 实现高性能滚动检测

// 初始化滚动动画
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // 只触发一次
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  // 观察所有带有 scroll-animate 类的元素
  document.querySelectorAll('.scroll-animate').forEach((el) => {
    observer.observe(el);
  });
}

// 导航栏滚动效果
function initNavigationScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (Math.abs(scrollY - lastScrollY) < 5) return;
    lastScrollY = scrollY;

    if (scrollY > 20) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }, { passive: true });
}

// 主初始化函数
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initNavigationScroll();
});
