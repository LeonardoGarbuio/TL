  // Aguardar o carregamento completo do DOM
  document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const menuBtn = document.getElementById('menuBtn');
    const mainNav = document.getElementById('mainNav');
    const heroContent = document.getElementById('heroContent');
    const sections = document.querySelectorAll('section');
    const backToTop = document.getElementById('backToTop');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const photoCards = document.querySelectorAll('.photo-card');
    const testimonialSlider = document.getElementById('testimonialSlider');
    const sliderDots = document.querySelectorAll('.slider-dot');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const modal = document.getElementById('productModal');
    const closeModal = document.getElementById('closeModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const buyButton = document.getElementById('buyButton');
    const cartButton = document.getElementById('cartButton');
    const submitButton = document.getElementById('submitButton');
    
    // Animação inicial para o conteúdo do hero
    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 500);
    
    // Toggle menu mobile
    menuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
    
    // Rolar suavemente para as seções ao clicar nos links do menu
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const offsetTop = targetSection.offsetTop;
            
            window.scrollTo({
                top: offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Fechar menu mobile após clicar em um link
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });
    
    // Animação de scroll para as seções
    function checkSections() {
        const triggerBottom = window.innerHeight * 0.8;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('section-visible');
            }
        });
    }
    
    // Botão voltar para o topo
    function checkScrollPosition() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Filtrar produtos por categoria
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover a classe active de todos os botões
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Adicionar a classe active ao botão clicado
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filtrar os produtos
            photoCards.forEach(card => {
                if (category === 'todos' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    // Adicionar animação para entrada dos cards
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                }
            });
        });
    });
    
    // Slider de depoimentos
    let currentSlide = 0;
    const slideInterval = 5000;
    let slideTimer;
    
    function showSlide(index) {
        // Esconder todos os slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Desativar todos os dots
        sliderDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar o slide atual
        testimonialSlides[index].classList.add('active');
        sliderDots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    // Iniciar o timer para o slider automático
    function startSlideTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, slideInterval);
    }
    
    // Configurar os dots para navegação manual
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            startSlideTimer();
        });
    });
    
    // Abrir modal ao clicar nos produtos
    photoCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img').src;
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            const price = this.querySelector('.price').textContent;
            
            modalImage.src = img;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalPrice.textContent = price;
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Animar a entrada do modal
            setTimeout(() => {
                modal.querySelector('.modal-content').style.opacity = '1';
                modal.querySelector('.modal-content').style.transform = 'translateY(0)';
            }, 10);
        });
    });
    
    // Fechar modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Fechar modal clicando fora do conteúdo
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Botões do modal
    buyButton.addEventListener('click', function() {
        alert('Redirecionando para o checkout...');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    cartButton.addEventListener('click', function() {
        alert('Produto adicionado ao carrinho!');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Simulação de envio do formulário
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name === '' || email === '' || message === '') {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Simulando o envio
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('subject').value = '';
            document.getElementById('message').value = '';
            
            submitButton.innerHTML = 'Enviar Mensagem';
            submitButton.disabled = false;
        }, 2000);
    });
    
    // Iniciar o slider de depoimentos
    startSlideTimer();
    
    // Verificar a posição inicial do scroll
    checkScrollPosition();
    checkSections();
    
    // Adicionar evento de scroll
    window.addEventListener('scroll', function() {
        checkScrollPosition();
        checkSections();
    });
    
    // Efeito de typing para o texto do hero
    function typeEffect(element, text, speed) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        setTimeout(() => {
            type();
        }, 1000);
    }
    
    // Adicionar animação aos elementos ao carregar a página
    function animateOnLoad() {
        document.querySelector('.logo').classList.add('fade-in');
        document.querySelector('.slogan').classList.add('slide-up');
        
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach((link, index) => {
            setTimeout(() => {
                link.classList.add('fade-in');
            }, 200 * index);
        });
    }
    
    // Executar animações ao carregar
    animateOnLoad();
    
    // Efeito hover nos cards de recurso
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.feature-icon').style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.feature-icon').style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Animação para o formulário de contato
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.form-group').classList.add('active');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.closest('.form-group').classList.remove('active');
            }
        });
    });
});