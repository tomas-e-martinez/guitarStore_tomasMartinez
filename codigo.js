class Guitarra {
  constructor(modelo, marca, precio) {
    this.modelo = modelo;
    this.marca = marca;
    this.precio = precio;
  }

  agregarAlCarrito(carrito) {
    carrito.push(this);
    guardarCarritoLocalStorage();
  }

}

// GUITARRAS DEFAULT DE LA TIENDA
const guitarra1 = new Guitarra("Stratocaster", "Fender", 1500);
const guitarra2 = new Guitarra("Telecaster", "Fender", 1000);
const guitarra3 = new Guitarra("Les Paul", "Gibson", 2000);
const guitarra4 = new Guitarra("SG", "Gibson", 1800);
const guitarra5 = new Guitarra("Mustang", "Squier", 500);
const guitarra6 = new Guitarra("G5427T", "Gretsch", 1200);
const guitarra7 = new Guitarra("RG6003FM", "Ibanez", 400);

let carrito = localStorage.getItem("carrito")? JSON.parse(localStorage.getItem("carrito")) : [];
let guitarrasEnVenta = [guitarra1, guitarra2, guitarra3, guitarra4, guitarra5, guitarra6, guitarra7];
const guitarrasDiv =  document.getElementById("guitarrasDiv");

// BOTONES
const mostrarGuitarrasBtn = document.getElementById("mostrarGuitarrasBtn");
mostrarGuitarrasBtn.addEventListener("click", mostrarGuitarras)

const buscarPrecioMaximoBtn = document.getElementById("buscarPrecioMaximoBtn");
buscarPrecioMaximoBtn.addEventListener("click", buscarPrecioMaximoCrearInput);

const ordenarPorPrecioBtn = document.getElementById("ordenarPorPrecioBtn");
ordenarPorPrecioBtn.addEventListener("click", ordenarPorPrecio);

const buscarMarcaBtn = document.getElementById("buscarMarcaBtn");
buscarMarcaBtn.addEventListener("click", buscarMarcaCrearInput);

const carritoBtn = document.getElementById("carritoBtn");
carritoBtn.addEventListener("click", verCarrito);

// FUNCIONES
function mostrarGuitarras(){
  const ul = document.createElement("ul");
  const p = document.createElement("p");
  p.textContent = "En este momento contamos con "+guitarrasEnVenta.length+" guitarras disponibles:";
  guitarrasEnVenta.forEach(guitarra => {
    const li = document.createElement("li");
    li.textContent= `${guitarra.marca} ${guitarra.modelo} - Precio $${guitarra.precio}`;

    const button = document.createElement("button");
    button.textContent = "Agregar al carrito";
    button.addEventListener("click", () => {
      guitarra.agregarAlCarrito(carrito);
      console.log(carrito);
    })

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
      p.textContent = `Encontramos ${guitarrasPrecioMaximo.length} guitarra/s de hasta $${precioMaximo}.`;
      const ul = document.createElement("ul");
      guitarrasPrecioMaximo.forEach(guitarra => {
        const li = document.createElement("li");
        li.textContent= `${guitarra.marca} ${guitarra.modelo} - Precio $${guitarra.precio}`;
        
        const button = document.createElement("button");
        button.textContent = "Agregar al carrito";
        button.addEventListener("click", () => {
        guitarra.agregarAlCarrito(carrito);
        console.log(carrito);
        })

        li.appendChild(button);
        ul.appendChild(li);
        guitarrasDiv.innerHTML = '';
        guitarrasDiv.appendChild(p);
        guitarrasDiv.appendChild(ul);
      })}}

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
    p.textContent = `Encontramos ${guitarrasMarcaBuscada.length} guitarra/s de la marca "${marcaBuscada}".`;
    const ul = document.createElement("ul");
    guitarrasMarcaBuscada.forEach(guitarra => {
      const li = document.createElement("li");
      li.textContent = `${guitarra.marca} ${guitarra.modelo} - Precio $${guitarra.precio}`;

      const button = document.createElement("button");
      button.textContent = "Agregar al carrito";
      button.addEventListener("click", () => {
      guitarra.agregarAlCarrito(carrito);
      })

      li.appendChild(button);
      ul.appendChild(li);
      guitarrasDiv.innerHTML = '';
      guitarrasDiv.appendChild(p);
      guitarrasDiv.appendChild(ul);
    })}
  }
}

function verCarrito() {
  const precioTotal = carrito.reduce((acumulador, guitarra) => acumulador + guitarra.precio, 0);
  const p = document.createElement("p");
  if (carrito.length == 0){
  const button = document.createElement("button")
  p.innerText = "Su carrito se encuentra vacío.";
  button.textContent = "Ver guitarras en venta"
  button.addEventListener("click", mostrarGuitarras);
  
  guitarrasDiv.innerHTML = '';
  guitarrasDiv.appendChild(p);
  guitarrasDiv.appendChild(button);
  } else {
    p.innerText = `Hay ${carrito.length} guitarras en el carrito.`;
    const pTotal = document.createElement("p");
    pTotal.innerText = `Total: $${precioTotal}`
    const vaciarCarritoBtn = document.createElement("button");
    vaciarCarritoBtn.textContent = "Vaciar carrito"
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito)
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
  }
}

/* 
function actualizarPagina(){
  location.reload();
} */

function guardarCarritoLocalStorage(){
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

function vaciarCarrito(){
  localStorage.removeItem("carrito");
  carrito = [];
  verCarrito();
}

function finalizarCompra(){
  console.log("compra finalizada");
  vaciarCarrito();
}
