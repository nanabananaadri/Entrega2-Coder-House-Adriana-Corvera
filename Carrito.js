const productos = [
    { src: "pngegg (2).png", alt: "Tomate", precio: "$0.50" },
    { src: "pngegg (3).png", alt: "Pimiento verde", precio: "$0.50" },
    { src: "pngegg (5).png", alt: "Banana", precio: "$0.75" },
    { src: "pngegg (6).png", alt: "Fresa", precio: "$0.40" },
    { src: "pngegg (7).png", alt: "Lechuga", precio: "$0.40" },
    { src: "pngegg (8).png", alt: "Aguacate", precio: "$0.40" },
    { src: "pngegg (9).png", alt: "Uvas verdes", precio: "$0.40" },
    { src: "pngegg (10).png", alt: "Papas", precio: "$0.40" }
];


const carrito = [];

function actualizarCarritoUI() {
    const container = document.querySelector('.carrito-items-container');
    container.innerHTML = ''; // Limpiar el contenedor del carrito
    carrito.forEach((item, index) => {
        const claseBg = index % 2 === 0 ? 'bg-claro' : 'bg-oscuro';
        const itemHTML = `
            <div class="carrito-item ${claseBg}">
                <div class="carrito-item-img-container"><img src="${item.imagen}" alt="${item.producto.toLowerCase()}"></div>
                <div class="carrito-item-img-container"><span>${item.producto}</span></div>    
                <div class="carrito-item-img-container"><span>${item.cantidad}</span></div>    
                <div class="carrito-item-img-container"><span>$${item.subtotal}</span></div>
            </div>
        `;
        container.innerHTML += itemHTML;
    });
}

function agregarAlCarrito(producto, cantidad) {
    const productoExistente = carrito.find(item => item.producto === producto.alt);
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
        productoExistente.subtotal = (productoExistente.precioUnitario.replace("$", "") * productoExistente.cantidad);
    } else {
        const subtotal = producto.precio.replace("$", "") * cantidad;
        carrito.push({
            producto: producto.alt,
            cantidad: cantidad,
            precioUnitario: producto.precio.replace("$", ""),
            subtotal: subtotal,
            imagen: producto.src
        });
    }
    actualizarCarritoUI();
}

function cargarProductos() {
    const container = document.querySelector('.products-container');
    container.innerHTML = '';  // Limpiar contenido previo si es necesario
    productos.forEach((producto, index) => {
        const cardHTML = `
            <div class="product-card" data-index="${index}">
                <img src="${producto.src}" alt="${producto.alt}">
                <p>${producto.precio}</p>
                <div class="quantity-controls">
                    <button class="decrease">-</button>
                    <span>0</span>
                    <button class="increase">+</button>
                </div>
                <button class="add-button">Agregar</button>
            </div>
        `;
        container.innerHTML += cardHTML;
    });

    // Añadir event listeners a los botones
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.product-card');
            const quantitySpan = card.querySelector('.quantity-controls span');
            let quantity = parseInt(quantitySpan.textContent);
            quantitySpan.textContent = ++quantity;
        });
    });

    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.product-card');
            const quantitySpan = card.querySelector('.quantity-controls span');
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 0) {
                quantitySpan.textContent = --quantity;
            }
        });
    });

    document.querySelectorAll('.add-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.product-card');
            const index = parseInt(card.dataset.index);
            const quantitySpan = card.querySelector('.quantity-controls span');
            const quantity = parseInt(quantitySpan.textContent);
            if (quantity > 0) {
                agregarAlCarrito(productos[index], quantity);
                quantitySpan.textContent = 0; // Resetear cantidad a 0 tras agregar al carrito
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', cargarProductos);