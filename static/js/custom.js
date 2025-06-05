// custom.js - Versión optimizada y completa

/**
 * Inicializa el menú hamburguesa para dispositivos móviles
 */
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        // Toggle del menú al hacer clic en el hamburguesa
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link, .nav-button').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }
}

/**
 * Configura el scroll suave para los enlaces internos
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Maneja la funcionalidad de los tabs
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    // Activar primer tab si no hay activo
    if (!document.querySelector('.tab-pane.active') && tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
        const firstTabId = tabButtons[0].getAttribute('data-tab');
        document.getElementById(firstTabId)?.classList.add('active');
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Agregar clase active
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId)?.classList.add('active');

            // Scroll en móviles
            if (window.innerWidth < 992) {
                setTimeout(() => {
                    document.getElementById(tabId)?.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 100);
            }
        });
    });
}

/**
 * Valida y maneja el formulario de contacto
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            sendWhatsAppMessage();
            showPaymentInfo();
            form.reset();
        }
    });

    // Validación en tiempo real
    form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', function() {
            const errorElement = this.nextElementSibling;
            if (errorElement) errorElement.textContent = '';
        });
    });

    // Función de validación
    function validateForm() {
        let isValid = true;
        const inputs = form.querySelectorAll('input, select');

        inputs.forEach(input => {
            const errorElement = input.nextElementSibling;
            if (input.required && !input.value) {
                errorElement.textContent = 'Este campo es obligatorio';
                isValid = false;
            } else if (input.pattern && !new RegExp(input.pattern).test(input.value)) {
                errorElement.textContent = 'Formato incorrecto';
                isValid = false;
            } else if (input.id === 'fechaNacimiento' && new Date(input.value) > new Date()) {
                errorElement.textContent = 'Fecha no válida';
                isValid = false;
            } else {
                errorElement.textContent = '';
            }
        });
        return isValid;
    }

    // Enviar mensaje por WhatsApp
    function sendWhatsAppMessage() {
        const nombre = encodeURIComponent(document.getElementById('nombreApellido').value);
        const dni = encodeURIComponent(document.getElementById('dni').value);
        const celular = encodeURIComponent(document.getElementById('celular').value);
        const fechaNacimiento = encodeURIComponent(document.getElementById('fechaNacimiento').value);
        const genero = encodeURIComponent(document.getElementById('genero').value);
        const plan = encodeURIComponent(document.getElementById('plan-interes')?.value || 'No especificado');

        const mpAlias = "SEBABODYSTRONG";
        const mpCVU = "0000000000000000000000";
        const mpTitular = "ALFREDO SEBASTIAN GOMEZ";

        const mensaje = `¡Hola! Gracias por inscribirte en *Body Strong* 🏋️‍♂️%0A%0A` +
            `*📝 Datos de la inscripción:*%0A` +
            `▸ Nombre: ${nombre}%0A` +
            `▸ DNI: ${dni}%0A` +
            `▸ Celular: ${celular}%0A` +
            `▸ Fecha Nac.: ${fechaNacimiento}%0A` +
            `▸ Género: ${genero}%0A` +
            `▸ Plan elegido: ${plan}%0A%0A` +
            `*💳 Datos para el pago por MercadoPago:*%0A` +
            `▸ Alias: *${mpAlias}*%0A` +
            `▸ CVU: *${mpCVU}*%0A` +
            `▸ Titular: *${mpTitular}*%0A%0A` +
            `*📌 Instrucciones:*%0A` +
            `1. Realiza la transferencia por el monto correspondiente a tu plan%0A` +
            `2. Envíame el comprobante por este mismo chat%0A` +
            `3. Recibirás la confirmación de tu inscripción%0A%0A` +
            `*Fecha de solicitud:* ${new Date().toLocaleString()}%0A%0A` +
            `¡Nos vemos en el gimnasio! 💪`;

        const whatsappNumber = '5491152628424';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${mensaje}`;
        window.open(whatsappUrl, '_blank');
    }

    // Mostrar información de pago
    function showPaymentInfo() {
        const mpAlias = "SEBABODYSTRONG";
        const mpCVU = "0000000000000000000000";
        const mpTitular = "ALFREDO SEBASTIAN GOMEZ";
        const plan = document.getElementById('plan-interes')?.value || 'No especificado';

        let confirmation = document.getElementById('payment-confirmation');
        if (!confirmation) {
            confirmation = document.createElement('div');
            confirmation.id = 'payment-confirmation';
            confirmation.className = 'payment-confirmation';
            confirmation.innerHTML = `
                <h4><i class="fas fa-check-circle"></i> ¡Inscripción enviada!</h4>
                <p>Por favor realiza el pago con estos datos:</p>
                <div class="payment-details">
                    <p><strong>Alias:</strong> ${mpAlias}</p>
                    <p><strong>CVU:</strong> ${mpCVU}</p>
                    <p><strong>Titular:</strong> ${mpTitular}</p>
                    <p><strong>Plan:</strong> ${plan}</p>
                </div>
                <p>Envía el comprobante por WhatsApp para activar tu membresía.</p>
            `;
            form.parentNode.insertBefore(confirmation, form.nextSibling);
        }

        confirmation.style.display = 'block';
        form.style.display = 'none';
    }
}

/**
 * Inicializa efectos hover para dispositivos táctiles
 */
function initTouchHover() {
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('touchstart', () => link.classList.add('hover-effect'));
        link.addEventListener('touchend', () => {
            setTimeout(() => link.classList.remove('hover-effect'), 150);
        });
    });
}

/**
 * Ajustes iniciales al cargar la página
 */
function initPageSetup() {
    // Ajustar altura del banner en móviles
    if (window.innerWidth < 768) {
        const banner = document.querySelector('.main-banner');
        if (banner) banner.style.minHeight = 'calc(100vh - 80px)';
    }

    // Año dinámico en el footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/**
 * Preloader de la página
 */
function initPreloader() {
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 1000);
    });
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initHamburgerMenu();
    initSmoothScroll();
    initTabs();
    initContactForm();
    initTouchHover();
    initPageSetup();
});

// Inicializar preloader
initPreloader();