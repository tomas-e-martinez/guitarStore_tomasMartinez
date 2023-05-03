const guitarra1 = {
    modelo: "Stratocaster",
    marca: "Fender",
    precio: 1500
  }
const guitarra2 = {
    modelo: "Telecaster",
    marca: "Fender",
    precio: 1000
  }
const guitarra3 = {
    modelo: "Les Paul",
    marca: "Gibson",
    precio: 2000
  }
const guitarra4 = {
    modelo: "SG",
    marca: "Gibson",
    precio: 1800
  }
const guitarra5 = {
    modelo: "Mustang",
    marca: "Squier",
    precio: 500
  }
const guitarra6 = {
    modelo: "G5427T",
    marca: "Gretsch",
    precio: 1200
  }
const guitarra7 = {
    modelo: "RG6003FM",
    marca: "Ibanez",
    precio: 400
  }

const guitarrasEnVenta = [guitarra1, guitarra2, guitarra3, guitarra4, guitarra5, guitarra6, guitarra7];

function mostrarGuitarras() {
    let mensaje = "En este momento, contamos con "+guitarrasEnVenta.length+" guitarras en venta:\n\n";
    guitarrasEnVenta.forEach((guitarra, index) => mensaje += (index + 1)+". "+guitarra.marca+" "+guitarra.modelo+" - Precio : $"+guitarra.precio+".\n")
    alert(mensaje);
}

function buscarPrecioMaximo() {
    let precioMaximo = prompt("Ingrese el precio máximo deseado:");
    const guitarrasPrecioMaximo = guitarrasEnVenta.filter((guitarra) => guitarra.precio <= precioMaximo);
    let mensaje = "Encontramos "+guitarrasPrecioMaximo.length+" guitarra/s de hasta $"+precioMaximo+".\n\n";
    guitarrasPrecioMaximo.forEach((guitarra, index) => mensaje += (index + 1)+". "+guitarra.marca+" "+guitarra.modelo+" - Precio : $"+guitarra.precio+".\n");
    if(guitarrasPrecioMaximo.length===0){
        alert("No encontramos guitarras que se ajusten a su presupuesto.")
    } else
    alert(mensaje);
}

function ordenarPorPrecio() {
    guitarrasEnVenta.sort((a, b) => a.precio - b.precio);
    alert("Las guitarras fueron ordenadas por precio de menor a mayor.")
}

function buscarMarca() {
    let marcaBuscada = prompt("Ingrese la marca (Ej.: Gibson, Fender):");
    const guitarrasBuscarMarca = guitarrasEnVenta.filter((guitarra) => guitarra.marca.toLowerCase() === marcaBuscada.toLowerCase());
    let mensaje = "Encontramos "+guitarrasBuscarMarca.length+" guitarra/s de la marca "+marcaBuscada+":\n\n";
    guitarrasBuscarMarca.forEach((guitarra, index) => mensaje += (index + 1)+". "+guitarra.marca+" "+guitarra.modelo+" - Precio : $"+guitarra.precio+".\n");
    if(guitarrasBuscarMarca.length===0){
        alert("No encontramos guitarras de la marca "+marcaBuscada+".")
    } else
    alert(mensaje);
}

function agregarGuitarra() {
    const marca = prompt("Ingrese la marca de la guitarra:");
    const modelo = prompt("Ingrese el modelo de la guitarra:");
    const precio = Number(prompt("Ingrese el precio de la guitarra:"));
    const nuevaGuitarra = {modelo, marca, precio};
    guitarrasEnVenta.push(nuevaGuitarra);
    alert("La guitarra "+marca+" "+modelo+" con precio $"+precio+" fue agregada a la tienda.");
}

function menuPrincipal(){
    let verMenu = true;
    let opcion;
    do {
        opcion = prompt("Bienvenido/a a la tienda de guitarras.\nSeleccione una opción:\n\n1. Ver guitarras en venta\n2. Buscar por marca\n3. Ordenar por precio\n4. Agregar guitarra\n5. Buscar por precio máximo\n6. Salir");
        switch(opcion) {
            case "1":
                mostrarGuitarras();
                break;
            case "2":
                buscarMarca();
                break;
            case "3":
                ordenarPorPrecio();
                break;
            case "4":
                agregarGuitarra();
                break;
            case "5":
                buscarPrecioMaximo();
                break;
            case "6":
                alert("¡Gracias por visitarnos!");
                verMenu=false;
                break;
            default:
                alert("Ingrese un número válido.")
        }
    } while(verMenu)
}

menuPrincipal()