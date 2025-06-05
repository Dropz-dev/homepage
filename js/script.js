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

// Formular-Validierung unverändert
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
form.addEventListener('submit', e => {
  e.preventDefault(); feedback.textContent = '';
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  if (name.length < 2 || subject.length < 5 || message.length < 10) {
    feedback.textContent = 'Bitte fülle alle Felder korrekt aus.'; return;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) { feedback.textContent = 'Bitte gib eine gültige E-Mail-Adresse ein.'; return; }
  window.location.href = `mailto:praxis@beispiel.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: '+name+'\n\n'+message)}`;
});