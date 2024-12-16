const listaCarritoDeCompras = JSON.parse(localStorage.getItem("pedidos")) || [];
const contenedorResumen = document.querySelector("#resumen-carrito");
const inputEmailResumen = document.querySelector("#form-shop-email");
const inputNombreResumen = document.querySelector("#form-shop-nombre");
const inputTelefonoResumen = document.querySelector("#form-shop-telefono");
const inputCuponResumen = document.querySelector("#form-shop-descuento");

import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.14.4/src/sweetalert2.js';

// Manejo de evento focusOut de un input incorrecto indicando el error visual
const handleOutFocus = (event, regexValidator) => {
    const input = event.target;

    if (input && !regexValidator.test(input.value) && !input.classList.contains("is-invalid")){
        input.classList.add("is-invalid");
        input.parentElement.nextElementSibling.style.display = "initial";
    } else{
        if (regexValidator.test(input.value)){
            input.classList.remove("is-invalid");
            input.parentElement.nextElementSibling.style.display = "none";
        }
    }
}

// Manejo del evento focusOut easter egg del descuento
const handleOutFocusEG = (event) => {
    const input = event.target;
    const textEasterEgg = /^talentotech$/;
    const totalPriceText = document.querySelector("#totalprice-resume");
    const precioOriginal = Number(totalPriceText.textContent.split("$")[1]);

    // En caso que no se ingrese un código, resetear estilos y valor original
    if (input.value.length == 0){
        input.classList.remove("is-invalid");
        input.classList.remove("is-confirmed");
        totalPriceText.textContent = `Total: $${precioTotalNum(listaCarritoDeCompras)}`;
    }
    
    // En caso que se ingrese al menos un caracteres y no sea 'talentotech' se ingresa estilo visual 'incorrecto' y se reestablece el precio original
    if (input && !textEasterEgg.test(input.value) && !input.classList.contains("is-invalid") && input.value.length > 0){
        input.classList.add("is-invalid");
        totalPriceText.textContent = `Total: $${precioTotalNum(listaCarritoDeCompras)}`;
    } else{
        if (textEasterEgg.test(input.value)) {
            input.classList.add("is-confirmed");
            // Este condicional previene que pise el descuento y vuelva a descontar (o generar NaN)
            if (!totalPriceText.textContent.split("%")[1] || !totalPriceText.textContent.split("%")[1].trim() == "descuento)"){
                totalPriceText.textContent = `Total: $${precioOriginal - (precioOriginal*0.15)} (15% descuento)`;
                console.log(`Total: $${precioOriginal - (precioOriginal*0.15)} (15% descuento)`);
            }
        }
    }
}

