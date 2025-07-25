


document.addEventListener("DOMContentLoaded", function () {
  document.querySelector('.contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const phoneInput = this.elements['phone'];
    const emailInput = this.elements['email'];
  
    // Check validity of phone and email inputs
    if (!phoneInput.checkValidity()) {
      alert('Please enter a valid phone number.');
      phoneInput.focus();
      return;
    }
  
    if (!emailInput.checkValidity()) {
      alert('Please enter a valid email address.');
      emailInput.focus();
      return;
    }
  
    // Save form data to localStorage for autofill on order page
    const formData = {
      name: this.elements['name'].value,
      address: this.elements['address'].value,
      phone: phoneInput.value,
      email: emailInput.value
    };
    localStorage.setItem('contactFormData', JSON.stringify(formData));
  
    // Show loading animation overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="spinner"></div><div class="loading-text">Loading...</div>';
    document.body.appendChild(loadingOverlay);
  
    // After 1.5 seconds, redirect to order.html
    setTimeout(() => {
      window.location.href = 'order.html';
    }, 1500);
  });
  
  // Autofill order form on order.html
  if (window.location.pathname.endsWith('order.html')) {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
      const data = JSON.parse(savedData);
      document.getElementById('fullName').value = data.name || '';
      document.getElementById('email').value = data.email || '';
      document.getElementById('phone').value = data.phone || '';
      document.getElementById('address').value = data.address || '';
    }
  
    // Handle order form submission
    const orderForm = document.getElementById('order-form');
    const successMessage = document.getElementById('success-message');
  
    orderForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Validate required fields
      if (!orderForm.fullName.value.trim() ||
          !orderForm.email.value.trim() ||
          !orderForm.phone.value.trim() ||
          !orderForm.city.value.trim() ||
          !orderForm.address.value.trim()) {
        alert('Please fill in all personal information fields.');
        return;
      }
  
      // Get selected products and quantities
      const productCheckboxes = document.querySelectorAll('.product-checkbox input[type="checkbox"]');
      const selectedProducts = [];
      productCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
          const quantityInput = checkbox.parentElement.nextElementSibling.querySelector('input[type="number"]');
          const quantity = quantityInput.value && quantityInput.value > 0 ? quantityInput.value : 1;
          selectedProducts.push({ name: checkbox.value, quantity });
        }
      });
  
      if (selectedProducts.length === 0) {
        alert('Please select at least one product.');
        return;
      }
  
      // Prepare email content
      const emailTo = '09a.youssef@gmail.com';
      const subject = encodeURIComponent('New Order Submission');
      const bodyLines = [
        `Full Name: ${orderForm.fullName.value}`,
        `Email: ${orderForm.email.value}`,
        `Phone: ${orderForm.phone.value}`,
        `City/Region: ${orderForm.city.value}`,
        `Address: ${orderForm.address.value}`,
        '',
        'Selected Products:'
      ];
      selectedProducts.forEach(p => {
        bodyLines.push(`- ${p.name} (Quantity: ${p.quantity})`);
      });
      const body = encodeURIComponent(bodyLines.join('\n'));
  
      // Open mail client with prefilled email (fallback)
      window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
  
      // Show success message with animation
      orderForm.style.display = 'none';
      successMessage.style.display = 'flex';
  
      // Clear localStorage after submission
      localStorage.removeItem('contactFormData');
    });
  }
  
});         
document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('active');
  });

  // Scroll-triggered animations
  const fadeElements = document.querySelectorAll('.fact-paragraph, .info-paragraph, .tagline');

  const scrollHandler = () => {
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('fade-in-up');
      }
    });
  };

  window.addEventListener('scroll', scrollHandler);
  scrollHandler(); // Trigger on load in case elements are in view

  // Parallax effect on background
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.body.style.backgroundPosition = `center ${scrollY * 0.3}px`;
  });

  // Typing animation for main headline with orange color on "IS A SILENT POLLUTER"
  const mainHeadline = document.getElementById('main-headline');
  const fullText = mainHeadline.getAttribute('data-text');
  mainHeadline.innerHTML = ''; // Clear existing content

  const phraseToHighlight = "IS A SILENT POLLUTER";
  const typingSpeed = 100; // milliseconds per character

  let currentIndex = 0;
  let currentCharIndex = 0;
  let isHighlighting = false;
  let highlightSpan = null;

  function type() {
    if (currentIndex < fullText.length) {
      const currentChar = fullText.charAt(currentIndex);

      // Check if we are at the start of the phrase to highlight
      if (!isHighlighting && fullText.substring(currentIndex).startsWith(phraseToHighlight)) {
        isHighlighting = true;
        highlightSpan = document.createElement('span');
        highlightSpan.className = 'orange-highlight glow';
        mainHeadline.appendChild(highlightSpan);
      }

      if (isHighlighting) {
        highlightSpan.textContent += currentChar;
        currentCharIndex++;
        if (currentCharIndex === phraseToHighlight.length) {
          // Stop glowing for 3 seconds after typing the phrase
          highlightSpan.classList.remove('glow');
          setTimeout(() => {
            highlightSpan.classList.add('glow');
          }, 3000);
          isHighlighting = false;
          highlightSpan = null;
          currentCharIndex = 0;
          // Make sure main headline is fully visible after typing
          mainHeadline.style.opacity = '1';
          // Animate subheadline fade-in after typing completes
          gsap.to('#subheadline', {opacity: 1, y: 0, duration: 1, ease: "power1.out"});
        }
      } else {
        // Append currentChar as a text node to preserve spaces
        if (currentChar === ' ') {
          mainHeadline.appendChild(document.createTextNode('\u00A0'));
        } else {
          mainHeadline.appendChild(document.createTextNode(currentChar));
        }
      }

      currentIndex++;
      setTimeout(type, typingSpeed);
    }
  }

  type();
});
const go = document.getElementById('cta-btn');
go.addEventListener('onclick', () => {

});
