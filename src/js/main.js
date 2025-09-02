'use strict';

// Definición de constantes y variables globales en la página
const findBtn = document.querySelector('.search__button');
const searchInput = document.querySelector('.search__input');
const popularlistItems = document.querySelector('.popular-items');
const cartItems = document.querySelector('.cart-items');

let productsData = [];
let cartData = [];

// Función para crear el HTML de un producto de carrito o de un producto devuelto por la API
const shoppingCart = (_image, _productName, _price) => {
    return '<div class="product-card"><img src="' + _image + '" alt="Fjallraven Backpack"><div class="product-info"><p class="product-title">' + _productName + '</p><p class="product-price">' +_price + ' €</p><button class="buy-btn">Comprar</button></div></div>';
}

// Función para repintar los productos en popular-items
function renderPopularProducts(products) {
    popularlistItems.innerHTML = '';
    products.forEach(product => {
        const productHTML = shoppingCart(product.image, product.title, product.price);
        popularlistItems.innerHTML += productHTML;
    });

    // Añadir evento a cada botón "Comprar" de los productos pintados. Como son muchos botones con
    // la misma clase, usamos querySelectorAll y un forEach para añadir el evento a cada uno.
    const buyBtns = popularlistItems.querySelectorAll('.buy-btn');
    buyBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            cartData.push(products[idx]);

            // Repintar el carrito actualizado
            const productHTML = shoppingCart(products[idx].image, products[idx].title, products[idx].price);
            cartItems.innerHTML += productHTML;
        });
    });
}

// Fetch para obtener productos desde la API
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        productsData = data;
        renderPopularProducts(data);
    })
    .catch(error => console.error('Error fetching products:', error));  

// Evento click para buscar por descripción
findBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = productsData.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );
    popularlistItems.innerHTML = '';
    filteredProducts.forEach(product => {
        const productHTML = shoppingCart(product.image, product.title, product.price);
        popularlistItems.innerHTML += productHTML;
    });
});
