document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('solar-skin-form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = document.getElementById('submit-button');
            const successEl = document.getElementById('form-success');
            const errorEl = document.getElementById('form-error');

            // Reset messages
            successEl.style.display = 'none';
            errorEl.style.display = 'none';

            // Préparation des données
            const formData = new FormData(form);
            const data = {
                nom:     formData.get('nom'),
                prenom:  formData.get('prenom'),
                email:   formData.get('email'),
                statut:  formData.get('statut'),
                message: formData.get('message')
            };

            // Animation du bouton
            btn.innerText = "Envoi en cours...";
            btn.disabled = true;

            try {
                const response = await fetch('https://hook.eu1.make.com/8dm13k5lutop1q3abuj1s121avbrmvi8', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    // Masquer le formulaire et afficher le message de succès
                    form.style.opacity = "0.5";
                    form.style.pointerEvents = "none";
                    document.getElementById('form-success').style.display = 'block';
                    document.getElementById('form-error').style.display = 'none';
                    form.reset();
                    
                    // Optionnel : Rediriger vers le PDF après 3 secondes
                    // setTimeout(() => { window.location.href = "URL_DE_TON_GUIDE.pdf"; }, 3000);
                } else {
                    throw new Error();
                }
            } catch (error) {
                document.getElementById('form-error').style.display = 'block';
            } finally {
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }
});