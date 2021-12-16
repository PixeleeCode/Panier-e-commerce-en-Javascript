/**
 * Récupérer l'ID du produit
 */
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

/**
 * Sélectionne un produit
 */
fetch('./api/products.json')
    .then(response => response.json())
    .then(products => {
        // Récupérer le produit dans le tableau de produits correspondant à l'ID passé en paramètre de l'URL
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        const product = products.find(product => product.id === parseInt(params.id));

        // Si le produit existe, afficher le produit dans le DOM (voir le fichier HTML)
        if (product) {
            // Cacher le message d'erreur
            document.querySelector('#not-found').style.display = 'none';

            // Nom du produit
            document.querySelector('#product-name').innerHTML = product.name;

            // Prix
            document.querySelector('#product-price').innerHTML = product.price;

            // Description
            document.querySelector('#product-description').innerHTML = product.description;

            // Image
            document.querySelector('#product-image').src = product.image;
            document.querySelector('#product-image').alt = product.name;
        }
        // Sinon afficher un message d'erreur
        else {
            document.querySelector('#product').style.display = 'none';
            document.querySelector('#not-found').style.display = 'block';
        }
    });

/**
 * Ajoute le produit au panier
 */
document.querySelector('#add-to-cart').addEventListener('submit', (event) => {
    // Empêcher le navigateur de soumettre le formulaire
    event.preventDefault();

    // Récupérer le prix du produit
    const priceValue = document.querySelector('#product-price').innerHTML;

    // Récupérer la quantité du produit
    const quantityValue = document.querySelector('#quantity').value;

    // Calculer le prix total du produit
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    const totalValue = parseInt(priceValue) * parseInt(quantityValue);
    // console.log(priceValue, quantityValue, totalValue);

    // Créer un objet contenant les informations du produit
    const product = {
        id: parseInt(params.id),
        name: document.querySelector('#product-name').innerHTML,
        price: priceValue,
        image: document.querySelector('#product-image').src,
        quantity: parseInt(quantityValue),
        total: totalValue
    };

    // Récupérer le panier dans le localStorage s'il existe sinon créer un tableau vide
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Récupérer le produit dans le tableau de produits correspondant à l'ID passé en paramètre de l'URL
    const productCart = cart.find(product => product.id === parseInt(params.id));

    // Si le produit existe dans le panier, augmenter la quantité
    if (productCart) {
        productCart.quantity += parseInt(quantityValue);
        productCart.total = productCart.quantity * productCart.price;
    }
    // Sinon ajouter le produit au panier
    else {
        cart.push(product);
    }

    // Enregistrer le panier dans le localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Rediriger l'utilisateur vers la page du panier
    location.href = './cart.html';
});
