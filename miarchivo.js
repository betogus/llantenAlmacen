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
    agregarAlCarrito(producto) {
        this.productos.push(producto);
    }
};

class Producto {
    constructor(id, nombre, precio100gr, precioKg, hayStock) {
        this.id = id;
        this.nombre = nombre;
        this.precio100gr = precio100gr;
        this.precioKg = precioKg;
        this.hayStock = hayStock;
    }
    obtenerPrecio(cantidad) {
        let precio100gr = precio100gr;
        let precioKg = precioKg;
        let cantidadEnKg = 0;
        let cantidadEn100g = 0;
        cantidadEnKg = Math.floor(cantidad / 1000)
        cantidadEn100g = Math.floor(cantidad / 100) - cantidadEnKg * 10;
        precio = cantidadEnKg * precioKg + cantidadEn100g * precio100gr;
        return precio;
    }
};


// Funciones 

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// INSTANCIANDO LAS CLASES

let cuentaEstandar = new Cuenta();
let cuentaPrueba = new Cuenta(1234, "bot", "calle falsa 123", 123456789); // cuenta de ejemplo

const baseDeDatos = new BaseDeDatos;
baseDeDatos.crearCuenta(cuentaPrueba); //instanciamos la cuenta de prueba

const productos = []; //aqui se guardaran todos los productos

const producto1 = new Producto(1, 'POROTOS ALUBIA', 30, 220, true);
const producto2 = new Producto(2, 'POROTOS DE SOJA', 12, 95, true);
const producto3 = new Producto(3, 'POROTOS ADUKI', 35, 310, true);
const producto4 = new Producto(4, 'POROTOS COLORADOS', 30, 240, true);
const producto5 = new Producto(5, 'POROTOS MUNG', 20, 190, true);
const producto6 = new Producto(6, 'POROTOS NEGROS', 25, 245, true);
const producto7 = new Producto(7, 'POROTOS LUPINES', 25, 225, true);
const producto8 = new Producto(8, 'GARBANZOS', 25, 249, true);
const producto9 = new Producto(9, 'LENTEJAS', 35, 335, true);
const producto10 = new Producto(10, 'LENTEJAS ROJAS', 45, 435, true);
const producto11 = new Producto(11, 'SOJA TEXTURIZADA', 37, 350, true);
const producto12 = new Producto(12, 'ARROZ YAMANÍ', 30, 240, true);
const producto13 = new Producto(13, 'ARROZ INTEGRAL LARGO FINO', 15, 130, true);
const producto14 = new Producto(14, 'ARVEJAS ENTERAS', 25, 200, true);
const producto15 = new Producto(15, 'QUINOA', 60, 550, true);
const producto16 = new Producto(16, 'MAIZ PISINGALLO', 14, 120, true);
const producto17 = new Producto(17, 'MAIZ PISADO BLANCO', 25, 210, true);
const producto18 = new Producto(18, 'HARINA DE TRIGO INTEGRAL', 30, 200, true);
const producto19 = new Producto(19, 'HARINA DE TRIGO SERRACENO', 50, 480, true);
const producto20 = new Producto(20, 'HARINA DE ARROZ', 15, 115, true);
const producto21 = new Producto(21, 'HARINA DE MAÍZ', 15, 115, true);
const producto22 = new Producto(22, 'HARINA DE CENTENO INTEGRAL', 30, 280, true);
const producto23 = new Producto(23, 'HARINA DE AVENA', 19, 165, true);
const producto24 = new Producto(24, 'HARINA DE GARBANZOS', 15, 125, true);
const producto25 = new Producto(25, 'HARINA DE COCO', 85, 830, true);
const producto26 = new Producto(26, 'HARINA DE ALMENDRAS', 180, 1750, true);
const producto27 = new Producto(27, 'HARINA DE ALGARROBA', 45, 410, true);
const producto28 = new Producto(28, 'HARINA DE CHÍA', 40, 342, true);
const producto29 = new Producto(29, 'BOLITAS DE CHOCOLATE', 45, 415, true);
const producto30 = new Producto(30, 'ALMOHADITAS DOBLE SALVADO', 40, 360, true);
const producto31 = new Producto(31, 'ALMOHADITAS FRUTILLA', 55, 520, true);
const producto32 = new Producto(32, 'ALMOHADITAS LIMÓN', 65, 640, true);
const producto33 = new Producto(33, 'ALMOHADITAS AVELLANA', 55, 520, true);
const producto34 = new Producto(34, 'CHOCOLATE BLANCO', 55, 520, true);
const producto35 = new Producto(35, 'LIMÓN', 55, 520, true);
const producto36 = new Producto(36, 'ALMOHADITAS MANÍ', 70, 645, true);
const producto37 = new Producto(37, 'BASTONCITOS DE SALVADO', 38, 360, true);
const producto38 = new Producto(38, 'SALVADO DE TRIGO', 12, 105, true);
const producto39 = new Producto(39, 'SALVADO DE AVENA', 20, 190, true);
const producto40 = new Producto(40, 'GERMEN DE TRIGO', 12, 105, true);
const producto41 = new Producto(41, 'TRIGO BURGOL FINO', 25, 210, true);
const producto42 = new Producto(42, 'AVENA INSTANTÁNEA', 25, 220, true);
const producto43 = new Producto(43, 'AVENA TRADICIONAL', 20, 180, true);
const producto44 = new Producto(44, 'GRANOLA CROCANTE SATVIKA', 55, 510, true);
const producto45 = new Producto(45, 'GRANOLA TROPICAL SATVIKA', 65, 620, true);
const producto46 = new Producto(46, 'SATVIKA', 60, 570, true);
const producto47 = new Producto(47, 'GRANOLA MONARCA FRUIT ENERGY', 65, 610, true);
const producto48 = new Producto(48, 'GRANOLA MONARCA OMEGA', 50, 480, true);
const producto49 = new Producto(49, 'GRANOLA MONARCA STEVIA', 62, 600, true);
const producto50 = new Producto(50, 'POWER', 60, 580, true);
const producto51 = new Producto(51, 'TUTUCA CON AZÚCAR', 40, 350, true);
const producto52 = new Producto(52, 'TUTUCA C/ EDULCORANTE', 55, 500, true);
const producto53 = new Producto(53, 'ARITOS DE MIEL', 35, 325, true);
const producto54 = new Producto(54, 'COPOS DE MAIZ', 30, 240, true);
const producto55 = new Producto(55, 'COPOS AZUCARADOS', 35, 250, true);
productos.push(producto1);
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

