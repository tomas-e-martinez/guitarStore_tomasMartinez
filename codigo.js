class Guitarra {
  constructor(modelo, marca, precio, imagen) {
    this.modelo = modelo;
    this.marca = marca;
    this.precio = precio;
    this.imagen = imagen;
  }

  agregarAlCarrito(carrito) {
    carrito.push(this);
    cantidadBotonCarrito();
    guardarCarritoLocalStorage();
    Toastify({
      text: `${this.marca} ${this.modelo} añadida al carrito.`,
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "#5bc0de",
        'box-shadow': "-8px 9px 73px -14px rgba(0,0,0,0.46)",
      },
    }).showToast();
  }

}


let carrito = localStorage.getItem("carrito")? JSON.parse(localStorage.getItem("carrito")) : [];
let guitarrasEnVenta = [];

fetch('./guitarras.json')
.then(response => response.json())
.then(data => {
  guitarrasEnVenta = data.map(guitarra => new Guitarra(guitarra.modelo, guitarra.marca, guitarra.precio, guitarra.imagen));
})
.catch(error => {
  console.log('ERROR: No se pudieron cargar las guitarras:', error)
})

const guitarrasDiv =  document.getElementById("guitarrasDiv");

// BOTONES
const mostrarGuitarrasBtn = document.getElementById("mostrarGuitarrasBtn");
mostrarGuitarrasBtn.addEventListener("click", () => {mostrarGuitarras(guitarrasEnVenta, "En este momento contamos con "+guitarrasEnVenta.length+" guitarras disponibles:")})

const buscarPrecioMaximoBtn = document.getElementById("buscarPrecioMaximoBtn");
buscarPrecioMaximoBtn.addEventListener("click", buscarPrecioMaximoCrearInput);

const ordenarPorPrecioBtn = document.getElementById("ordenarPorPrecioBtn");
ordenarPorPrecioBtn.addEventListener("click", ordenarPorPrecio);

const buscarMarcaBtn = document.getElementById("buscarMarcaBtn");
buscarMarcaBtn.addEventListener("click", buscarMarcaCrearInput);

const carritoBtn = document.getElementById("carritoBtn");
carritoBtn.addEventListener("click", verCarrito);

cantidadBotonCarrito();

// FUNCIONES


function mostrarGuitarras(arrayGuitarras, mensaje){
  const p = document.createElement("p");
  const ul = document.createElement("ul");

  p.textContent = mensaje;
  arrayGuitarras.forEach(guitarra => {
    const {modelo, marca, precio, imagen} = guitarra
    const li = document.createElement("li");
    li.classList.add("contenedorGuitarra");

    const imgGuitarra = document.createElement("img");
    imgGuitarra.src = imagen;
    imgGuitarra.onerror = function() {
      this.src = "assets/img/guitarraPlaceholder.png";
    };    
    imgGuitarra.alt = "guitarraPlaceholder"
    imgGuitarra.classList.add("imgGuitarra");

    const pPrecioGuitarra = document.createElement("p");
    pPrecioGuitarra.textContent = `$${precio}`;
    pPrecioGuitarra.classList.add("precioGuitarra");

    const h1Guitarra = document.createElement("h1");
    h1Guitarra.textContent = `${marca} ${modelo}`
    h1Guitarra.classList.add("h1Guitarra");
  
    const button = document.createElement("button");
    button.textContent = "Agregar al carrito";
    button.classList.add("botonAgregarCarrito");
    button.addEventListener("click", () => {
      guitarra.agregarAlCarrito(carrito);
    })

    li.appendChild(h1Guitarra);
    li.appendChild(pPrecioGuitarra);
    li.appendChild(imgGuitarra);
    li.appendChild(button);
    ul.appendChild(li)});
  guitarrasDiv.innerHTML = '';
  guitarrasDiv.appendChild(p);
  guitarrasDiv.appendChild(ul);
}


function buscarPrecioMaximoCrearInput(){
  const p = document.createElement("p");
  p.innerText = "Ingrese el precio máximo deseado:";
  const input = document.createElement("input");
  input.type = "number";
  const button = document.createElement("button");
  button.textContent = "Buscar";
  button.addEventListener("click", buscarPrecioMaximo);
  input.addEventListener("keydown", function(event){
    if(event.key === "Enter") {buscarPrecioMaximo();}
  })
  guitarrasDiv.innerHTML = '';
  guitarrasDiv.appendChild(p);
  guitarrasDiv.appendChild(input);
  guitarrasDiv.appendChild(button);
  function buscarPrecioMaximo(){
    let precioMaximo = input.value;
    if(precioMaximo == false){
      p.innerText = "ERROR: Ingrese un precio válido.";
      button.textContent = "Volver"
      button.addEventListener("click", buscarPrecioMaximoCrearInput);
      guitarrasDiv.innerHTML = '';
      guitarrasDiv.appendChild(p);
      guitarrasDiv.appendChild(button);
    } else {
      const guitarrasPrecioMaximo = guitarrasEnVenta.filter((guitarra) => guitarra.precio <= precioMaximo);
      if(guitarrasPrecioMaximo.length === 0){
        p.innerText = `No encontramos guitarras con valor de $${precioMaximo} o menos.`
        button.textContent = "Volver"
        button.addEventListener("click", buscarPrecioMaximoCrearInput);
        guitarrasDiv.innerHTML = '';
        guitarrasDiv.appendChild(p);
        guitarrasDiv.appendChild(button);
      } else {
        mostrarGuitarras(guitarrasPrecioMaximo, `Encontramos ${guitarrasPrecioMaximo.length} guitarra/s de hasta $${precioMaximo}.`);
      }}

  }
} 