// Manejo del evento click del botón confimar
const handleClickConfirm = (event) => {
    // Previene el comportamiento normal del submit del formulario
    event.preventDefault();
    // Validadores de los inputs con expresiones regulares
    const emailRegexValidator = /^([a-zA-Z0-9_._-]+@+[a-zA-Z]+(\.)+[a-zA-Z_.]{2,10})$/;
    const nameRegexValidator = /^([a-zA-ZÀ-ÿ ]){3,30}$/;
    const phoneRegexValidator = /^([0-9]){8,10}$/;

    const inputEmail = document.querySelector("#form-shop-email");
    const inputNombre = document.querySelector("#form-shop-nombre");
    const inputTelefono = document.querySelector("#form-shop-telefono");

    if (!emailRegexValidator.test(inputEmail.value) 
    || !nameRegexValidator.test(inputNombre.value)
    || !phoneRegexValidator.test(inputTelefono.value)){
        Swal.fire({
            title: "Atención",
            text: "Revise nuevamente los errores del formulario",
            icon: "error",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#a2a2a2"
        });
    } else{
        const containerBtnConfirmar = document.querySelector("#container-btn-confirmar");
        containerBtnConfirmar.innerHTML = `<button type="button" class="btn btn-primary" id="btn-confirmar">Confirmar</button><div id="contenedor-spinner" class="d-flex justify-content-center"><img src="../assets/svg/tube-spinner.svg" class="spinner-tiny" alt="spinner"></div>`;
        setTimeout(() => {
            cleanChildNodes(containerBtnConfirmar);
            const btnConfirm = document.createElement("button");
            btnConfirm.type = "button";
            btnConfirm.classList.add(...["btn", "btn-primary"]);
            btnConfirm.id = "btn-confirmar";
            btnConfirm.textContent = "Confirmar";
            btnConfirm.addEventListener("click", e => handleClickConfirm(e));
            containerBtnConfirmar.appendChild(btnConfirm);

            if (!/^talentotech$/.test(inputCuponResumen.value)) inputCuponResumen.value = "";

            const formShop = document.querySelector(".form-shop");
            const resumenCarrito = document.querySelector("#info-carrito");
            let cartContentForm = "";
            listaCarritoDeCompras.forEach(servicio => {
                if (servicio.cantidad > 0){
                    cartContentForm += `${servicio.nombre} (x${servicio.cantidad}) - $${servicio.precio * servicio.cantidad}\n`;
                }
            });
            cartContentForm += `Total: $${precioTotalNum(listaCarritoDeCompras)}`;

            resumenCarrito.value = cartContentForm;
            
            const data = new FormData(formShop);
            fetch(formShop.action, {
                method: formShop.method,
                body: data,
                headers: {
                    "Accept": "application/json"
                }
            }).then(response => {
                if (response.ok){
                    Swal.fire({
                        title: "Realizado",
                        text: "Nos contactaremos con usted para proceder con la compra.",
                        icon: "success",
                        confirmButtonText: "Aceptar",
                        confirmButtonColor: "#6abd46"
                    }).then(() => {
                        listaCarritoDeCompras.length = 0;
                        localStorage.setItem("pedidos", JSON.stringify(listaCarritoDeCompras));
                        formShop.reset();
                        cleanChildNodes(contenedorResumen);
                        contenedorResumen.innerHTML = `<div id="contenedor-spinner" class="d-flex justify-content-center"><img src="../assets/svg/tube-spinner.svg" class="spinner" alt="spinner"></div>`;
                        setTimeout(() => {
                            window.location.href = "./servicios.html";
                        }, 1500);
                    });
                    
                } else{
                    let errorMessage = "¡No se ha enviado el formulario! Verifique que toda la información ingresada sea la correcta.";
                    Swal.fire({
                        title: "¡Aviso!",
                        text: errorMessage,
                        icon: "warning",
                        confirmButtonText: "Aceptar"
                    });
                }
            }).catch(error => {
                let errorMessage = "¡Ha ocurrido un problema al enviar el formulario! Descuida, el problema ha sucedido de nuestro lado.";
                    Swal.fire({
                        title: "¡Error!",
                        text: errorMessage,
                        icon: "error",
                        confirmButtonText: "Entendido"       
                    });
                console.log(error);
            })
        }, 1500);
    }
}

// Función que genera un div .elemento-carrito por cada elemento
const elementoResumen = (service) => {
    const divElementoCarrito = document.createElement("div");
    divElementoCarrito.classList.add("elemento-carrito");

    const imgElementoCarrito = document.createElement("img");
    imgElementoCarrito.src = `../assets/${service.imgSrc}`;
    imgElementoCarrito.alt = `${service.nombre}}`;
    imgElementoCarrito.classList.add("img-item-carrito");

    const divContenedorInfoElemento = document.createElement("div");
    divContenedorInfoElemento.classList.add(...["d-flex", "flex-column", "gap-1"]);

    const pElementInfoElemento = document.createElement("p");
    pElementInfoElemento.textContent = `${service.nombre} (x${service.cantidad})`;
    pElementInfoElemento.classList.add("fw-semibold");

    divContenedorInfoElemento.appendChild(pElementInfoElemento);

    const divContenedorPaginationInfoElemento = document.createElement("div");
    divContenedorPaginationInfoElemento.classList.add(...["d-flex", "gap-3", "mb-3"]);

    const pPricePagination = `<p>Total: <span class="text-success">$${service.precio * service.cantidad}</span></p>`;

    divContenedorPaginationInfoElemento.innerHTML += pPricePagination;

    divContenedorInfoElemento.appendChild(divContenedorPaginationInfoElemento);
    divElementoCarrito.appendChild(divContenedorInfoElemento);
    divElementoCarrito.appendChild(imgElementoCarrito);

    return divElementoCarrito;
}

