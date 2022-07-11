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

        let producto = {
            ...productoSeleccionado,
            cantidad: cantidadProducto,
            precioFinal: precioFinalProducto
        }
        this.productos.push(producto);
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
    }
};





class Producto {
    constructor(id, nombre, precio100gr, precioKg, hayStock, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio100gr = precio100gr;
        this.precioKg = precioKg;
        this.hayStock = hayStock;
        this.categoria = categoria;
    }

};

// Funciones 


function obtenerPrecio({
    precio100gr,
    precioKg
}) {
    let cantidad = document.querySelector('.cantidad').value;
    let cantidadEnKg = 0;
    let cantidadEn100g = 0;
    cantidadEnKg = Math.floor(cantidad / 10)
    cantidadEn100g = Math.floor(cantidad) - cantidadEnKg * 10;
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

function productosAMostrar(listadoDeProductos, productos) {
    listadoDeProductos.innerHTML = productos.reduce((listaProductos, producto) =>
        listaProductos +
        `<a href="#"><p class="item-rec" id="${producto.id}">${producto.nombre}</p></a>`, "");
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

    const datosCuenta = document.querySelector('.datosCuenta');
    datosCuenta.innerHTML = `
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
let cuentaPrueba = new Cuenta(1234, "bot", "calle falsa 123", 123456789); // cuenta de ejemplo

const baseDeDatos = new BaseDeDatos();
baseDeDatos.crearCuenta(cuentaPrueba); //instanciamos la cuenta de prueba
baseDeDatos.crearCuenta(cuentaEstandar);

const productos = []; //aqui se guardaran todos los productos

const producto1 = new Producto(1, 'POROTOS ALUBIA', 30, 220, true, 'legumbresYHarinas');
const producto2 = new Producto(2, 'POROTOS DE SOJA', 12, 95, true, 'legumbresYHarinas');
const producto3 = new Producto(3, 'POROTOS ADUKI', 35, 310, true, 'legumbresYHarinas');
const producto4 = new Producto(4, 'POROTOS COLORADOS', 30, 240, true, 'legumbresYHarinas');
const producto5 = new Producto(5, 'POROTOS MUNG', 20, 190, true, 'legumbresYHarinas');
const producto6 = new Producto(6, 'POROTOS NEGROS', 25, 245, true, 'legumbresYHarinas');
const producto7 = new Producto(7, 'POROTOS LUPINES', 25, 225, true, 'legumbresYHarinas');
const producto8 = new Producto(8, 'GARBANZOS', 25, 249, true, 'legumbresYHarinas');
const producto9 = new Producto(9, 'LENTEJAS', 35, 335, true, 'legumbresYHarinas');
const producto10 = new Producto(10, 'LENTEJAS ROJAS', 45, 435, true, 'legumbresYHarinas');
const producto11 = new Producto(11, 'SOJA TEXTURIZADA', 37, 350, true, 'legumbresYHarinas');
const producto12 = new Producto(12, 'ARROZ YAMANÍ', 30, 240, true, 'legumbresYHarinas');
const producto13 = new Producto(13, 'ARROZ INTEGRAL LARGO FINO', 15, 130, true, 'legumbresYHarinas');
const producto14 = new Producto(14, 'ARVEJAS ENTERAS', 25, 200, true, 'legumbresYHarinas');
const producto15 = new Producto(15, 'QUINOA', 60, 550, true, 'legumbresYHarinas');
const producto16 = new Producto(16, 'MAIZ PISINGALLO', 14, 120, true, 'legumbresYHarinas');
const producto17 = new Producto(17, 'MAIZ PISADO BLANCO', 25, 210, true, 'legumbresYHarinas');
const producto18 = new Producto(18, 'HARINA DE TRIGO INTEGRAL', 30, 200, true, 'legumbresYHarinas');
const producto19 = new Producto(19, 'HARINA DE TRIGO SERRACENO', 50, 480, true, 'legumbresYHarinas');
const producto20 = new Producto(20, 'HARINA DE ARROZ', 15, 115, true, 'legumbresYHarinas');
const producto21 = new Producto(21, 'HARINA DE MAÍZ', 15, 115, true, 'legumbresYHarinas');
const producto22 = new Producto(22, 'HARINA DE CENTENO INTEGRAL', 30, 280, true, 'legumbresYHarinas');
const producto23 = new Producto(23, 'HARINA DE AVENA', 19, 165, true, 'legumbresYHarinas');
const producto24 = new Producto(24, 'HARINA DE GARBANZOS', 15, 125, true, 'legumbresYHarinas');
const producto25 = new Producto(25, 'HARINA DE COCO', 85, 830, true, 'legumbresYHarinas');
const producto26 = new Producto(26, 'HARINA DE ALMENDRAS', 180, 1750, true, 'legumbresYHarinas');
const producto27 = new Producto(27, 'HARINA DE ALGARROBA', 45, 410, true, 'legumbresYHarinas');
const producto28 = new Producto(28, 'HARINA DE CHÍA', 40, 342, true, 'legumbresYHarinas');
const producto29 = new Producto(29, 'BOLITAS DE CHOCOLATE', 45, 415, true, 'cereales');
const producto30 = new Producto(30, 'ALMOHADITAS DOBLE SALVADO', 40, 360, true, 'cereales');
const producto31 = new Producto(31, 'ALMOHADITAS FRUTILLA', 55, 520, true, 'cereales');
const producto32 = new Producto(32, 'ALMOHADITAS LIMÓN', 65, 640, true, 'cereales');
const producto33 = new Producto(33, 'ALMOHADITAS AVELLANA', 55, 520, true, 'cereales');
const producto34 = new Producto(34, 'CHOCOLATE BLANCO', 55, 520, true, 'cereales');
const producto35 = new Producto(35, 'LIMÓN', 55, 520, true, 'cereales');
const producto36 = new Producto(36, 'ALMOHADITAS MANÍ', 70, 645, true, 'cereales');
const producto37 = new Producto(37, 'BASTONCITOS DE SALVADO', 38, 360, true, 'cereales');
const producto38 = new Producto(38, 'SALVADO DE TRIGO', 12, 105, true, 'cereales');
const producto39 = new Producto(39, 'SALVADO DE AVENA', 20, 190, true, 'cereales');
const producto40 = new Producto(40, 'GERMEN DE TRIGO', 12, 105, true, 'cereales');
const producto41 = new Producto(41, 'TRIGO BURGOL FINO', 25, 210, true, 'cereales');
const producto42 = new Producto(42, 'AVENA INSTANTÁNEA', 25, 220, true, 'cereales');
const producto43 = new Producto(43, 'AVENA TRADICIONAL', 20, 180, true, 'cereales');
const producto44 = new Producto(44, 'GRANOLA CROCANTE SATVIKA', 55, 510, true, 'cereales');
const producto45 = new Producto(45, 'GRANOLA TROPICAL SATVIKA', 65, 620, true, 'cereales');
const producto46 = new Producto(46, 'SATVIKA', 60, 570, true, 'cereales');
const producto47 = new Producto(47, 'GRANOLA MONARCA FRUIT ENERGY', 65, 610, true, 'cereales');
const producto48 = new Producto(48, 'GRANOLA MONARCA OMEGA', 50, 480, true, 'cereales');
const producto49 = new Producto(49, 'GRANOLA MONARCA STEVIA', 62, 600, true, 'cereales');
const producto50 = new Producto(50, 'POWER', 60, 580, true, 'cereales');
const producto51 = new Producto(51, 'TUTUCA CON AZÚCAR', 40, 350, true, 'cereales');
const producto52 = new Producto(52, 'TUTUCA C/ EDULCORANTE', 55, 500, true, 'cereales');
const producto53 = new Producto(53, 'ARITOS DE MIEL', 35, 325, true, 'cereales');
const producto54 = new Producto(54, 'COPOS DE MAIZ', 30, 240, true, 'cereales');
const producto55 = new Producto(55, 'COPOS AZUCARADOS', 35, 250, true, 'cereales');

const producto56 = new Producto(56, 'PASAS DE UVA NEGRAS', 35, 345, true, 'frutosSecos');
const producto57 = new Producto(57, 'PASAS DE UVA RUBIAS', 65, 620, true, 'frutosSecos');
const producto58 = new Producto(58, 'OREJONES', 130, 1245, true, 'frutosSecos');
const producto59 = new Producto(59, 'DAMASCOS', 120, 1100, true, 'frutosSecos');
const producto60 = new Producto(60, 'ANANÁ CONFITADO', 135, 1345, true, 'frutosSecos');
const producto61 = new Producto(61, 'JENGIBRE CONFITADO', 150, 1491, true, 'frutosSecos');
const producto62 = new Producto(62, 'DÁTILES', 65, 600, true, 'frutosSecos');
const producto63 = new Producto(63, 'ARÁNDANOS', 140, 1342, true, 'frutosSecos');
const producto64 = new Producto(64, 'CIRUELAS', 120, 1150, true, 'frutosSecos');
const producto65 = new Producto(65, 'HIGOS', 75, 745, true, 'frutosSecos');
const producto66 = new Producto(66, 'PERAS', 110, 1005, true, 'frutosSecos');
const producto67 = new Producto(67, 'FRUTA ESCURRIDA', 55, 510, true, 'frutosSecos');
const producto68 = new Producto(68, 'NUEZ ENTERA', 150, 1440, true, 'frutosSecos');
const producto69 = new Producto(69, 'NUEZ PARTIDA', 130, 1250, true, 'frutosSecos');
const producto70 = new Producto(70, 'NUEZ COBRIZA', 110, 1040, true, 'frutosSecos');
const producto71 = new Producto(71, 'AVELLANAS', 280, 2735, true, 'frutosSecos');
const producto72 = new Producto(72, 'PISTACHOS', 270, 2680, true, 'frutosSecos');
const producto73 = new Producto(73, 'ALMENDRA GUARA', 190, 1800, true, 'frutosSecos');








productos.push(producto1)
productos.push(producto2);
productos.push(producto3);
productos.push(producto4);
productos.push(producto5);
productos.push(producto6);
productos.push(producto7);
productos.push(producto8);
productos.push(producto9);
productos.push(producto10);
productos.push(producto11);
productos.push(producto12);
productos.push(producto13);
productos.push(producto14);
productos.push(producto15);
productos.push(producto16);
productos.push(producto17);
productos.push(producto18);
productos.push(producto19);
productos.push(producto20);
productos.push(producto21);
productos.push(producto22);
productos.push(producto23);
productos.push(producto24);
productos.push(producto25);
productos.push(producto26);
productos.push(producto27);
productos.push(producto28);
productos.push(producto29);
productos.push(producto30);
productos.push(producto31);
productos.push(producto32);
productos.push(producto33);
productos.push(producto34);
productos.push(producto35);
productos.push(producto36);
productos.push(producto37);
productos.push(producto38);
productos.push(producto39);
productos.push(producto40);
productos.push(producto41);
productos.push(producto42);
productos.push(producto43);
productos.push(producto44);
productos.push(producto45);
productos.push(producto46);
productos.push(producto47);
productos.push(producto48);
productos.push(producto49);
productos.push(producto50);
productos.push(producto51);
productos.push(producto52);
productos.push(producto53);
productos.push(producto54);
productos.push(producto55);
productos.push(producto56);
productos.push(producto57);
productos.push(producto58);
productos.push(producto59);
productos.push(producto60);
productos.push(producto61);
productos.push(producto62);
productos.push(producto63);
productos.push(producto64);
productos.push(producto65);
productos.push(producto66);
productos.push(producto67);
productos.push(producto68);
productos.push(producto69);
productos.push(producto70);
productos.push(producto71);
productos.push(producto72);
productos.push(producto73);



// -------------- PASOS ------------


// 0) CARGO LOS PRODUCTOS DEL CARRITO 

cuentaEstandar.productos = JSON.parse(localStorage.getItem("producto")) || [];

// 1) AGREGAR LOS PRODUCTOS BUSCADOS AL HTML


let itemContainer = document.querySelector('.item-container');

// muestro todos los productos antes de realizar una busqueda

productosAMostrar(itemContainer, productos);

// busco los productos que ingresa el usuario

const productoABuscar = document.getElementById("productoABuscar");
productoABuscar.addEventListener('keyup', (e) => {
    // Vuelvo al color original a todos los items de categorias
    let hijos = categorias__lista.children;
    for (let hijo of hijos) {
        hijo.style.background = "#fff";
    }

    let inputEvent = e.path[0].value; //accedo al texto que escribe el usuario
    let resultadoDeBusqueda = productos.filter((producto) => producto.nombre.includes(inputEvent.toUpperCase()));

    productosAMostrar(itemContainer, resultadoDeBusqueda);

})



// 2) ABRIR Y CERRAR MODAL

const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');

// al hacer click en un item, se abre el modal

const modalDelProducto = document.querySelector('.item-container'); //Al acceder al contenedor y hacer click sobre un item, el e.target es dicho item
modalDelProducto.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className == "item-rec") {
        let idSeleccionado = e.target.id;
        let productoSeleccionado = productos.find(producto => producto.id == idSeleccionado);

        //abrimos el modal
        modal.classList.add('modal--show');
        const datosProducto = document.querySelector('.datosProducto');
        datosProducto.innerHTML = `
            <h3 id="productoSeleccionado">${productoSeleccionado.nombre}</h3>
            <h4>Ingrese la cantidad de ${productoSeleccionado.nombre} que desea comprar (x 100g): <br></h4>
            <input type="number" required class="cantidad" id="cantidad"> 
            <h3>Precio total: </h3>
            <div class="precio"></div>
            <h3>Ingrese algún comentario: </h3>
            <textarea rows="6" cols="60"></textarea>
            `
        // el input number no me toma el precio cuando pongo la cantidad con las flechitas.
        // aparte debo designar la cantidad maxima de caracteres que puede ingresar el usuario
        // Obtenemos el precio
        const cantidad = document.querySelector('.cantidad').value;
        const contenedorCantidad = document.querySelector('.cantidad');
        const precio = document.querySelector('.precio');
        contenedorCantidad.addEventListener('keyup', (e) => {
            e.preventDefault();
            let resultado = obtenerPrecio(productoSeleccionado);
            precio.innerText = resultado;
        });
    }


})

// 3) AGREGAR AL CARRITO 
const carritoDeCompras = document.querySelector('.agregarAlCarrito');
carritoDeCompras.addEventListener("click", (e) => {
    e.preventDefault();
    let cantidad = parseInt(document.querySelector('.cantidad').value);
    let resultado = parseInt(document.querySelector('.precio').innerText);
    let nombreProductoSeleccionado = document.getElementById('productoSeleccionado').innerText;
    let productoSeleccionado = productos.find(({
        nombre
    }) => nombre == nombreProductoSeleccionado);
    cuentaEstandar.agregarAlCarrito(productoSeleccionado, cantidad, resultado);
    modal.classList.remove('modal--show');

})


// al hacer click en cancelar, se cierra el modal

closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('modal--show');
})


// 4) MOSTRAR CARRITO 

const shopping = document.querySelector('.carrito');
const modalCarrito = document.querySelector('.modalCarrito');
shopping.addEventListener("click", (e) => {

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

    // recorro los productos


    modalCarrito.classList.add('modal--show');
    abrirModalCarrito(cuentaEstandar);

})
const closeModalCarrito = document.querySelector('.modalCarrito__close');
closeModalCarrito.addEventListener('click', (e) => {
    e.preventDefault();
    modalCarrito.classList.remove('modal--show');
})

// 6) ELIMINAR PRODUCTO DEL CARRITO

const eliminarProducto = document.querySelector('.modalCarrito');
eliminarProducto.onclick = (e) => {
    if (e.target.className == "fa-solid fa-xmark cancelarProducto") {
        cuentaEstandar.eliminarProductoCarrito(e.target.id);
        abrirModalCarrito(cuentaEstandar);

    }
}



// 6) CATEGORIAS
const categorias__lista = document.querySelector('.categorias__lista');

categorias__lista.onclick = (e) => {

    // Volvemos todos los items de la categoria al color original
    let padre = categorias__lista;
    let hijos = categorias__lista.children;
    for (let hijo of hijos) {
        hijo.style.background = "#fff";
    }

    productoABuscarPorCategoria(e.target.id, itemContainer);

    //coloreamos al item clickeado
    e.target.style.background = "rgba(222, 234, 234, 0.80)";
}

// 7) MOSTRAR LA CANTIDAD DE PRODUCTOS QUE HAY EN EL CARRITO DENTRO DEL ICONO DE CARRITO

shopping.innerHTML = `<i class="fa-solid fa-cart-shopping"></i><div class="contadorDeProductos">${cuentaEstandar.productos.length}</div>`

// REGISTRAR AL USUARIO AL INGRESAR AL SITIO


// Dar la opcion de ordenar los productos del carrito por fecha de agregado, alfabeticamente, precio, etc.
// En el total del carrito, podria sumarle el precio por delivery (ej. partir con un costo de $150)





