# modulo-2-evaluacion-final-Michelle-1982
Este proyecto es una tienda online sencilla desarrollada como evaluación final . Permite buscar productos, añadirlos al carrito, modificar cantidades y eliminar productos, todo gestionado desde una API pública.

## Funcionalidades

- **Búsqueda de productos:** Filtra productos por descripción usando el campo de búsqueda y el botón "Find".
- **Listado de productos populares:** Muestra los productos disponibles obtenidos de la API [Fake Store API](https://fakestoreapi.com/products).
- **Carrito de compras:** Añade productos al carrito, modifica la cantidad con botones "+" y "-", y elimina productos con el botón de papelera.
- **Persistencia:** El carrito se guarda en `localStorage` para mantener los productos seleccionados entre sesiones.
- **Interfaz responsive:** Las secciones de productos y carrito se muestran en columnas y permiten scroll si hay muchos elementos.

## Principales funciones JS

- **shoppingCart:** Renderiza la tarjeta de producto en el carrito con imagen, nombre, precio, cantidad y botón de eliminar.
- **popularCart:** Renderiza la tarjeta de producto disponible con botón "Comprar".
- **popularSelected:** Renderiza el producto comprado con opción de eliminar.
- **paintCartShop:** Repinta el carrito y gestiona eventos de cantidad y eliminación.
- **increaseQuantity / decreaseQuantity:** Modifican la cantidad de productos en el carrito.
- **removeFromCartClick:** Elimina productos del carrito.
- **addClickBtnPopular:** Añade productos al carrito desde la lista de populares.
- **obtainCartProducts:** Renderiza la lista de productos disponibles y seleccionados.
- **clearCart:** Vacía el carrito.
- **Persistencia:** Guarda y recupera el carrito desde `localStorage`.

## Instalación y uso

1. Clona el repositorio.
2. Instala las dependencias si usas algún gestor de paquetes (opcional).
3. Abre el archivo `index.html` en tu navegador.
4. Busca productos, añádelos al carrito y gestiona tu compra.

## Créditos

- API utilizada: [Fake Store API](https://fakestoreapi.com/)
- Proyecto realizado por Michelle-1982 para Adalab.
