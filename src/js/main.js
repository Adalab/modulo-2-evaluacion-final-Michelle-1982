'use strict';

// Definición de constantes y variables globales en la página
const findBtn = document.querySelector('.search__button');
const searchInput = document.querySelector('.search__input');
const popularlistItems = document.querySelector('.popular-items');
const cartItems = document.querySelector('.cart-items');
const cartClearBtn = document.querySelector('.cart-clear-btn');
let productsData = [];
let cartData = [];

// Tarjeta de producto en el carrito
const shoppingCart = (_image, _productName, _price) => {
    return '<div class="product-card"><img src="' + _image + '" alt="Fjallraven Backpack"><div class="product-info"><p class="product-title">' + _productName + '</p><p class="product-price">' +_price + ' €</p><div class="product-quantity"><button class="decrease-btn">-</button><span class="quantity-value">1</span><button class="increase-btn">+</button></div></div><button class="remove-btn" title="Eliminar" style="">🗑️</button></div>';
}

// Tarjeta que muestra los productos disponibles
const popularCart = (_image, _productName, _price) => {
    return '<div class="product-card"><img src="' + _image + '" alt="Fjallraven Backpack"><div class="product-info"><p class="product-title">' + _productName + '</p><p class="product-price">' +_price + ' €</p><button class="buyBtn" id="buyBtn">Comprar</button></div></div>';
}

// Tarjeta cuando has comprado el producto y te permite quitarlo del carrito
const popularSelected = (_image, _productName, _price) => {
    return '<div class="product-card"><img src="' + _image + '" alt="Fjallraven Backpack"><div class="product-info"><p class="product-title">' + _productName + '</p><p class="product-price">' +_price + ' €</p><button class="buyBtnRemove" id="buyBtn">Eliminar</button></div></div>';
}
const clearCart = () => {
    cartClearBtn.addEventListener('click', () => {
        cartData = [];
        paintCartShop();
        obtainCartProducts(productsData);
    });

}
// Funcion donde tenemos la lista de productos
// miramos si el elemento del producto esta en el carrito
// usamos la funcion popularSelected para pintarlo en el html
// sino, usamos la clase popularCart.
const obtainCartProducts = (data) => {
    popularlistItems.innerHTML = '';
    let productHTML = '';
    data.forEach(product => {
        const isInCart = cartData.some(cartProduct => cartProduct.id === product.id);
        if (isInCart) {
             productHTML = popularSelected(product.image, product.title, product.price);
            
        } else {
            productHTML = popularCart(product.image, product.title, product.price);
            
        }
        popularlistItems.innerHTML += productHTML;  
    });
    addClickBtnPopular(data);
}

const paintCartShop = () => {
    cartItems.innerHTML = '';
    cartData.forEach(product => {
        const productHTML = shoppingCart(product.image, product.title, product.price);
        cartItems.innerHTML += productHTML;
    });

    // Guardamos en el localStorage los productos del carrito
    localStorage.setItem('cartData', JSON.stringify(cartData));

    removeFromCartClick();
}

const removeFromCartClick = () => {
    const removeBtns = cartItems.querySelectorAll('.remove-btn');
    removeBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            cartData.splice(idx, 1);
            paintCartShop();
            obtainCartProducts(productsData);
            removeFromCartClick(); // Reasignar eventos después de repintar
        });
    });
}
const addClickBtnPopular = (products) => {
 // Añadir evento a cada botón "Comprar" de los productos pintados. Como son muchos botones con
    // la misma clase, usamos querySelectorAll y un forEach para añadir el evento a cada uno.
    const buyBtns = popularlistItems.querySelectorAll('#buyBtn');
    buyBtns.forEach((btn, idx) => {
        btn.addEventListener('click', (event) => {
            if(event.target.className === 'buyBtnRemove') {
                cartData = cartData.filter(product => product.id !== productsData[idx].id);
            }
            else{
                cartData.push(products[idx]);
            }
            
            // Repintar el carrito actualizado
            paintCartShop();

            // Hay que repintar la lista de productos disponibles donde los productos de carrito
            // permita eliminarlos.
            obtainCartProducts(productsData);

        });
    });
}

// Recuperamos del localStorage los productos del carrito
const savedCart = JSON.parse(localStorage.getItem('cartData'));
if (savedCart) {
    cartData = savedCart;
    paintCartShop();
}

// Fetch para obtener productos desde la API
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        productsData = data;
        obtainCartProducts(data);
    })
    .catch(error => console.error('Error fetching products:', error));  

// Evento click para buscar por descripción
findBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = productsData.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );
    obtainCartProducts(filteredProducts);
});
clearCart ();