// Eventos

const openModal = document.querySelectorAll('.item');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');
const showPrice = document.querySelectorAll('.verPrecio');
const price = document.querySelectorAll('.precio');
const item = document.querySelector('.item').innerHTML; 

// valores base
let precio = 0;
let salir = false;


openModal.addEventListener('click', (e) => {
        e.preventDefault();
        const nombre = document.querySelector('.nombre').textContent;
        const precio100gr = document.querySelector('.precio100gr').textContent;
        const precioKg = document.querySelector('precioKg').textContent;
        const producto = new Producto (1, nombre, precio100gr, precioKg, true);
        prompt(producto) 
        /* if (cuentaEstandar.id == null) {
            cuentaEstandar.nombre = prompt("Usted no se encuentra registrado. Ingrese su nombre");
            cuentaEstandar.id = getRandomInt(1000, 10000);
            for (let i = 0; i < baseDeDatos.cuentas.length; i++) {
                while (cuentaEstandar.id == baseDeDatos.cuentas[i].id) {
                    cuentaEstandar.id = getRandomInt(1000, 10000);
                }
            }
            cuentaEstandar.direccion = prompt("Ingrese su dirección");
            cuentaEstandar.telefono = prompt("Ingrese su teléfono");
            baseDeDatos.crearCuenta(cuentaEstandar);
        }

    })



    do {
        cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar (en gramos)"));
        if (isNaN(cantidad)) {
            alert("El valor ingresado es incorrecto");
        } else if (cantidad % 1 == 0) {
            salir = true;
        }
    } while (salir == false);
    let resultado = obtenerPrecio(cantidad);
    confirm(`Usted está por comprar ${Math.floor(cantidad/100)*100}g de ${item} a un precio total de $${resultado}. ¿Desea confirmar la compra?`); */
})