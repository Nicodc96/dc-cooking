/* Sección para navbar sticky effect */
import { toggleSticky } from "./utils/navbarSticky.js";
import { handleOffCanvasClick } from "./utils/offcanvasClick.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.14.4/src/sweetalert2.js';
import { notElementsOnCart, cleanChildNodes, cleanCartAndTotalPriceElements, elementCarrito } from "./utils/elementos-servicio.js";

const navbar = document.querySelector(".navbar");
let sticky = navbar.offsetTop;

window.onscroll = () => toggleSticky(navbar, sticky);

/* Sección para control de eventos click de offcanvas */

document.querySelector("#offcBtnInicioS").addEventListener("click", () => handleOffCanvasClick("../index.html"));
document.querySelector("#offcBtnRecetasS").addEventListener("click", () => handleOffCanvasClick("./recetas.html"));
document.querySelector("#offcBtnContactoS").addEventListener("click", () => handleOffCanvasClick("./contacto.html"));
document.querySelector("#offcBtnAcercaDeS").addEventListener("click", () => handleOffCanvasClick("./aboutus.html"));
document.querySelector("#offcBtnServiciosS").addEventListener("click", () => handleOffCanvasClick("./servicios.html"));

/* --------------  Efectos de botones -------------- */

const imgIconCart = document.querySelector("#img-icon-cart");
const toastDiv = document.querySelector("#toast-agregado");

// Manejo de los efectos del boton comprar en cada card y del carrito de compras
window.addEventListener("click", (e) => {
    if (e.target.matches(".icon-card-services")){
        const actualTarget = e.target;
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastDiv);
        if (!actualTarget.classList.contains("rotate-center-backwards") && !actualTarget.classList.contains("rotate-center")){
            let iconStylesBgColor = "transform: scale(1.07);outline-offset: 2px;transition: all 0.4s;cursor: pointer;background-color: rgb(128, 197, 88);";
            let iconStylesNoColor = "transform: scale(1.07);outline-offset: 2px;transition: all 0.4s;cursor: pointer;";
            actualTarget.style.cssText = iconStylesBgColor;
            actualTarget.classList.toggle("rotate-center");
            imgIconCart.classList.toggle("rotate-scale-up");
            actualTarget.src = "../assets/svg/check.svg";
            toastBootstrap.show();
            setTimeout(() => {
                actualTarget.classList.toggle("rotate-center");
                imgIconCart.classList.toggle("rotate-scale-up");
                setTimeout(() => {
                    actualTarget.classList.toggle("rotate-center-backwards");
                }, 1500);
                actualTarget.classList.toggle("rotate-center-backwards");
                actualTarget.src = "../assets/svg/cart-plus.svg";
                actualTarget.style.cssText = iconStylesNoColor;
            }, 1500);
        }        
    }
});

/* -------------- Carrito de compras -------------- */
const listaCarritoDeCompras = JSON.parse(localStorage.getItem("pedidos")) || [];
const modalCarritoBody = document.querySelector("#modal-carrito-body");
const btnModalCarritoComprar = document.querySelector("#btn-modal-carrito-comprar");

// Manejo de botones + y - en lista de items
window.addEventListener("click", (e) => {
    // Botón '-'
    if (e.target.matches(".remove-item")){
        const numeroItems = e.target.parentElement.nextElementSibling.firstElementChild;
        const quitarItems = e.target;

        if (Number(numeroItems.textContent) <= 1) quitarItems.classList.add("disabled");
        numeroItems.textContent = Number(numeroItems.textContent) - 1;
        modifyQuantityElement(e.target.parentElement.parentElement.id.split("id-")[1], Number(numeroItems.textContent));
    }
    // Botón '+'
    if (e.target.matches(".add-item")){
        const numeroItems = e.target.parentElement.previousElementSibling.firstElementChild;
        const quitarItems = e.target.parentElement.previousElementSibling.previousElementSibling.firstElementChild;

        quitarItems.classList.remove("disabled");
        numeroItems.textContent = Number(numeroItems.textContent) + 1;
        modifyQuantityElement(e.target.parentElement.parentElement.id.split("id-")[1], Number(numeroItems.textContent));
    }
});

