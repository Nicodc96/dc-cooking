// Si el carrito está vacío, renderizará una imagen ilustrativa y un texto
export const notElementsOnCart = () => {
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

// Limpia los elementos de un contenedor para actualizar información
export const cleanChildNodes = (container) => {
    while (container && container.hasChildNodes() && container.firstElementChild){
        container.removeChild(container.firstElementChild);
    }    
}

// Elementos 'precio total' y botón limpiar carrito
export const cleanCartAndTotalPriceElements = (list, handleBtnLimpiarCarrito) => {
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
    imgCleanCart.addEventListener("click", handleBtnLimpiarCarrito);

    divContainerCleanCart.appendChild(spanCleanCart);
    divContainerCleanCart.appendChild(imgCleanCart);

    divContainer.appendChild(divContainerCleanCart);

    return divContainer;
}

// Genera un elemento-carrito
export const elementCarrito = (service) => {
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