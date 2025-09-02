// MAIN JAVASCRIPT FOR PORTFOLIO WEBSITE

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initCustomCursor();
  initScrollEffects();
  initMobileMenu();
  initFaqAccordion();
  initFormValidation();
  initProjectFilters();
});

// Custom cursor effect
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (!cursor || !cursorFollower) return;
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    setTimeout(() => {
      cursorFollower.style.left = `${e.clientX}px`;
      cursorFollower.style.top = `${e.clientY}px`;
    }, 100);
  });
  
  // Add hover effect to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-card, .info-item, input, textarea, .checkbox, .faq-question');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorFollower.style.backgroundColor = 'rgba(255, 60, 0, 0.1)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.backgroundColor = 'transparent';
    });
  });
  
  // Hide cursor when leaving window
  document.addEventListener('mouseout', (e) => {
    if (e.relatedTarget === null) {
      cursor.style.opacity = '0';
      cursorFollower.style.opacity = '0';
    }
  });
  
  document.addEventListener('mouseover', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
  });
}

// Scroll effects
function initScrollEffects() {
  const header = document.querySelector('header');
  
  // Change header style on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Trigger scroll once to set initial state
  window.dispatchEvent(new Event('scroll'));
}

// Mobile menu toggle
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (!menuToggle || !mainNav) return;
  
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    
    if (mainNav.classList.contains('active')) {
      // Add mobile menu styles dynamically
      mainNav.style.display = 'block';
      mainNav.style.position = 'absolute';
      mainNav.style.top = '100%';
      mainNav.style.left = '0';
      mainNav.style.width = '100%';
      mainNav.style.backgroundColor = 'var(--color-background)';
      mainNav.style.padding = '2rem';
      mainNav.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
      
      // Style the nav links for mobile
      const navLinks = mainNav.querySelector('ul');
      navLinks.style.flexDirection = 'column';
      navLinks.style.alignItems = 'center';
    } else {
      // Reset styles when menu is closed
      mainNav.style = '';
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('active') && 
        !mainNav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      mainNav.style = '';
    }
  });
}

// FAQ accordion functionality
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (faqItems.length === 0) return;
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', () => {
        // Toggle active class on the clicked item
        item.classList.toggle('active');
        
        // Update icon
        const icon = question.querySelector('i');
        if (icon) {
          if (item.classList.contains('active')) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
          } else {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
          }
        }
      });
    }
  });
}

// Form validation
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          showError(field, 'This field is required');
        } else {
          removeError(field);
          
          // Email validation
          if (field.type === 'email' && !isValidEmail(field.value)) {
            isValid = false;
            showError(field, 'Please enter a valid email address');
          }
        }
      });
      
      if (isValid) {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Form submitted successfully! I will get back to you soon.';
        successMessage.style.padding = '1.5rem';
        successMessage.style.marginTop = '2rem';
        successMessage.style.backgroundColor = 'rgba(0, 200, 0, 0.1)';
        successMessage.style.color = '#006600';
        successMessage.style.borderRadius = 'var(--border-radius)';
        successMessage.style.textAlign = 'center';
        
        form.appendChild(successMessage);
        
        // Reset form
        form.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  });
  
  function showError(field, message) {
    // Remove any existing error
    removeError(field);
    
    // Create error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.style.color = '#ff3c00';
    errorMessage.style.fontSize = '1.4rem';
    errorMessage.style.marginTop = '0.5rem';
    
    // Add error styling to field
    field.style.borderColor = '#ff3c00';
    field.style.backgroundColor = 'rgba(255, 60, 0, 0.05)';
    
    // Insert error message after the field
    field.parentNode.appendChild(errorMessage);
  }
  
  function removeError(field) {
    // Remove error styling
    field.style.borderColor = '';
    field.style.backgroundColor = '';
    
    // Remove error message if it exists
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }
  
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

// Project filters functionality
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-card');
  
  if (filterButtons.length === 0 || projectItems.length === 0) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get filter value
      const filter = button.getAttribute('data-filter');
      
      // Filter projects
      projectItems.forEach(item => {
        const categories = item.getAttribute('data-category');
        
        if (filter === 'all' || (categories && categories.includes(filter))) {
          item.style.display = 'block';
          
          // Add animation
          item.style.animation = 'fadeIn 0.5s forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Add fadeIn animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}