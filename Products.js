document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Animate cards on scroll
    function animateOnScroll() {
        productCards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('visible');
            }
        });
    }

    // Initial check
    animateOnScroll();

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);

    // Add click event listener on price elements to navigate to Contact.html
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        price.style.cursor = 'pointer'; // Indicate clickable
        price.addEventListener('click', () => {
            window.location.href = 'Contact.html';
        });
    });
});
