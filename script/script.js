//------------------Fetching components---------------
// Header
fetch("/components/header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-container").innerHTML = data;
    });

// Footer
fetch("/components/footer.html").then(response => response.text())
    .then(data => {
        document.getElementById("footer-container").innerHTML = data;
    });

// Contact
fetch("/components/contact.html").then(response => response.text()).then(data => {
    document.getElementById("contact-container").innerHTML = data;
});


// Experience
fetch("/components/experience.html").then(response => response.text()).then(data => {
    document.getElementById("experience-container").innerHTML = data;
});

// Skills
fetch("/components/skills.html").then(response => response.text()).then(data => {
    document.getElementById("skills-container").innerHTML = data;
});

// Projects
fetch("/components/projects.html").then(response => response.text()).then(data => {
    document.getElementById("projects-container").innerHTML = data;
});
// About
fetch("/components/about.html").then(response => response.text()).then(data => {
    document.getElementById("about-container").innerHTML = data;
});


private_key = "35vKVaM1WrGOU8TA7kqVE";
public_key = "1luUxg9Li-GgwAnsz";
template_id = "template_q6oqu0u";


// For sending email
function sendMail(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const subject = encodeURIComponent("Portfolio Contact Form Message");
    const body = encodeURIComponent(
        "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message
    );

    window.location.href = "mailto:afsarprogrammer123@gmail.com?subject=" + subject + "&body=" + body;
}




document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
        }, 1000);
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const html = document.documentElement;

    // Check for saved theme preference or respect OS preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    const toggleTheme = () => {
        html.classList.toggle('dark');
        localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
    };

    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = mobileMenuBtn.querySelector('.hamburger-icon');

    const toggleMobileMenu = () => {
        const isOpen = mobileMenu.classList.toggle('-translate-x-full');
        if (!isOpen) {
            mobileMenu.classList.remove('-translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            hamburgerIcon.classList.add('open');
        } else {
            mobileMenu.classList.add('-translate-x-full');
            mobileMenu.classList.remove('translate-x-0');
            hamburgerIcon.classList.remove('open');
        }
    };

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu();
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .get-in-touch-btn, .mobile-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
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

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe all elements with data-animate-on-scroll
    document.querySelectorAll('[data-animate-on-scroll]').forEach(el => {
        el.style.transform = 'translateY(50px)';
        el.style.opacity = '0';
        el.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
        observer.observe(el);
    });

    // Message box functionality
    const showMessageBox = (message) => {
        const messageBox = document.getElementById('message-box');
        const messageSpan = messageBox.querySelector('span');
        messageSpan.textContent = message;
        messageBox.style.display = 'flex';
        messageBox.offsetHeight;
        messageBox.style.opacity = '1';

        setTimeout(() => {
            messageBox.style.opacity = '0';
            setTimeout(() => messageBox.style.display = 'none', 300);
        }, 3000);
    };

    // Form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showMessageBox('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });

    // Mock download for CV
    document.querySelector('.download-cv-btn').addEventListener('click', (e) => {
        e.preventDefault();
        showMessageBox('CV download initiated. Please check your browser downloads.');
    });

    // Add pulse animation to project cards on hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'pulse 0.5s ease-in-out';
        });

        card.addEventListener('mouseleave', () => {
            card.style.animation = '';
        });
    });
});