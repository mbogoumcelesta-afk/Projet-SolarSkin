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
                    successEl.style.display = 'block';
                    form.reset();
                } else {
                    errorEl.style.display = 'block';
                }
            } catch (error) {
                console.error("Erreur:", error);
                errorEl.style.display = 'block';
            } finally {
                btn.innerText = "Envoyer les informations";
                btn.disabled = false;
            }
        });
    }
});