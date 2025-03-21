// Función para agregar al carrito desde index.html
function agregarAlCarrito() {
    // Definir los productos disponibles (ejemplo con un solo producto, puedes hacerlo más dinámico)
    const productos = [
      {
        "nombre": "Album: Babymons7er",
        "precio": 244.52,
        "fecha": "2024-04-01",
        "imagen": "images/album3.jpg",
        "descripcion": "Descripción"
      },
      {
        "nombre": "Album: Drip",
        "precio": 204.69,
        "fecha": "2024-11-01",
        "imagen": "images/album1.jpg",
        "descripcion": "Descripción"
      }
      // Agrega más productos según sea necesario
    ];
  
    // Obtener el producto que se ha seleccionado
    const productoSeleccionado = productos[0]; // Suponiendo que el botón compra el primer producto
  
    // Creamos el contenido del div que se agregará
    const divData = {
      id: Date.now(), // para que no se repita
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      imagen: productoSeleccionado.imagen
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

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>No hay productos en tu carrito.</p>";
        return;
    }

    let subtotal = 0; // Inicializamos el subtotal
    contenedor.innerHTML = ""; // Limpiamos el contenedor antes de agregar los productos
    
    carrito.forEach(item => {
      const nuevoDiv = document.createElement("div");
      
      // Agregar nombre del producto
      const nombreProducto = document.createElement("h2");
      nombreProducto.textContent = item.nombre;
      nuevoDiv.appendChild(nombreProducto);
      
      // Agregar precio del producto
      const precioProducto = document.createElement("p");
      precioProducto.textContent = `Precio: $${item.precio}`;
      nuevoDiv.appendChild(precioProducto);
      
      // Agregar imagen del producto
      const imagenProducto = document.createElement("img");
      imagenProducto.src = item.imagen;
      imagenProducto.alt = item.nombre;
      imagenProducto.style.width = "100px"; // Tamaño de la imagen
      nuevoDiv.appendChild(imagenProducto);
      
      // Estilo del div
      nuevoDiv.style.border = "1px solid black";
      nuevoDiv.style.padding = "10px";
      nuevoDiv.style.margin = "10px 0";
      contenedor.appendChild(nuevoDiv);

      // Sumar el precio al subtotal
      subtotal += item.precio;
    });

    // Calcular el total (agregar envío)
  const envio = 15; // Costo de envío
  const total = subtotal + envio;

  // Selección más robusta para los elementos de subtotal y total
const subtotalElemento = document.querySelector(".right-bar .subtotal span:nth-of-type(2)");
const totalElemento = document.querySelector(".right-bar .total span:nth-of-type(2)");

  if (subtotalElemento && totalElemento) {
    // Verifica que el subtotal no sea NaN antes de mostrarlo
    subtotalElemento.textContent = `$${subtotal.toFixed(2)}`;
    totalElemento.textContent = `$${total.toFixed(2)}`;
  } else {
    console.error("No se pudieron encontrar los elementos de subtotal y total.");
  }
}

// Verificamos si estamos en la página de carrito para ejecutar la función mostrarCarrito()
if (window.location.pathname.includes("carrito.html")) {
  mostrarCarrito();
}
