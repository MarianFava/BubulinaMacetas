//En esta variable de acumula todo lo que se agrega al carrito//
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
        let descuento = this.precio
    }
    aplicarDescuento(code) {
        let precioConDescuento = this.precio;
        //Código de descuento a ingresar//
        if (code == "descuento10") {
            precioConDescuento = this.precio * (100 - this.porcDescuento) / 100;
        }

        return precioConDescuento;
    }
}
//Instanciación de objetos tipo Producto(distintas macetas)
let productoBuda = new Producto("Maceta Buda", 300, "Dorado", "Mediano", 0);
let productoGatito = new Producto("Maceta Gatito", 300, "Gris", "Mediano", 10);
let productoCactus = new Producto("Maceta Cactus", 200, "Verde", "Pequeño",0);
let productoLlama = new Producto("Maceta Llama", 300, "Turquesa", "Mediano");
//"Maceta Buda", etc, nombre de los productos a ingresar//
function agregarAlCarrito() {
    do {
        let producto = prompt("Ingresar producto");
        let precio = 0;
        let precioConDescuento = 0;
        let discount = "";
        switch (producto) {
            case productoBuda.nombre:
                precio = productoBuda.precio;
                discount = prompt("Ingrese código de descuento o Enter para continuar");
                precioConDescuento = productoBuda.aplicarDescuento(discount);
                break;
            case productoGatito.nombre:
                precio = productoGatito.precio;
                discount = prompt("Ingrese código de descuento o Enter para continuar");
                precioConDescuento = productoGatito.aplicarDescuento(discount);
                break;
            case productoCactus.nombre:
                precio = productoCactus.precio;
                discount = prompt("Ingrese código de descuento o Enter para continuar");
                precioConDescuento = productoCactus.aplicarDescuento(discount);
                break;
            case productoLlama.nombre:
                precio = productoLlama.precio;
                discount = prompt("Ingrese código de descuento o Enter para continuar");
                precioConDescuento = productoLlama.aplicarDescuento(discount);
                break;
            default:
                alert("El producto no existe.");
                continue;
        }
        let cantidad = parseInt(prompt("Ingresar cantidad"));
        if (!(cantidad > 0)) {
            alert("La cantidad debe ser mayor a cero");
            continue;
        }


        totalConDescuento = totalConDescuento + precioConDescuento * cantidad;
        totalCarrito= totalCarrito + precio * cantidad;
        otroProducto = confirm("¿Queres agregar otro producto?");
    } while (otroProducto);
    alert("Total Del Carrito = $" + totalCarrito + "\nTotal con descuento= $" + totalConDescuento);
}

agregarAlCarrito();
