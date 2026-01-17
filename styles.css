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
  mobileMenu.classList.add("open")
  document.body.style.overflow = "hidden"

  // Create overlay
  overlay = document.createElement("div")
  overlay.className = "mobile-overlay open"
  overlay.addEventListener("click", closeMobileMenu)
  document.body.appendChild(overlay)
}

function closeMobileMenu() {
  mobileMenu.classList.remove("open")
  document.body.style.overflow = ""

  if (overlay) {
    overlay.remove()
    overlay = null
  }
}

mobileMenuBtn.addEventListener("click", openMobileMenu)
mobileMenuClose.addEventListener("click", closeMobileMenu)

// Close menu on link click
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu)
})

// ============================================
// HIGHLIGHTS SLIDER
// ============================================
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
sliderContainer.addEventListener("mouseenter", stopAutoPlay)
sliderContainer.addEventListener("mouseleave", resumeAutoPlay)

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

// ============================================
// FAQ ACCORDION
// ============================================
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question")
  const answer = item.querySelector(".faq-answer")

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("open")

    // Close all other items
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("open")
        otherItem.querySelector(".faq-answer").style.maxHeight = "0"
        otherItem.querySelector(".faq-question").setAttribute("aria-expanded", "false")
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
})

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
// HIGHLIGHT ACTIVE NAV
// ============================================
function highlightActiveNav() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")

  let currentSection = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150
    const sectionHeight = section.offsetHeight

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })
}

window.addEventListener("scroll", highlightActiveNav)
window.addEventListener("load", highlightActiveNav)
