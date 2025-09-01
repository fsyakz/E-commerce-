// Modern JavaScript for Enhanced E-commerce Website
// Dark Mode Toggle, Smooth Animations, and Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initDarkMode();
    initMobileMenu();
    initSmoothScrolling();
    initProductImageGallery();
    initCartFunctionality();
    initSearchFunctionality();
    initAnimations();
    initFormValidation();
    initNotifications();
});

// Dark Mode Functionality
function initDarkMode() {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Create dark mode toggle button
    createDarkModeToggle();
    
    // Update toggle button state
    updateToggleButton(currentTheme);
}

function createDarkModeToggle() {
    const header = document.getElementById('header');
    const mobile = document.getElementById('mobile');
    
    if (header) {
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'theme-toggle';
        toggleContainer.innerHTML = `
            <i class="fas fa-sun" id="light-icon"></i>
            <i class="fas fa-moon" id="dark-icon"></i>
        `;
        
        toggleContainer.addEventListener('click', toggleTheme);
        
        // Insert before mobile menu, or at the end of header if mobile doesn't exist
        if (mobile) {
            header.insertBefore(toggleContainer, mobile);
        } else {
            header.appendChild(toggleContainer);
        }
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleButton(newTheme);
    
    // Add smooth transition effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

function updateToggleButton(theme) {
    const lightIcon = document.getElementById('light-icon');
    const darkIcon = document.getElementById('dark-icon');
    
    if (lightIcon && darkIcon) {
        if (theme === 'dark') {
            lightIcon.style.opacity = '0.5';
            darkIcon.style.opacity = '1';
        } else {
            lightIcon.style.opacity = '1';
            darkIcon.style.opacity = '0.5';
        }
    }
}

// Enhanced Mobile Menu
function initMobileMenu() {
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');
    
    if (bar && nav) {
        bar.addEventListener('click', () => {
            nav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (close && nav) {
        close.addEventListener('click', () => {
            nav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav && nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !bar.contains(e.target)) {
            nav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Enhanced Product Image Gallery
function initProductImageGallery() {
    const mainImg = document.getElementById('MainImg');
    const smallImgs = document.getElementsByClassName('small-img');
    
    if (mainImg && smallImgs.length > 0) {
        Array.from(smallImgs).forEach((img, index) => {
            img.addEventListener('click', () => {
                // Add loading effect
                mainImg.style.opacity = '0.5';
                
                setTimeout(() => {
                    mainImg.src = img.src;
                    mainImg.style.opacity = '1';
                }, 150);
                
                // Update active state
                Array.from(smallImgs).forEach(smallImg => {
                    smallImg.parentElement.classList.remove('active');
                });
                img.parentElement.classList.add('active');
            });
        });
    }
}

// Enhanced Cart Functionality
function initCartFunctionality() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.cart, button:contains("Tambah ke Keranjang")');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(button);
        });
    });
    
    // Quantity controls
    const quantityInputs = document.querySelectorAll('input[type="number"]');
    quantityInputs.forEach(input => {
        input.addEventListener('change', updateCartTotal);
    });
    
    // Remove from cart
    const removeButtons = document.querySelectorAll('.fa-circle-xmark');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            removeFromCart(button);
        });
    });
}

function addToCart(button) {
    // Create floating animation
    const rect = button.getBoundingClientRect();
    const floatingIcon = document.createElement('i');
    floatingIcon.className = 'fas fa-shopping-cart';
    floatingIcon.style.cssText = `
        position: fixed;
        left: ${rect.left}px;
        top: ${rect.top}px;
        color: var(--primary-color);
        font-size: 1.5rem;
        z-index: 9999;
        pointer-events: none;
        transition: all 0.8s ease;
    `;
    
    document.body.appendChild(floatingIcon);
    
    // Animate to cart icon
    setTimeout(() => {
        const cartIcon = document.querySelector('#lg-bag') || document.querySelector('.fa-bag-shopping');
        if (cartIcon) {
            const cartRect = cartIcon.getBoundingClientRect();
            floatingIcon.style.left = cartRect.left + 'px';
            floatingIcon.style.top = cartRect.top + 'px';
            floatingIcon.style.opacity = '0';
            floatingIcon.style.transform = 'scale(0.5)';
        }
    }, 100);
    
    // Remove floating icon
    setTimeout(() => {
        document.body.removeChild(floatingIcon);
    }, 900);
    
    // Show success notification
    showNotification('Produk berhasil ditambahkan ke keranjang!', 'success');
    
    // Update cart count (if exists)
    updateCartCount();
}

function removeFromCart(button) {
    const row = button.closest('tr');
    if (row) {
        row.style.transition = 'all 0.3s ease';
        row.style.opacity = '0';
        row.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
            row.remove();
            updateCartTotal();
            showNotification('Produk dihapus dari keranjang', 'info');
        }, 300);
    }
}

function updateCartTotal() {
    const rows = document.querySelectorAll('#cart tbody tr');
    let total = 0;
    
    rows.forEach(row => {
        const priceCell = row.cells[3];
        const quantityInput = row.cells[4].querySelector('input');
        const subtotalCell = row.cells[5];
        
        if (priceCell && quantityInput && subtotalCell) {
            const price = parseFloat(priceCell.textContent.replace(/[^\d]/g, ''));
            const quantity = parseInt(quantityInput.value);
            const subtotal = price * quantity;
            
            subtotalCell.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
            total += subtotal;
        }
    });
    
    // Update total in cart summary
    const totalElements = document.querySelectorAll('#subtotal table td:last-child');
    if (totalElements.length > 0) {
        totalElements[totalElements.length - 1].textContent = `Rp ${total.toLocaleString('id-ID')}`;
    }
}

