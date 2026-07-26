//definicion de articulos

var productos = [
  {
    nombre: "Laptop Gaming Pro 15",
    categoria: "electronica",
    precio: 1299.99,
    imagen: "https://mobilestore.ec/wp-content/uploads/2024/07/Lenovo-Legion-Pro-82WQ0065US-GAMING-LAPTOP-Mobile-Store-Ecuador.jpg"
  },
  {
    nombre: "Auriculares Bluetooth",
    categoria: "electronica",
    precio: 89.99,
    imagen: "https://www.steren.com.ec/media/catalog/product/cache/0236bbabe616ddcff749ccbc14f38bf2/image/22680baa9/audifonos-bluetooth-con-bateria-de-hasta-50-h.jpg"
  },
  {
    nombre: "Camiseta Premium Algodon",
    categoria: "ropa",
    precio: 29.99,
    imagen: "https://m.media-amazon.com/images/I/51YxW4Rm3oL._AC_UY1000_.jpg"
  },
  {
    nombre: "Zapatillas Running Elite",
    categoria: "deportes",
    precio: 119.99,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkyg2cJEu9fEvzTIYV-UZqpXkyjbJdeR0BQkJ_8TmNIwis_YaqSXIwtSs&s=10"
  },
  {
    nombre: "Smart TV 55 4K UHD",
    categoria: "electronica",
    precio: 549.99,
    imagen: "https://mobilestore.ec/wp-content/uploads/2025/08/TELEVISOR-SAMSUNG-55-SMART-TV-UHD-DU7000-Mobile-Store-Ecuador.jpg"
  },
  {
    nombre: "Lampara LED Escritorio",
    categoria: "hogar",
    precio: 34.99,
    imagen: "https://kywiec.vtexassets.com/arquivos/ids/272679/568069.jpg?v=638760980192370000"
  },
  {
    nombre: "Mochila Urban Explorer",
    categoria: "ropa",
    precio: 59.99,
    imagen: "https://m.media-amazon.com/images/I/61Qm63h-MWL._AC_UY1000_.jpg"
  },
  {
    nombre: "Kindle Scribe",
    categoria: "libros",
    precio: 39.99,
    imagen: "https://m.media-amazon.com/images/I/81xUpeu-LzL._UF1000,1000_QL80_.jpg"
  },
  {
    nombre: "Set de Sartenes Antiadherentes",
    categoria: "hogar",
    precio: 79.99,
    imagen: "https://pycca.vteximg.com.br/arquivos/ids/288016-600-600/A06959.png?v=638893294166700000"
  },
  {
    nombre: "Balon de Futbol Pro",
    categoria: "deportes",
    precio: 24.99,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRniBLz--VzEIcbDcBrEF92Yt00fFKlPu-x162J1I-bmXv0S9gDDj_B2-zZ&s=10"
  },
  {
    nombre: "Camisa Formal Slim Fit",
    categoria: "ropa",
    precio: 44.99,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHu9RIIqhnNbm5wxdw-VrLikNoJGIm2DuHHHw38oEFO70kImJbVPj_84&s=10"
  },
  {
    nombre: "Reloj Inteligente Sport",
    categoria: "electronica",
    precio: 199.99,
    imagen: "https://m.media-amazon.com/images/I/71YTiZt1jUL._AC_UF894,1000_QL80_.jpg"
  }
];
//definicion del carrito
var carrito = [];

//obtencion de los datos hmtl de index
var listaProductos = document.getElementById("listaProductos");
var formularioBusqueda = document.getElementById("formularioBusqueda");
var campoBusqueda = document.getElementById("campoBusqueda");
var filtrosCategorias = document.getElementById("filtrosCategorias");
var ordenarPor = document.getElementById("ordenarPor");
var textoResultado = document.getElementById("textoResultado");
var sinResultados = document.getElementById("sinResultados");
var limpiarBusqueda = document.getElementById("limpiarBusqueda");
var contadorCarrito = document.getElementById("contadorCarrito");
var itemsCarrito = document.getElementById("itemsCarrito");
var carritoVacio = document.getElementById("carritoVacio");
var pieCarrito = document.getElementById("pieCarrito");
var textoSubtotal = document.getElementById("textoSubtotal");
var textoImpuesto = document.getElementById("textoImpuesto");
var textoTotal = document.getElementById("textoTotal");
var botonComprar = document.getElementById("botonComprar");
var botonVaciar = document.getElementById("botonVaciar");
var miToast = document.getElementById("miToast");

//filtracion de informacion de busqueda
var categoriaActual = "todos";
var busquedaActual = "";

