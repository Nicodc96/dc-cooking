/* Sección para navbar sticky effect */
import { toggleSticky } from "./utils/navbarSticky.js";
import { handleOffCanvasClick } from "./utils/offcanvasClick.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.14.4/src/sweetalert2.js';

const navbar = document.querySelector(".navbar");
let sticky = navbar.offsetTop;

window.onscroll = () => toggleSticky(navbar, sticky);

/* Sección para control de eventos click de offcanvas */
document.querySelector("#offcBtnInicioC").addEventListener("click", () => handleOffCanvasClick("../index.html"));
document.querySelector("#offcBtnRecetasC").addEventListener("click", () => handleOffCanvasClick("./recetas.html"));
document.querySelector("#offcBtnContactoC").addEventListener("click", () => handleOffCanvasClick("./contacto.html"));
document.querySelector("#offcBtnAcercaDeC").addEventListener("click", () => handleOffCanvasClick("./aboutus.html"));
document.querySelector("#offcBtnServiciosC").addEventListener("click", () => handleOffCanvasClick("./servicios.html"));

/* Manejo del formulario */
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
            Swal.fire({
                title: "¡Aviso!",
                text: "¡No se ha enviado el formulario! Verifique que toda la información ingresada sea la correcta.",
                icon: "warning",
                confirmButtonText: "Aceptar"
            });
        }
    }).catch(error => {
            Swal.fire({
                title: "¡Error!",
                text: "¡Ha ocurrido un problema al enviar el formulario! Descuida, el problema ha sucedido de nuestro lado.",
                icon: "error",
                confirmButtonText: "Entendido"       
            }).then(() => {
                console.log(error)
            });
    })
});