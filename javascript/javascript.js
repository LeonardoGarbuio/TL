document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target) && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link, .contact-button, .hero-buttons a, .products-cta a, .workshop-button, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to internal links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    mainNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    
                    // Smooth scroll to element
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    
                    document.querySelector(`.nav-link[href="${targetId}"]`)?.classList.add('active');
                }
            }
        });
    });
    
    // Scroll Animation - Fade In
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('appear');
            }
        });
    }
    
    // Check fade on initial load
    checkFade();
    
    // Check fade on scroll
    window.addEventListener('scroll', checkFade);
    
    // Sticky Header on Scroll
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    function stickyHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
            
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.classList.add('hide');
            } else {
                // Scrolling up
                header.classList.remove('hide');
            }
        } else {
            header.classList.remove('sticky');
            header.classList.remove('hide');
        }
        
        lastScrollTop = scrollTop;
    }
    
    window.addEventListener('scroll', stickyHeader);
    
    // Testimonials Slider
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    // Create more testimonials (for demo purposes)
    if (testimonialCards.length === 1) {
        // Clone the existing testimonial to create 2 more
        const testimonial2 = testimonialCards[0].cloneNode(true);
        const testimonial3 = testimonialCards[0].cloneNode(true);
        
        // Update content for second testimonial
        testimonial2.querySelector('.testimonial-text').textContent = 'Comprei um tapete para minha sala e fiquei impressionado com a qualidade e beleza da peça. O atendimento foi excelente, e a entrega ocorreu dentro do prazo. Certamente farei novas compras!';
        testimonial2.querySelector('.testimonial-author').textContent = 'Carlos Mendes';
        testimonial2.querySelector('.testimonial-position').textContent = 'Designer';
        
        // Update content for third testimonial
        testimonial3.querySelector('.testimonial-text').textContent = 'As oficinas da Artesania Crochê são maravilhosas! Aprendi técnicas que nunca imaginei que conseguiria dominar. Os instrutores são pacientes e muito talentosos. Recomendo a todos que desejam aprender esta bela arte.';
        testimonial3.querySelector('.testimonial-author').textContent = 'Mariana Lima';
        testimonial3.querySelector('.testimonial-position').textContent = 'Professora';
        
        // Add the new testimonials to the track
        testimonialsTrack.appendChild(testimonial2);
        testimonialsTrack.appendChild(testimonial3);
    }
    
    let currentSlide = 0;
    const slideWidth = 100; // 100%
    
    function goToSlide(index) {
        testimonialsTrack.style.transform = `translateX(-${index * slideWidth}%)`;
        currentSlide = index;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        goToSlide(currentSlide);
    });
    
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        goToSlide(currentSlide);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Auto slide testimonials
    let testimonialInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        goToSlide(currentSlide);
    }, 5000);
    
    // Pause auto slide on hover
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    testimonialsSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialsSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            goToSlide(currentSlide);
        }, 5000);
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Image Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img class="lightbox-image" src="" alt="Imagem ampliada">
            <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
            <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    
    let currentGalleryIndex = 0;
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            lightboxImage.src = imgSrc;
            currentGalleryIndex = index;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    lightboxPrev.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
        const imgSrc = galleryItems[currentGalleryIndex].querySelector('img').src;
        lightboxImage.src = imgSrc;
    });
    
    lightboxNext.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
        const imgSrc = galleryItems[currentGalleryIndex].querySelector('img').src;
        lightboxImage.src = imgSrc;
    });
    
    // Close lightbox on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Newsletter Form Validation
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterInput.value.trim();
            
            if (validateEmail(email)) {
                // Success - would normally submit to server
                newsletterInput.value = '';
                showNotification('Inscrição realizada com sucesso! Obrigado por se inscrever.', 'success');
            } else {
                showNotification('Por favor, informe um e-mail válido.', 'error');
            }
        });
    }
    
    // Contact Form Validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = contactForm.querySelector('[name="name"]').value.trim();
            const email = contactForm.querySelector('[name="email"]').value.trim();
            const message = contactForm.querySelector('[name="message"]').value.trim();
            const consent = contactForm.querySelector('[name="consent"]').checked;
            
            let isValid = true;
            
            if (name === '') {
                showNotification('Por favor, informe seu nome.', 'error');
                isValid = false;
            } else if (!validateEmail(email)) {
                showNotification('Por favor, informe um e-mail válido.', 'error');
                isValid = false;
            } else if (message === '') {
                showNotification('Por favor, escreva sua mensagem.', 'error');
                isValid = false;
            } else if (!consent) {
                showNotification('É necessário concordar com nossa política de privacidade.', 'error');
                isValid = false;
            }
            
            if (isValid) {
                // Success - would normally submit to server
                contactForm.reset();
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            }
        });
    }
    
    // Helper Functions
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
    
    function showNotification(message, type) {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        // Set content and style
        notification.textContent = message;
        notification.className = `notification ${type}`;
        
        // Show notification
        notification.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Product Filter (if needed for future expansion)
    const productFilterButtons = document.querySelectorAll('.product-filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (productFilterButtons.length > 0) {
        productFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');
                
                // Update active button
                productFilterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                
                // Filter products
                productCards.forEach(card => {
                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Add year to copyright
    const copyrightYear = document.querySelector('.copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
});