function filtrarProductos() {
  var todos = listaProductos.getElementsByClassName("producto");
  var contador = 0;

  for (var i = 0; i < todos.length; i++) {
    var producto = todos[i];
    var categoria = producto.getAttribute("data-categoria");
    var nombre = producto.getAttribute("data-nombre");

    // Verificacion de coincidencia de categoria
    var coincideCategoria = false;
    if (categoriaActual === "todos") {
      coincideCategoria = true;
    } else if (categoria === categoriaActual) {
      coincideCategoria = true;
    }

    // Verificacion de coincidencia con la busqueda
    var coincideBusqueda = false;
    if (busquedaActual === "") {
      coincideBusqueda = true;
    } else if (nombre.indexOf(busquedaActual) !== -1) {
      coincideBusqueda = true;
    }

    // Mostrar y ocultar
    if (coincideCategoria && coincideBusqueda) {
      producto.classList.remove("d-none");
      contador = contador + 1;
    } else {
      producto.classList.add("d-none");
    }
  }

  // Actualizar la busqueda
  if (contador === 0) {
    textoResultado.textContent = "No se encontraron productos";
    sinResultados.classList.remove("d-none");
  } else {
    textoResultado.textContent = "Mostrando " + contador + " productos";
    sinResultados.classList.add("d-none");
  }
}

//orden de los productos
function ordenarProductos() {
  var opcion = ordenarPor.value;

  if (opcion === "destacados") {
    return; // No ordenar
  }

  var productosDom = listaProductos.getElementsByClassName("producto");
  var arrayProductos = [];

  // Copia de un array
  for (var i = 0; i < productosDom.length; i++) {
    arrayProductos.push(productosDom[i]);
  }

  // Ordenar
  arrayProductos.sort(function(a, b) {
    var precioA = parseFloat(a.getAttribute("data-precio"));
    var precioB = parseFloat(b.getAttribute("data-precio"));
    var nombreA = a.getAttribute("data-nombre");
    var nombreB = b.getAttribute("data-nombre");

    if (opcion === "menor-precio") {
      return precioA - precioB;
    } else if (opcion === "mayor-precio") {
      return precioB - precioA;
    } else if (opcion === "nombre") {
      return nombreA.localeCompare(nombreB);
    }
    return 0;
  });

  // Reordenar en el index
  for (var i = 0; i < arrayProductos.length; i++) {
    listaProductos.appendChild(arrayProductos[i]);
  }
}

