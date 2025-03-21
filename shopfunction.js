// Función para agregar al carrito desde index.html
function agregarAlCarrito() {
  // Creamos el contenido del div que se agregará
  const divData = {
    id: Date.now(), // para que no se repita
    content: "Producto agregado desde index"
  };

  // Obtenemos el carrito actual del localStorage (o lo inicializamos)
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Agregamos el nuevo div al carrito
  carrito.push(divData);

  // Guardamos el carrito actualizado
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Redirigimos a la página del carrito
  window.location.href = "carrito.html";
}

// Función para mostrar los productos en carrito.html
function mostrarCarrito() {
  const contenedor = document.getElementById("contenedor-carrito");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.forEach(item => {
    const nuevoDiv = document.createElement("div");
    nuevoDiv.textContent = item.content;
    nuevoDiv.setAttribute("data-id", item.id);
    nuevoDiv.style.border = "1px solid black";
    nuevoDiv.style.padding = "10px";
    nuevoDiv.style.margin = "10px 0";
    contenedor.appendChild(nuevoDiv);
  });
}

// Verificamos si estamos en la página de carrito para ejecutar la función mostrarCarrito()
if (window.location.pathname.includes("carrito.html")) {
  mostrarCarrito();
}
