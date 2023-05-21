class Guitarra {
  constructor(modelo, marca, precio) {
    this.modelo = modelo;
    this.marca = marca;
    this.precio = precio;
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

let guitarrasEnVenta = [guitarra1, guitarra2, guitarra3, guitarra4, guitarra5, guitarra6, guitarra7];
cargarGuitarrasLocalStorage();
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

const agregarGuitarraBtn = document.getElementById("agregarGuitarraBtn");
agregarGuitarraBtn.addEventListener("click", agregarGuitarraCrearInput);

const eliminarGuitarrasBtn = document.getElementById("eliminarGuitarrasBtn");
eliminarGuitarrasBtn.addEventListener("click", eliminarGuitarrasLocalStorage);

// FUNCIONES
function mostrarGuitarras(){
  const ul = document.createElement("ul");
  const p = document.createElement("p");
  p.textContent = "En este momento contamos con "+guitarrasEnVenta.length+" guitarras disponibles:";
  guitarrasEnVenta.forEach(guitarra => {
    const li = document.createElement("li");
    li.textContent= `${guitarra.marca} ${guitarra.modelo} - Precio $${guitarra.precio}`;
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
      li.textContent= `${guitarra.marca} ${guitarra.modelo} - Precio $${guitarra.precio}`;
      ul.appendChild(li);
      guitarrasDiv.innerHTML = '';
      guitarrasDiv.appendChild(p);
      guitarrasDiv.appendChild(ul);
    })}
  }
}

function agregarGuitarraCrearInput(){
  guitarrasDiv.innerHTML = '';
  const p = document.createElement("p");
  p.innerText = "Ingrese los datos de la guitarra a agregar:"
  guitarrasDiv.appendChild(p);
  const marcaInput = document.createElement('input');
  marcaInput.type = 'text';
  marcaInput.id = 'marcaInput';
  marcaInput.placeholder = 'Marca';
  guitarrasDiv.appendChild(marcaInput);
  const modeloInput = document.createElement('input');
  modeloInput.type = 'text';
  modeloInput.id = 'modeloInput';
  modeloInput.placeholder = 'Modelo';
  guitarrasDiv.appendChild(modeloInput);
  const precioInput = document.createElement('input');
  precioInput.type = 'number';
  precioInput.id = 'precioInput';
  precioInput.placeholder = 'Precio';
  guitarrasDiv.appendChild(precioInput);
  const botonAgregar = document.createElement('button');
  botonAgregar.textContent = 'Agregar';
  botonAgregar.addEventListener('click', agregarGuitarra);
  guitarrasDiv.appendChild(botonAgregar);
  function agregarGuitarra(){ 
    const marca = document.getElementById('marcaInput').value;
    const modelo = document.getElementById('modeloInput').value;
    const precio = document.getElementById('precioInput').value;
    if(marca == false || modelo == false || precio == false) {
      const p = document.createElement("p");
      p.innerText = `ERROR: Ingrese datos válidos.`;
      const button = document.createElement("button");
      button.textContent = "Volver"
      button.addEventListener("click", agregarGuitarraCrearInput);
      guitarrasDiv.innerHTML = '';
      guitarrasDiv.appendChild(p);
      guitarrasDiv.appendChild(button)
    } else {
      const nuevaGuitarra = new Guitarra(modelo, marca, precio);
      guitarrasEnVenta.push(nuevaGuitarra);
      const p = document.createElement("p");
      p.innerText = `La guitarra ${marca} ${modelo} con valor de $${precio} fue agregada con éxito`;
      guitarrasDiv.innerHTML = '';
      guitarrasDiv.appendChild(p);}
      guardarGuitarrasLocalStorage();
  }
}

function guardarGuitarrasLocalStorage(){
  localStorage.setItem('guitarrasEnVenta', JSON.stringify(guitarrasEnVenta));
}

function cargarGuitarrasLocalStorage(){
  const guitarrasGuardadas = localStorage.getItem('guitarrasEnVenta');
  if (guitarrasGuardadas) {
    guitarrasEnVenta = JSON.parse(guitarrasGuardadas);
  }
}

function eliminarGuitarrasLocalStorage(){
  const p = document.createElement("p");
  if(localStorage.getItem("guitarrasEnVenta")){
    localStorage.removeItem("guitarrasEnVenta");
    p.innerText = "Las guitarras que agregaste fueron eliminadas con éxito. \n Por favor, actualiza la página para visualizar la tienda correctamente."
    const button = document.createElement("button");
    button.textContent = "Actualizar";
    button.addEventListener("click", actualizarPagina)
    guitarrasDiv.innerHTML = '';
    guitarrasDiv.appendChild(p);
    guitarrasDiv.appendChild(button);
  } else {
    p.innerText = "No hay guitarras agregadas."
    guitarrasDiv.innerHTML = '';
    guitarrasDiv.appendChild(p);
  }
}

function actualizarPagina(){
  location.reload();
}