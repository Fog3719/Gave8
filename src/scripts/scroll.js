/**
 * SmoothScroll class for implementing smooth scrolling between pages or sections
 */
class SmoothScroll {
    /**
     * @param {string} pageSelector - The CSS selector for page/section elements
     * @param {Object} options - Configuration options
     */
    constructor(pageSelector, options = {}) {
        this.pages = document.querySelectorAll(pageSelector);
        this.totalPages = this.pages.length;
        this.currentPage = 1;
        this.isScrolling = false;
        this.options = {
            scrollDuration: options.scrollDuration || 1000
        };

        this.init();
    }

    /**
     * Initialize the smooth scroll functionality
     */
    init() {
        this.addWheelListener();
        this.addKeyboardListener();
    }

    /**
     * Scroll to a specific page
     * @param {number} pageNumber - The page number to scroll to
     */
    scrollToPage(pageNumber) {
        if (this.isScrolling) return;
        this.isScrolling = true;
        this.currentPage = pageNumber;
        this.pages[this.currentPage - 1].scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { this.isScrolling = false; }, this.options.scrollDuration);
    }

    /**
     * Scroll to the next page
     */
    scrollToNextPage() {
        this.scrollToPage(this.currentPage < this.totalPages ? this.currentPage + 1 : 1);
    }

    /**
     * Scroll to the previous page
     */
    scrollToPreviousPage() {
        this.scrollToPage(this.currentPage > 1 ? this.currentPage - 1 : this.totalPages);
    }

    /**
     * Add wheel event listener for mouse scroll
     */
    addWheelListener() {
        window.addEventListener('wheel', (event) => {
            event.preventDefault();
            if (event.deltaY > 0) {
                this.scrollToNextPage();
            } else {
                this.scrollToPreviousPage();
            }
        }, { passive: false });
    }

    /**
     * Add keyboard event listener for keyboard navigation
     */
    addKeyboardListener() {
        window.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'ArrowDown':
                case 'PageDown':
                    event.preventDefault();
                    this.scrollToNextPage();
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    event.preventDefault();
                    this.scrollToPreviousPage();
                    break;
            }
        });
    }
}


// 自动初始化SmoothScroll
document.addEventListener('DOMContentLoaded', () => {
    // 防止默认滚动行为
    document.body.style.overflow = 'hidden';

    // 自动初始化SmoothScroll，使用默认选择器 '.page'
    new SmoothScroll('.page');
});