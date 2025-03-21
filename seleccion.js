
document.addEventListener('DOMContentLoaded', () => {
    fetch('productos.json')
      .then(response => response.json())
      .then(productos => {
        const container = document.querySelector('section');
  
        productos.forEach((producto, index) => {
          const isReversed = index % 2 !== 0; // Alterna el diseño
          const imgSrc = `images/album${index + 1}.jpg`;
  
          const albumHTML = `
            <div class="section-discography">
              <div class="discografia-div">
                ${isReversed ? `<div class="album-div-info">${generateAlbumInfo(producto)}</div><img class="discografia-div-img" src="${imgSrc}" alt="${producto.nombre}">` 
                               : `<img class="discografia-div-img" src="${imgSrc}" alt="${producto.nombre}"><div class="album-div-info">${generateAlbumInfo(producto)}</div>`}
              </div>
            </div>
          `;
          container.innerHTML += albumHTML;
        });
      })
      .catch(error => console.error('Error al cargar productos:', error));
  });
  

  toLocalStorage = (nombre, precio) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ nombre, precio });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Agregado al carrito: ${nombre} - $${precio}`);
  }
  
  function generateAlbumInfo(producto) {
    return `
      <h1 class="album-title">${producto.nombre}</h1>
      <h3 class="album-subtitle">Precio: $${producto.precio}</h3>
      <p class="album-date">Fecha de Lanzamiento: ${producto.fecha}</p>
      <div class="album-div-buy">
        <button onclick="toLocalStorage('${producto.nombre}', ${producto.precio})">COMPRAR ALBUM</button>
      </div>
      <a href="#" class="album-more">MORE +</a>
    `;
  }
  