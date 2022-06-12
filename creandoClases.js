class BaseDeDatos {
    constructor () {
        this.cuentas = []
    }
    crearCuenta(cuenta) {
        this.cuentas.push(cuenta);
    }
};

class Cuenta {
    constructor (id, nombre, precio, direccion, telefono) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
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
};