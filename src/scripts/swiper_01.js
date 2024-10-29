document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // 添加响应式配置
    breakpoints: {
      // 移动端 (< 640px)
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: {
          delay: 3000,
        }
      },
      // 平板 (≥ 640px)
      640: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      // 桌面端 (≥ 1024px)
      1024: {
        slidesPerView: 1,
        spaceBetween: 40,
        autoplay: {
          delay: 3500,
        }
      }
    },
    
    // 添加触摸交互配置
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    
    // 提升性能
    preloadImages: false, // 禁用预加载
    lazy: {
      loadOnTransitionStart: true, // 在过渡开始时加载
      loadPrevNext: true // 预加载前后两张幻灯片
    },
    
    // 无障碍支持
    a11y: {
      enabled: true,
      prevSlideMessage: '上一张图片',
      nextSlideMessage: '下一张图片',
      firstSlideMessage: '这是第一张图片',
      lastSlideMessage: '这是最后一张图片',
    }
  });
});
