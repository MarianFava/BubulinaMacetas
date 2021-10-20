//En esta variable se acumula todo lo que se agrega al carrito//
let carrito = [];
let totalCarrito = 0;
let totalConDescuento = 0;

//Declaración de clase producto para creación de Macetas
class Producto {
    constructor(nombre, precio, color, tamanio, porcDescuento = 0) {
        this.nombre = nombre;
        this.precio = precio;
        this.color = color;
        this.tamanio = tamanio;
        this.porcDescuento = porcDescuento;
    }
    //Método para calcular descuento//
    descuento() {
        return this.precio * this.porcDescuento/100;
    }
    aplicarDescuento() {
        //Precio con descuento aplicado//
        return this.precio * (100 - this.porcDescuento) / 100;
    }
}

//Se define una clase para representar los items en carrito
class ItemCarrito{
    constructor(producto){
        this.producto = producto;
        this.cantidad = 0;
    }

    incrementar(cantidad){
        this.cantidad += cantidad;
    }

    decrementar(){
        if (this.cantidad > 0 ){
            this.cantidad--;            
        }
    }

}
//Funcion que permite seleccionar productos para agregar al carrito
function agregarAlCarrito(){
    let otroProducto;
    let producto;
    let cantidad;
    let productoSeleccionado;
    
    do{
        //Se ingresa producto seleccionado
        producto = prompt("Ingrese el producto");
        //Se busca el producto seleccionado en el array de Items(ItemCarrito)
        productoSeleccionado = carrito.find( itemCarrito => itemCarrito.producto.nombre == producto) ;
        cantidad = 0;
        
        if ( productoSeleccionado ){
            cantidad = parseInt(prompt("Ingrese cantidad"));
        }else {
            alert("No existe el producto");
            otroProducto = confirm("¿Queres agregar otro producto?");
            if(otroProducto){
                continue;
            }else{
                break;
            }
        }   
        productoSeleccionado.incrementar(cantidad);
        otroProducto = confirm("¿Queres agregar otro producto?");
        
    }while(otroProducto)
    
}
//Funcion para totalizar precio segun productos y cantidad ingresadas
function calcularTotalCarrito(){
    for ( productoCarrito of carrito){
        if ( productoCarrito.cantidad > 0){
            console.log(productoCarrito.producto.nombre + " Cantidad: " + productoCarrito.cantidad);
            totalConDescuento = totalConDescuento + productoCarrito.producto.aplicarDescuento() * productoCarrito.cantidad;
            totalCarrito = totalCarrito + productoCarrito.producto.precio * productoCarrito.cantidad;
        }
    }

}
//Bloque principal
//Instanciación de objetos tipo Producto(distintas macetas)
carrito.push(new ItemCarrito(new Producto("Maceta Buda", 300, "Dorado", "Mediano", 0)));
carrito.push(new ItemCarrito(new Producto("Maceta Gatito", 300, "Gris", "Mediano", 10)));
carrito.push(new ItemCarrito(new Producto("Maceta Cactus", 200, "Verde", "Pequeño", 0)));
carrito.push(new ItemCarrito(new Producto("Maceta Llama", 300, "Turquesa", "Mediano",5)));

//Invocamos la funcion que solicita ingresar productos para agregar al carrito
agregarAlCarrito();
//Invocamos la funcion que calcula el total del carrito
calcularTotalCarrito();

alert(`El total de su compra es $${totalCarrito} \nEl total con descuentos es $${totalConDescuento}`);

//Se muestra en consola el ordenamiento del Array
for ( itemOrdenado of carrito.sort((a , b) => a.producto.nombre > b.producto.nombre)){
    console.log(itemOrdenado.producto.nombre + "(" + itemOrdenado.cantidad + ")");
}


