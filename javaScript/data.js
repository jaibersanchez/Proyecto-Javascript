 
//alert("Bienvenida a Frida Beauty Shop la mejor solución para resaltar tu belleza")

//     let nombres = prompt("Ingresa tus nombres");
//     let apellidos = prompt("Ingresa tus apellidos");
//     let empresa = prompt("Ingresa tu empresa");
//     let tipoDocumento = prompt("Tipo de documento CC, Pasaporte o CE");
//     let numeroDocumento = prompt("Ingresa el número de documento");
//     let direccion = prompt("Ingresa tu dirección de residencia");
//     console.log("Bienvenido " + nombres, apellidos);


// let datoscliente = {
  
//     nombres: nombres,
//     apellidos: apellidos,
//     empresa: empresa,
//     tipoDocumento: tipoDocumento,
//     numeroDocumento: numeroDocumento,
//     direccion: direccion,

//   }

// Autocompletar campos del formulario

let btn = document.getElementById("mainButton");

// // Inputs

let name = document.getElementById("name");
let lastName = document.getElementById("lastName");
let job = document.getElementById("job");
let documentType = document.getElementById("documentType");
let documentNumber = document.getElementById("documentNumber");
let direction = document.getElementById("direction");

let myForm = document.getElementById("myForm");

// // Summary

let nameSummary = document.getElementById("nameSummary");
let lastNameSummary = document.getElementById("lastNameSummary");
let jobSummary = document.getElementById("jobSummary");
let documentTypeSummary = document.getElementById("documentTypeSummary");
let documentNumberSummary = document.getElementById("documentNumberSummary");
let directionSummary = document.getElementById("directionSummary");

name.addEventListener("input", (event) => {   console.log("--> Evento input en el input nombres.", event.target.value); nameSummary.innerHTML = event.target.value; });  
lastName.addEventListener("input", (event) => {   console.log("--> Evento input en el input apellidos.", event.target.value); lastNameSummary.innerHTML = event.target.value; }); 
job.addEventListener("input", (event) => {   console.log("--> Evento input en el input trabajo.", event.target.value); jobSummary.innerHTML = event.target.value; });
documentType.addEventListener("input", (event) => {   console.log("--> Evento input en el input tipo de documento.", event.target.value); documentTypeSummary.innerHTML = event.target.value; });
documentNumber.addEventListener("input", (event) => {   console.log("--> Evento input en el input numero de documento.", event.target.value); documentNumberSummary.innerHTML = event.target.value; });
direction.addEventListener("input", (event) => {   console.log("--> Evento input en el input direccion.", event.target.value); directionSummary.innerHTML = event.target.value; });

myForm.addEventListener("submit", (event) => {

   event.preventDefault();

  var fields = event.target.children;

  let fieldName = fields[0].children[1].value;

  let fieldLastName = fields[1].children[1].value;

  let fieldJob = fields[2].children[1].value;

  let fieldDocumentType = fields[3].children[1].value;

  let fieldDocumentNumber = fields[4].children[1].value;

  let fieldDirection = fields[5].children[1].value;

    return true;
 });


// CARRITO ---- 

class Category {
  constructor(id = 0, name = "Sin categoría") {
    this.id = id;
    this.name = name;
  }

  toString() {
    return this.name;
  }
}

class Product {
  constructor(id = 0, name = "Sin nombre", price = 0, category = null) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }

  toString() {
    if (this.category != null) {
      return this.name.concat(" (" + this.category.toString() + ")");
    }
    return this.name;
  }

  getSubTotal(cantidad) {
    if (parseFloat(cantidad) > 0) {
      return this.price * cantidad;
    }
    return 0;
  }
}

class Order {
  constructor(product = null, quantity = 0) {
    this.product = product;
    this.quantity = quantity;
  }

  toString() {
    if (this.product != null) {
      return this.product.name.concat(" (" + this.quantity + ")");
    }
    return "product not defined!";
  }