function updateCartCount() {
    // This would typically connect to a backend or localStorage
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;
        
        // Add bounce animation
        cartCount.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            cartCount.style.animation = '';
        }, 500);
    }
}

// Search Functionality
function initSearchFunctionality() {
    // Create search bar if it doesn't exist
    createSearchBar();
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(performSearch, 300));
    }
}

function createSearchBar() {
    const header = document.getElementById('header');
    if (header && !document.getElementById('search-input')) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" id="search-input" placeholder="Cari produk..." />
            <i class="fas fa-search search-icon"></i>
        `;
        
        // Insert before mobile menu
        const mobile = document.getElementById('mobile');
        if (mobile) {
            header.insertBefore(searchContainer, mobile);
        } else {
            header.appendChild(searchContainer);
        }
        
        // Add CSS for search container
        const style = document.createElement('style');
        style.textContent = `
            .search-container {
                position: relative;
                margin-left: auto;
                margin-right: 1rem;
            }
            
            #search-input {
                padding: 0.5rem 2.5rem 0.5rem 1rem;
                border: 2px solid var(--border-color);
                border-radius: 25px;
                background: var(--bg-secondary);
                color: var(--text-primary);
                font-size: 0.9rem;
                width: 250px;
                transition: all 0.3s ease;
            }
            
            #search-input:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(8, 129, 120, 0.1);
            }
            
            .search-icon {
                position: absolute;
                right: 1rem;
                top: 50%;
                transform: translateY(-50%);
                color: var(--text-muted);
                cursor: pointer;
            }
            
            @media (max-width: 768px) {
                .search-container {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function performSearch(query) {
    const products = document.querySelectorAll('.pro');
    const searchTerm = query.toLowerCase();
    
    products.forEach(product => {
        const title = product.querySelector('h5')?.textContent.toLowerCase() || '';
        const brand = product.querySelector('span')?.textContent.toLowerCase() || '';
        
        if (title.includes(searchTerm) || brand.includes(searchTerm)) {
            product.style.display = 'block';
            product.style.animation = 'fadeIn 0.3s ease';
        } else {
            product.style.display = 'none';
        }
    });
    
    // Show "no results" message if needed
    const visibleProducts = Array.from(products).filter(p => p.style.display !== 'none');
    showSearchResults(visibleProducts.length, searchTerm);
}

function showSearchResults(count, term) {
    let resultMessage = document.getElementById('search-results');
    
    if (!resultMessage) {
        resultMessage = document.createElement('div');
        resultMessage.id = 'search-results';
        resultMessage.style.cssText = `
            text-align: center;
            padding: 1rem;
            color: var(--text-secondary);
            font-style: italic;
        `;
        
        const productContainer = document.querySelector('.pro-container');
        if (productContainer) {
            productContainer.parentNode.insertBefore(resultMessage, productContainer);
        }
    }
    
    if (term) {
        resultMessage.textContent = count > 0 
            ? `Ditemukan ${count} produk untuk "${term}"`
            : `Tidak ada produk yang ditemukan untuk "${term}"`;
        resultMessage.style.display = 'block';
    } else {
        resultMessage.style.display = 'none';
    }
}

// Scroll Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.pro, .fe-box, .blog-box, .banner-box');
    animateElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
                transform: translate3d(0,0,0);
            }
            40%, 43% {
                transform: translate3d(0, -10px, 0);
            }
            70% {
                transform: translate3d(0, -5px, 0);
            }
            90% {
                transform: translate3d(0, -2px, 0);
            }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'Field ini wajib diisi';
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Format email tidak valid';
            isValid = false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\-\(\)\s]+$/;
        if (!phoneRegex.test(value)) {
            errorMessage = 'Format nomor telepon tidak valid';
            isValid = false;
        }
    }
    
    showFieldError(field, errorMessage);
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    if (message) {
        field.style.borderColor = 'var(--accent-color)';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: var(--accent-color);
            font-size: 0.8rem;
            margin-top: 0.25rem;
            animation: slideInRight 0.3s ease;
        `;
        
        field.parentNode.appendChild(errorDiv);
    }
}

function clearFieldError(field) {
    field.style.borderColor = '';
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Notification System
function initNotifications() {
    // Create notification container
    if (!document.getElementById('notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            z-index: 10000;
            max-width: 400px;
        `;
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: 'var(--primary-color)',
        error: 'var(--accent-color)',
        warning: 'var(--secondary-color)',
        info: 'var(--text-secondary)'
    };
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    notification.style.cssText = `
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-left: 4px solid ${colors[type]};
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 0.5rem;
        box-shadow: 0 4px 15px var(--shadow-light);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: var(--text-muted);
        margin-left: auto;
    `;
    
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    container.appendChild(notification);
    
    // Auto remove after duration
    if (duration > 0) {
        setTimeout(() => {
            removeNotification(notification);
        }, duration);
    }
}

function removeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add slideOutRight animation
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(additionalStyles);

// Initialize page-specific features
function initPageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'shop.html':
            initProductFilters();
            break;
        case 'cart.html':
            initCheckoutProcess();
            break;
        case 'contact.html':
            initContactForm();
            break;
    }
}

// Product Filters (for shop page)
function initProductFilters() {
    // This would be implemented based on specific requirements
    console.log('Product filters initialized');
}

// Checkout Process (for cart page)
function initCheckoutProcess() {
    // This would be implemented based on specific requirements
    console.log('Checkout process initialized');
}

// Contact Form (for contact page)
function initContactForm() {
    const contactForm = document.querySelector('#form-details form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.', 'success');
            contactForm.reset();
        });
    }
}

// Initialize page-specific features when DOM is loaded
document.addEventListener('DOMContentLoaded', initPageSpecificFeatures);
