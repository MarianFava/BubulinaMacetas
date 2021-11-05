//En esta variable se acumula todo lo que se agrega al carrito//
let carrito = [];
let totalCarrito = 0;
let totalConDescuento = 0;

//Declaración de clase producto para creación de Macetas
class Producto {
    constructor(nombre, precio, color, tamanio, imagen, porcDescuento = 0) {
        this.nombre = nombre;
        this.precio = precio;
        this.color = color;
        this.tamanio = tamanio;
        this.porcDescuento = porcDescuento;
        this.imagen = imagen;
    }
    //Método para calcular descuento//Método:función que sólo se aplica dentro del objeto
    descuento() {
        return this.precio * this.porcDescuento / 100;
    }
    aplicarDescuento() {
        //Precio con descuento aplicado//
        return this.precio * (100 - this.porcDescuento) / 100;
    }
}
//Se define una clase para representar los items en carrito
class ItemCarrito {
    constructor(producto, cantidad = 0) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
    incrementar(cantidad) {
        this.cantidad += cantidad;
    }
    decrementar() {
        if (this.cantidad > 0) {
            this.cantidad--;
        }
    }
}
//Función que permite seleccionar productos para agregar al carrito
function agregarAlCarrito(producto) {
    let productoSeleccionado;

    //Se busca el producto seleccionado en el array de Items(ItemCarrito)
    productoSeleccionado = carrito.find(itemCarrito => itemCarrito.producto.nombre.toUpperCase() == producto);
    productoSeleccionado.incrementar(1);
    //Local Storage y JSON
    localStorage.setItem("Carrito Storage", JSON.stringify(carrito));
}

//Función para totalizar precio segun productos y cantidad ingresadas
function calcularTotalCarrito() {
    totalConDescuento = 0;
    totalCarrito = 0;
    for (productoCarrito of carrito) {
        if (productoCarrito.cantidad > 0) {
            //console.log(productoCarrito.producto.nombre + " Cantidad: " + productoCarrito.cantidad);
            totalConDescuento = totalConDescuento + productoCarrito.producto.aplicarDescuento() * productoCarrito.cantidad;
            totalCarrito = totalCarrito + productoCarrito.producto.precio * productoCarrito.cantidad;
        }
    }
}
//Función para visualizar total del carrito
function visualizarTotalCarrito() {
    let carritoDom = document.getElementById("carrito");
    carritoDom.innerHTML = `El total de su compra es $${totalCarrito}. \nEl total con descuentos es $${totalConDescuento}`;
}
//Bloque principal
/*Se asegura que la ejecución ppal de la aplicación 
suceda cuando la página esté cargada*/
$(document).ready(function () {
    console.log("El DOM esta listo");
    //Instanciación de objetos tipo Producto(distintas macetas)
    let carritoStorage = JSON.parse(localStorage.getItem("Carrito Storage")) || [];
    console.log(carritoStorage);
    if (carritoStorage.length > 0) {

        for (let item of carritoStorage) {
            carrito.push(new ItemCarrito(new Producto(item.producto.nombre, item.producto.precio, item.producto.color, item.producto.tamanio,
                item.producto.imagen, item.producto.porcDescuento), item.cantidad));
        }
        calcularTotalCarrito();
        visualizarTotalCarrito();
    }
    else {
        carrito.push(new ItemCarrito(new Producto("Maceta Buda", 300, "Dorado", "Mediano", "./media/BudaDorado.jpg", 0)));
        carrito.push(new ItemCarrito(new Producto("Maceta Cactus", 200, "Verde", "Pequeño", "./media/Cactus.jpg", 0)));
        carrito.push(new ItemCarrito(new Producto("Maceta Gatito", 300, "Gris", "Mediano", "./media/Gato.jpg", 10)));
        carrito.push(new ItemCarrito(new Producto("Maceta Llama", 300, "Turquesa", "Mediano", "./media/LlamaTurquesa.jpg", 5)));
        carrito.push(new ItemCarrito(new Producto("Pink Floyd", 300, "Negro", "Mediano", "./media/LadoOscuro.jpg", 5)));
        carrito.push(new ItemCarrito(new Producto("Geometrica", 200, "Lila", "Pequeño", "./media/FormasLila.jpg")));
        carrito.push(new ItemCarrito(new Producto("Llama Celeste", 350, "Celeste", "Grande", "./media/LlamaCeleste.jpg")));
        carrito.push(new ItemCarrito(new Producto("Llama Rosa", 300, "Rosa", "Mediano", "./media/LlamaRosa2.jpg")));
        carrito.push(new ItemCarrito(new Producto("Lunares", 300, "Rosa", "Mediano", "./media/redondaLunares.jpeg")));
        carrito.push(new ItemCarrito(new Producto("Ojos", 300, "Blanca", "Mediano", "./media/ojos.jpeg")));
        carrito.push(new ItemCarrito(new Producto("Hexagonal", 200, "Multicolor", "Pequeño", "./media/hexagonal.jpeg")));
        carrito.push(new ItemCarrito(new Producto("Universo", 200, "Negro", "Pequeño", "./media/RedondaUniverso.jpg")));
    }

    //Se obtiene el elemento main con ID "productos"
    let listaProductos = document.getElementById("productos");
    //Creación de cards
    for (let i = 0; i < carrito.length; i++) {
        //Creacion de elemento "div" para las cards (Manipulando el Dom)
        let card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("border-3");

        card.innerHTML = `<img
    src="${carrito[i].producto.imagen}"
    class="card-img-top"
    alt="${carrito[i].producto.nombre}"
  />
  <div class="card-body">
    <h5 class="card-title">${carrito[i].producto.nombre.toUpperCase()}</h5>
    <p class="card-text">${carrito[i].producto.nombre} Tamaño:${carrito[i].producto.tamanio} </p>
    <p class="card-text">
      <small class="text-muted">Precio: $${carrito[i].producto.precio}</small>
    </p>

  </div>`;
        //Se crea el botón comprar
        let btnComprar = document.createElement("button");
        //Se le agrega la clase al botón "Comprar"
        btnComprar.classList.add("btnComprar");
        //Se le agrega el texto al botón
        btnComprar.innerText = "Comprar";
        //Agrego el botón comprar a la card 
        card.append(btnComprar);
        listaProductos.append(card);
    }
    //Se incorpora evento con jQuery/Captura de evento click en botones comprar
    $(".btnComprar").on("click", (evento) => {
        agregarAlCarrito(evento.currentTarget.parentNode.children[1].children[0].innerText);
        calcularTotalCarrito();
        visualizarTotalCarrito();
    });
})
