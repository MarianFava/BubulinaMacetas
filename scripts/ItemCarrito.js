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