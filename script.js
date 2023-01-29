const TodosLosProductos = [
  {
    nombre: "S Galaxy A53",
    precio: 245000,
    caract: "4G",
    img: "https://tienda.movistar.com.ar/media/catalog/product/s/5/s53-negro-frente_1_1.png",
    id: 1,
    cantidad: 1,
  },
  {
    nombre: "S Galaxy A03",
    precio: 300000,
    caract: "5G",
    img: "https://tienda.personal.com.ar/images/Samsung_Galaxy_A03_Azul_Frente_min_9ae47d8c3c.png",
    id: 2,
    cantidad: 1,
  },
  {
    nombre: "S Galaxy A22 ",
    precio: 530000,
    caract: "4G",
    img: "https://tienda.movistar.com.ar/media/catalog/product/a/2/a22-gris-frente.png",
    id: 3,
    cantidad: 1,
  },
  {
    nombre: "S Galaxy A03 Core",
    precio: 950000,
    caract: "5G",
    img: "https://tienda.movistar.com.ar/media/catalog/product/a/0/a03-negro-frente_2.png",
    id: 4,
    cantidad: 1,
  },
  {
    nombre: "S Galaxy A13",
    precio: 245000,
    caract: "5G",
    img: "https://tienda.movistar.com.ar/media/catalog/product/a/1/a13-negro-frente.png",
    id: 5,
    cantidad: 1,
  },
  {
    nombre: "S Galaxy A23",
    precio: 700000,
    caract: "4G",
    img: "https://tienda.movistar.com.ar/media/catalog/product/a/2/a23-negro-frente.png",
    id: 6,
    cantidad: 1,
  },
  {
    nombre: "S Galaxy A04S",
    precio: 320000,
    caract: "5G",
    img: "https://tienda.movistar.com.ar/media/catalog/product/cache/29ccbb5c02aec1862b4f5a57a55d0f2f/f/r/frente_14.png",
    id: 7,
    cantidad: 1,
  },
  {
    nombre: "S Galaxy A33 ",
    precio: 530000,
    caract: "4G",
    img: "https://tienda.movistar.com.ar/media/catalog/product/cache/29ccbb5c02aec1862b4f5a57a55d0f2f/a/3/a33-negro-frente.png",
    id: 8,
    cantidad: 1,
  },
  {
    nombre: "S Galaxy A30",
    precio: 900000,
    caract: "5G",
    img: "https://catalogo.movistar.com.pe/ArchivosUsuario/EquipoCaracteristica/galaxy-a30_1187_Imagen.png",
    id: 9,
    cantidad: 1,
  },
  {
    nombre: "S Galaxy A32",
    precio: 740000,
    caract: "4G",
    img: "https://catalogo.movistar.com.pe/ArchivosUsuario/EquipoCaracteristica/samsung-galaxy-a32_2261348_Imagen.png",
    id: 10,
    cantidad: 1,
  },
  {
    nombre: "S Galaxy A21s",
    precio: 335000,
    caract: "5G",
    img: "https://catalogo.movistar.com.pe/ArchivosUsuario/ImagenEquipo/galaxy-a21s_40064293_Big_Imagen.png",
    cantidad: 1,
    id: 11,
  },
  {
    nombre: "S Galaxy A51",
    precio: 790000,
    caract: "4G",
    img: "https://catalogo.movistar.com.pe/ArchivosUsuario/EquipoCaracteristica/galaxy-a51_1327_Imagen.png",
    id: 12,
    cantidad: 1,
  },
];
// -----------------------------CONSTANTTES------------------------------------------------

let carrito = [];
const contenedor = document.getElementById("contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const procesarCompra = document.querySelector("#comprar");
const containerNoti = document.querySelector("#containerNoti");
const btnAceptar = document.querySelector("#btnAceptar");

// -------------------------------------------------------------------------------------------



document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  mostrarCarrito();
});

TodosLosProductos.forEach((producto) => {
  const { id, nombre, precio, img, caract } = producto;
  contenedor.innerHTML += `<div class="card" style="width: 18rem;">
  <img src="${img}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">Características: ${caract}</p>
    <p class="card-text">Precio: $${precio}</p>
    
<button onclick="agregarProducto(${id})" class="btn btn-primary">Agregar al carrito</button>
  </div>
</div>`;
});

procesarCompra.addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire({
      title: "Error",
      icon: "error",
      text: "No tienes nada en tu carrito!",
    });
    carrito.length = [];
    mostrarCarrito();
  } else {
    
    let timerInterval
Swal.fire({
  title: 'Procesando compra',
 
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {

  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})

 setTimeout(() => {
  Swal.fire({
    title: "Enhorabuena",
    icon: "success",
    text: "Compra realizada con éxito", 
      
  });
 }, 1000);
    carrito.length = [];
    mostrarCarrito();
    
  }
});
vaciarCarrito.addEventListener("click", () => {
  carrito.length = [];
  mostrarCarrito();
});

const agregarProducto = (id) => {
  const existe = carrito.some((producto) => producto.id === id);

  if (existe) {
    const producto = carrito.map((producto) => {
      if (producto.id === id) {
        producto.cantidad++;
      }
    });
  } else {
    const item = TodosLosProductos.find((producto) => producto.id === id);
    carrito.push(item);
  }

  mostrarCarrito();
};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");

  modalBody.innerHTML = "";

  carrito.forEach((producto) => {
    const { id, nombre, img, cantidad, precio } = producto;
    modalBody.innerHTML += `
<div class="modal-contenedor">
<div>
<img class="img-fluid img-carrito" src="${img}"
</div>

<div>
<p>Producto: ${nombre}</p>
<p>Precio: $${precio}</p>
<p>Cantidad: ${cantidad}</p>

<button onclick="eliminarProducto(${id})" class="btn btn-danger" >Eliminar producto</button>
</div>
</div>
`;
  });

  if (carrito.length === 0) {
    modalBody.innerHTML = `<p class="text-center text-danger parrafo">Carrito vacío!!</p>`;
  }

  carritoContenedor.textContent = carrito.length;

  precioTotal.innerText = `$${carrito.reduce(
    (acc, producto) => acc + producto.cantidad * producto.precio,
    0
  )}`;

  guardarStorage();
};

const eliminarProducto = (id) => {
  const celularId = id;
  carrito = carrito.filter((celular) => celular.id !== celularId);
  mostrarCarrito();
};

const guardarStorage = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
