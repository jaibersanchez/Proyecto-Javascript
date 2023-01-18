

// Autocompletar campos del formulario

let btn = document.getElementById("mainButton");

// // Inputs

let name = document.getElementById("name");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let documentType = document.getElementById("documentType");
let documentNumber = document.getElementById("documentNumber");
let direction = document.getElementById("direction");

let myForm = document.getElementById("myForm");

// // Summary

let nameSummary = document.getElementById("nameSummary");
let lastNameSummary = document.getElementById("lastNameSummary");
let emailSummary = document.getElementById("emailSummary");
let documentTypeSummary = document.getElementById("documentTypeSummary");
let documentNumberSummary = document.getElementById("documentNumberSummary");
let directionSummary = document.getElementById("directionSummary");

name.addEventListener("input", (event) => {   console.log("--> Evento input en el input nombres.", event.target.value); nameSummary.innerHTML = event.target.value; });  
lastName.addEventListener("input", (event) => {   console.log("--> Evento input en el input apellidos.", event.target.value); lastNameSummary.innerHTML = event.target.value; }); 
email.addEventListener("input", (event) => {   console.log("--> Evento input en el input trabajo.", event.target.value); emailSummary.innerHTML = event.target.value; });
documentType.addEventListener("input", (event) => {   console.log("--> Evento input en el input tipo de documento.", event.target.value); documentTypeSummary.innerHTML = event.target.value; });
documentNumber.addEventListener("input", (event) => {   console.log("--> Evento input en el input numero de documento.", event.target.value); documentNumberSummary.innerHTML = event.target.value; });
direction.addEventListener("input", (event) => {   console.log("--> Evento input en el input direccion.", event.target.value); directionSummary.innerHTML = event.target.value; });

myForm.addEventListener("submit", (event) => {

   event.preventDefault();

  var fields = event.target.children;

  let fieldName = fields[0].children[1].value;

  let fieldLastName = fields[1].children[1].value;

  let fieldEmail = fields[2].children[1].value;

  let fieldDocumentType = fields[3].children[1].value;

  let fieldDocumentNumber = fields[4].children[1].value;

  let fieldDirection = fields[5].children[1].value;

    return true;
 });


// CARRITO
  
document.addEventListener("DOMContentLoaded", () => {
  fetchData()
})

const fetchData = async () => {
  try {
      const res = await fetch('json/api.json')
      const data = await res.json()
      //console.log(data)
      listaProductos(data)
      detectarBotones(data)
  } catch (error) {
      console.log(error)
  }
}

const contendorProductos = document.querySelector('#contenedor-productos')
const listaProductos = (data) => {
  const template = document.querySelector('#template-productos').content
  const fragment = document.createDocumentFragment()
  console.log(template)
  data.forEach(producto => {
      // console.log(producto)
      template.querySelector('img').setAttribute('src', producto.img)
      template.querySelector('h5').textContent = producto.title
      template.querySelector('p span').textContent = producto.precio
      template.querySelector('button').dataset.id = producto.id
      const clone = template.cloneNode(true)
      fragment.appendChild(clone)
  })
  contendorProductos.appendChild(fragment)
}

let carrito = {}

const detectarBotones = (data) => {
  const botones = document.querySelectorAll('.card button')

  botones.forEach(btn => {
      btn.addEventListener('click', () => {
          // console.log(btn.dataset.id)
          const producto = data.find(item => item.id === parseInt(btn.dataset.id))
          producto.cantidad = 1
          if (carrito.hasOwnProperty(producto.id)) {
              producto.cantidad = carrito[producto.id].cantidad + 1
          }
          carrito[producto.id] = { ...producto }
          // console.log('carrito', carrito)
          armarCarrito()
      })
  })
}

const items = document.querySelector('#items')

const armarCarrito = () => {

  //pendiente innerHTML
  items.innerHTML = ''

  const template = document.querySelector('#template-carrito').content
  const fragment = document.createDocumentFragment()

  Object.values(carrito).forEach(producto => {
      // console.log('producto', producto)
      template.querySelector('th').textContent = producto.id
      template.querySelectorAll('td')[0].textContent = producto.title
      template.querySelectorAll('td')[1].textContent = producto.cantidad
      template.querySelector('span').textContent = producto.precio * producto.cantidad
      
      //botones
      template.querySelector('.btn-info').dataset.id = producto.id
      template.querySelector('.btn-danger').dataset.id = producto.id

      const clone = template.cloneNode(true)
      fragment.appendChild(clone)
  })

  items.appendChild(fragment)

  armarFooter()
  accionBotones()

}

const footer = document.querySelector('#footer-carrito')
const armarFooter = () => {

  footer.innerHTML = ''

  if (Object.keys(carrito).length === 0) {
      footer.innerHTML = `
      <th scope="row" colspan="5">Carrito vacío</th>
      `
      return
  }

  const template = document.querySelector('#template-footer').content
  const fragment = document.createDocumentFragment()

  // sumar cantidad y sumar totales
  const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
  const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
  // console.log(nPrecio)

  template.querySelectorAll('td')[0].textContent = nCantidad
  template.querySelector('span').textContent = nPrecio

  const clone = template.cloneNode(true)
  fragment.appendChild(clone)

  footer.appendChild(fragment)

  const boton = document.querySelector('#vaciar-carrito')
  boton.addEventListener('click', () => {
      carrito = {}
      armarCarrito()
  })

}

const accionBotones = () => {
  const botonesAgregar = document.querySelectorAll('#items .btn-info')
  const botonesEliminar = document.querySelectorAll('#items .btn-danger')

  // console.log(botonesAgregar)

  botonesAgregar.forEach(btn => {
      btn.addEventListener('click', () => {
          // console.log(btn.dataset.id)
          const producto = carrito[btn.dataset.id]
          producto.cantidad ++
          carrito[btn.dataset.id] = { ...producto }
          armarCarrito()
      })
  })

  botonesEliminar.forEach(btn => {
      btn.addEventListener('click', () => {
          // console.log('eliminando...')
          const producto = carrito[btn.dataset.id]
          producto.cantidad--
          if (producto.cantidad === 0) {
              delete carrito[btn.dataset.id]
          } else {
              carrito[btn.dataset.id] = { ...producto }
          }
          armarCarrito()
      })
  })
}

fetch("./json/api.json")
.then((response) => response.json())
.then((productos) => {
   console.table(productos)
})


//Alert

// let btnDanger = document.getElementById("comprar");
// btnDanger.addEventListener("click", () => {
//   Swal.fire({
//     title: "Mensaje rojo",
//     text: "Presionaste el botón rojo",
//     icon: "error",
//     confirmButtonText: "Error",
//   })
// })























