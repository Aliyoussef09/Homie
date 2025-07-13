// Helper function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const headingLines = document.querySelectorAll('.headings h1');
  const description = document.querySelector('.description');
  const features = document.querySelectorAll('.features-list li');
  const closingLine = document.querySelector('.closing-line');
  const verticalLine = document.querySelector('.vertical-line');

  let headingAnimated = false;
  let descriptionAnimated = false;
  let featuresAnimated = false;
  let closingAnimated = false;

  function animateHeading() {
    headingLines.forEach((line, index) => {
      line.style.animation = `slideUpFadeIn 0.8s ease forwards`;
      line.style.animationDelay = `${index * 0.2}s`;
    });
  }

  function animateDescription() {
    description.style.animation = 'fadeInRight 1s ease forwards';
  }

  function animateFeatures() {
    features.forEach((feature, index) => {
      feature.style.animation = `fadeInLeft 0.8s ease forwards`;
      feature.style.animationDelay = `${index * 0.3}s`;
    });
  }

  function animateClosingLine() {
    closingLine.style.animation = 'zoomInFade 0.7s ease forwards';
  }

  // function animateVerticalLineOnScroll() {
  //   // Extend vertical line height based on scroll progress within the section
  //   const section = document.querySelector('.smart-home-section');
  //   const sectionRect = section.getBoundingClientRect();
  //   const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  //   if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
  //     const visibleHeight = Math.min(windowHeight, sectionRect.bottom) - Math.max(0, sectionRect.top);
  //     const totalHeight = sectionRect.height;
  //     const progress = visibleHeight / totalHeight;
  //     const minHeight = 70px; // base height in px
  //     const maxHeight = totalHeight;
  //     const newHeight = minHeight + (maxHeight - minHeight) * progress;
  //     verticalLine.style.height = `${newHeight}px`;
  //   }
  // }

  function onScroll() {
    if (!headingAnimated) {
      if (isInViewport(headingLines[0])) {
        animateHeading();
        headingAnimated = true;
      }
    }
    if (!descriptionAnimated) {
      if (isInViewport(description)) {
        animateDescription();
        descriptionAnimated = true;
      }
    }
    if (!featuresAnimated) {
      if (isInViewport(features[0])) {
        animateFeatures();
        featuresAnimated = true;
      }
    }
    if (!closingAnimated) {
      if (isInViewport(closingLine)) {
        animateClosingLine();
        closingAnimated = true;
      }
    }
    animateVerticalLineOnScroll();
  }

  window.addEventListener('scroll', onScroll);
  // Trigger animation check on load
  onScroll();
});
// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const images = document.querySelectorAll('.card-image');
  const navbar = document.getElementById('navbar');
  const loadingSpinner = document.getElementById('loading-spinner');
  const navLinks = document.querySelectorAll('.nav-links li a');
  const buttons = document.querySelectorAll('.see-products-btn');

  // Intersection Observer for fade-in and slide-up animation
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const delay = card.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          card.classList.add('animate');
        }, delay);
        observer.unobserve(card);
      }
    });
  }, observerOptions);

  cards.forEach(card => {
    observer.observe(card);
  });

  // Parallax effect on card images
  window.addEventListener('scroll', () => {
    images.forEach(image => {
      const rect = image.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate parallax offset (max 15px)
        const offset = (windowHeight - rect.top) / windowHeight * 15;
        image.style.transform = `translateY(${offset}px) scale(1.05)`;
      } else {
        image.style.transform = 'translateY(0) scale(1)';
      }
    });

    // Navbar background and shadow toggle on scroll
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Navbar link underline animation on hover (handled by CSS)

  // Button hover and ripple effect
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      button.appendChild(ripple);

      const maxDim = Math.max(button.clientWidth, button.clientHeight);
      ripple.style.width = ripple.style.height = maxDim + 'px';

      const rect = button.getBoundingClientRect();
      ripple.style.left = e.clientX - rect.left - maxDim / 2 + 'px';
      ripple.style.top = e.clientY - rect.top - maxDim / 2 + 'px';

      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    });
  });

  // Loading spinner fade out on window load
  window.addEventListener('load', () => {
    if (loadingSpinner) {
      loadingSpinner.classList.add('hidden');
      setTimeout(() => {
        loadingSpinner.style.display = 'none';
      }, 500);
    }
  });
});

