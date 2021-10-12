let total = 0;
function agregarAlCarrito(){
    do{
        let producto = prompt("Ingresar producto");
        let cantidad = parseInt(prompt("Ingresar cantidad"));
        let precio = 0;
        switch (producto){
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
                alert("Algunos de los datos ingresados es incorrecto");
                precio = 0;
                cantidad = 0;        
        }
        total = total + precio * cantidad;
        otroProducto = confirm ("¿Queres agregar otro producto?")
    } while(otroProducto);
    alert("Total = $" + total);
}
agregarAlCarrito();
