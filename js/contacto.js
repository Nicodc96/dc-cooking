/* Sección para navbar sticky effect */
window.onscroll = () => toggleSticky();

const navbar = document.querySelector(".navbar");
let sticky = navbar.offsetTop;

const toggleSticky = () => {
    window.scrollY >= sticky ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}
/* ---------------------------------- */

/* Sección para control de eventos */
const offcanvas_btnInicioC = document.querySelector("#offcBtnInicioC");
const offcanvas_btnRecetasC = document.querySelector("#offcBtnRecetasC");
const offcanvas_btnContactoC = document.querySelector("#offcBtnContactoC");
const offcanvas_btnAboutUsC = document.querySelector("#offcBtnAcercaDeC");
const offcanvas_btnServiciosC = document.querySelector("#offcBtnServiciosC");

offcanvas_btnInicioC.addEventListener("click", () => {
    window.location.href = "../index.html";
});
offcanvas_btnRecetasC.addEventListener("click", () => {
    window.location.href = "./recetas.html";
});
offcanvas_btnContactoC.addEventListener("click", () => {
    window.location.href = "./contacto.html";
});
offcanvas_btnAboutUsC.addEventListener("click", () => {
    window.location.href = "./aboutus.html";
});
offcanvas_btnServiciosC.addEventListener("click", () => {
    window.location.href = "./servicios.html";
});
/* ---------------------------------- */

/* Manejo del formulario */

import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.14.4/src/sweetalert2.js';
const formContacto = document.querySelector("#form-contacto");

formContacto.addEventListener("submit", (event) => {
    event.preventDefault();

    let data = new FormData(event.target);
    fetch(event.target.action, {
        method: formContacto.method,
        body: data,
        headers: {
            "Accept": "application/json"
        }
    }).then(response => {
        if (response.ok){
            Swal.fire({
                title: "¡Gracias!",
                text: "Estaremos revisando tu solicitud/sugerencia lo antes posible.",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#6abd46"
            });
            formContacto.reset();
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
});