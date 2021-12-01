//En esta variable se acumula todo lo que se agrega al carrito//
const carrito = [];
const listaProductos = [];

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
        dibujarCarrito();
    }

    //Llamada AJAX a Archivo JSON con productos
    $.getJSON("./data/productos.json", (respuesta,estado)=>{
        if (estado === "success") {
            let misProductos= respuesta;
            for( const dato of misProductos){
                dibujarCard(dato);
                listaProductos.push(new Producto(dato.nombre, dato.precio, dato.color, dato.tamanio, dato.imagen, dato.porcDescuento));
            }
            //Se incorpora evento con jQuery/Captura de evento click en botones comprar
            $(".btnComprar").on("click", (evento) => {
                agregarAlCarrito(evento.currentTarget.parentNode.children[1].children[0].innerText);
            });
        }
    });

    //Evento botón carrito
    $("#icono-carrito").on("click", (evento) => {
        evento.preventDefault();
        //Show and hide Modal Carrito
        $("#contenedorCarrito").show().fadeIn(1000);
    })
})

//Efectos y animaciones concatenadas con jQuery
//Fade h1
$("h1").fadeOut("slow").fadeIn(3000);

//Animación para cards del carrito
$("#carrito").hide().slideDown(1500);