//carrito de compra
// Agregar producto al carrito
function agregarAlCarrito(indice) {
  var producto = productos[indice];

  // Verificar si ya esta en el carrito
  var encontrado = -1;
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].nombre === producto.nombre) {
      encontrado = i;
    }
  }

  if (encontrado !== -1) {
    // Si ya existe, sumar 1
    carrito[encontrado].cantidad = carrito[encontrado].cantidad + 1;
    if (carrito[encontrado].cantidad > 10) {
      carrito[encontrado].cantidad = 10;
    }
  } else {
    // Si no existe, agregar nuevo
    carrito.push({
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }

  // Actualizar todo
  mostrarCarrito();
  mostrarToast();

  // Abrir el carrito
  var panel = new bootstrap.Offcanvas(document.getElementById("panelCarrito"));
  panel.show();
}

// Quitar producto del carrito
function quitarDelCarrito(indice) {
  carrito.splice(indice, 1);
  mostrarCarrito();
}

// Sumar productos
function sumarCantidad(indice) {
  carrito[indice].cantidad = carrito[indice].cantidad + 1;
  if (carrito[indice].cantidad > 10) {
    carrito[indice].cantidad = 10;
  }
  mostrarCarrito();
}

// Restar producto
function restarCantidad(indice) {
  carrito[indice].cantidad = carrito[indice].cantidad - 1;
  if (carrito[indice].cantidad <= 0) {
    quitarDelCarrito(indice);
    return;
  }
  mostrarCarrito();
}

//mostrar el carrito con sus compras en pantalla
function mostrarCarrito() {
  // Contar total de los productos
  var totalItems = 0;
  for (var i = 0; i < carrito.length; i++) {
    totalItems = totalItems + carrito[i].cantidad;
  }
  contadorCarrito.textContent = totalItems;

  // condicional de si el carro se encuentra vacio
  if (carrito.length === 0) {
    carritoVacio.classList.remove("d-none");
    pieCarrito.classList.add("d-none");

    // eliminar items pasados o viejos
    var viejos = itemsCarrito.getElementsByClassName("carrito-item");
    while (viejos.length > 0) {
      viejos[0].remove();
    }
    return;
  }

  // Si tiene productos
  carritoVacio.classList.add("d-none");
  pieCarrito.classList.remove("d-none");

  // restar items viejos
  var viejos = itemsCarrito.getElementsByClassName("carrito-item");
  while (viejos.length > 0) {
    viejos[0].remove();
  }

  // Agregar cada producto selecionado 
  for (var i = 0; i < carrito.length; i++) {
    var item = carrito[i];
    var subtotalItem = item.precio * item.cantidad;

    var div = document.createElement("div");
    div.className = "carrito-item";
    div.innerHTML =
      '<img src="' + item.imagen + '" alt="' + item.nombre + '">' +
      '<div class="carrito-item-info">' +
        '<div class="carrito-item-nombre">' + item.nombre + '</div>' +
        '<div class="carrito-item-precio">$' + subtotalItem.toFixed(2) + '</div>' +
        '<div class="carrito-item-cantidad">' +
          '<button onclick="restarCantidad(' + i + ')">-</button>' +
          '<span>' + item.cantidad + '</span>' +
          '<button onclick="sumarCantidad(' + i + ')">+</button>' +
        '</div>' +
      '</div>' +
      '<span class="carrito-item-borrar" onclick="quitarDelCarrito(' + i + ')">' +
        '<i class="bi bi-trash"></i>' +
      '</span>';

    itemsCarrito.appendChild(div);
  }

  // Calculo total
  var subtotal = 0;
  for (var i = 0; i < carrito.length; i++) {
    subtotal = subtotal + (carrito[i].precio * carrito[i].cantidad);
  }

  // CORREGIDO: antes decia "* 0.15" y usaba una variable "iva" que nunca
  // se habia declarado, lo que rompia toda la funcion con un ReferenceError.
  var impuesto = subtotal * 0.12;
  var total = subtotal + impuesto;

  textoSubtotal.textContent = "$" + subtotal.toFixed(2);
  textoImpuesto.textContent = "$" + impuesto.toFixed(2);
  textoTotal.textContent = "$" + total.toFixed(2);
}

//notificaciones en la pantalla
function mostrarToast() {
  var toast = new bootstrap.Toast(miToast);
  toast.show();
}

// Buscar al consultar dentro de los items 
formularioBusqueda.addEventListener("submit", function(e) {
  e.preventDefault();
  busquedaActual = campoBusqueda.value.trim().toLowerCase();
  filtrarProductos();
});

// Buscar mientras se esta escribiendo
campoBusqueda.addEventListener("input", function() {
  busquedaActual = campoBusqueda.value.trim().toLowerCase();
  filtrarProductos();
});

// busqueda por cada categoria
filtrosCategorias.addEventListener("click", function(e) {
  var boton = e.target.closest(".boton-categoria");
  if (boton === null) {
    return;
  }

  // Quitar active de todos
  var todos = filtrosCategorias.getElementsByClassName("boton-categoria");
  for (var i = 0; i < todos.length; i++) {
    todos[i].classList.remove("active");
    todos[i].classList.replace("btn-dark", "btn-outline-dark");
  }

  // Poner active al clickeado
  boton.classList.add("active");
  boton.classList.replace("btn-outline-dark", "btn-dark");

  // Filtrar
  categoriaActual = boton.getAttribute("data-categoria");
  filtrarProductos();
});

// Ordenar todos productos
ordenarPor.addEventListener("change", function() {
  ordenarProductos();
  filtrarProductos();
});

// Limpiar la barra busqueda
limpiarBusqueda.addEventListener("click", function() {
  campoBusqueda.value = "";
  busquedaActual = "";
  filtrarProductos();
});

// Vaciar el carrito
botonVaciar.addEventListener("click", function() {
  carrito = [];
  mostrarCarrito();
});

// Comprar
botonComprar.addEventListener("click", function() {
  var subtotal = 0;
  for (var i = 0; i < carrito.length; i++) {
    subtotal = subtotal + (carrito[i].precio * carrito[i].cantidad);
  }
  var impuesto = subtotal * 0.12;
  var total = subtotal + impuesto;

  alert("Compra realizada con exito!\n\nTotal: $" + total.toFixed(2) + "\nGracias por tu compra.");

  carrito = [];
  mostrarCarrito();

  // Cerrar el panel del carrito
  var panel = bootstrap.Offcanvas.getInstance(document.getElementById("panelCarrito"));
  if (panel) {
    panel.hide();
  }
});

//comenzar
filtrarProductos();