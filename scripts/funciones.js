//Dibujo una card recibiendo como parámetro un producto
function dibujarCard(producto){
    //Se obtiene el elemento main con ID "productos"
    let seccionProductos = document.getElementById("productos");
    //Creacion de elemento "div" para las cards (Manipulando el Dom)
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("border-3");

    card.innerHTML = `<img
        src="${producto.imagen}"
        class="card-img-top"
        alt="${producto.nombre}"/>
    <div class="card-body">
        <h5 class="card-title">${producto.nombre.toUpperCase()}</h5>
        <p class="card-text">${producto.nombre} Tamaño:${producto.tamanio} </p>
        <p class="card-text">
        <small class="text-muted">Precio: $${producto.precio}</small>
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
    seccionProductos.append(card);
}

//Función que permite seleccionar productos para agregar al carrito
function agregarAlCarrito(producto) {
    //Se busca el producto seleccionado en el array de Items(ItemCarrito)
    const productoSeleccionado = listaProductos.find(prod => prod.nombre.toUpperCase() == producto);
    const item = carrito.find(item => item.producto.nombre.toUpperCase() == producto);
    if( item ){
        item.incrementar(1);
    }else{
        carrito.push(new ItemCarrito(productoSeleccionado,1));
    }
    
    //Se dibuja los producto del carrito
    dibujarCarrito()

    //Local Storage y JSON
    localStorage.setItem("Carrito Storage", JSON.stringify(carrito));
}


//Función para visualizar total del carrito
function dibujarCarrito() {
    let totalCarrito=0;
    let totalConDescuento=0;
    //Se obtiene  tbody con id #items donde se dibuja cada item agregado al carrito
    const itemsCarrito = document.getElementById("items");

    //Se recorre el array carrito y se dibuja cada row dentro de tbody
    for ( item of carrito){
        //Se crea un row por cada item agregado al carrito
        let trow = document.createElement("tr");
        //Se agregan los datos de cada producto agregado al carrito
        trow.innerHTML = `
        <td>${item.producto.nombre}</td>
        <td>$${item.producto.precio}</td>
        <td>$${item.producto.descuento()}</td>
        <td><button class="decrementar">-</button> ${item.cantidad} <button class="incrementar">+</button></td>
        <td>$${item.producto.aplicarDescuento() * item.cantidad}</td>`;
        itemsCarrito.append(trow);
        //Se totaliza para visualizar en el footer del carrito
        totalCarrito+= item.producto.precio * item.cantidad;
        totalConDescuento+=item.producto.aplicarDescuento() * item.cantidad
    }
    let carritoDom = document.getElementById("footer");
    carritoDom.innerHTML = `<td>Total: </td> 
                            <td>$${totalCarrito}</td>
                            <td>Neto: </td>
                            <td>$${totalConDescuento}</td>`;
    $('.decrementar').on('click', (e) => {
        let nombreItemSeleccionado = e.currentTarget.parentNode.parentNode.firstChild.innerText;
        const itemSeleccionado = carrito.find( item => item.producto.name == nombreItemSeleccionado );
        itemSeleccionado.decrementar();
        dibujarCarrito();
    });
    $('.incrementar').on('click', (e) => {
        let nombreItemSeleccionado = e.currentTarget.parentNode.parentNode.firstChild.innerText;
        const itemSeleccionado = carrito.find( item => item.producto.name == nombreItemSeleccionado );
        itemSeleccionado.incrementar();
        dibujarCarrito();
    });
}
