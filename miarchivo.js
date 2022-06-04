const openModal = document.querySelector('.item');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');
const showPrice = document.querySelector('.verPrecio');
const price = document.querySelector('.precio');
const item = document.querySelector('.item').innerHTML;
let precio = 0;

const obtenerPrecio = (cantidad) => {
    let precio100gr = document.querySelector('.precio100gr').innerHTML;
    let precioKg = document.querySelector('.precioKg').innerHTML;
    if (cantidad % 1000 == 0) {
        precio = cantidad * precioKg / 1000;
    } else {
        precio = cantidad * precio100gr / 100
    }
    return precio;
}

let salir = false;

openModal.addEventListener('click', (e) => {
    e.preventDefault();
    do {
        cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar (en gramos)"));
        if (isNaN(cantidad)) {
            alert("El valor ingresado es incorrecto");
        } else if (cantidad % 1 == 0) {
            salir = true;
        }
    } while (salir == false);
    let resultado = obtenerPrecio(cantidad);
    confirm(`Usted está por comprar ${cantidad}g de ${item} a un precio total de $${resultado}. ¿Desea confirmar la compra?`);

});
