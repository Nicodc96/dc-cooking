/* Sección para navbar sticky effect */
import { toggleSticky } from "./utils/navbarSticky.js";
import { handleOffCanvasClick } from "./utils/offcanvasClick.js";

const navbar = document.querySelector(".navbar");
let sticky = navbar.offsetTop;
window.onscroll = () => toggleSticky(navbar, sticky);

/* Sección para control de eventos click de offcanvas */
document.querySelector("#offcBtnInicioA").addEventListener("click", () => handleOffCanvasClick("../index.html"));
document.querySelector("#offcBtnRecetasA").addEventListener("click", () => handleOffCanvasClick("./recetas.html"));
document.querySelector("#offcBtnContactoA").addEventListener("click", () => handleOffCanvasClick("./contacto.html"));
document.querySelector("#offcBtnAcercaDeA").addEventListener("click", () => handleOffCanvasClick("./aboutus.html"));
document.querySelector("#offcBtnServiciosA").addEventListener("click", () => handleOffCanvasClick("./servicios.html"));