// OJT Portfolio Script

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    this.classList.toggle("active");
  });

  // Close mobile menu when clicking links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Form submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Simulate sending
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = "#4CAF50";

        // Reset form
        this.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = "";
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(10, 10, 10, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
      navbar.classList.add("scrolled");
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.95)";
      navbar.style.boxShadow = "none";
      navbar.classList.remove("scrolled");
    }
  });

  // Set active nav link based on scroll
  const sections = document.querySelectorAll("section");

  function setActiveLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 150) {
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

  window.addEventListener("scroll", setActiveLink);

  // Add hover effects to cards
  const cards = document.querySelectorAll(
    ".skill-category, .stat-card, .internship-card, .output-card",
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (!card.classList.contains("scaled")) {
        card.style.transform = card.classList.contains("stat-card")
          ? "translateY(-3px)"
          : "translateY(-5px)";
        card.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
      }
    });

    card.addEventListener("mouseleave", () => {
      if (!card.classList.contains("scaled")) {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "none";
      }
    });
  });

  // Add typing effect to hero title
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    const words = originalText.split(" ");

    heroTitle.innerHTML = "";

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.style.opacity = "0";
      span.style.animation = `fadeIn 0.3s ${index * 0.1}s forwards`;

      if (word === "MARCOS") {
        const accentSpan = document.createElement("span");
        accentSpan.className = "accent";
        accentSpan.textContent = "MARCOS ";
        heroTitle.appendChild(accentSpan);
      } else {
        heroTitle.appendChild(span);
      }
    });
  }

  // Add CSS animation for typing effect
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }
    `;
  document.head.appendChild(style);

  // Profile image hover effect
  const profileImage = document.querySelector(".profile-image");
  if (profileImage) {
    profileImage.addEventListener("mouseenter", () => {
      profileImage.style.boxShadow = "0 0 40px rgba(107, 142, 35, 0.4)";
    });

    profileImage.addEventListener("mouseleave", () => {
      profileImage.style.boxShadow = "var(--shadow-lg)";
    });
  }

  // Skill tags hover effect
  const skillTags = document.querySelectorAll(
    ".skill-tag, .output-skills span",
  );

  skillTags.forEach((tag) => {
    tag.addEventListener("mouseenter", () => {
      tag.style.transform = "scale(1.05)";
      tag.style.boxShadow = "0 5px 15px rgba(107, 142, 35, 0.3)";
    });

    tag.addEventListener("mouseleave", () => {
      tag.style.transform = "scale(1)";
      tag.style.boxShadow = "none";
    });
  });

  // Social links hover effect
  const socialLinks = document.querySelectorAll(".social-link");

  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.style.transform = "translateX(5px)";
    });

    link.addEventListener("mouseleave", () => {
      link.style.transform = "translateX(0)";
    });
  });

  // Download resume tracking
  const downloadLinks = document.querySelectorAll('a[href$=".pdf"]');
  downloadLinks.forEach((link) => {
    link.addEventListener("click", function () {
      console.log("Resume download initiated: " + this.href);
      // You can add analytics tracking here
    });
  });

  // OJT cards animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
      }
    });
  }, observerOptions);

  // Observe cards for animation
  const animatedCards = document.querySelectorAll(
    ".skill-category, .stat-card, .internship-card, .output-card",
  );
  animatedCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.5s ease";
    observer.observe(card);
  });

  // Company logo animation
  const companyLogo = document.querySelector(".company-logo i");
  if (companyLogo) {
    setTimeout(() => {
      companyLogo.style.animation = "pulse 2s infinite";
    }, 1000);
  }

  // Form input focus effects
  const formInputs = document.querySelectorAll(
    ".contact-form input, .contact-form textarea",
  );

  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.style.transform = "translateY(-2px)";
    });

    input.addEventListener("blur", function () {
      this.parentElement.style.transform = "translateY(0)";
    });
  });

  // Initialize tooltips for skills tags
  skillTags.forEach((tag) => {
    tag.title = "Click to learn more about this skill";
  });

  // Add scroll to top button
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  scrollTopBtn.className = "scroll-top";
  document.body.appendChild(scrollTopBtn);

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollTopBtn.style.opacity = "1";
      scrollTopBtn.style.visibility = "visible";
    } else {
      scrollTopBtn.style.opacity = "0";
      scrollTopBtn.style.visibility = "hidden";
    }
  });

  // Add scroll top button styles
  const scrollStyle = document.createElement("style");
  scrollStyle.textContent = `
    .scroll-top {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 50px;
      height: 50px;
      background: var(--olive);
      color: var(--cream);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: var(--shadow-md);
      font-size: 1.2rem;
    }
    
    .scroll-top:hover {
      background: var(--olive-dark);
      transform: translateY(-3px);
    }
  `;
  document.head.appendChild(scrollStyle);

  // LinkedIn link confirmation
  const linkedinLinks = document.querySelectorAll('a[href*="linkedin"]');
  linkedinLinks.forEach((link) => {
    if (!link.hasAttribute("target")) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
});

// Initialize when page loads
window.addEventListener("load", function () {
  // Add loading animation
  const loadingElements = document.querySelectorAll(
    ".hero-title, .hero-subtitle, .profile-image",
  );

  loadingElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
  });

  // Check if images are loaded
  const images = document.querySelectorAll("img");
  let imagesLoaded = 0;

  images.forEach((img) => {
    if (img.complete) {
      imagesLoaded++;
    } else {
      img.addEventListener("load", () => {
        imagesLoaded++;
      });
    }
  });
});
