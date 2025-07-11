// --- Genel Bilgi Modalı (En savoir plus butonu için) ---
var infoModal = document.getElementById("info-modal"); // Bu ID'yi HTML'e ekleyeceğiz
var decouvrirButton = document.getElementById("decouvrirButton");
var closeInfoModalSpan = null; // Kapatma butonu modal açıldığında atanacak

// Bilgi modalını oluşturalım ve sayfaya ekleyelim (Bu kısmı HTML'e ekleyeceğiz!)
// Eğer bu modal her butona tıklandığında değişiyorsa, bu yapı mantıklı.
// Şimdilik varsayılan bir bilgi modalı içeriği tanımlayalım.
var infoModalContentHTML = `
    <div class="modal-content">
        <span class="close-button info-modal-close">&times;</span>
        <h2>Explore Nature's Benefits!</h2>
        <p>Living in harmony with nature offers profound advantages for our physical and mental health. From fresh air and natural foods to moments of calm and reflection, connecting with the natural world enriches our lives in countless ways.</p>
        <p>Discover how you can integrate more nature into your daily routine and experience a healthier, happier life.</p>
    </div>
`;


if (decouvrirButton) {
    decouvrirButton.onclick = function() {
        // Eğer infoModal henüz oluşturulmadıysa veya içeriği değişecekse
        if (!infoModal) {
            infoModal = document.createElement('div');
            infoModal.id = 'info-modal';
            infoModal.classList.add('modal');
            infoModal.innerHTML = infoModalContentHTML;
            document.body.appendChild(infoModal); // Body'ye ekle
            closeInfoModalSpan = infoModal.querySelector('.info-modal-close'); // Kapatma butonunu ata
            
            // Kapatma butonu olay dinleyicisini burada ekle
            if (closeInfoModalSpan) {
                closeInfoModalSpan.onclick = function() {
                    closeModal(infoModal);
                };
            }
        }
        openModal(infoModal);
    };
}


// --- Yemek Tarifi Modalı (Voir la Recette butonları için) ---
var recipeModal = document.getElementById("recipe-modal"); // HTML'de zaten var
var recipeButtons = document.querySelectorAll(".recipe-detail-button");
var closeRecipeModalSpan = recipeModal ? recipeModal.querySelector(".close-button") : null;

// Yemek tarifi verileri (Fransızca)
const recipes = {
    "green-smoothie": {
        title: "Smoothie Vert Énergisant",
        description: "Un excellent début de journée plein d'énergie et de vitamines.",
        ingredients: [
            "1 tasse d'épinards frais",
            "1 banane mûre",
            "1 pomme verte",
            "Quelques feuilles de menthe fraîche",
            "1/2 tasse d'eau ou de lait végétal",
            "Jus d'un demi-citron (facultatif)"
        ],
        instructions: "Mettez tous les ingrédients dans un mixeur. Mixez jusqu'à obtenir une consistance lisse et crémeuse. Servez immédiatement."
    },
    "lentil-soup": {
        title: "Soupe aux Lentilles Traditionnelle",
        description: "Un classique nourrissant et réconfortant, parfait pour renforcer l'immunité.",
        ingredients: [
            "1 tasse de lentilles corail",
            "1 oignon haché",
            "2 carottes coupées en dés",
            "2 branches de céleri coupées en dés",
            "2 gousses d'ail écrasées",
            "6 tasses de bouillon de légumes",
            "1 boîte (400g) de tomates concassées",
            "1 cuillère à café de cumin",
            "Sel et poivre au goût",
            "Huile d'olive"
        ],
        instructions: "Dans une grande casserole, faites chauffer l'huile d'olive. Faites revenir l'oignon, les carottes, le céleri et l'ail pendant 5-7 minutes. Ajoutez les lentilles, le bouillon de légumes, les tomates concassées et le cumin. Portez à ébullition, puis réduisez le feu, couvrez et laissez mijoter pendant 25-30 minutes, ou jusqu'à ce que les lentilles soient tendres. Salez et poivrez. Servez chaud."
    }
};

// --- Genel Modal Fonksiyonları ---
function openModal(modalElement) {
    if (modalElement) {
        modalElement.style.display = "flex"; // Modalı görünür hale getirir
        document.body.style.overflow = "hidden"; // Arka plan kaydırmayı engeller
    }
}

function closeModal(modalElement) {
    if (modalElement) {
        modalElement.style.display = "none"; // Modalı gizler
        document.body.style.overflow = "auto"; // Arka plan kaydırmayı etkinleştirir
    }
}

// --- Yemek Tarifi Butonları İçin Olay Dinleyicileri ---
recipeButtons.forEach(button => {
    button.onclick = function() {
        const recipeKey = this.getAttribute("data-recipe");
        const recipe = recipes[recipeKey];

        if (recipe && recipeModal) {
            document.getElementById("modal-recipe-title").innerText = recipe.title;
            document.getElementById("modal-recipe-description").innerText = recipe.description;
            
            const ingredientsList = document.getElementById("modal-recipe-ingredients");
            ingredientsList.innerHTML = ""; // Önceki malzemeleri temizle
            recipe.ingredients.forEach(ingredient => {
                const li = document.createElement("li");
                li.innerText = ingredient;
                ingredientsList.appendChild(li);
            });
            
            document.getElementById("modal-recipe-instructions").innerText = recipe.instructions;
            
            openModal(recipeModal);
        }
    };
});

// --- Modal Kapatma Olay Dinleyicileri ---
// Kapatma düğmeleri
if (closeRecipeModalSpan) {
    closeRecipeModalSpan.onclick = function() {
        closeModal(recipeModal);
    };
}


// Dışarıya tıklayarak kapatma
window.onclick = function(event) {
    if (event.target == infoModal) { // Bilgi modalı açıkken dışa tıklanırsa
        closeModal(infoModal);
    }
    if (event.target == recipeModal) { // Yemek tarifi modalı açıkken dışa tıklanırsa
        closeModal(recipeModal);
    }
};

// Sayfa yüklendiğinde modalların gizli olduğundan emin olalım
document.addEventListener('DOMContentLoaded', function() {
    if (infoModal) {
        infoModal.style.display = 'none';
    }
    if (recipeModal) {
        recipeModal.style.display = 'none';
    }
});