// Manejo de boton 'agregar al carrito'
window.addEventListener("click", (e) => {
    if (e.target.matches(".icon-card-services")){
        const btnAgregarAlCarrito = e.target;

        let idItem = 1;
        let existente = false;

        if (listaCarritoDeCompras.length > 0){
            idItem = listaCarritoDeCompras[listaCarritoDeCompras.length -1].id + 1;
            for (let i = 0; i < listaCarritoDeCompras.length; i++){
                if (listaCarritoDeCompras[i].nombre == btnAgregarAlCarrito.parentElement.children[0].textContent){
                    existente = true;
                    listaCarritoDeCompras[i].cantidad += 1;
                    break;
                }
            }
        }

        if (!existente){
            listaCarritoDeCompras.push({
                nombre: btnAgregarAlCarrito.parentElement.children[0].textContent,
                precio: Number(btnAgregarAlCarrito.parentElement.children[1].textContent.split("$")[1].split(".").join("")),
                imgSrc: btnAgregarAlCarrito.parentElement.previousElementSibling.src.split("assets/")[1],
                id: idItem,
                cantidad: 1
            });
        }

        if (btnModalCarritoComprar.classList.contains("disabled")) btnModalCarritoComprar.classList.remove("disabled");

        // Actualizar localStorage, actualizar modal, actualizar precio total
        localStorage.setItem("pedidos", JSON.stringify(listaCarritoDeCompras));
        cleanChildNodes(modalCarritoBody);
        checkElementslocalStorage();
        updateCantidadTotal();
    }
})

// Buscar y modificar la cantidad de un elemento del array
const modifyQuantityElement = (id, nuevaCantidad) => {
    if (listaCarritoDeCompras.length > 0){
        for (let i = 0; i < listaCarritoDeCompras.length; i++){
            if (listaCarritoDeCompras[i].id == id){
                listaCarritoDeCompras[i].cantidad = nuevaCantidad;
                break;
            }
        }
    }
    updateCantidadTotal();
    localStorage.setItem("pedidos", JSON.stringify(listaCarritoDeCompras));
}

// Actualiza el precio del total cuando se suma o resta la cantidad en el modal
const updateCantidadTotal = () => {
    const pPrecioTotal = document.querySelector("#container-totalprice-cleancart").firstElementChild;
    let nuevoTotal = 0;
    if (listaCarritoDeCompras.length > 0){
        listaCarritoDeCompras.forEach((servicio) => {
            nuevoTotal += servicio.precio * servicio.cantidad;
        })
    }
    pPrecioTotal.textContent = `Total: $${nuevoTotal}`;
}

// Manejo del evento click del botón 'limpiar carrito'
const btnLimpiarCarritoHandle = () => {
    Swal.fire({
        title: "Confirmación",
        text: "¿Desea limpiar el carrito de compras?",
        icon: "warning",
        showDenyButton: true,
        denyButtonText: "Cancelar",
        denyButtonColor: "#ababab",
        confirmButtonText: "Limpiar carrito",
        confirmButtonColor: "#d24242"
    }).then(response => {
        if (response.isConfirmed){
            cleanChildNodes(modalCarritoBody);
            modalCarritoBody.innerHTML = `<div id="contenedor-spinner" class="d-flex justify-content-center"><img src="../assets/svg/tube-spinner.svg" class="spinner" alt="spinner"></div>`;
            setTimeout(() => {
                cleanChildNodes(modalCarritoBody);
                modalCarritoBody.appendChild(notElementsOnCart());
                btnModalCarritoComprar.classList.add("disabled");
                listaCarritoDeCompras.length = 0;
                localStorage.setItem("pedidos", JSON.stringify(listaCarritoDeCompras));
            }, 1000);        
        }
    });
}

// Manejo del evento click del botón 'Iniciar compra'
btnModalCarritoComprar.addEventListener("click", (e) => {
    if (!e.target.classList.contains(".disabled")) window.location.href = "./shopping.html";
})

// Chequea el array del localStorage
const checkElementslocalStorage =  () => {
    if (listaCarritoDeCompras.length < 1){
        modalCarritoBody.appendChild(notElementsOnCart());
        btnModalCarritoComprar.classList.add("disabled");
    } else{
        cleanChildNodes(modalCarritoBody);
        listaCarritoDeCompras.forEach((servicio) => {
            modalCarritoBody.appendChild(elementCarrito(servicio));
        });
        modalCarritoBody.appendChild(cleanCartAndTotalPriceElements(listaCarritoDeCompras, btnLimpiarCarritoHandle));
    }
}

checkElementslocalStorage();