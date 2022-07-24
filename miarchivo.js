// CREANDO LAS CLASES

class BaseDeDatos {
    constructor() {
        this.cuentas = []
    }
    crearCuenta(cuenta) {
        this.cuentas.push(cuenta);
    }
};

class Cuenta {
    constructor(id, nombre, direccion, telefono) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.productos = [];
    }


    agregarAlCarrito(productoSeleccionado, cantidadProducto, precioFinalProducto) {
        productoRepetido = this.productos.some((el) => el.id == productoSeleccionado.id)
        for (let producto of this.productos){
            if (producto.id == productoSeleccionado.id) {
                producto.cantidad += cantidad;
              
                producto.precioFinal = obtenerPrecio(producto, producto.cantidad); 
            }
        } 
        if (productoRepetido == false) {
            let producto = {
                ...productoSeleccionado,
                cantidad: cantidadProducto,
                precioFinal: precioFinalProducto
            }
            this.productos.push(producto);
        }
        
        let productoEnLS = this.productos;
        localStorage.setItem("producto", JSON.stringify(productoEnLS));

        let shopping = document.querySelector('.carrito');
        shopping.innerHTML = `
        <i class="fa-solid fa-cart-shopping"></i><div class="contadorDeProductos">${this.productos.length}</div>
        `

        // Sweet Alert
        Swal.fire({
            title: 'Felicitaciones!',
            text: `El producto ${productoSeleccionado.nombre} ha sido añadido al carrito`,
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
        })

        //Toastify
        Toastify({
            text: `Se agregó ${productoSeleccionado.nombre} al carrito`,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #fbb467, #f7d096)",
            },
        }).showToast();
    }


    eliminarProductoCarrito(idProducto) {
        let buscarProducto = productos.find(({
            id
        }) => id == idProducto);
        for (let i = 0; i < this.productos.length; i++) {
            this.productos[i].id == buscarProducto.id && this.productos.splice(i, 1);
        }
        let productoEnLS = this.productos;
        localStorage.setItem("producto", JSON.stringify(productoEnLS));
        DOMshopping.innerHTML = `<i class="fa-solid fa-cart-shopping"></i><div class="contadorDeProductos">${cuentaEstandar.productos.length}</div>`

    }
};

/* class Producto {
    constructor(id, nombre, precio100gr, precioKg, hayStock, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio100gr = precio100gr;
        this.precioKg = precioKg;
        this.hayStock = hayStock;
        this.categoria = categoria;
    }

}; */

// Funciones 


