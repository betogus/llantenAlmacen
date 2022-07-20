async function traerDatosBaseDeDatos() {
    const productos = await fetch('productos.json')
        .then((resp) => resp.json())
        .then((data) => data);
    return productos

}

const productos = traerDatosBaseDeDatos();


let itemContainer = document.querySelector('.item-container');


function productosAMostrar(listadoDeProductos, productos) {
    listadoDeProductos.innerHTML = productos.reduce((listaProductos, producto) =>
        listaProductos +
        `<a href="#"><p class="item-rec" id="${producto.id}">${producto.nombre}</p></a>`, "");
}
productosAMostrar(itemContainer, productos)

