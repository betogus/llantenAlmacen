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
    let cantidadEnKg = 0;
    let cantidadEn100g = 0;
        cantidadEnKg = Math.floor(cantidad/1000)
        cantidadEn100g = Math.floor(cantidad/100) - cantidadEnKg*10;
        precio = cantidadEnKg * precioKg + cantidadEn100g * precio100gr;
    return precio;
};

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
    confirm(`Usted está por comprar ${Math.floor(cantidad/100)*100}g de ${item} a un precio total de $${resultado}. ¿Desea confirmar la compra?`);

});
