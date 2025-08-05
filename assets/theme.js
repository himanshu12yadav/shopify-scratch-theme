
if (!customElements.get('sidebar-drawer')){
    class SidebarDrawer extends HTMLElement {
        constructor() {
            super();
            this.drawer = this.querySelector('.sidebar-drawer');
            this.overlay = this.querySelector('.sidebar-overlay');
            this.closeButton = this.querySelector('[data-sidebar-close]');
            this.isOpen = false;
            this.focusableElements = [];
            this.lastFocusedElement = null;

            this.init();
        }

        init() {
            // Close button event
            this.closeButton.addEventListener('click', () => this.close());

            // Overlay click to close
            this.overlay.addEventListener('click', () => this.close());

            // Keyboard navigation
            this.drawer.addEventListener('keydown', (e) => this.handleKeydown(e));

            // Listen for open events
            document.addEventListener('sidebar:open', () => this.open());
            document.addEventListener('sidebar:close', () => this.close());
            document.addEventListener('sidebar:toggle', () => {
                console.log('Sidebar toggle event received');
                this.toggle();
            });
        }

        open(e) {
            if (this.isOpen) return;

            this.isOpen = true;
            this.lastFocusedElement = document.activeElement;

            // Add classes
            this.drawer.classList.add('open');
            this.overlay.classList.add('open');
            document.body.classList.add('sidebar-open');

            // Update ARIA
            this.drawer.setAttribute('aria-hidden', 'false');
            this.overlay.setAttribute('aria-hidden', 'false');

            // Focus management
            this.updateFocusableElements();
            this.focusFirstElement();

            // Announce to screen readers
            this.announceToScreenReader('Sidebar opened');
        }

        close() {
            if (!this.isOpen) return;

            this.isOpen = false;

            // Remove classes
            this.drawer.classList.remove('open');
            this.overlay.classList.remove('open');
            document.body.classList.remove('sidebar-open');

            // Update ARIA
            this.drawer.setAttribute('aria-hidden', 'true');
            this.overlay.setAttribute('aria-hidden', 'true');

            // Restore focus
            if (this.lastFocusedElement) {
                this.lastFocusedElement.focus();
            }

            // Announce to screen readers
            this.announceToScreenReader('Sidebar closed');
        }

        toggle() {
            this.isOpen ? this.close() : this.open();
        }

        handleKeydown(e) {
            if (!this.isOpen) return;

            switch (e.key) {
                case 'Escape':
                    e.preventDefault();
                    this.close();
                    break;
                case 'Tab':
                    this.handleTabKey(e);
                    break;
            }
        }

        handleTabKey(e) {
            if (this.focusableElements.length === 0) return;

            const firstElement = this.focusableElements[0];
            const lastElement = this.focusableElements[this.focusableElements.length - 1];

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }

        updateFocusableElements() {
            const focusableSelectors = [
                'button:not([disabled])',
                'a[href]',
                'input:not([disabled])',
                'select:not([disabled])',
                'textarea:not([disabled])',
                '[tabindex]:not([tabindex="-1"])'
            ];

            this.focusableElements = Array.from(
                this.drawer.querySelectorAll(focusableSelectors.join(', '))
            );
        }

        focusFirstElement() {
            if (this.focusableElements.length > 0) {
                this.focusableElements[0].focus();
            }
        }

        announceToScreenReader(message) {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.style.position = 'absolute';
            announcement.style.left = '-10000px';
            announcement.style.width = '1px';
            announcement.style.height = '1px';
            announcement.style.overflow = 'hidden';
            announcement.textContent = message;

            document.body.appendChild(announcement);
            setTimeout(() => document.body.removeChild(announcement), 1000);
        }
    }

    customElements.define('sidebar-drawer', SidebarDrawer);

}

