
// -------------- PASOS ------------


// busco los productos que ingresa el usuario

const DOMproductoABuscar = document.getElementById("productoABuscar");
DOMproductoABuscar.addEventListener('keyup', (e) => {
    // Vuelvo al color original a todos los items de categorias
    let hijos = DOMcategorias__lista.children;
    for (let hijo of hijos) {
        hijo.style.background = "#fff";
    }
    // Vuelvo a la pagina 1
    numeroDeBoton = 1;

    let inputEvent = e.path[0].value; //accedo al texto que escribe el usuario
    let resultadoDeBusqueda = productos.filter((producto) => producto.nombre.includes(inputEvent.toUpperCase()));

    productosAMostrar(DOMitemContainer, resultadoDeBusqueda);

})



// 2) ABRIR Y CERRAR MODAL DE PRODUCTOS

const DOMmodal = document.querySelector('.modal');
const DOMcloseModal = document.querySelector('.modal__close');

// al hacer click en un item, se abre el modal
let cantidad;
let resultado;
let productoSeleccionado;
const DOMmodalDelProducto = document.querySelector('.item-container'); //Al acceder al contenedor y hacer click sobre un item, el e.target es dicho item
DOMmodalDelProducto.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className == "item-rec") {
        let idSeleccionado = e.target.id;
        productoSeleccionado = productos.find(producto => producto.id == idSeleccionado);

        //abrimos el modal
        cantidad = 0;
        DOMmodal.classList.add('modal--show');
        const DOMdatosProducto = document.querySelector('.datosProducto');
        DOMdatosProducto.innerHTML = `
            <h3 id="productoSeleccionado">${productoSeleccionado.nombre}</h3>
            <h4>Precio (x100g): $${productoSeleccionado.precio100gr}</h4>
            <h4>Precio (x1Kg): $${productoSeleccionado.precioKg}</h4><br>
            <h4>Ingrese la cantidad de ${productoSeleccionado.nombre} que desea comprar (x 100g): <br></h4>
            <div class="contador-container">
                <div class="resta"><a href=#>-</a></div>
                <div class="cantidad">${cantidad}</div>
                <div class="suma"><a href=#>+</a></div>
            </div> 
            <h3>Precio total: </h3>
            <div class="precio"></div>
            <h3>Ingrese algún comentario: </h3>
            <textarea rows="6" cols="60"></textarea>
            `

        // Sumamos o restamos las unidades del producto que queremos comprar
        const DOMcontenedorCantidad = document.querySelector('.cantidad');
        const DOMprecio = document.querySelector('.precio');
        const DOMresta = document.querySelector('.resta');

        DOMresta.onclick = () => {
            cantidad = cantidad > 0 ? cantidad - 1 : 0;
            DOMcontenedorCantidad.innerHTML = cantidad;
            resultado = obtenerPrecio(productoSeleccionado, cantidad);
            DOMprecio.innerText = resultado;
        }

        const DOMsuma = document.querySelector('.suma');

        DOMsuma.onclick = () => {
            cantidad += 1;
            DOMcontenedorCantidad.innerHTML = cantidad;
            resultado = obtenerPrecio(productoSeleccionado, cantidad);
            DOMprecio.innerText = resultado;
        }


    }


})
// 3) AGREGAR AL CARRITO 
const DOMcarritoDeCompras = document.querySelector('.agregarAlCarrito');
const laCantidadEsCero = () => {
    return new Promise((resolve, reject) => {
        let DOMpromesa = document.querySelector('.precio').innerText != "" &&
            document.querySelector('.precio').innerText != '0' ?
            resolve("añadir al carrito") :
            reject("no hay producto que añadir");
    })
}
let productoRepetido
DOMcarritoDeCompras.addEventListener("click", (e) => {
    e.preventDefault();
    laCantidadEsCero().then((resolve) => {

        cuentaEstandar.agregarAlCarrito(productoSeleccionado, cantidad, resultado);
        DOMmodal.classList.remove('modal--show');
    })

})




// al hacer click en cancelar, se cierra el modal

DOMcloseModal.addEventListener('click', (e) => {
    e.preventDefault();
    DOMmodal.classList.remove('modal--show');
})



// 6) CATEGORIAS
const DOMcategorias__lista = document.querySelector('.categorias__lista');

DOMcategorias__lista.onclick = (e) => {

    // Volvemos todos los items de la categoria al color original
    let hijos = DOMcategorias__lista.children;
    for (let hijo of hijos) {
        hijo.style.background = "#fff";
    }

    // Volvemos a la pagina 1 
    numeroDeBoton = 1;

    productoABuscarPorCategoria(e.target.id, DOMitemContainer);

    //coloreamos al item clickeado
    e.target.style.background = "rgba(222, 234, 234, 0.80)";

}


// FILTROS

// Volvemos todos los items de la categoria al color original
let ordenarPor = document.getElementById("ordenarPor")
ordenarPor.onchange = () => {
    let hijos = DOMcategorias__lista.children;
    for (let hijo of hijos) {
        hijo.style.background = "#fff";
    }
    let productosOrdenados;

// Volvemos a la pagina 1
    numeroDeBoton = 1;

    if (ordenarPor.value == "az") {
        productosOrdenados = productos.sort((a, b) => {
            if (a.nombre > b.nombre) {
                return 1;
            }
            if (a.nombre < b.nombre) {
                return -1;
            }
            return 0;
        })
    } else if (ordenarPor.value == "za") {
        productosOrdenados = productos.sort((b, a) => {
            if (a.nombre > b.nombre) {
                return 1;
            }
            if (a.nombre < b.nombre) {
                return -1;
            }
            return 0;
        })
    } else if (ordenarPor.value == "PmM") {
        productosOrdenados = productos.sort((a, b) => {
            if (a.precio100gr > b.precio100gr) {
                return 1;
            }
            if (a.precio100gr < b.precio100gr) {
                return -1;
            }
            return 0;
        })
    } else if (ordenarPor.value == "PMm") {
        productosOrdenados = productos.sort((b, a) => {
            if (a.precio100gr > b.precio100gr) {
                return 1;
            }
            if (a.precio100gr < b.precio100gr) {
                return -1;
            }
            return 0;
        })
    } else if (ordenarPor.value == "p") {
        productosOrdenados = productos;
    }
    productosAMostrar(DOMitemContainer, productosOrdenados)
}


// SELECCIONAR UNA PAGINA 

document.querySelector(".item-button-container").onclick = (e) => {

    if (e.target.id != numeroDeBoton) {
        if (e.target.className == "item-button") {
            numeroDeBoton = parseInt(e.target.id);
            productosAMostrar(DOMitemContainer, productosAReducir)
        }
    }
}