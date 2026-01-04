// ==========================================
// THEME TOGGLE
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    // Save theme preference
    const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// ==========================================
// MOBILE NAVIGATION
// ==========================================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==========================================
// SMOOTH SCROLLING
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// SKILL BARS ANIMATION
// ==========================================
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.getElementById('skills');

let skillsAnimated = false;

const animateSkills = () => {
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    
    if (sectionPos < screenPos && !skillsAnimated) {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
        skillsAnimated = true;
    }
};

window.addEventListener('scroll', animateSkills);

// ==========================================
// PROJECT MODAL
// ==========================================
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const viewProjectButtons = document.querySelectorAll('.view-project');

// Project data
const projects = {
    1: {
        title: 'Bank Dashboard',
        image: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
                    <rect width="600" height="400" fill="#10b981" opacity="0.1"/>
                    <text x="50%" y="45%" text-anchor="middle" fill="#10b981" font-size="80" font-weight="bold">💳</text>
                    <text x="50%" y="60%" text-anchor="middle" fill="#10b981" font-size="24" font-family="Inter">Bank Dashboard</text>
                </svg>`,
        description: 'A comprehensive banking dashboard application that provides users with complete control over their financial accounts. This modern web application features real-time balance updates, transaction management, and detailed financial analytics.',
        features: [
            'Real-time account balance tracking',
            'Detailed transaction history with search and filters',
            'Interactive charts for spending analytics',
            'Secure fund transfer functionality',
            'Bill payment system integration',
            'Budget planning and management tools',
            'Responsive design for mobile and desktop',
            'Dark mode support for better user experience'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js', 'Local Storage API']
    },
    2: {
        title: 'Shopping Site Dashboard',
        image: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
                    <rect width="600" height="400" fill="#f59e0b" opacity="0.1"/>
                    <text x="50%" y="45%" text-anchor="middle" fill="#f59e0b" font-size="80" font-weight="bold">🛒</text>
                    <text x="50%" y="60%" text-anchor="middle" fill="#f59e0b" font-size="24" font-family="Inter">Shopping Dashboard</text>
                </svg>`,
        description: 'A powerful e-commerce admin dashboard designed for managing online stores efficiently. This application provides comprehensive tools for product management, order processing, customer relationship management, and sales analytics.',
        features: [
            'Product catalog management with categories',
            'Real-time order tracking and processing',
            'Customer database and profile management',
            'Sales analytics with visual charts and reports',
            'Inventory management and stock alerts',
            'Revenue tracking and financial reports',
            'User-friendly interface with drag-and-drop features',
            'Export data functionality for reports'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js', 'Local Storage API']
    }
};

// Open modal
viewProjectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = button.getAttribute('data-project');
        openModal(projectId);
    });
});

// Also allow clicking on project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.view-project')) {
            const projectId = card.getAttribute('data-project');
            openModal(projectId);
        }
    });
});

function openModal(projectId) {
    const project = projects[projectId];
    if (!project) return;
    
    const featuresHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
    const techHTML = project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('');
    
    modalBody.innerHTML = `
        <h2 class="modal-project-title">${project.title}</h2>
        <div class="modal-project-image">${project.image}</div>
        <p class="modal-project-description">${project.description}</p>
        
        <div class="modal-project-features">
            <h3>Key Features</h3>
            <ul>${featuresHTML}</ul>
        </div>
        
        <div class="modal-project-features">
            <h3>Technologies Used</h3>
            <div class="project-tags" style="margin-top: 1rem;">${techHTML}</div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ==========================================
// CONTACT FORM
// ==========================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simulate form submission (in a real application, this would send data to a server)
    // For now, we'll just show a success message
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate network delay
    setTimeout(() => {
        // Show success message
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }, 1500);
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.project-card, .certificate-card, .skill-category');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==========================================
// SCROLL TO TOP
// ==========================================
let scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--accent-primary);
    color: white;
    font-size: 24px;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1000;
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-base);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1) translateY(-5px)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1) translateY(0)';
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c👋 Welcome to Ravia Begum\'s Portfolio!', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cFrontend Web Developer | Computer Programming Graduate', 'color: #64748b; font-size: 14px;');
