// ============================================
// DOM ELEMENTS
// ============================================
const header = document.getElementById("header")
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const mobileMenuClose = document.getElementById("mobileMenuClose")
const sliderTrack = document.getElementById("sliderTrack")
const sliderPrev = document.getElementById("sliderPrev")
const sliderNext = document.getElementById("sliderNext")
const sliderDotsContainer = document.getElementById("sliderDots")
const faqItems = document.querySelectorAll(".faq-item")
const currentYearEl = document.getElementById("currentYear")

// ============================================
// HEADER SCROLL EFFECT
// ============================================
let lastScrollY = window.scrollY

function handleHeaderScroll() {
  if (!header) return
  const currentScrollY = window.scrollY

  if (currentScrollY > 20) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  lastScrollY = currentScrollY
}

window.addEventListener("scroll", handleHeaderScroll)

// ============================================
// MOBILE MENU
// ============================================
let overlay = null

function openMobileMenu() {
  if (!mobileMenu) return
  mobileMenu.classList.add("open")
  document.body.style.overflow = "hidden"

  // Create overlay
  overlay = document.createElement("div")
  overlay.className = "mobile-overlay open"
  overlay.addEventListener("click", closeMobileMenu)
  document.body.appendChild(overlay)
}

function closeMobileMenu() {
  if (!mobileMenu) return
  mobileMenu.classList.remove("open")
  document.body.style.overflow = ""

  if (overlay) {
    overlay.remove()
    overlay = null
  }
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", openMobileMenu)
}

if (mobileMenuClose) {
  mobileMenuClose.addEventListener("click", closeMobileMenu)
}

// Close menu on link click
if (mobileMenu) {
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })
}

// ============================================
// HIGHLIGHTS SLIDER
// ============================================
if (sliderTrack && sliderDotsContainer && sliderPrev && sliderNext) {
  const slides = sliderTrack.querySelectorAll(".slide")
  const totalSlides = slides.length
  let currentSlide = 0
  let isAutoPlaying = true
  let autoPlayInterval = null

  // Create dots
  function createDots() {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("button")
      dot.className = `slider-dot ${i === 0 ? "active" : ""}`
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`)
      dot.addEventListener("click", () => goToSlide(i))
      sliderDotsContainer.appendChild(dot)
    }
  }

  function updateDots() {
    const dots = sliderDotsContainer.querySelectorAll(".slider-dot")
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide)
    })
  }

  function goToSlide(index) {
    currentSlide = index
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`
    updateDots()
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides
    goToSlide(currentSlide)
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
    goToSlide(currentSlide)
  }

  function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval)
    autoPlayInterval = setInterval(() => {
      if (isAutoPlaying) nextSlide()
    }, 5000)
  }

  function stopAutoPlay() {
    isAutoPlaying = false
  }

  function resumeAutoPlay() {
    isAutoPlaying = true
  }

  // Initialize slider
  createDots()
  startAutoPlay()

  sliderPrev.addEventListener("click", prevSlide)
  sliderNext.addEventListener("click", nextSlide)

  // Pause on hover
  const sliderContainer = document.querySelector(".slider")
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", stopAutoPlay)
    sliderContainer.addEventListener("mouseleave", resumeAutoPlay)
  }

  // Touch support
  let touchStartX = 0
  let touchEndX = 0

  sliderTrack.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX
    },
    { passive: true },
  )

  sliderTrack.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    },
    { passive: true },
  )

  function handleSwipe() {
    const swipeThreshold = 50
    const diff = touchStartX - touchEndX

    if (diff > swipeThreshold) {
      nextSlide()
    } else if (diff < -swipeThreshold) {
      prevSlide()
    }
  }
}

