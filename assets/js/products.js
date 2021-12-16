/**
 * Selection tous les produits
 */
fetch('./api/products.json')
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        // Appel de la fonction "displayProducts()" pour afficher les produits
        displayProducts(data);
    })
    .catch(error => console.error(error));

/**
 * Affiche les produits dans le DOM HTML du site
 */
function displayProducts(fetchedProducts) {
    // Déclaration d'une variable vide
    let products = '';

    // Boucle sur les produits
    fetchedProducts.forEach(product => {

        // Ajout d'un produit dans la variable
        products += `
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <img src="${product.image}" alt="${product.name}" class="card-img-top">
                    <div class="card-body">
                        <p class="card-text">${product.name}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <!-- Lien contenant en paramètre l'ID du produit -->
                                <a href="product.html?id=${product.id}" class="btn btn-sm btn-outline-secondary">En savoir plus</a>
                            </div>
                            <small class="text-muted">${product.price} euros</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    // Insertion des produits dans le DOM HTML
    document.querySelector('#products').innerHTML = products;
}
