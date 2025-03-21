fetch('productos.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar el JSON');
    }
    return response.json();
  })
  .then(productos => {
    const contenedor_product = document.getElementById('Productos');

    productos.forEach(producto => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h2>${producto.nombre}</h2>
        <p>Precio: $${producto.precio}</p>
        <p>Fecha de Lanzamiento: ${producto.fecha}</p>
      `;
      contenedor_product.appendChild(div);
    });
  })
  .catch(error => console.error('Error:', error));
