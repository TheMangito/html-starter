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
  
    // Verificamos si el carrito está vacío
    if (carrito.length === 0) {
      contenedor.innerHTML = "<p>No hay productos en tu carrito.</p>";
      return;
    }
  
    let subtotal = 0; // Inicializamos el subtotal
    contenedor.innerHTML = ""; // Limpiamos el contenedor antes de agregar los productos
  
    carrito.forEach(item => {
      // Verificamos el precio de cada producto
      console.log(`Precio del producto ${item.nombre}: ${item.precio}`);
  
      // Verificamos que el precio sea un número
      if (isNaN(item.precio)) {
        console.error(`El precio del producto ${item.nombre} no es un número válido.`);
        return; // Si no es un número, lo ignoramos
      }
  
      const nuevoDiv = document.createElement("div");
      
      // Crear nombre del producto
      const nombreProducto = document.createElement("h2");
      nombreProducto.textContent = item.nombre;
      nuevoDiv.appendChild(nombreProducto);
      
      // Crear precio del producto
      const precioProducto = document.createElement("p");
      precioProducto.textContent = `Precio: $${item.precio}`;
      nuevoDiv.appendChild(precioProducto);
      
      // Crear imagen del producto
      const imagenProducto = document.createElement("img");
      imagenProducto.src = item.imagen;
      imagenProducto.alt = item.nombre;
      imagenProducto.style.width = "100px"; // Ajustar el tamaño de la imagen
      nuevoDiv.appendChild(imagenProducto);
      
      // Estilo del div
      nuevoDiv.style.border = "1px solid black";
      nuevoDiv.style.padding = "10px";
      nuevoDiv.style.margin = "10px 0";
      contenedor.appendChild(nuevoDiv);
      
      // Sumar el precio al subtotal
      subtotal += item.precio;
    });
  
    // Calcular el total (agregar el costo de envío)
    const envio = 15;
    const total = subtotal + envio;
  
    // Mostrar subtotal y total
    const subtotalElemento = document.querySelector(".right-bar .subtotal span:nth-of-type(2)");
    const totalElemento = document.querySelector(".right-bar .total span:nth-of-type(2)");
  
    if (subtotalElemento && totalElemento) {
      // Verifica que el subtotal no sea NaN antes de mostrarlo
      if (!isNaN(subtotal) && !isNaN(total)) {
        subtotalElemento.textContent = `$${subtotal.toFixed(2)}`;
        totalElemento.textContent = `$${total.toFixed(2)}`;
      } else {
        console.error("Subtotal o total son NaN.");
      }
    } else {
      console.error("No se pudieron encontrar los elementos de subtotal y total.");
    }
  }
  

// Verificamos si estamos en la página de carrito para ejecutar la función mostrarCarrito()
if (window.location.pathname.includes("carrito.html")) {
  mostrarCarrito();
}
