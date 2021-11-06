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