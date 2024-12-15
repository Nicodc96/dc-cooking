/* Sección para navbar sticky effect */
window.onscroll = () => toggleSticky();

const navbar = document.querySelector(".navbar");
let stickyNavbar = navbar.offsetTop;

const toggleSticky = () => {
    window.scrollY >= stickyNavbar ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}

/* - Sección para control de eventos - */
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

import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.14.4/src/sweetalert2.js'; // sweetalert2


// Manejo de botones + y - en lista de items
window.addEventListener("click", (e) => {
    // Botón '-'
    if (e.target.matches(".remove-item")){
        const numeroItems = e.target.parentElement.nextElementSibling.firstElementChild;
        const quitarItems = e.target;
        if (Number(numeroItems.textContent) <= 1){
            quitarItems.classList.add("disabled");
            numeroItems.textContent = Number(numeroItems.textContent) - 1;
            modifyQuantityElement(e.target.parentElement.parentElement.id.split("id-")[1], Number(numeroItems.textContent));
        } else{
            numeroItems.textContent = Number(numeroItems.textContent) - 1;
            modifyQuantityElement(e.target.parentElement.parentElement.id.split("id-")[1], Number(numeroItems.textContent));
        }
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
            listaCarritoDeCompras.forEach((servicio) => {
                if (servicio.nombre == btnAgregarAlCarrito.parentElement.children[0].textContent){
                    existente = true;
                    servicio.cantidad += 1;
                }
            });
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
        if (btnModalCarritoComprar.classList.contains("disabled")){
            btnModalCarritoComprar.classList.remove("disabled");
        }
        localStorage.setItem("pedidos", JSON.stringify(listaCarritoDeCompras));
        cleanModalContent();
        checkElementslocalStorage();
        updateCantidadTotal();
    }
})

// Buscar y modificar la cantidad de un elemento del array
const modifyQuantityElement = (id, nuevaCantidad) => {
    if (listaCarritoDeCompras.length > 0){
        listaCarritoDeCompras.forEach((servicio) => {
            if (servicio.id == id){
                servicio.cantidad = nuevaCantidad;
            }
        });
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

// Si el carrito está vacío, renderizará una imagen ilustrativa y un texto
const notElementsOnCart = () => {
    const divContenedorCentral = document.createElement("div");
    divContenedorCentral.classList.add(...["d-flex", "flex-column", "align-items-center", "gap-2"]);
    
    const imgNotElement = document.createElement("img");
    imgNotElement.id = "img-sin-elementos";
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
    while (modalCarritoBody.hasChildNodes() && modalCarritoBody.firstElementChild){
        modalCarritoBody.removeChild(modalCarritoBody.firstElementChild);
    }    
}

// Elementos 'precio total' y botón limpiar carrito
const cleanCartAndTotalPriceElements = (list) => {
    const divContainer = document.createElement("div");
    divContainer.classList.add(...["d-flex", "flex-row", "align-items-center", "justify-content-between"]);
    divContainer.id = "container-totalprice-cleancart";
    const pElementTotalPrice = document.createElement("p");
    let total = 0;
    if (list.length > 0){
        list.forEach(servicio => {
            total += servicio.precio * servicio.cantidad;
        });
    }
    pElementTotalPrice.textContent = `Total: $${total}`;
    pElementTotalPrice.classList.add(...["text-center", "fw-semibold", "fs-5", "mt-3"]);
    
    divContainer.appendChild(pElementTotalPrice);

    const divContainerCleanCart = document.createElement("div");
    divContainerCleanCart.classList.add("tooltip-container");
    const spanCleanCart = document.createElement("span");
    spanCleanCart.classList.add("tooltip-text");
    spanCleanCart.textContent = "Limpiar el carrito";

    const imgCleanCart = document.createElement("img");
    imgCleanCart.src = "../assets/svg/trash-can.svg";
    imgCleanCart.id = "limpiar-carrito";
    imgCleanCart.alt = "limpiar carrito";
    imgCleanCart.classList.add("icon-limpiar-carrito");
    imgCleanCart.addEventListener("click", btnLimpiarCarritoHandle);

    divContainerCleanCart.appendChild(spanCleanCart);
    divContainerCleanCart.appendChild(imgCleanCart);

    divContainer.appendChild(divContainerCleanCart);

    return divContainer;
}

// Genera un elemento-carrito
const elementoCarritoElement = (service) => {
    const divElementoCarrito = document.createElement("div");
    divElementoCarrito.classList.add("elemento-carrito");

    const imgElementoCarrito = document.createElement("img");
    imgElementoCarrito.src = `../assets/${service.imgSrc}`;
    imgElementoCarrito.alt = `${service.nombre}}`;
    imgElementoCarrito.classList.add("img-item-carrito");

    const divContenedorInfoElemento = document.createElement("div");
    divContenedorInfoElemento.classList.add(...["d-flex", "flex-column", "gap-1"]);

    const pElementInfoElemento = document.createElement("p");
    pElementInfoElemento.textContent = `${service.nombre}`;
    pElementInfoElemento.classList.add("fw-semibold");

    divContenedorInfoElemento.appendChild(pElementInfoElemento);

    // Buen nombre?
    const divContenedorPaginationInfoElemento = document.createElement("div");
    divContenedorPaginationInfoElemento.classList.add(...["d-flex", "gap-3"]);

    const ulPagination = document.createElement("ul");
    ulPagination.classList.add(...["pagination", "pagination-sm"]);
    ulPagination.id = `item-list-id-${service.id}`;

    // Esto lo hago así para evitar líneas innecesarias de código
    ulPagination.innerHTML = `<li class="page-item"><p class="page-link remove-item">-</p></li>
    <li class="page-item"><p class="page-link disabled">${service.cantidad}</p></li>
    <li class="page-item"><p class="page-link add-item">+</p></li>`;

    const pPricePagination = `<p>Precio: <span class="text-success">$${service.precio}</span></p>`;

    divContenedorPaginationInfoElemento.appendChild(ulPagination);
    divContenedorPaginationInfoElemento.innerHTML += pPricePagination;

    divContenedorInfoElemento.appendChild(divContenedorPaginationInfoElemento);
    divElementoCarrito.appendChild(divContenedorInfoElemento);
    divElementoCarrito.appendChild(imgElementoCarrito);

    return divElementoCarrito;
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
            cleanModalContent();
            modalCarritoBody.innerHTML = `<div id="contenedor-spinner" class="d-flex justify-content-center"><img src="../assets/svg/tube-spinner.svg" class="spinner" alt="spinner"></div>`;
            setTimeout(() => {
                cleanModalContent();
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
    if (!e.target.classList.contains(".disabled")){
        window.location.href = "./shopping.html";
    }
})

// Chequea el array del localStorage
const checkElementslocalStorage =  () => {
    if (listaCarritoDeCompras.length < 1){
        modalCarritoBody.appendChild(notElementsOnCart());
        btnModalCarritoComprar.classList.add("disabled");
    } else{
        cleanModalContent();
        listaCarritoDeCompras.forEach((servicio) => {
            modalCarritoBody.appendChild(elementoCarritoElement(servicio));
        });
        modalCarritoBody.appendChild(cleanCartAndTotalPriceElements(listaCarritoDeCompras));
    }
}

checkElementslocalStorage();