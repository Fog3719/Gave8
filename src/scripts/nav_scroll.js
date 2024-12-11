(() => {
    function initSmoothScroll() {
        const anchors = document.querySelectorAll('a[href^="#"]');
        if (!anchors || anchors.length === 0) return;

        anchors.forEach(anchor => {
            if (anchor) {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href')?.substring(1);
                    if (!targetId) return;

                    const targetElement = document.getElementById(targetId);
                    const offset = parseInt(this.getAttribute('data-offset')) || 0;

                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - offset,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initSmoothScroll();
    } else {
        document.addEventListener('DOMContentLoaded', initSmoothScroll);
    }
})();
