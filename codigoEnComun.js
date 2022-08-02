//CLASES

class BaseDeDatos {
    constructor() {
        this.cuentas = []
    }
    crearCuenta(cuenta) {
        this.cuentas.push(cuenta);
    }
};

class Cuenta {
    constructor(id, nombre, email, ubicacion, productos) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.ubicacion = ubicacion;
        this.productos = productos;
    }


    agregarAlCarrito(productoSeleccionado, cantidadProducto, precioFinalProducto) {
        productoRepetido = this.productos.some((el) => el.id == productoSeleccionado.id)
        for (let producto of this.productos) {
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


// CREANDO LOS OBJETOS

const DOMitemContainer = document.querySelector('.item-container');

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


// FUNCIONES

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



// funcion asincrónica para verificar si existe o no el producto buscado

const existeElProducto = (listadoDeProductos) => {
    return new Promise((resolve, reject) => {
        listadoDeProductos.length > 0 ? resolve(listadoDeProductos) : reject("No hay coincidencia con su búsqueda");
    })
}

let numeroDeBoton;

function productosAMostrar(listadoDeProductos, productosSeleccionados) {
    let diezProductos = [];
    let productosAReducir = [];
    if (numeroDeBoton == undefined || (numeroDeBoton-1)*10 > productosSeleccionados.length) {
        numeroDeBoton = 1;
    }  
    if (productosSeleccionados.length < (numeroDeBoton)*10) {
        for (let i = (numeroDeBoton - 1)*10, j = 0; i < productosSeleccionados.length; i++, j++) {
            diezProductos[j] = productosSeleccionados[i];
        }
    } else {
        for (let i = (numeroDeBoton - 1)*10, j = 0; i < numeroDeBoton*10; i++, j++) {
            diezProductos[j] = productosSeleccionados[i];
        }
    }
    
    existeElProducto(productosSeleccionados).then((response) => {
        listadoDeProductos.innerHTML = diezProductos.reduce((listaProductos, producto) =>
            listaProductos +
            `<a><p class="item-rec" id="${producto.id}">${producto.nombre}</p></a>`, "");
    }).catch((error) => {
        listadoDeProductos.innerHTML = `<div class="noExisteElProducto"><h1><i class="fa-solid fa-magnifying-glass"> </i> ${error}</h1></div>`
    })
    
    let cantidadDeBotones = productosSeleccionados.length / 10;
    botonesDeProductos(cantidadDeBotones);
    productosAReducir = productosSeleccionados;

    document.querySelector(".item-button-container").onclick = (e) => {
        e.preventDefault();
        if (e.target.className == "item-button") {
            e.target.style.setProperty("background-color", "#6ab150")
            console.log(e.target.style.backgroundColor);

            numeroDeBoton = parseInt(e.target.id); 
            productosAMostrar(DOMitemContainer, productosAReducir)
        }
        
    }
    
}

// creamos las paginas para ir navegando por el listado de productos. Se muestra un max de 10 productos por pagina

function botonesDeProductos(cantidadDeBotones) {
    let boton;
    for (let i = 0; i < cantidadDeBotones; i++) {
        if (boton == undefined) {
            boton = `<div class="item-button" id="${i+1}">${[i+1]}</div>`;
        } else {
            boton += `<div class="item-button" id="${i+1}">${[i+1]}</div>`;
        }
    }
    if (document.querySelector(".item-button-container").innerHTML === undefined) {
        document.querySelector(".item-button-container").innerHTML = "null";
    }
    document.querySelector(".item-button-container").innerHTML = boton
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
    <p>email: ${cuentaEstandar.email}</p><br></div>
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

function geolocalizacion() {
    if (!"geolocation" in navigator) {
        return alert("Tu navegador no soporta el acceso a la ubicación. Intenta con otro");
    } else {
        let map;
        let mapOptions = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };


        map = new google.maps.Map(document.querySelector("#map"), mapOptions);
        navigator.geolocation.getCurrentPosition(function (position) {
            geolocate = new google.maps.LatLng(position.coords.latitude, position.coords
                .longitude);

            let marker = new google.maps.Marker({
                position: geolocate,
                map: map
            });
            map.setCenter(geolocate);
        });

    }

    document.querySelector(".ubicacion").removeEventListener("click", geolocalizacion);

};


function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


function validarUsuario() {
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let registrarme = document.querySelector(".formulario-registrarme");
    let emailValido = validateEmail(email);

    if (emailValido) {
        if (nombre && email && agregarUbicacion) {
            registrarme.style.background = "blue"
            return true

        } else {
            registrarme.style.background = "black"
            return false
        }

    } else {
        registrarme.style.background = "black"
        return false

    }

}


// CREANDO/TRAYENDO LOS USUARIOS DE LA BASE DE DATOS

const baseDeDatos = new BaseDeDatos();
let usuariosLocales = JSON.parse(localStorage.getItem("usuarios"));


// CREAR UN USUARIO EN CASO DE QUE NO EXISTA
let cuentaEstandar = new Cuenta;
let geolocate;
let agregarUbicacion = false;
if (!usuariosLocales) {

    // 1) ABRO EL MODAL
    document.querySelector(".modalUsuario").classList.add('modal--show');



    document.querySelector(".ubicacion").addEventListener("click", () => {
        geolocalizacion();
        agregarUbicacion = true;
        validarUsuario();
    });

    document.querySelector("#nombre").oninput = validarUsuario;
    document.querySelector("#email").oninput = validarUsuario;



    document.querySelector(".formulario-registrarme").onclick = (e) => {
        e.preventDefault();
        const ubicacion = geolocate;
        const registrado = validarUsuario();
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        if (registrado) {
            document.querySelector(".errorAlRegistrarse").innerHTML = ""

            cuentaEstandar.id = getRandomInt(1000, 10000);
            for (let i = 0; i < baseDeDatos.cuentas.length; i++) {
                while (cuentaEstandar.id == baseDeDatos.cuentas[i].id) {
                    cuentaEstandar.id = getRandomInt(1000, 10000);
                }
            }
            baseDeDatos.crearCuenta(cuentaEstandar);
            cuentaEstandar.nombre = nombre;
            cuentaEstandar.email = email
            cuentaEstandar.ubicacion = ubicacion;
            cuentaEnLS = baseDeDatos.cuentas;
            localStorage.setItem("usuarios", JSON.stringify(cuentaEnLS));
            document.querySelector(".modalUsuario").classList.remove("modal--show");

            // Sweet Alert
            Swal.fire({
                title: `Bienvenid@ ${nombre}!`,
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
            })



        } else {
            document.querySelector(".errorAlRegistrarse").innerHTML = "Su email o direccion no son válidas"

        }
    }
} else {
    baseDeDatos.crearCuenta(cuentaEstandar);
    cuentaEstandar.id = usuariosLocales[0].id
    cuentaEstandar.nombre = usuariosLocales[0].nombre
    cuentaEstandar.email = usuariosLocales[0].email
    cuentaEstandar.productos = usuariosLocales[0].productos;
    cuentaEnLS = baseDeDatos.cuentas;
    localStorage.setItem("usuarios", JSON.stringify(cuentaEnLS));
}




// ) CARGO LOS PRODUCTOS DEL CARRITO Y EL USUARIO DEL LOCALSTORAGE

cuentaEstandar.productos = JSON.parse(localStorage.getItem("producto")) || [];


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

// 7) MOSTRAR LA CANTIDAD DE PRODUCTOS QUE HAY EN EL CARRITO DENTRO DEL ICONO DE CARRITO

DOMshopping.innerHTML = `<i class="fa-solid fa-cart-shopping"></i><div class="contadorDeProductos">${cuentaEstandar.productos.length}</div>`

// MODIFICAR LOS DATOS DEL USUARIO

document.querySelector(".usuario").onclick = () => {
    // 1) ABRO EL MODAL
    document.querySelector(".formulario-registrarme").style.background = "blue";
    document.querySelector(".modalUsuario").classList.add('modal--show');
    document.querySelector(".formulario-usuario-titulo").innerHTML = "Datos Personales";
    geolocalizacion();
    agregarUbicacion = true;
    document.getElementById("nombre").value = cuentaEstandar.nombre;
    document.getElementById("email").value = cuentaEstandar.email;
    document.querySelector("#nombre").oninput = validarUsuario;
    document.querySelector("#email").oninput = validarUsuario;

    document.querySelector(".formulario-registrarme").onclick = (e) => {
        e.preventDefault();
        const ubicacion = geolocate;
        const registrado = validarUsuario();
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        if (registrado) {
            document.querySelector(".errorAlRegistrarse").innerHTML = ""
            cuentaEstandar.nombre = nombre;
            cuentaEstandar.email = email
            cuentaEstandar.ubicacion = ubicacion;
            cuentaEnLS = baseDeDatos.cuentas;
            localStorage.setItem("usuarios", JSON.stringify(cuentaEnLS));
            document.querySelector(".modalUsuario").classList.remove("modal--show");

            //Toastify
            Toastify({
                text: `Se modificaron sus datos con éxito`,
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



        } else {
            document.querySelector(".errorAlRegistrarse").innerHTML = "Su email o direccion no son válidas"

        }
    }


}