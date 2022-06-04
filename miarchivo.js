const openModal = document.querySelector('.item');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');
const showPrice = document.querySelector('.verPrecio');
const price = document.querySelector('.precio');

const obtenerPrecio = () => {
    let cantidad = document.querySelector('.cantidad').value;
    let precio100gr = document.querySelector('.precio100gr').innerHTML;
    let precioKg = document.querySelector('.precioKg').innerHTML;
    let precio;
    let cantidadEnKg = 0;
    let cantidadEn100g = 0;
        cantidadEnKg = Math.floor(cantidad/1000)
        cantidadEn100g = Math.floor(cantidad/100) - cantidadEnKg*10;
        precio = cantidadEnKg * precioKg + cantidadEn100g * precio100gr;
    return precio;
}

openModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('modal--show');
    
});



closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('modal--show');
});



showPrice.addEventListener('click', (e) => {
    let resultado = obtenerPrecio();
    price.innerHTML = `$ ${resultado}`;
});