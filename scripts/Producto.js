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
