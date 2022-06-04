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
      if (cantidad%1000== 0) {
        precio = cantidad * precioKg / 1000;
    } else {
        precio = cantidad * precio100gr / 100
    }  
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