function ordenarPorPrecio(){
  guitarrasEnVenta.sort((a, b) => a.precio - b.precio);
  const p = document.createElement("p");
  p.textContent = "Las guitarras fueron ordenadas por precio de menor a mayor.";
  guitarrasDiv.innerHTML = '';
  guitarrasDiv.appendChild(p);
}

function buscarMarcaCrearInput(){
  const p = document.createElement("p");
  p.innerText = "Ingrese la marca (Ejemplos: Fender, Gibson, etc.):";
  const input = document.createElement("input");
  input.type = "text";
  const button = document.createElement("button");
  button.textContent = "Buscar";
  button.addEventListener("click", buscarMarca);
  input.addEventListener("keydown", function(event){
    if(event.key === "Enter") {buscarMarca();}
  })
  guitarrasDiv.innerHTML = '';
  guitarrasDiv.appendChild(p);
  guitarrasDiv.appendChild(input);
  guitarrasDiv.appendChild(button);
  function buscarMarca(){
    let marcaBuscada = input.value;
    const p = document.createElement("p");
    const guitarrasMarcaBuscada = guitarrasEnVenta.filter((guitarra) => guitarra.marca.toLowerCase() === marcaBuscada.toLowerCase());
    if(guitarrasMarcaBuscada.length === 0){
      p.innerText = `No encontramos guitarras de la marca "${marcaBuscada}".`
      button.textContent = "Volver"
      button.addEventListener("click", buscarMarcaCrearInput);
      guitarrasDiv.innerHTML = '';
      guitarrasDiv.appendChild(p);
      guitarrasDiv.appendChild(button);
    } else {
      mostrarGuitarras(guitarrasMarcaBuscada, `Encontramos ${guitarrasMarcaBuscada.length} guitarra/s de la marca "${marcaBuscada}".`)
    }
  }
}

function verCarrito() {
  cantidadBotonCarrito();
  const precioTotal = carrito.reduce((acumulador, guitarra) => acumulador + guitarra.precio, 0);
  const p = document.createElement("p");
  if (carrito.length == 0){
  const button = document.createElement("button")
  p.innerText = "Su carrito se encuentra vacío.";
  button.textContent = "Ver guitarras en venta"
  button.addEventListener("click", () => {mostrarGuitarras(guitarrasEnVenta, "En este momento contamos con "+guitarrasEnVenta.length+" guitarras disponibles:")});
  
  guitarrasDiv.innerHTML = '';
  guitarrasDiv.appendChild(p);
  guitarrasDiv.appendChild(button);
  } else {
    p.innerText = `Hay ${carrito.length} guitarras en el carrito.`;
    const pTotal = document.createElement("p");
    pTotal.innerText = `Total: $${precioTotal}`
    const vaciarCarritoBtn = document.createElement("button");
    vaciarCarritoBtn.textContent = "Vaciar carrito"
    vaciarCarritoBtn.addEventListener("click", () => {
      vaciarCarrito();
      toastifyVaciarCarrito();
    })
    const finalizarCompraBtn = document.createElement("button");
    finalizarCompraBtn.textContent = "Finalizar compra";
    finalizarCompraBtn.addEventListener("click", finalizarCompra)
    
    const ul = document.createElement("ul");
    carrito.forEach(guitarra => {
      const li = document.createElement("li");
      li.textContent = `${guitarra.marca} ${guitarra.modelo} - Precio $${guitarra.precio}`;

      const eliminarDelCarritoBtn = document.createElement("button");
      eliminarDelCarritoBtn.textContent = "Eliminar del carrito";
      eliminarDelCarritoBtn.addEventListener("click", () => {
        eliminarDelCarrito(guitarra, carrito);
        verCarrito(carrito);
      })

      li.appendChild(eliminarDelCarritoBtn);
      ul.appendChild(li);
      guitarrasDiv.innerHTML = '';
      guitarrasDiv.appendChild(p);
      guitarrasDiv.appendChild(ul);
      guitarrasDiv.appendChild(pTotal);
      guitarrasDiv.appendChild(vaciarCarritoBtn);
      guitarrasDiv.appendChild(finalizarCompraBtn);
    })   
  }
}

function eliminarDelCarrito(guitarra, carrito) {
  const index = carrito.findIndex(item => item === guitarra);
  if (index !== -1) {
    carrito.splice(index, 1);
    guardarCarritoLocalStorage();
    Toastify({
      text: `${guitarra.marca} ${guitarra.modelo} eliminada del carrito.`,
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "#f0ad4e",
        'box-shadow': "-8px 9px 73px -14px rgba(0,0,0,0.46)",
      },
    }).showToast();
  }
}


function guardarCarritoLocalStorage(){
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

function vaciarCarrito(){
  localStorage.removeItem("carrito");
  carrito = [];
  verCarrito();
}

function toastifyVaciarCarrito() {
  Toastify({
    text: `El carrito fue vaciado.`,
    duration: 3000,
    gravity: "top",
    position: "right",
    style : {
      background: "white",
      color: "black",
      'box-shadow': "-8px 9px 73px -14px rgba(0,0,0,0.46)",
    },
  }).showToast();
}

function finalizarCompra(){
  Swal.fire({
    icon: 'question',
    title: 'Confirmar compra',
    text: '¿Está seguro/a de realizar esta compra?',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Comprar',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      vaciarCarrito();
      guitarrasDiv.innerHTML = '';
      Swal.fire('¡Compra realizada con éxito!', 'Su pedido ha sido confirmado. ¡Disfrute de su compra!', 'success')
    }
  })
}

function cantidadBotonCarrito(){
  carrito.length > 0 ? carritoBtn.value = `Carrito (${carrito.length})` : carritoBtn.value = "Carrito";
}
