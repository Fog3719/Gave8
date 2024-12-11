(() => {
    function initMobileNav() {
        const menuToggle = document.getElementById('menu-toggle');
        const sidePanel = document.getElementById('side-panel');
        const mainNav = document.getElementById('main-nav');

        // Only initialize if all required elements exist
        if (menuToggle && sidePanel && mainNav) {
            menuToggle.addEventListener('click', () => {
                sidePanel.classList.toggle('translate-x-full');
                mainNav.classList.toggle('hidden');
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initMobileNav();
    } else {
        document.addEventListener('DOMContentLoaded', initMobileNav);
    }
})();
