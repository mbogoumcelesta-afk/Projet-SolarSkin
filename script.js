document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('solar-skin-form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = document.getElementById('submit-button');
            const originalText = btn.innerText;
            
            // Préparation des données
            const formData = new FormData(form);
            const data = {
                nom: formData.get('nom'),
                prenom: formData.get('prenom'),
                email: formData.get('email'),
                statut: formData.get('statut'),
                message: formData.get('message')
            };

            // Animation du bouton
            btn.innerText = "Envoi en cours...";
            btn.disabled = true;

            try {
                // Envoi à ton Webhook Make
                const response = await fetch('https://hook.eu1.make.com/a9qql3mxwf3u6pdwiwzehj1mvn5a5fu5', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert("Super ! Tes données ont été envoyées à Airtable.");
                    form.reset();
                } else {
                    alert("Erreur lors de l'envoi.");
                }
            } catch (error) {
                console.error("Erreur:", error);
                alert("Impossible de se connecter au serveur.");
            } finally {
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }
});