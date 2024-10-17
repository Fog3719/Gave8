document.addEventListener('DOMContentLoaded', () => {
    const slide = document.getElementById('carousel-slide');
    const images = slide.querySelectorAll('img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let counter = 0;
    const size = images[0].clientWidth;

    slide.style.transform = 'translateX(' + (-size * counter) + 'px)';

    nextBtn.addEventListener('click', () => {
        if (counter >= images.length - 1) return;
        slide.style.transition = "transform 0.5s ease-in-out";
        counter++;
        slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });

    prevBtn.addEventListener('click', () => {
        if (counter <= 0) return;
        slide.style.transition = "transform 0.5s ease-in-out";
        counter--;
        slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });
});
