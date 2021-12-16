// Récupérer le panier dans le localStorage s'il existe sinon créer un tableau vide
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Déclaration des variables globales à zéro pour les prix et le nombre total d'articles
let cart_total = 0;
let cart_items = 0;

// Si le panier n'est pas vide
if (cart.length > 0) {
    // Cacher le message d'erreur
    document.querySelector('#not-items').style.display = 'none';

    // Récupérer le nombre total d'articles en comptant le nombre d'éléments du tableau
    cart_items = cart.length;

    // Boucler sur chaque élément du panier pour récupérer les prix et les additionner pour le total du panier
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    cart_total = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // Afficher le nombre total d'articles et le total du panier dans le DOM
    document.querySelector('#cart-items').innerHTML = `Vous avez ${cart_items} produits en panier`;
    document.querySelector('#cart-total').innerHTML = `${cart_total} euros`;

    // Boucler sur chaque élément du panier pour afficher les informations dans le DOM
    cart.forEach(item => {
        // Créer un nouvel élément HTML
        const cart_item = document.createElement('div');

        // Ajouter une classe CSS à l'élément
        cart_item.classList.add('col-12');

        // Ajouter le contenu HTML à l'élément
        cart_item.innerHTML = `
            <div class="row pt-5">
                <div class="col-1">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="col-11">
                    <div>
                        <h4>${item.name}</h4>
                        <p>P.U. : ${item.price} euros</p>
                        <input data-id="${item.id}" id="quantity" type="number" min="1" value="${item.quantity}">
                        <p>Total : ${item.total} euros</p>
                        <span class="remove-item btn btn-danger" data-id="${item.id}">Supprimer</span>
                    </div>
                    <div>
                        <i class="fas fa-chevron-up" data-id="${item.id}"></i>
                        <i class="fas fa-chevron-down" data-id="${item.id}"></i>
                    </div>
                </div>
            </div>
        `;

        // Ajouter l'élément au DOM
        document.querySelector('#cart-items-container').appendChild(cart_item);
    });
}
// Sinon, afficher un message d'erreur
else {
    document.querySelector('#not-items').style.display = 'block';
}

/**
 * Modifier la quantité d'un produit
 */
document.querySelectorAll('#quantity').forEach(quantity => {
    // Ajouter un écouteur d'événement au changement de la valeur de l'input de la quantité
    quantity.addEventListener('click', event => {
        // Récupérer l'id du produit
        const id = event.target.dataset.id;

        // Récupérer la quantité du produit dans le panier à l'aide de l'id du produit
        const item = cart.find(item => item.id === parseInt(id));

        // Si la quantité est inférieure à 1, la valeur est mise à 1
        if (event.target.value < 1) {
            event.target.value = 1;
        }
        // Sinon, la valeur est mise à jour
        else {
            // Récupérer la quantité du produit
            item.quantity = parseInt(event.target.value);

            // Calculer le total du produit
            item.total = item.price * item.quantity;

            // Mettre à jour le total du panier en fonction du nouveau total du produit
            cart_total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        }

        // Mettre à jour le total du panier dans le DOM
        localStorage.setItem('cart', JSON.stringify(cart));

        // Recharger la page pour afficher les nouvelles données
        location.reload();
    });
})

/**
 * Supprimer un produit du panier
 */
document.querySelectorAll('.remove-item').forEach(button => {
    // Ajouter un écouteur d'événement au clic sur le bouton de suppression
    button.addEventListener('click', event => {
        // Récupérer l'id du produit
        const id = event.target.dataset.id;

        // Supprimer le produit du panier à l'aide de l'id du produit
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        cart = cart.filter(item => item.id !== parseInt(id));

        // Mettre à jour le panier dans le localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Recharger la page pour afficher les nouvelles données
        location.reload();
    });
})
