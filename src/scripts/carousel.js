document.addEventListener('DOMContentLoaded', () => {
  const slide = document.getElementById('carousel-slide');
  const images = slide.querySelectorAll('img');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  let counter = 0;
  const size = images[0].clientWidth;

  slide.style.transform = 'translateX(' + (-size * counter) + 'px)';

  // 自动播放
  let autoPlayInterval = setInterval(nextSlide, 3000); // 每 3 秒自动播放

  function nextSlide() {
    if (counter >= images.length - 1) {
      counter = 0;
    } else {
      counter++;
    }
    slide.style.transition = "transform 0.5s ease-in-out";
    slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  }

  nextBtn.addEventListener('click', () => {
    clearInterval(autoPlayInterval); // 点击按钮后暂停自动播放
    nextSlide();
    autoPlayInterval = setInterval(nextSlide, 3000); // 重新开始自动播放
  });

  prevBtn.addEventListener('click', () => {
    clearInterval(autoPlayInterval);
    if (counter <= 0) {
      counter = images.length - 1;
    } else {
      counter--;
    }
    slide.style.transition = "transform 0.5s ease-in-out";
    slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    autoPlayInterval = setInterval(nextSlide, 3000);
  });
});
