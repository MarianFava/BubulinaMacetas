let total = 0;
function agregarAlCarrito() {
    do {
        let producto = prompt("Ingresar producto");
        let precio = 0;
        switch (producto) {
            case "macetaGatito":
                precio = 300;
                break;
            case "macetaCactus":
                precio = 200;
                break;
            case "macetaBudita":
                precio = 300;
                break;
            default:
                alert("El producto no existe.");
                continue;
        }
        let cantidad = parseInt(prompt("Ingresar cantidad"));
        if ( !( cantidad > 0 ) ) {
            alert("La cantidad debe ser mayor a cero");
            continue;
        }
        let discount =prompt("Ingrese código de descuento o Enter para continuar");
        
        precio = aplicarDescuento(discount, precio);

        total = total + precio * cantidad;
        otroProducto = confirm( "¿Queres agregar otro producto?" );
    } while (otroProducto);
    alert("Total = $" + total);
}
//
function aplicarDescuento(code, precio) {
    let precioConDescuento = precio;
    if (code == "descuento10") {
        precioConDescuento = precio * (100 - 10)/100;
    }

    return precioConDescuento;
}
    agregarAlCarrito();
