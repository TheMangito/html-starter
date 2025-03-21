document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".shop");
    const subtotalElement = document.querySelector(".right-bar p span:nth-child(2)");
    const totalElement = document.querySelector(".right-bar p:last-of-type span:nth-child(2)");
    const shippingCost = 15;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Cargar los productos desde el archivo JSON
    let products = [];
    fetch('productos.json')  // Suponiendo que el archivo JSON está en la misma carpeta
        .then(response => response.json())
        .then(data => {
            products = data;
            updateCart();  // Actualizar el carrito después de cargar los productos
        })
        .catch(error => console.error("Error al cargar el archivo de productos:", error));

    function updateCart() {
        cartContainer.innerHTML = "";
        let subtotal = 0;

        cart.forEach((item, index) => {
            // Buscar el producto en la lista de productos
            let product = products.find(p => p.nombre === item.name);

            if (product) {
                const box = document.createElement("div");
                box.classList.add("box");
                box.innerHTML = `
                    <img src="images/${product.nombre.replace(/\s+/g, '')}.jpg" alt="${product.nombre}">
                    <div class="content">
                        <h3>${product.nombre}</h3>
                        <h4>Price: $${product.precio.toFixed(2)}</h4>
                        <p class="unit">Quantity: <input type="number" min="1" value="${item.quantity}" data-index="${index}"></p>
                        <p class="btn-area"><i class="fa fa-trash"></i> <span class="btn2" data-index="${index}">Remove</span></p>
                    </div>
                `;
                cartContainer.appendChild(box);
                subtotal += product.precio * item.quantity;
            }
        });

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${(subtotal + shippingCost).toFixed(2)}`;

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Manejar el evento de agregar al carrito
    document.querySelectorAll(".add-to-cart").forEach(boton => {
        boton.addEventListener("click", () => {
            let nombreProducto = boton.getAttribute("data-nombre");
            
            // Log para ver si el evento de clic está funcionando
            console.log("Botón clickeado:", nombreProducto);

            // Buscar si el producto existe en la lista de productos
            let product = products.find(p => p.nombre === nombreProducto);
            if (!product) {
                console.log("Producto no encontrado:", nombreProducto);  // Log para ver si no se encuentra el producto
                return;
            }

            // Log para ver si el producto se encontró
            console.log("Producto encontrado:", product);

            // Buscar si ya está en el carrito
            let existingProduct = cart.find(item => item.name === nombreProducto);

            if (existingProduct) {
                existingProduct.quantity++;
                console.log("Producto en carrito, cantidad aumentada:", existingProduct);
            } else {
                cart.push({ name: nombreProducto, quantity: 1, price: product.precio });
                console.log("Producto agregado al carrito:", nombreProducto);
            }

            updateCart();
        });
    });
    
    cartContainer.addEventListener("input", (event) => {
        if (event.target.type === "number") {
            const index = event.target.dataset.index;
            cart[index].quantity = parseInt(event.target.value) || 1;
            updateCart();
        }
    });
    
    cartContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn2")) {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        }
    });
});
