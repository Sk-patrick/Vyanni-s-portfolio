let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let stayTime = 30000;
let typingDelay = 200;
let deletingDelay = 100;
let phraseChangeDelay = 2000;
// Typewriter effect
const typewriter = document.querySelector('.typewriter');
const phrases = [
    'Marketer',
    'Business Development',
];

function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        // Phrase is fully typed, stay for 1 minute
        setTimeout(() => {
            isDeleting = true;
            setTimeout(type, deletingDelay);
        }, stayTime);
    } else if (isDeleting && charIndex === 0) {
        // Phrase is fully deleted, switch to next phrase
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, phraseChangeDelay);
    } else {
        setTimeout(type, isDeleting ? deletingDelay : typingDelay);
    }
}

type();

// type();

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars when they become visible
            if (entry.target.classList.contains('skills')) {
                document.querySelectorAll('.skill-progress').forEach(progress => {
                    const value = progress.getAttribute('data-progress');
                    progress.style.width = `${value}%`;
                });
            }
        }
    });
}, {
    threshold: 0.1
});

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .slide-in, .skills').forEach((element) => {
    observer.observe(element);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    document.querySelectorAll('.bar').forEach((bar, index) => {
        bar.style.transform = navLinks.classList.contains('active')
            ? index === 0 
                ? 'rotate(45deg) translate(5px, 6px)'
                : index === 1
                    ? 'opacity: 0'
                    : 'rotate(-45deg) translate(7px, -8px)'
            : 'none';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const limit = hero.offsetTop + hero.offsetHeight;
    
    if (scrolled <= limit) {
        hero.style.backgroundPosition = `50% ${scrolled * 0.5}px`;
    }
});