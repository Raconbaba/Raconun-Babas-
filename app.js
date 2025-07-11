document.addEventListener('DOMContentLoaded', () => {
    // Bouton "En savoir plus" de la page d'accueil
    const decouvrirButton = document.getElementById('decouvrirButton');
    if (decouvrirButton) {
        decouvrirButton.addEventListener('click', () => {
            // Défilement doux vers la section "Bienfaits de la Nature"
            document.getElementById('bienfaits-nature').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Fonctionnalité du Modal (Popup) pour les Recettes Saines
    const recipeModal = document.getElementById('recipe-modal');
    const closeButton = document.querySelector('.close-button');
    const recipeDetailButtons = document.querySelectorAll('.recipe-detail-button');
    const modalRecipeTitle = document.getElementById('modal-recipe-title');
    const modalRecipeDescription = document.getElementById('modal-recipe-description');
    const modalRecipeIngredients = document.getElementById('modal-recipe-ingredients');
    const modalRecipeInstructions = document.getElementById('modal-recipe-instructions');

    const recipes = {
        'green-smoothie': {
            title: 'Smoothie Vert',
            description: 'Un excellent départ pour faire le plein d\'énergie le matin.',
            ingredients: [
                '1 poignée d\'épinards',
                '1 banane',
                '1 pomme (pelée, épépinée)',
                'Jus d\'un demi-citron',
                '1/2 tasse d\'eau ou de lait végétal',
                'Optionnel : quelques feuilles de menthe'
            ],
            instructions: 'Mélangez tous les ingrédients dans un mixeur jusqu\'à obtenir une consistance lisse et consommez immédiatement.'
        },
        'lentil-soup': {
            title: 'Soupe aux Lentilles',
            description: 'Un classique incontournable des journées froides, à la fois nourrissante et réconfortante.',
            ingredients: [
                '1 tasse de lentilles corail',
                '1 oignon (haché)',
                '1 carotte (hachée)',
                '1 pomme de terre (hachée)',
                '6 tasses d\'eau chaude ou de bouillon de légumes',
                'Sel, poivre, menthe, piment rouge (optionnel)',
                'Huile d\'olive'
            ],
            instructions: 'Rincez les lentilles. Dans une casserole, faites revenir l\'oignon dans l\'huile d\'olive. Ajoutez la carotte et la pomme de terre et faites revenir un peu plus. Ajoutez les lentilles et l\'eau, puis laissez bouillir. Une fois les légumes tendres, ajoutez les épices et mixez le tout au blender.'
        }
    };

    recipeDetailButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const recipeKey = event.target.dataset.recipe;
            const recipe = recipes[recipeKey];

            if (recipe) {
                modalRecipeTitle.textContent = recipe.title;
                modalRecipeDescription.textContent = recipe.description;
                
                // Lister les ingrédients
                modalRecipeIngredients.innerHTML = ''; // Nettoyer la liste précédente
                recipe.ingredients.forEach(ingredient => {
                    const li = document.createElement('li');
                    li.textContent = ingredient;
                    modalRecipeIngredients.appendChild(li);
                });

                modalRecipeInstructions.textContent = recipe.instructions;
                recipeModal.style.display = 'flex'; // Afficher le modal
            }
        });
    });

    closeButton.addEventListener('click', () => {
        recipeModal.style.display = 'none'; // Fermer le modal
    });

    // Fermer le modal si l'on clique en dehors
    window.addEventListener('click', (event) => {
        if (event.target === recipeModal) {
            recipeModal.style.display = 'none';
        }
    });

    // Défilement doux pour le menu de navigation
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Empêcher le comportement de lien par défaut
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
