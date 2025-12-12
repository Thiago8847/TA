// Menu fixo ao rolar
const header = document.getElementById('header');
const onScrollHeader = () => {
  if (window.scrollY > 8) header.classList.add('header--scrolled');
  else header.classList.remove('header--scrolled');
};
window.addEventListener('scroll', onScrollHeader);
onScrollHeader();

// Menu mobile
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('nav--open');
  hamburger.setAttribute('aria-expanded', nav.classList.contains('nav--open'));
});

// Fechar menu ao clicar link
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('nav--open'));
});

// Scroll suave (reforço além do CSS)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior:'smooth', block:'start' });
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      // Desanexar após aparecer para desempenho
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

// Slider de depoimentos (fade)
const slider = document.getElementById('slider');
const slides = Array.from(slider.querySelectorAll('.testimonial'));
let current = 0;

// Posição e visibilidade inicial
slides.forEach((slide, i) => {
    slide.style.opacity = i === 0 ? '1' : '0';
});

function showSlide(index) {
    slides[current].style.opacity = '0';
    current = (index + slides.length) % slides.length;
    slides[current].style.opacity = '1';
}

// Botões
document.getElementById('prev').addEventListener('click', () => showSlide(current - 1));
document.getElementById('next').addEventListener('click', () => showSlide(current + 1));

// Auto play
let auto = setInterval(() => showSlide(current + 1), 5000);
[prev, next, slider].forEach(el => {
  el.addEventListener('mouseenter', () => clearInterval(auto));
  el.addEventListener('mouseleave', () => auto = setInterval(() => showSlide(current + 1), 5000));
});

// Formulário (feedback simples no front)
const form = document.getElementById('formContato');
const statusEl = document.getElementById('formStatus');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const mensagem = form.mensagem.value.trim();

  if(!nome || !email || !mensagem){
    statusEl.textContent = 'Por favor, preencha todos os campos.';
    statusEl.style.color = '#ffdd99';
    return;
  }

  // Simulação de envio
  statusEl.textContent = 'Enviando...';
  statusEl.style.color = '#A9B7C6';

  setTimeout(() => {
    statusEl.textContent = 'Mensagem enviada! Entraremos em contato em breve.';
    statusEl.style.color = '#00C2A8';
    form.reset();
  }, 1200);
});
