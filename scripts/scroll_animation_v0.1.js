(() => {
    function initScrollAnimation() {
        const scrollAnimations = document.querySelectorAll('.scroll-animation');
        
        if (scrollAnimations.length === 0) {
            return;
        }

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const baseDelay = 300;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const delay = baseDelay * index;
                    setTimeout(() => {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }, delay);
                }
            });
        }, options);

        scrollAnimations.forEach(animation => {
            observer.observe(animation);
        });
    }

    // Try to initialize immediately if document is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initScrollAnimation();
    } else {
        // Otherwise wait for DOMContentLoaded
        document.addEventListener('DOMContentLoaded', initScrollAnimation);
    }

    // Fallback initialization after a short delay
    setTimeout(initScrollAnimation, 1000);
})();