  getSubTotal() {
    if (this.product != null) {
      return this.product.getSubTotal(this.quantity);
    }
    return 0;
  }
}
  
  let capilarCategory1 = new Category(1, "Capilar: Desenredante termoprotector");
  let capilarCategory2 = new Category(2, "Capilar: Tónico revitalizante");
  let maquillajeCategory1 = new Category(3, "Maquillaje: Paleta de sombras dreamy");
  let maquillajeCategory2 = new Category(4, "Maquillaje: Paleta de sombras perfect mix");
  let cuidadoCategory1 = new Category(5, "Piel: Suero Facial");
  let cuidadoCategory2 = new Category(6, "Piel: Tónico facial");

  
  let products = [];
  
  products.push(new Product(1, "Capilar: Desenredante termoprotector", 30000, capilarCategory1));
  products.push(new Product(2, "Capilar: Tónico revitalizante", 40000, capilarCategory2));
  products.push(new Product(3, "Maquillaje: Paleta de sombras dreamy", 25000, maquillajeCategory1));
  products.push(new Product(4, "Maquillaje: Paleta de sombras perfect mix", 45000, maquillajeCategory2));
  products.push(new Product(5, "Piel: Suero facial vitamina C", 30000, cuidadoCategory1));
  products.push(new Product(6, "Piel: Tónico facial", 18000, cuidadoCategory2));

  
  let productsSelect = document.getElementById("selectProducts");
  products.forEach((unProducto) => {
    let option = document.createElement("option");
    option.innerHTML = unProducto.name;
    productsSelect.appendChild(option);
  });

  let addButton = document.getElementById("addButton");
  
  let trolley = [];
  
  function renderRowFooterSummary() {
    let detailsFoot = document.getElementById("detailsFoot");
    detailsFoot.innerHTML = "";
    let record = document.createElement("tr");
    const TOTAL = trolley.reduce(
      (acumulador, unaOrden) => acumulador + unaOrden.getSubTotal(),
      0
    );
    record.innerHTML = `
    <td colspan="3">TOTAL</td>
    <td colspan="2">$ ${TOTAL.toFixed(2)}</td>`;
    detailsFoot.append(record);
  }
  
  function removeAllOrders() {
    let newTrolleyColelction = [];
    localStorage.setItem("trolley", JSON.stringify(newTrolleyColelction));
    renderTableDetails(newTrolleyColelction);
  }
  
  function removeOrder(id) {
    if (id != null) {
      let newTrolleyColelction = trolley.filter((element) => {
        return element.product.id !== id;
      });
      localStorage.setItem("trolley", JSON.stringify(newTrolleyColelction));
      renderTableDetails(newTrolleyColelction);
    }
  }
  
  function renderRowDetail(unProducto, quantity) {
    let productDetail = document.getElementById("productDetail");
    let record = document.createElement("tr");
    record.innerHTML = `<th>${unProducto.name}</th>
      <td>${unProducto.price}</td>
      <td>${quantity}</td>
      <td>${unProducto.price * quantity}</td>
      <td>
        <button onclick="removeOrder(${
          unProducto.id
        })" type="button" class="btn btn-danger">Remover</button>
      </td>`;
    productDetail.appendChild(record);
  }
  
  function addproductToTrolley() {
    let selectedName = productsSelect.value;
    let selectedQuantity = parseInt(quantity.value);
    let unProducto = products.find((element) => {
      return element.name == selectedName;
    });
    if (unProducto !== undefined && selectedQuantity > 0) {
      let unaOrdenExistente = trolley.find((e) => {
        return e.product.id == unProducto.id;
      });
      if (unaOrdenExistente !== undefined) {
        unaOrdenExistente.quantity =
          unaOrdenExistente.quantity + selectedQuantity;
      } else {
        let unaOrden = new Order(unProducto, selectedQuantity);
        trolley.push(unaOrden);
      }
      localStorage.setItem("trolley", JSON.stringify(trolley));
      renderTableDetails(trolley);
    }
  }
  
  addButton.addEventListener("click", () => addproductToTrolley());
  
  let restoredTrolley = localStorage.getItem("trolley");
  
  function renderTableDetails(temptrolley = []) {
    let productDetail = document.getElementById("productDetail");
    productDetail.innerHTML = "";
    trolley = [];
    temptrolley.forEach((element) => {
      let unProducto = new Product(
        element.product.id,
        element.product.name,
        element.product.price,
        new Category(element.product.category.id, element.product.category.name)
      );
      let unaOrden = new Order(unProducto, element.quantity);
      trolley.push(unaOrden);
      renderRowDetail(unProducto, element.quantity);
    });
    renderRowFooterSummary();
  }
  
  if (restoredTrolley !== null) {
    let temptrolley = JSON.parse(restoredTrolley);
    renderTableDetails(temptrolley);
  }
  
  /* class Client{
    constructor(socialNumber, name, lastName, email){
  
    }
  
    toString(){}
  }
  
  class Invoice{
    constructor(nroFactura = 1, fecha = new Date(), clienteNombre, details = []){
      this.number = nroFactura;
      this.date = fecha;
      this.client = clienteNombre;
      this.details = details;
    }
  
    toString(){
      return this.number;
    }
  }
  
  // Cómo implementariamos la construcción de la factura
  
  let unaFactura = new Invoice(100, new Date(), "Pepe Sanchez", trolley); */


// CODIGO -----

