document.addEventListener('DOMContentLoaded', () => {
    // 1. Gestion du formulaire du guide (Connexion réelle à Make/Airtable)
    const guideForm = document.getElementById('guide-form');
    
    if (guideForm) {
        guideForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Récupération des données
            const email = document.getElementById('email').value;
            const name = document.getElementById('name').value;
            const btn = guideForm.querySelector('button');
            const originalText = btn.innerHTML;

            // État visuel : Chargement
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            btn.disabled = true;

            // URL de ton Webhook Make
            const urlMake = "https://hook.eu1.make.com/8dm13k5lutop1q3abuj1s121avbrmvi8";

            // Envoi réel des données
            fetch(urlMake, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nom: name,
                    email: email,
                    projet: "SolarSkin"
                })
            })
            .then(response => {
                if (response.ok) {
                    alert(`Succès ! Merci ${name || 'cher utilisateur'} ! Vos données ont été enregistrées dans la base SolarSkin.`);
                    guideForm.reset();
                } else {
                    throw new Error('Erreur serveur');
                }
            })
            .catch(error => {
                console.error("Erreur :", error);
                alert("Oups, une erreur est survenue lors de l'envoi. Vérifie ta connexion.");
            })
            .finally(() => {
                // Remise à l'état initial du bouton
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
        });
    }

    // 2. Animation au défilement (Intersection Observer)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .persona-card, .hero-content, .hero-image, .cta-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        
        const style = document.createElement('style');
        style.innerHTML = `
            .visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
        observer.observe(el);
    });

    // 3. Effet de scroll sur le header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.style.padding = '12px 0';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '16px 0';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // 4. Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 5. Animation légère au survol des avatars
    const avatars = document.querySelectorAll('.avatar-img');
    avatars.forEach(avatar => {
        avatar.addEventListener('mouseover', () => {
            avatar.style.transform = 'scale(1.1) translateY(-5px)';
            avatar.style.zIndex = '10';
            avatar.style.transition = 'all 0.3s ease';
        });
        avatar.addEventListener('mouseout', () => {
            avatar.style.transform = 'scale(1) translateY(0)';
            avatar.style.zIndex = '1';
        });
    });
});