// Updated Portfolio Script with Enhanced Features

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
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.95)";
      navbar.style.boxShadow = "none";
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

  // Animate skill bars when in view
  const skillBars = document.querySelectorAll(".fill");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.style.width;
        }
      });
    },
    { threshold: 0.5 },
  );

  skillBars.forEach((bar) => observer.observe(bar));

  // Add hover effects to project cards
  const projectCards = document.querySelectorAll(
    ".project-card, .creative-card, .ojt-card",
  );

  projectCards.forEach((card) => {
    if (
      !card.classList.contains("featured") &&
      !card.classList.contains("ojt-card")
    ) {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px)";
        card.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "none";
      });
    }
  });

  // Add typing effect to hero title
  const heroTitle = document.querySelector(".hero-title");
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
    `;
  document.head.appendChild(style);

  // Add tool hover effect
  const toolItems = document.querySelectorAll(".tool-item");

  toolItems.forEach((tool) => {
    tool.addEventListener("mouseenter", () => {
      tool.style.transform = "translateY(-3px) scale(1.05)";
    });

    tool.addEventListener("mouseleave", () => {
      tool.style.transform = "translateY(0) scale(1)";
    });
  });

  // Highlight featured project on page load
  const featuredProject = document.querySelector(".project-card.featured");
  if (featuredProject) {
    setTimeout(() => {
      featuredProject.style.boxShadow = "0 0 30px rgba(107, 142, 35, 0.2)";
      featuredProject.style.borderColor = "var(--olive)";
    }, 1000);
  }

  // OJT card animation
  const ojtCard = document.querySelector(".ojt-card");
  if (ojtCard) {
    setTimeout(() => {
      ojtCard.style.transform = "translateY(0)";
      ojtCard.style.opacity = "1";
    }, 1200);
  }

  // Creative image hover effects
  const creativeImages = document.querySelectorAll(".creative-image");
  creativeImages.forEach((image) => {
    image.addEventListener("mouseenter", function () {
      this.style.borderColor = "var(--olive)";
    });

    image.addEventListener("mouseleave", function () {
      this.style.borderColor = "var(--gray)";
    });
  });

  // Fix for download button icon alignment
  const downloadButtons = document.querySelectorAll(
    ".btn-resume, .btn-resume-small, .btn-secondary",
  );
  downloadButtons.forEach((button) => {
    // Ensure icons are properly aligned
    const icon = button.querySelector("i");
    if (icon) {
      icon.style.display = "inline-flex";
      icon.style.alignItems = "center";
      icon.style.justifyContent = "center";
      icon.style.verticalAlign = "middle";
    }
  });
});
