// Set dynamic year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    menu.classList.toggle('hidden');
    if (menu.classList.contains('hidden')) {
        menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16'); // Hamburger
    } else {
        menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12'); // X (Close)
    }
}

btn.addEventListener('click', toggleMenu);

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (!menu.classList.contains('hidden')) {
            toggleMenu();
        }
    });
});

// Handle Contact Form Submission via Web3Forms
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const formData = new FormData(contactForm);
    // Paste your Web3Forms Access Key below
    formData.append('access_key', 'db16c742-5ac6-4ba3-bd46-89ae95d7b99d');

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok && data.success) {
            contactForm.reset();
            formMessage.textContent = 'Thank you for reaching out! Your message has been sent successfully.';
            formMessage.className = 'mb-6 p-4 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 text-sm';
            formMessage.classList.remove('hidden');

            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        } else {
            formMessage.textContent = data.message || 'Something went wrong. Please try again.';
            formMessage.className = 'mb-6 p-4 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 text-sm';
            formMessage.classList.remove('hidden');
        }
    } catch (error) {
        formMessage.textContent = 'Network error. Please check your connection and try again.';
        formMessage.className = 'mb-6 p-4 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 text-sm';
        formMessage.classList.remove('hidden');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});