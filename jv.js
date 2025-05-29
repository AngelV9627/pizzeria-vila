const botonesAgregar = document.querySelectorAll('.agregar');
const listaCarrito = document.getElementById('lista-carrito');
const totalElement = document.getElementById('total');
const botonVaciar = document.getElementById('vaciar-carrito');
const botonWhatsapp = document.getElementById('enviar-whatsapp');

let carrito = {};

botonesAgregar.forEach((boton) => {
  boton.addEventListener('click', () => {
    const prod = boton.closest('.prod');
    const id = prod.dataset.id;
    const nombre = prod.dataset.nombre;
    const precio = parseInt(prod.dataset.precio);

    if (!carrito[id]) {
      carrito[id] = { nombre, precio, cantidad: 1 };
    } else {
      carrito[id].cantidad += 1;
    }

    actualizarCarrito();
  });
});

botonVaciar.addEventListener('click', () => {
  carrito = {};
  actualizarCarrito();
});

function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;
  let mensaje = 'Hola! Quiero hacer un pedido:%0A';

  Object.values(carrito).forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} x ${item.cantidad} = $${item.cantidad * item.precio}`;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;

    mensaje += `🍕 ${item.nombre} x ${item.cantidad} = $${item.cantidad * item.precio}%0A`;
  });

  totalElement.textContent = total;
  mensaje += `👉 Total: $${total}`;
  botonWhatsapp.href = `https://wa.me/543825400585?text=${mensaje}`;
}