// Smooth Scroll zum Kontaktbereich
document.getElementById('scrollToContact')
  .addEventListener('click', () => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }));

// Scroll-Spy: Aktiver Nav-Link basierend auf Scroll-Position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const isActive = this.classList.contains('active');
      
      // Close all other FAQ items
      faqQuestions.forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        this.classList.add('active');
        answer.classList.add('active');
      }
    });
  });
});

// Enhanced Contact Form Validation and Submission
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', e => {
  e.preventDefault(); 
  feedback.textContent = '';
  feedback.className = 'form-feedback';
  
  // Get form data
  const formData = new FormData(form);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const phone = formData.get('phone').trim();
  const partnerName = formData.get('partner-name').trim();
  const age = formData.get('age');
  const relationshipDuration = formData.get('relationship-duration').trim();
  const children = formData.get('children');
  const urgency = formData.get('urgency');
  const preferredTime = formData.get('preferred-time').trim();
  const subject = formData.get('subject').trim();
  const message = formData.get('message').trim();
  const privacy = formData.get('privacy');
  
  // Validation
  if (name.length < 2) {
    showFeedback('Bitte geben Sie einen gültigen Namen ein (mindestens 2 Zeichen).', 'error');
    return;
  }
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showFeedback('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
    return;
  }
  
  if (subject.length < 5) {
    showFeedback('Bitte geben Sie einen aussagekräftigen Betreff ein (mindestens 5 Zeichen).', 'error');
    return;
  }
  
  if (message.length < 10) {
    showFeedback('Bitte beschreiben Sie Ihr Anliegen ausführlicher (mindestens 10 Zeichen).', 'error');
    return;
  }
  
  if (!privacy) {
    showFeedback('Bitte stimmen Sie der Datenschutzerklärung zu.', 'error');
    return;
  }
  
  // Build email body with all information
  let emailBody = `Name: ${name}\nE-Mail: ${email}\n`;
  if (phone) emailBody += `Telefon: ${phone}\n`;
  if (partnerName) emailBody += `Partner/in: ${partnerName}\n`;
  if (age) emailBody += `Alter: ${age}\n`;
  if (relationshipDuration) emailBody += `Beziehungsdauer: ${relationshipDuration}\n`;
  if (children) emailBody += `Gemeinsame Kinder: ${children === 'yes' ? 'Ja' : 'Nein'}\n`;
  if (urgency) emailBody += `Dringlichkeit: ${urgency}\n`;
  if (preferredTime) emailBody += `Bevorzugte Terminzeiten: ${preferredTime}\n`;
  emailBody += `\nNachricht:\n${message}`;
  
  // Show success message
  showFeedback('Vielen Dank für Ihre Nachricht! Sie werden nun zu Ihrem E-Mail-Programm weitergeleitet.', 'success');
  
  // Open email client
  setTimeout(() => {
    window.location.href = `mailto:praxis@beziehungen-im-wandel.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  }, 2000);
});

function showFeedback(message, type) {
  feedback.textContent = message;
  feedback.classList.add(type);
  feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Impressum Modal Functionality
function showImpressum() {
  const impressum = document.getElementById('impressum');
  if (impressum) {
    impressum.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeImpressum() {
  const impressum = document.getElementById('impressum');
  if (impressum) {
    impressum.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// Add event listeners for impressum links
document.addEventListener('DOMContentLoaded', function() {
  const impressumLinks = document.querySelectorAll('a[href="#impressum"]');
  impressumLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      showImpressum();
    });
  });
  
  // Close impressum when clicking outside
  const impressum = document.getElementById('impressum');
  if (impressum) {
    impressum.addEventListener('click', function(e) {
      if (e.target === impressum) {
        closeImpressum();
      }
    });
  }
  
  // Close impressum with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeImpressum();
    }
  });
});

// Smooth scrolling for all anchor links
document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#impressum"])');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});