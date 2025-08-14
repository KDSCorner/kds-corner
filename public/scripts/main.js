// Main JavaScript functionality
window.PortfolioApp = window.PortfolioApp || class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.handleLoading();
    this.initNavigation();
    this.initPortfolioFilter();
    this.initContactForm();
    this.initScrollEffects();
    this.initSmoothScroll();
    this.initHeroTypewriter();
  }

  // Loading screen handler
  handleLoading() {
    window.addEventListener("load", () => {
      const loadingScreen = document.getElementById("loading-screen");
      setTimeout(() => {
        loadingScreen.style.opacity = "0";
        loadingScreen.style.visibility = "hidden";
        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }, 1000);
    });
  }

  // Navigation functionality
  initNavigation() {
    const navToggle = document.getElementById("nav-toggle");
    const navCenter = document.querySelector(".nav-center");
    const navLinks = document.querySelectorAll(".nav-link");
    const navbar = document.getElementById("navbar");
    let lastScrollY = window.scrollY;

    // Mobile menu toggle
    navToggle.addEventListener("click", () => {
      navCenter.classList.toggle("active");
      navToggle.classList.toggle("active");
    });

    // Close mobile menu when clicking on links
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const navCenter = document.querySelector(".nav-center");
        navCenter.classList.remove("active");
        navToggle.classList.remove("active");
      });
    });

    // Navbar scroll effect with hide/show functionality
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      // Background and shadow changes
      if (currentScrollY > 100) {
        navbar.style.background = "hsla(var(--surface) / 0.98)";
        navbar.style.boxShadow = "var(--shadow-md)";
      } else {
        navbar.style.background = "hsla(var(--surface) / 0.95)";
        navbar.style.boxShadow = "none";
      }

      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down - hide navbar
        navbar.classList.add("hidden");
        navbar.classList.remove("visible");
      } else {
        // Scrolling up - show navbar
        navbar.classList.remove("hidden");
        navbar.classList.add("visible");
      }

      lastScrollY = currentScrollY;
    });

    // Active navigation link
    this.updateActiveNavLink();
    window.addEventListener("scroll", () => this.updateActiveNavLink());
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Portfolio filter functionality
  initPortfolioFilter() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    // If no items exist, disable filters and exit safely
    if (!portfolioItems.length) {
      filterBtns.forEach((btn) => {
        btn.setAttribute("disabled", "true");
        btn.classList.remove("active");
      });
      return;
    }

    const showItem = (item) => {
      item.classList.remove("hidden");
      item.style.removeProperty("display"); // let grid handle it
      // Restart animation
      void item.offsetWidth;
      item.style.animation = "fadeIn 0.5s ease-in-out";
      item.style.opacity = "";
    };

    const hideItem = (item) => {
      item.classList.add("hidden");
      item.style.animation = "";
    };

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove("active"));
        // Add active class to clicked button (use currentTarget for safety)
        const clickedBtn = e.currentTarget || btn;
        clickedBtn.classList.add("active");

        // Normalize filter value; default to 'all' if missing
        let filterValue = (clickedBtn.getAttribute("data-filter") || "all").toLowerCase().trim();

        let visibleCount = 0;
        portfolioItems.forEach((item) => {
          // Support multiple categories separated by spaces/commas
          const raw = (item.getAttribute("data-category") || "").toLowerCase();
          const categories = raw.split(/[\s,]+/).filter(Boolean);

          if (filterValue === "all" || categories.includes(filterValue)) {
            showItem(item);
            visibleCount++;
          } else {
            hideItem(item);
          }
        });

        // Fallback: if nothing matches, show all and select 'all'
        if (visibleCount === 0) {
          portfolioItems.forEach((item) => showItem(item));
          const allBtn = Array.from(filterBtns).find((b) => b.getAttribute("data-filter") === "all");
          if (allBtn) {
            filterBtns.forEach((b) => b.classList.remove("active"));
            allBtn.classList.add("active");
          }
        }
      });
    });

    requestAnimationFrame(() => {
      portfolioItems.forEach((item) => {
        item.classList.remove("hidden");
        item.style.removeProperty("display");
        item.style.animation = "";
        item.style.opacity = "";
      });
      let allBtn = Array.from(filterBtns).find((b) => (b.getAttribute("data-filter") || "").toLowerCase() === "all");
      if (!allBtn && filterBtns.length) {
        allBtn = filterBtns[0];
      }
      if (allBtn) {
        filterBtns.forEach((b) => b.classList.remove("active"));
        allBtn.classList.add("active");
        allBtn.dispatchEvent(new Event("click", { bubbles: true }));
      }
    });
  }

  initContactForm() {
    const form = document.getElementById("contact-form");
    const submitBtn = form.querySelector(".form-submit");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");
    const successMessage = document.getElementById("form-success");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Clear previous errors
      this.clearFormErrors();

      // Validate form
      if (!this.validateForm(form)) {
        return;
      }

      // Show loading state
      btnText.style.display = "none";
      btnLoading.style.display = "inline-flex";
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual API call)
      try {
        await this.submitForm(new FormData(form));

        // Show success message
        successMessage.style.display = "flex";
        form.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 5000);
      } catch (error) {
        console.error("Form submission error:", error);
        alert("There was an error sending your message. Please try again.");
      } finally {
        // Reset button state
        btnText.style.display = "inline";
        btnLoading.style.display = "none";
        submitBtn.disabled = false;
      }
    });
  }

  validateForm(form) {
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const subject = form.querySelector("#subject");
    const message = form.querySelector("#message");

    let isValid = true;

    // Name validation
    if (!name.value.trim()) {
      this.showFieldError("name", "Name is required");
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      this.showFieldError("email", "Email is required");
      isValid = false;
    } else if (!emailRegex.test(email.value)) {
      this.showFieldError("email", "Please enter a valid email address");
      isValid = false;
    }

    // Subject validation
    if (!subject.value.trim()) {
      this.showFieldError("subject", "Subject is required");
      isValid = false;
    }

    // Message validation
    if (!message.value.trim()) {
      this.showFieldError("message", "Message is required");
      isValid = false;
    } else if (message.value.trim().length < 10) {
      this.showFieldError(
        "message",
        "Message must be at least 10 characters long"
      );
      isValid = false;
    }

    return isValid;
  }

  showFieldError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const field = document.getElementById(fieldName);

    errorElement.textContent = message;
    field.style.borderColor = "hsl(var(--accent))";
  }

  clearFormErrors() {
    const errorElements = document.querySelectorAll(".form-error");
    const fields = document.querySelectorAll(
      ".form-group input, .form-group textarea"
    );

    errorElements.forEach((error) => (error.textContent = ""));
    fields.forEach((field) => (field.style.borderColor = "hsl(var(--border))"));
  }

  async submitForm(formData) {
    // Simulate API call - replace with actual endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Form data:", Object.fromEntries(formData));
        resolve({ success: true });
      }, 2000);
    });
  }

  // Scroll effects
  initScrollEffects() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
      ".service-card, .portfolio-item, .about-content > *, .contact-content > *"
    );

    animatedElements.forEach((el) => observer.observe(el));

    // Counter animation for stats
    this.animateCounters();
  }

  animateCounters() {
    const counters = document.querySelectorAll(".stat-number");
    const observerOptions = {
      threshold: 0.5,
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.textContent.replace(/\D/g, ""));
          const increment = target / 50;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = counter.textContent.replace(/\d+/, target);
              clearInterval(timer);
            } else {
              counter.textContent = counter.textContent.replace(
                /\d+/,
                Math.floor(current)
              );
            }
          }, 40);

          counterObserver.unobserve(counter);
        }
      });
    }, observerOptions);

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  // Smooth scroll functionality (disabled to allow hash routing)
  initSmoothScroll() {
    // Let browser handle hash navigation naturally
    // CSS scroll-behavior: smooth will handle smooth scrolling
    
    // Only handle non-hash links if needed
    // const links = document.querySelectorAll('a[href^="#"]');
    // ... smooth scroll code disabled ...

    // Scroll to top functionality
    this.initScrollToTop();
  }

  initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement("button");
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = "scroll-to-top";
    scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: var(--transition-normal);
            z-index: 1000;
            box-shadow: var(--shadow-lg);
        `;

    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        scrollBtn.style.opacity = "1";
        scrollBtn.style.visibility = "visible";
      } else {
        scrollBtn.style.opacity = "0";
        scrollBtn.style.visibility = "hidden";
      }
    });

    // Scroll to top on click
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Hover effect
    scrollBtn.addEventListener("mouseenter", () => {
      scrollBtn.style.transform = "translateY(-2px) scale(1.1)";
    });

    scrollBtn.addEventListener("mouseleave", () => {
      scrollBtn.style.transform = "translateY(0) scale(1)";
    });
  }

  // Hero typewriter animation
  initHeroTypewriter() {
    const greetingElement = document.getElementById("greeting");
    const nameElement = document.getElementById("heroName");
    const roleElement = document.getElementById("heroRole");

    if (!greetingElement || !nameElement || !roleElement) return;

    // Prevent multiple animations running
    if (window.__typewriterRunning) {
      return;
    }
    window.__typewriterRunning = true;

    // Get original text first time or from data attributes
    let greetingText = greetingElement.getAttribute('data-text');
    let nameText = nameElement.getAttribute('data-text'); 
    let roleText = roleElement.getAttribute('data-text');

    // If no data-text exists, get from current content and store it
    if (!greetingText) {
      greetingText = greetingElement.textContent.trim() || 'Selamat Datang di';
      greetingElement.setAttribute('data-text', greetingText);
    }
    if (!nameText) {
      nameText = nameElement.textContent.trim() || 'KDS Corner';
      nameElement.setAttribute('data-text', nameText);
    }
    if (!roleText) {
      roleText = roleElement.textContent.trim() || 'Your Creative Digital Solutions Partner';
      roleElement.setAttribute('data-text', roleText);
    }

    // Reset any existing animation state
    this.resetTypewriterAnimation(greetingElement, nameElement, roleElement);

    // Clear current animation timers if any exist
    if (window.__typewriterTimers) {
      window.__typewriterTimers.forEach(timer => clearInterval(timer));
    }
    window.__typewriterTimers = [];

    // Prepare elements for animation
    greetingElement.textContent = "";
    nameElement.textContent = "";
    roleElement.textContent = "";
    nameElement.style.opacity = "0";
    roleElement.style.opacity = "0";
    greetingElement.classList.remove("finished");

    // Typewriter function with cleanup
    const typeText = (element, text, speed = 100) => {
      return new Promise((resolve) => {
        let i = 0;
        const timer = setInterval(() => {
          element.textContent += text.charAt(i);
          i++;
          if (i >= text.length) {
            clearInterval(timer);
            // Remove timer from tracking array
            const index = window.__typewriterTimers.indexOf(timer);
            if (index > -1) {
              window.__typewriterTimers.splice(index, 1);
            }
            resolve();
          }
        }, speed);
        // Track timer for cleanup
        window.__typewriterTimers.push(timer);
      });
    };

    // Fade in function
    const fadeInElement = (element) => {
      return new Promise((resolve) => {
        element.style.opacity = "1";
        element.style.transition = "opacity 0.5s ease-in-out";
        setTimeout(resolve, 500);
      });
    };

    // Start animation sequence with shorter delay
    setTimeout(async () => {
      try {
        // Check if elements still exist (user might have navigated away)
        if (!document.contains(greetingElement)) return;

        // Type greeting
        await typeText(greetingElement, greetingText, 80);
        greetingElement.classList.add("finished");

        // Wait a bit, then show name
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (!document.contains(nameElement)) return;
        
        await fadeInElement(nameElement);
        await typeText(nameElement, nameText, 60);

        // Wait a bit, then show role
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (!document.contains(roleElement)) return;
        
        await fadeInElement(roleElement);
        await typeText(roleElement, roleText, 50);
        
        // Mark animation as completed
        window.__typewriterRunning = false;
      } catch (error) {
        console.log('Typewriter animation interrupted:', error);
        // Reset flag on error
        window.__typewriterRunning = false;
      }
    }, 500); // Reduced delay for faster page transitions
  }

  // Reset typewriter animation state
  resetTypewriterAnimation(greetingElement, nameElement, roleElement) {
    // Clear any existing timers
    if (window.__typewriterTimers) {
      window.__typewriterTimers.forEach(timer => clearInterval(timer));
      window.__typewriterTimers = [];
    }

    // Reset element states
    if (greetingElement) {
      greetingElement.classList.remove("finished");
      greetingElement.style.removeProperty('transition');
    }
    
    if (nameElement) {
      nameElement.style.opacity = "0";
      nameElement.style.removeProperty('transition');
    }
    
    if (roleElement) {
      roleElement.style.opacity = "0";
      roleElement.style.removeProperty('transition');
    }
  }
}

// Utility functions
class Utils {
  static debounce(func, wait) {
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

  static throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  static isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

// Initialize the application (works even if DOMContentLoaded already fired)
(function initWhenReady() {
  const init = () => {
    if (!window.__portfolioAppInstance) {
      window.__portfolioAppInstance = new window.PortfolioApp();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// Handle window focus event to restart animation
window.addEventListener('focus', () => {
  // Reset flag and restart animation when window regains focus
  window.__typewriterRunning = false;
  if (window.__portfolioAppInstance && document.getElementById("greeting")) {
    setTimeout(() => {
      window.__portfolioAppInstance.initHeroTypewriter();
    }, 200);
  }
});

// Handle pageshow event for back/forward navigation
window.addEventListener('pageshow', (event) => {
  // Reset flag and restart animation when page is shown
  window.__typewriterRunning = false;
  if (window.__portfolioAppInstance && document.getElementById("greeting")) {
    setTimeout(() => {
      window.__portfolioAppInstance.initHeroTypewriter();
    }, event.persisted ? 300 : 100); // Longer delay if from cache
  }
});

// Handle page visibility changes and restart animation when returning to page
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.title = "Come back! - KDS Corner";
  } else {
    document.title = "KDS Corner - Your Creative Digital Solutions Partner";
    // Reset flag and restart typewriter animation when user returns to page
    window.__typewriterRunning = false;
    if (window.__portfolioAppInstance && document.getElementById("greeting")) {
      setTimeout(() => {
        window.__portfolioAppInstance.initHeroTypewriter();
      }, 100);
    }
  }
});

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  // ESC key closes mobile menu
  if (e.key === "Escape") {
    const navCenter = document.querySelector(".nav-center");
    const navToggle = document.getElementById("nav-toggle");
    navCenter.classList.remove("active");
    navToggle.classList.remove("active");
  }
});

// Performance optimization - lazy load images if any were added
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Export for potential module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PortfolioApp, Utils };
}
