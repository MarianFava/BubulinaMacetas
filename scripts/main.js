//En esta variable se acumula todo lo que se agrega al carrito//
let carrito = [];
let totalCarrito = 0;
let totalConDescuento = 0;

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

    //Se obtiene el elemento main con ID "productos"
    let listaProductos = document.getElementById("productos");

    //Llamada AJAX a Archivo JSON con productos
    $.getJSON("/data/productos.json", (respuesta,estado)=>{
        if (estado === "success") {
            let misProductos= respuesta;
            for( const dato of misProductos){
                //Creacion de elemento "div" para las cards (Manipulando el Dom)
                let card = document.createElement("div");
                card.classList.add("card");
                card.classList.add("border-3");

                card.innerHTML = `<img
                    src="${dato.imagen}"
                    class="card-img-top"
                    alt="${dato.nombre}"/>
                <div class="card-body">
                    <h5 class="card-title">${dato.nombre.toUpperCase()}</h5>
                    <p class="card-text">${dato.nombre} Tamaño:${dato.tamanio} </p>
                    <p class="card-text">
                    <small class="text-muted">Precio: $${dato.precio}</small>
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


