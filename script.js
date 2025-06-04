// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const nav = document.querySelector(".nav")

mobileMenuBtn?.addEventListener("click", () => {
  nav.classList.toggle("active")
})

// Smooth Scrolling
function scrollToForm() {
  const formSection = document.getElementById("contato")
  formSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

// Form Handling
const contactForm = document.getElementById("contactForm")

contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const data = Object.fromEntries(formData)

  // Simulate form submission
  const submitBtn = contactForm.querySelector(".btn-submit")
  const originalText = submitBtn.innerHTML

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'
  submitBtn.disabled = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Success feedback
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado com sucesso!'
    submitBtn.style.background = "hsl(var(--chart-2))"

    // Reset form
    setTimeout(() => {
      contactForm.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
      submitBtn.style.background = ""

      // Show success message
      showNotification("Formulário enviado com sucesso! Entraremos em contato em breve.", "success")
    }, 2000)
  } catch (error) {
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
    showNotification("Erro ao enviar formulário. Tente novamente.", "error")
  }
})

// Chat Widget Functionality
const chatButton = document.getElementById("chatButton")
const chatWidget = document.getElementById("chatWidget")
const chatClose = document.getElementById("chatClose")
const chatInput = document.getElementById("chatInput")
const chatSend = document.getElementById("chatSend")
const chatMessages = document.getElementById("chatMessages")

// Chat responses
const chatResponses = [
  "Olá! Como posso te ajudar com nossos cursos de inglês?",
  "Temos turmas iniciando toda semana! Qual seu nível atual?",
  "Nosso método é focado na conversação desde o primeiro dia.",
  "Posso agendar uma aula experimental gratuita para você!",
  "Temos horários flexíveis, incluindo finais de semana.",
  "Nossos professores são nativos e certificados.",
  "Oferecemos certificação internacional reconhecida mundialmente.",
]

let chatOpen = false

chatButton?.addEventListener("click", () => {
  chatOpen = !chatOpen

  if (chatOpen) {
    chatWidget.classList.add("active")
    chatButton.style.display = "none"

    // Remove notification
    const notification = chatButton.querySelector(".chat-notification")
    if (notification) {
      notification.style.display = "none"
    }
  }
})

chatClose?.addEventListener("click", () => {
  chatOpen = false
  chatWidget.classList.remove("active")
  chatButton.style.display = "flex"
})

// Send message function
function sendMessage() {
  const message = chatInput.value.trim()
  if (!message) return

  // Add user message
  addMessage(message, "user")
  chatInput.value = ""

  // Simulate typing indicator
  setTimeout(() => {
    const randomResponse = chatResponses[Math.floor(Math.random() * chatResponses.length)]
    addMessage(randomResponse, "bot")
  }, 1000)
}

// Add message to chat
function addMessage(text, sender) {
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${sender}-message`

  const now = new Date()
  const time = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  messageDiv.innerHTML = `
        <div class="message-content">${text}</div>
        <div class="message-time">${time}</div>
    `

  chatMessages.appendChild(messageDiv)
  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatSend?.addEventListener("click", sendMessage)

chatInput?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage()
  }
})

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `

  // Add notification styles if not exists
  if (!document.querySelector(".notification-styles")) {
    const styles = document.createElement("style")
    styles.className = "notification-styles"
    styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: hsl(var(--background));
                border: 1px solid hsl(var(--border));
                border-radius: var(--radius);
                padding: 1rem;
                box-shadow: 0 10px 30px hsl(var(--foreground) / 0.1);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 1rem;
                max-width: 400px;
                animation: slideInRight 0.3s ease-out;
            }
            
            .notification-success {
                border-left: 4px solid hsl(var(--chart-2));
            }
            
            .notification-error {
                border-left: 4px solid hsl(var(--destructive));
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                flex: 1;
            }
            
            .notification-content i {
                color: hsl(var(--primary));
            }
            
            .notification-success .notification-content i {
                color: hsl(var(--chart-2));
            }
            
            .notification-error .notification-content i {
                color: hsl(var(--destructive));
            }
            
            .notification-close {
                background: none;
                border: none;
                color: hsl(var(--muted-foreground));
                cursor: pointer;
                padding: 0.25rem;
                border-radius: var(--radius);
                transition: background 0.3s ease;
            }
            
            .notification-close:hover {
                background: hsl(var(--muted));
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `
    document.head.appendChild(styles)
  }

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".benefit-card, .testimonial-card, .form-wrapper, .hero-text, .hero-image",
  )

  animateElements.forEach((el) => {
    observer.observe(el)
  })
})

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "hsl(var(--background) / 0.98)"
    header.style.backdropFilter = "blur(20px)"
  } else {
    header.style.background = "hsl(var(--background) / 0.95)"
    header.style.backdropFilter = "blur(10px)"
  }
})

// Form validation
function validateForm() {
  const inputs = contactForm.querySelectorAll("input[required], select[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.borderColor = "hsl(var(--destructive))"
      isValid = false
    } else {
      input.style.borderColor = "hsl(var(--border))"
    }
  })

  return isValid
}

// Phone mask
const phoneInput = document.getElementById("phone")
phoneInput?.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "")
  value = value.replace(/(\d{2})(\d)/, "($1) $2")
  value = value.replace(/(\d{5})(\d)/, "$1-$2")
  e.target.value = value
})

// Initialize chat notification
setTimeout(() => {
  const notification = chatButton?.querySelector(".chat-notification")
  if (notification) {
    notification.style.animation = "pulse 2s infinite"
  }
}, 3000)

// Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}
