document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".shop");
    const subtotalElement = document.querySelector(".right-bar p span:nth-child(2)");
    const totalElement = document.querySelector(".right-bar p:last-of-type span:nth-child(2)");
    const shippingCost = 15;
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    function updateCart() {
        cartContainer.innerHTML = "";
        let subtotal = 0;
        
        cart.forEach((item, index) => {
            const box = document.createElement("div");
            box.classList.add("box");
            box.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="content">
                    <h3>${item.name}</h3>
                    <h4>Price: $${item.price.toFixed(2)}</h4>
                    <p class="unit">Quantity: <input type="number" min="1" value="${item.quantity}" data-index="${index}"></p>
                    <p class="btn-area"><i class="fa fa-trash"></i> <span class="btn2" data-index="${index}">Remove</span></p>
                </div>
            `;
            cartContainer.appendChild(box);
            subtotal += item.price * item.quantity;
        });
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${(subtotal + shippingCost).toFixed(2)}`;
        
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    
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
    
    updateCart();
});
