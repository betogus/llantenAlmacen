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
    e.preventDefault();
    let resultado = obtenerPrecio();
    price.innerHTML = `$ ${resultado}`;
});


/* const productosEnElCarrito = [];

const productos = [
    {id:1, titulo:'Zapatilla niky', precio: 900, hayStock: true},
    {id:2, titulo:'Zapatilla Adidas', precio: 200, hayStock:false},
    {id:3, titulo:'Zapatilla Jagguar', precio: 200, hayStock:false}
];

let acumulador = ``;
for (let i = 0; i < productos.length; i++){
    acumulador += `<div>
    ${productos[i].titulo} - $${productos[i].precio}<br>
        <button onclick="agregarAlCarrito(${productos[i].id})">Agregar</button>
    </div>`;
}
document.write(acumulador);


function agregarAlCarrito(idDeProducto){
    const indiceEncontrado = productos.findIndex(producto => producto.id == idDeProducto);
    productosEnElCarrito.push(productos[indiceEncontrado]);
    console.log(productosEnElCarrito);
}

// nombreDelArray.reverse();
 */