// Enhanced Portfolio Script with Modal Functionality
// script.js

// Fetch and inject components
const components = [
    { id: 'header-container', file: '/components/header.html' },
    { id: 'footer-container', file: '/components/footer.html' },
    { id: 'contact-container', file: '/components/contact.html' },
    { id: 'experience-container', file: '/components/experience.html' },
    { id: 'skills-container', file: '/components/skills.html' },
    { id: 'projects-container', file: '/components/projects.html' },
    { id: 'about-container', file: '/components/about.html' },
    { id: 'services-container', file: '/components/services.html' }
];

components.forEach(({ id, file }) => {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById(id);
            if (container) container.innerHTML = data;
        })
        .catch(err => console.error(`Error loading ${file}:`, err));
});

// Email sending function
function sendMail(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const subject = encodeURIComponent('Portfolio Contact Form Message');
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:afsarprogrammer123@gmail.com?subject=${subject}&body=${body}`;
}

// Project Modal Handler
class ProjectModal {
    constructor() {
        this.modal = document.getElementById('project-modal');
        this.container = document.getElementById('project-modal-container');
        this.content = document.getElementById('project-modal-content');
        this.closeBtn = document.getElementById('close-project-modal');
        
        this.init();
    }

    init() {
        // Close button
        this.closeBtn?.addEventListener('click', () => this.close());
        
        // Close on backdrop click
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    open(projectData) {
        if (!this.modal) return;
        
        // Generate modal content
        this.content.innerHTML = this.generateContent(projectData);
        
        // Show modal with animation
        this.modal.classList.remove('hidden');
        this.modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            this.modal.classList.add('active');
            this.container.classList.remove('scale-95', 'opacity-0');
            this.container.classList.add('scale-100', 'opacity-100');
        }, 10);
        
        // Initialize image slider for modal
        this.initSlider();
    }

    close() {
        if (!this.modal) return;
        
        this.container.classList.remove('scale-100', 'opacity-100');
        this.container.classList.add('scale-95', 'opacity-0');
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            this.modal.classList.remove('flex');
            this.modal.classList.add('hidden');
        }, 300);
    }

    generateContent(data) {
        const images = Array.isArray(data.imageUrl) ? data.imageUrl : [];
        const tags = (data.tags || []).map(
            tag => `<span class="px-3 py-2 bg-accent-blue/10 text-accent-blue text-sm rounded-lg font-medium">${tag}</span>`
        ).join('');

        const slides = images.length
            ? images.map((url, i) => `
                <div class="modal-slide ${i === 0 ? 'active' : ''}">
                    <img src="${url}" alt="${data.title} - Image ${i + 1}" class="w-full h-full object-contain">
                </div>
            `).join('')
            : `
                <div class="modal-slide active">
                    <img src="https://placehold.co/1200x800/E5E7EB/4B5563?text=${encodeURIComponent(data.title || 'Project')}" class="w-full h-full object-cover">
                </div>
            `;

        return `
            <div class="grid md:grid-cols-2 gap-8 p-8">
                <!-- Left: Image Slider -->
                <div class="space-y-4">
                    <div class="modal-slider relative bg-gray-100 dark:bg-dark-secondary rounded-2xl overflow-hidden" style="height: 400px;">
                        ${slides}
                        
                        ${images.length > 1 ? `
                            <button class="modal-prev absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all z-10">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button class="modal-next absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all z-10">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                            
                            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                                ${images.map((_, i) => `
                                    <button class="modal-indicator w-2 h-2 rounded-full bg-white/50 hover:bg-white transition-all ${i === 0 ? 'w-8 bg-white' : ''}" data-index="${i}"></button>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    
                    ${images.length > 1 ? `
                        <div class="grid grid-cols-4 gap-2">
                            ${images.slice(0, 4).map((url, i) => `
                                <button class="thumbnail-btn aspect-video rounded-lg overflow-hidden border-2 ${i === 0 ? 'border-accent-blue' : 'border-transparent'} hover:border-accent-blue transition-all" data-index="${i}">
                                    <img src="${url}" alt="Thumbnail ${i + 1}" class="w-full h-full object-cover">
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <!-- Right: Project Details -->
                <div class="space-y-6">
                    <div>
                        <h2 class="text-4xl font-bold mb-2 dark:text-white">${data.title || 'Untitled Project'}</h2>
                        <p class="text-secondary-text dark:text-gray-400">${data.description || 'No description available'}</p>
                    </div>
                    
                    <div class="flex flex-wrap gap-2">
                        ${tags}
                    </div>
                    
                    ${data.longDescription ? `
                        <div class="space-y-3">
                            <h3 class="text-xl font-semibold dark:text-white">About This Project</h3>
                            <p class="text-secondary-text dark:text-gray-400 leading-relaxed">${data.longDescription}</p>
                        </div>
                    ` : ''}
                    
                    ${data.features && data.features.length > 0 ? `
                        <div class="space-y-3">
                            <h3 class="text-xl font-semibold dark:text-white">Key Features</h3>
                            <ul class="space-y-2">
                                ${data.features.map(feature => `
                                    <li class="flex items-start space-x-2 text-secondary-text dark:text-gray-400">
                                        <i class="fas fa-check-circle text-accent-blue mt-1"></i>
                                        <span>${feature}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${data.technologies && data.technologies.length > 0 ? `
                        <div class="space-y-3">
                            <h3 class="text-xl font-semibold dark:text-white">Technologies Used</h3>
                            <div class="flex flex-wrap gap-2">
                                ${data.technologies.map(tech => `
                                    <span class="px-3 py-1 bg-gray-100 dark:bg-dark-secondary text-sm rounded-lg">${tech}</span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="flex space-x-3 pt-4">
                        ${data.github ? `
                            <a href="${data.github}" target="_blank" class="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl hover:shadow-lg transition-all">
                                <i class="fab fa-github"></i>
                                <span>View Code</span>
                            </a>
                        ` : ''}
                        ${data.live ? `
                            <a href="${data.live}" target="_blank" class="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-xl hover:shadow-lg transition-all">
                                <i class="fas fa-external-link-alt"></i>
                                <span>Live Demo</span>
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    initSlider() {
        const slider = this.content.querySelector('.modal-slider');
        if (!slider) return;

        const slides = slider.querySelectorAll('.modal-slide');
        const prevBtn = slider.querySelector('.modal-prev');
        const nextBtn = slider.querySelector('.modal-next');
        const indicators = slider.querySelectorAll('.modal-indicator');
        const thumbnails = this.content.querySelectorAll('.thumbnail-btn');
        
        let currentIndex = 0;

        const showSlide = (index) => {
            slides[currentIndex].classList.remove('active');
            slides[index].classList.add('active');
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                if (i === index) {
                    indicator.classList.add('w-8', 'bg-white');
                    indicator.classList.remove('w-2', 'bg-white/50');
                } else {
                    indicator.classList.remove('w-8', 'bg-white');
                    indicator.classList.add('w-2', 'bg-white/50');
                }
            });
            
            // Update thumbnails
            thumbnails.forEach((thumb, i) => {
                if (i === index) {
                    thumb.classList.add('border-accent-blue');
                    thumb.classList.remove('border-transparent');
                } else {
                    thumb.classList.remove('border-accent-blue');
                    thumb.classList.add('border-transparent');
                }
            });
            
            currentIndex = index;
        };

        prevBtn?.addEventListener('click', () => {
            const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
            showSlide(newIndex);
        });

        nextBtn?.addEventListener('click', () => {
            const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
            showSlide(newIndex);
        });

        indicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => showSlide(i));
        });

        thumbnails.forEach((thumb, i) => {
            thumb.addEventListener('click', () => showSlide(i));
        });
    }
}

// Make ProjectModal globally available
window.projectModal = new ProjectModal();

// Toast notification
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, duration);
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
        }, 1000);
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const html = document.documentElement;

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    const toggleTheme = () => {
        html.classList.toggle('dark');
        localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
    };

    themeToggle?.addEventListener('click', toggleTheme);
    themeToggleMobile?.addEventListener('click', toggleTheme);

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = mobileMenuBtn?.querySelector('.hamburger-icon');

    const toggleMobileMenu = () => {
        const isOpen = mobileMenu.classList.toggle('-translate-x-full');
        if (!isOpen) {
            mobileMenu.classList.remove('-translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            hamburgerIcon?.classList.add('open');
        } else {
            mobileMenu.classList.add('-translate-x-full');
            mobileMenu.classList.remove('translate-x-0');
            hamburgerIcon?.classList.remove('open');
        }
    };

    mobileMenuBtn?.addEventListener('click', toggleMobileMenu);

    // Close mobile menu on link click
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });

    // Smooth scrolling
    const navLinks = document.querySelectorAll('nav a, .get-in-touch-btn, .mobile-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href?.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-animate-on-scroll]').forEach(el => {
        el.style.transform = 'translateY(50px)';
        el.style.opacity = '0';
        el.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
        observer.observe(el);
    });

    // Contact form
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        sendMail(e);
        showToast('Message sent! Redirecting to your email client...');
        setTimeout(() => contactForm.reset(), 1000);
    });
});
