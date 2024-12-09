/* Sección para navbar sticky effect */
window.onscroll = () => toggleSticky();

const navbar = document.querySelector(".navbar");
let stickyNavbar = navbar.offsetTop;

const toggleSticky = () => {
    window.scrollY >= stickyNavbar ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}
/* ---------------------------------- */

/* Sección para control de eventos */
const offcanvas_btnInicioS = document.querySelector("#offcBtnInicioS");
const offcanvas_btnRecetasS = document.querySelector("#offcBtnRecetasS");
const offcanvas_btnContactoS = document.querySelector("#offcBtnContactoS");
const offcanvas_btnAboutUsS = document.querySelector("#offcBtnAcercaDeS");
const offcanvas_btnServiciosS = document.querySelector("#offcBtnServiciosS");

offcanvas_btnInicioS.addEventListener("click", () => {
    window.location.href = "../index.html";
});
offcanvas_btnRecetasS.addEventListener("click", () => {
    window.location.href = "./recetas.html";
});
offcanvas_btnContactoS.addEventListener("click", () => {
    window.location.href = "./contacto.html";
});
offcanvas_btnAboutUsS.addEventListener("click", () => {
    window.location.href = "./aboutus.html";
});
offcanvas_btnServiciosS.addEventListener("click", () => {
    window.location.href = "./servicios.html";
});
/* --------------  Efectos de botones -------------- */

const imgIconCart = document.querySelector("#img-icon-cart");
const toastDiv = document.querySelector("#toast-agregado");

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

// Si el carrito está vacío, renderizará una imagen ilustrativa y un texto
const notElementsOnCart = () => {
    const divContenedorCentral = document.createElement("div");
    divContenedorCentral.classList.add(...["d-flex", "flex-column", "align-items-center", "gap-2"]);
    
    const imgNotElement = document.createElement("img");
    imgNotElement.src = "../assets/carrito-vacio.webp";
    imgNotElement.alt = "carrito vacio";
    imgNotElement.width = 500;
    imgNotElement.classList.add("rounded");

    const textCarritoVacio = document.createElement("p");
    textCarritoVacio.textContent = "¡Carrito vacío!";
    textCarritoVacio.classList.add(...["fw-semibold", "fs-3"]);

    const secondaryText = document.createElement("p");
    secondaryText.textContent = "¡Selecciona uno o más de nuestros servicios para continuar con la compra!";

    divContenedorCentral.appendChild(imgNotElement);
    divContenedorCentral.appendChild(textCarritoVacio);
    divContenedorCentral.appendChild(secondaryText);
    return divContenedorCentral;
}

// Limpia los elementos del modal-body para actualizar info
const cleanModalContent = () => {
    while (modalCarritoBody.hasChildNodes()){
        modalCarritoBody.removeChild(modalCarritoBody.firstElementChild);
    }
}

// Elemento 'p' que muestra el precio total del carrito
const textTotalPrice = (list) => {
    const pElement = document.createElement("p");
    let total = 0;
    if (list.length > 0){
        list.forEach(servicio => {
            total += servicio.precio * servicio.cantidad;
        });
    }
    pElement.textContent = `Total: $${total}`;
    pElement.classList.add(...["text-center", "fw-semibold", "fs-5", "mt-3"]);
    return pElement;
}

// Chequea el array del localStorage
const checkElementslocalStorage =  () => {
    // if (listaCarritoDeCompras.length == 0){
    //     modalCarritoBody.appendChild(notElementsOnCart());
    //     btnModalCarritoComprar.classList.add("disabled");
    // }
}

checkElementslocalStorage();