function obtenerPrecio({
    precio100gr,
    precioKg
}, cantidadProducto) {
    let cantidadEnKg = 0;
    let cantidadEn100g = 0;
    cantidadEnKg = Math.floor(cantidadProducto / 10)
    cantidadEn100g = Math.floor(cantidadProducto) - cantidadEnKg * 10;
    let precio = cantidadEnKg * precioKg + cantidadEn100g * precio100gr;
    return precio;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

/* function registrarse() {
    if (cuentaEstandar.id == null) {
        cuentaEstandar.nombre = prompt("Usted no se encuentra registrado. Ingrese su nombre");
        cuentaEstandar.id = getRandomInt(1000, 10000);
        for (let i = 0; i < baseDeDatos.cuentas.length; i++) {
            while (cuentaEstandar.id == baseDeDatos.cuentas[i].id) {
                cuentaEstandar.id = getRandomInt(1000, 10000);
            }
        }
        cuentaEstandar.direccion = prompt("Ingrese su dirección");
        cuentaEstandar.telefono = parseInt(prompt("Ingrese su teléfono"));

    }
    return cuentaEstandar;
} */

// funcion asincrónica para verificar si existe o no el producto buscado

const existeElProducto = (listadoDeProductos) => {
    return new Promise((resolve, reject) => {
        listadoDeProductos.length > 0 ? resolve(listadoDeProductos) : reject("No hay coincidencia con su búsqueda");
    })
}


function productosAMostrar(listadoDeProductos, productos) {
    existeElProducto(productos).then((response) => {
        listadoDeProductos.innerHTML = productos.reduce((listaProductos, producto) =>
            listaProductos +
            `<a href="#"><p class="item-rec" id="${producto.id}">${producto.nombre}</p></a>`, "");
    }).catch((error) => {
        listadoDeProductos.innerHTML = `<div class="noExisteElProducto"><h1><i class="fa-solid fa-magnifying-glass"> </i> ${error}</h1></div>`
    })

}


function productoABuscarPorCategoria(categoria, listadoDeProductos) {
    let resultadoDeBusqueda;
    categoria == "verTodos" ? resultadoDeBusqueda = productos : resultadoDeBusqueda = productos.filter((producto => producto.categoria == categoria));
    productosAMostrar(listadoDeProductos, resultadoDeBusqueda);
}

function abrirModalCarrito(cuentaEstandar) {
    let mostrarProductos = ``;
    let precioTotal = 0;
    cuentaEstandar.productos.forEach(producto => {
        mostrarProductos += `
            <div class="mostrarProductos-item">
                <div>${producto.nombre}</div>
                <div>${producto.cantidad}00 g</div>
                <div>$${producto.precioFinal}</div>
                <div><i class="fa-solid fa-xmark cancelarProducto"id="${producto.id}"></i></div>
                
            </div>
        `
        precioTotal += producto.precioFinal;
    })

    const DOMdatosCuenta = document.querySelector('.datosCuenta');
    DOMdatosCuenta.innerHTML = `
    <div class="datosCuenta-usuario"><p>usuario: ${cuentaEstandar.nombre}</p>
    <p>dirección: ${cuentaEstandar.direccion}</p>
    <p>telefono: ${cuentaEstandar.telefono}</p><br></div>
    <div class="mostrarProductos">
            <div class="mostrarProductos-titulo">
                    <div>PRODUCTO</div>
                    <div>CANTIDAD</div>
                    <div>SUBTOTAL</div>
                    <div></div>
                </div>
                ${mostrarProductos}
        </table>
    </div>
    <div class="alinearDerecha">TOTAL: $${precioTotal}</div>

    `

};



// CREANDO LOS OBJETOS

let cuentaEstandar = new Cuenta();

const baseDeDatos = new BaseDeDatos();
baseDeDatos.crearCuenta(cuentaEstandar);

let productos;
const traerDatosBaseDeDatos = () => {
    fetch('productos.json')
        .then((resp) => resp.json())
        .then((data) => {
            productos = data
            productosAMostrar(DOMitemContainer, productos)
        });
}

traerDatosBaseDeDatos();

// -------------- PASOS ------------


// 0) CARGO LOS PRODUCTOS DEL CARRITO DEL LOCALSTORAGE

cuentaEstandar.productos = JSON.parse(localStorage.getItem("producto")) || [];

// 1) AGREGAR LOS PRODUCTOS BUSCADOS AL HTML

const DOMitemContainer = document.querySelector('.item-container');


// busco los productos que ingresa el usuario

const DOMproductoABuscar = document.getElementById("productoABuscar");
DOMproductoABuscar.addEventListener('keyup', (e) => {
    // Vuelvo al color original a todos los items de categorias
    let hijos = DOMcategorias__lista.children;
    for (let hijo of hijos) {
        hijo.style.background = "#fff";
    }

    let inputEvent = e.path[0].value; //accedo al texto que escribe el usuario
    let resultadoDeBusqueda = productos.filter((producto) => producto.nombre.includes(inputEvent.toUpperCase()));

    productosAMostrar(DOMitemContainer, resultadoDeBusqueda);

})



// 2) ABRIR Y CERRAR MODAL

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


// 4) MOSTRAR CARRITO 

const DOMshopping = document.querySelector('.carrito');
const DOMmodalCarrito = document.querySelector('.modalCarrito');
DOMshopping.addEventListener("click", (e) => {

    // ordeno los productos alfabeticamente
    cuentaEstandar.productos.sort((a, b) => {
        if (a.nombre > b.nombre) {
            return 1;
        }
        if (a.nombre < b.nombre) {
            return -1;
        }
        return 0;
    });

    DOMmodalCarrito.classList.add('modal--show');
    abrirModalCarrito(cuentaEstandar);

})
const DOMcloseModalCarrito = document.querySelector('.modalCarrito__close');
DOMcloseModalCarrito.addEventListener('click', (e) => {
    e.preventDefault();
    DOMmodalCarrito.classList.remove('modal--show');
})

// 6) ELIMINAR PRODUCTO DEL CARRITO

const DOMeliminarProducto = document.querySelector('.modalCarrito');
DOMeliminarProducto.onclick = (e) => {
    if (e.target.className == "fa-solid fa-xmark cancelarProducto") {
        cuentaEstandar.eliminarProductoCarrito(e.target.id);
        abrirModalCarrito(cuentaEstandar);

    }
}



// 6) CATEGORIAS
const DOMcategorias__lista = document.querySelector('.categorias__lista');

DOMcategorias__lista.onclick = (e) => {

    // Volvemos todos los items de la categoria al color original
    let hijos = DOMcategorias__lista.children;
    for (let hijo of hijos) {
        hijo.style.background = "#fff";
    }

    productoABuscarPorCategoria(e.target.id, DOMitemContainer);

    //coloreamos al item clickeado
    e.target.style.background = "rgba(222, 234, 234, 0.80)";
}

// 7) MOSTRAR LA CANTIDAD DE PRODUCTOS QUE HAY EN EL CARRITO DENTRO DEL ICONO DE CARRITO

DOMshopping.innerHTML = `<i class="fa-solid fa-cart-shopping"></i><div class="contadorDeProductos">${cuentaEstandar.productos.length}</div>`

// REGISTRAR AL USUARIO AL INGRESAR AL SITIO


// Dar la opcion de ordenar los productos del carrito por fecha de agregado, alfabeticamente, precio, etc.
// En el total del carrito, podria sumarle el precio por delivery (ej. partir con un costo de $150)