/* const listaproductos = ["Capilar", "Maquillaje", "Piel"];
let productos = prompt("Que productos estas buscando?:  Capilar, Maquillaje o Piel");
let valorMinimo = prompt("Cual es el precio mínimo deseado para este producto")
let finded = listaproductos.find((tipo) => {
    return tipo.toLowerCase() === productos.toLowerCase()
});

if (finded !== undefined){
    
    if (finded.toLowerCase() == "capilar") {
        console.log("Capilar: Libre de ingredientes tóxicos y sin parabenos, colorantes y alcohol.");
    }
    if (finded.toLowerCase() == "maquillaje") {
        console.log("Naquillaje: Sin duda alguna nuestro make up es uno de los pasos más importantes en nuestra rutina diaria; desde el maquillaje para ojos hasta los accesorios que necesitas para verte fabulosa. ¿Lo mejor? Lo encuentras todo en un solo lugar.");
    }
    if (finded.toLowerCase() == "piel") {
        console.log("Piel: Te ayudamos a elegir el tónico facial según tu tipo de piel y cómo utilizarlo. ¡Mejora el cuidado de la piel con tu tónico facial ideal!")
    }
    
} else{
    console.log("--> NO encontraste el producto buscado!")
}
    

let datos = [
  { nombre: "Capilar: Desenredante termoprotector", precio: 30000 },
  { nombre: "Capilar: Tónico revitalizante", precio: 40000 },
  { nombre: "Maquillaje: Paleta de sombras dreamy", precio: 25000 },
  { nombre: "Maquillaje: Paleta de sombras perfect mix", precio: 45000 },
  { nombre: "Piel: Suero Facial", precio: 30000 },
  { nombre: "Piel: Tónico facial", precio: 18000 },
];

let filteredUno = datos.filter((unDato) => {return unDato.nombre.includes(finded);});

console.log("--> Todos los productos de tu interés", filteredUno);

let filteredDos = datos.filter((unDato) => unDato.precio < valorMinimo);

console.log(
  "--> Todos los productos de nuestra linea que cuestan menos de COP $", valorMinimo,
  filteredDos
); 


let const1 = 0;
let const2 = 0;
let const3 = 0;
let const4 = 0;
let const5 = 0;
let const6 = 0;

while (productos.toUpperCase() !== "ESC") {
    
    if (productos.toLowerCase() == "capilar") {
        let nombre = prompt("Indica el número:  1 Desenredante termoprotector,  2 Tónico revitalizante" );
        if(nombre == "1"){
            console.log("El precio del desenredante es COP $30.000");
            const1++;
        }if(nombre == "2"){
            console.log("El precio del tónico es COP $40.000");
            const2++;
        }
    }

    if (productos.toLowerCase() == "maquillaje") {
        let nombre = prompt("Indica el número:  3 Paleta de sombras dreamy,  4 Paleta de sombras perfect mix " );
        if(nombre == "3"){
            console.log("El precio de la paleta de sombras dreamy es COP $25.000");
            const3++;
        }if(nombre == "4"){
            console.log("El precio de la paleta de sombras perfect mix es COP $45.000 ");
            const4++;
        }
    }

    if (productos.toLowerCase() == "piel") {
        let nombre = prompt("Indica el número:  5 Suero Facial,  6 Tónico facial " );
        if(nombre == "5"){
            console.log("El precio del suero facial es COP $30.000");
            const5++;
        }if(nombre == "6"){
            console.log("El precio del tónico facial es COP $18.000 ");
            const6++;
        }
        
    }

    productos = prompt("Escoge otro producto: Capilar, Maquillaje o Piel; de lo contrario escribe ESC para generar tu cotización")

}


//CONFIRMAR CONTEO
//console.log(" el numero es" + const1)
//console.log(" el numero es" + const2)
//console.log(" el numero es" + const3)
//console.log(" el numero es" + const4)
//console.log(" el numero es" + const5)
//console.log(" el numero es" + const6)

//PRECIO UNITARIO DE CAPILAR

let desenredantetermoprotector = 30000;
let tonicorevitalizante = 40000;

//PRECIO UNITARIO DE MAQUILLAJE

let paletadesombrasdreamy = 25000;
let paletadesombrasperfectmix = 45000;

//PRECIO UNITARIO DE PIEL

let suerofacial = 30000;
let tonicofacial = 18000;



const SUMAR = (numUno, numDos, _numTres, _numCuatro, _numCinco, _numSeis) => {return numUno + numDos + _numTres + _numCuatro + _numCinco + _numSeis}
const TOTAL = (numUno, numDos) => {return numUno + numDos}
const RESTAR = (numUno, numDos) => {return numUno - numDos}
const IVA = precio => parseFloat(precio)*(0.19);
 

let precio = parseFloat(desenredantetermoprotector * const1) + parseFloat(tonicorevitalizante * const2) + parseFloat(paletadesombrasdreamy * const3) + parseFloat(paletadesombrasperfectmix * const4) + parseFloat(suerofacial * const5) + parseFloat(tonicofacial * const6);
console.log("Precio COP sin IVA: " + precio);

let descuentoAplicado = parseFloat(precio * 0.03);
console.log("Descuento 3%: " + descuentoAplicado);

//--> IVA(precioaplicado)                                                               
console.log("IVA 19%: " + IVA(precio));

//--> SUMAR(preciounitario, IVA(preciounitario))                                        
console.log("TOTAL + IVA: " + TOTAL(precio, IVA(precio)));

//--> RESTAR(SUMAR(preciounitario, IVA(preciouniatrio)), descuentoAplicado)             
console.log("TOTAL A PAGAR: " + RESTAR(TOTAL(precio, IVA(precio)), descuentoAplicado));
 

console.log("--> Rellenar un fomrulario <--"); */





