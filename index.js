// CREANDO LAS CLASES

class BaseDeDatos {
    constructor() {
        this.cuentas = []
    }
    crearCuenta(cuenta) {
        this.cuentas.push(cuenta);
    }
};




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

class Cuenta {
    constructor(id, nombre, direccion, telefono) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.productos = [];
    }

    eliminarProductoCarrito(idProducto) {
        let indiceProductoAEliminar = this.productos.findIndex(producto => producto.id == idProducto);
        this.productos.splice(indiceProductoAEliminar);
        let productoEnLS = this.productos;
        localStorage.setItem("producto", JSON.stringify(productoEnLS));
        DOMshopping.innerHTML = `<i class="fa-solid fa-cart-shopping"></i><div class="contadorDeProductos">${cuentaEstandar.productos.length}</div>`
    }
};


// CREANDO LOS OBJETOS

let cuentaEstandar = new Cuenta();

const baseDeDatos = new BaseDeDatos();
baseDeDatos.crearCuenta(cuentaEstandar);


// 0) CARGO LOS PRODUCTOS DEL CARRITO DEL LOCALSTORAGE

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

// GEOLOCALIZACION

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
            let geolocate = new google.maps.LatLng(position.coords.latitude, position.coords
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

document.querySelector(".ubicacion").addEventListener("click", geolocalizacion);