// ============================================
// FAQ ACCORDION
// ============================================
if (faqItems && faqItems.length > 0) {
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    const answer = item.querySelector(".faq-answer")

    if (question && answer) {
      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("open")

        // Close all other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("open")
            const otherAnswer = otherItem.querySelector(".faq-answer")
            const otherQuestion = otherItem.querySelector(".faq-question")
            if (otherAnswer) otherAnswer.style.maxHeight = "0"
            if (otherQuestion) otherQuestion.setAttribute("aria-expanded", "false")
          }
        })

        // Toggle current item
        if (isOpen) {
          item.classList.remove("open")
          answer.style.maxHeight = "0"
          question.setAttribute("aria-expanded", "false")
        } else {
          item.classList.add("open")
          answer.style.maxHeight = answer.scrollHeight + "px"
          question.setAttribute("aria-expanded", "true")
        }
      })
    }
  })
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
function handleReveal() {
  const reveals = document.querySelectorAll(".reveal")
  const windowHeight = window.innerHeight
  const revealPoint = 150

  reveals.forEach((reveal) => {
    const revealTop = reveal.getBoundingClientRect().top

    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add("active")
    }
  })
}

// Run immediately on DOM load to ensure content is visible
document.addEventListener("DOMContentLoaded", () => {
  // Make all reveal elements visible immediately
  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.add("active")
  })
  handleReveal()
})

window.addEventListener("scroll", handleReveal)
window.addEventListener("load", handleReveal)

// ============================================
// CURRENT YEAR
// ============================================
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear()
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#" && href.length > 1) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const headerOffset = 100
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }
  })
})

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    // Get submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    // Show loading state
    submitBtn.innerHTML = `
      <svg class="btn-icon spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      Sending...
    `
    submitBtn.disabled = true

    // Simulate API call
    setTimeout(() => {
      submitBtn.innerHTML = `
        <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Message Sent!
      `
      submitBtn.style.backgroundColor = "var(--success)"

      setTimeout(() => {
        submitBtn.innerHTML = originalText
        submitBtn.style.backgroundColor = ""
        submitBtn.disabled = false
        contactForm.reset()
      }, 2000)
    }, 1500)
  })
}

// ============================================
// ============================================

// Magnetic effect for buttons
document.querySelectorAll(".btn-primary, .btn-lg").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`
  })

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = ""
  })
})

// Ripple effect on cards
document.querySelectorAll(".feature-card, .pricing-card, .contact-info-card").forEach((card) => {
  card.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    ripple.classList.add("ripple")

    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = e.clientX - rect.left - size / 2 + "px"
    ripple.style.top = e.clientY - rect.top - size / 2 + "px"

    this.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  })
})

// Parallax effect for hero section
const hero = document.querySelector(".hero")
if (hero) {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroContent = hero.querySelector(".hero-content")
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`
      heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5
    }
  })
}

// Tilt effect for feature cards
document.querySelectorAll(".feature-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = ""
  })
})

// Stats counter animation
function animateValue(element, start, end, duration) {
  let startTimestamp = null
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp
    const progress = Math.min((timestamp - startTimestamp) / duration, 1)
    const value = Math.floor(progress * (end - start) + start)
    element.textContent = value + (element.dataset.suffix || "")
    if (progress < 1) {
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statValue = entry.target
        const endValue = Number.parseInt(statValue.textContent)
        if (!isNaN(endValue) && !statValue.dataset.animated) {
          statValue.dataset.animated = "true"
          if (statValue.textContent.includes("+")) {
            statValue.dataset.suffix = "+"
          } else if (statValue.textContent.includes("%")) {
            statValue.dataset.suffix = "%"
          }
          animateValue(statValue, 0, endValue, 2000)
        }
      }
    })
  },
  { threshold: 0.5 },
)

document.querySelectorAll(".stat-value").forEach((stat) => {
  statsObserver.observe(stat)
})

// Input focus effects
document.querySelectorAll(".form-input, .form-textarea, .form-select").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.classList.add("focused")
  })

  input.addEventListener("blur", function () {
    this.parentElement.classList.remove("focused")
  })
})

// Add CSS for ripple animation
const style = document.createElement("style")
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(0, 229, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .form-group.focused .form-label {
    color: var(--primary);
  }
  
  .form-group.focused .form-input,
  .form-group.focused .form-textarea,
  .form-group.focused .form-select {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 229, 255, 0.1);
  }
`
document.head.appendChild(style)