// Genera el total del resumen (segun corresponda)
const precioTotalNum = (lista) => {
    let total = 0;
    if (lista.length > 0){
        lista.forEach(servicio => {
            total += servicio.precio * servicio.cantidad;
        });
    }
    return total;
}

// Función para generar el total para el resumen
const totalResumen = (lista) => {
    const divContainer = document.createElement("div");
    divContainer.classList.add(...["d-flex", "flex-row", "align-items-center", "justify-content-between"]);
    divContainer.id = "container-totalprice-resume";
    const pElementTotalPrice = document.createElement("p");
    pElementTotalPrice.id = "totalprice-resume";

    pElementTotalPrice.textContent = `Total: $${precioTotalNum(lista)}`;
    pElementTotalPrice.classList.add(...["text-center", "fw-semibold", "fs-5", "mt-3"]);
    
    divContainer.appendChild(pElementTotalPrice);

    return divContainer;
}

// Limpia los nodos hijos de un contenedor
const cleanChildNodes = (container) => {
    while (container && container.hasChildNodes()){
        container.removeChild(container.firstElementChild);
    }
}

// Se añade manejo de evento focusout en los inputs del formulario
inputEmailResumen.addEventListener("focusout", (e) => handleOutFocus(e, /^([a-zA-Z0-9_._-]+@+[a-zA-Z]+(\.)+[a-zA-Z_.]{2,10})$/));
inputNombreResumen.addEventListener("focusout", (e) => handleOutFocus(e, /^([a-zA-ZÀ-ÿ ]){3,30}$/));
inputTelefonoResumen.addEventListener("focusout", (e) => handleOutFocus(e, /^([0-9]){6,10}$/));
inputCuponResumen.addEventListener("focusout", (e) => handleOutFocusEG(e));

// Se añade manejo de evento click del formulario
document.querySelector("#btn-confirmar").addEventListener("click", e => handleClickConfirm(e));

// Carga cada servicio en una lista similar al modal carrito de compras
const cargarElementosResumen = () => {
    if (listaCarritoDeCompras.length > 0){
        contenedorResumen.innerHTML = `<div id="contenedor-spinner" class="d-flex justify-content-center"><img src="../assets/svg/tube-spinner.svg" class="spinner" alt="spinner"></div>`;
        setTimeout(() => {
            cleanChildNodes(contenedorResumen);
            listaCarritoDeCompras.forEach((servicio) => {
                if (servicio.cantidad > 0){
                    contenedorResumen.appendChild(elementoResumen(servicio));
                }
            });
            contenedorResumen.appendChild(totalResumen(listaCarritoDeCompras));
        }, 1000);
    } else{
        contenedorResumen.innerHTML = `<div id="contenedor-spinner" class="d-flex justify-content-center"><img src="../assets/svg/tube-spinner.svg" class="spinner" alt="spinner"></div>`;
        Swal.fire({
            title: "¡Aviso!",
            text: "Esta sección es accesible sólo con carrito de compras.",
            icon: "error",
            confirmButtonText: "Aceptar"
        }).then(() => {
            window.location.href = "./servicios.html";
        });
    }
}

cargarElementosResumen();