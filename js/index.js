/* Sección para navbar sticky effect */
import { toggleSticky } from "./utils/navbarSticky.js";
import { handleOffCanvasClick } from "./utils/offcanvasClick.js";

const navbar = document.querySelector(".navbar");
let sticky = navbar.offsetTop;
window.onscroll = () => toggleSticky(navbar, sticky);

/* Sección para control de eventos click de offcanvas */
document.querySelector("#offcBtnInicio").addEventListener("click", () => handleOffCanvasClick("./index.html"));
document.querySelector("#offcBtnRecetas").addEventListener("click", () => handleOffCanvasClick("./pages/recetas.html"));
document.querySelector("#offcBtnContacto").addEventListener("click", () => handleOffCanvasClick("./pages/contacto.html"));
document.querySelector("#offcBtnAcercaDe").addEventListener("click", () => handleOffCanvasClick("./pages/aboutus.html"));
document.querySelector("#offcBtnServicios").addEventListener("click", () => handleOffCanvasClick("./pages/servicios.html"));

// Carga posterior a renderizado de html

const hideImagesAfterLoad = () => {
    document.querySelector(".comida-ita").src = "./assets/comida-italiana.webp";
    document.querySelector(".comida-fran").src = "./assets/comida-francesa.webp";
    document.querySelector(".comida-arg").src = "./assets/comidas-argentinas.webp";
    document.querySelector("#offcanvasBody").style.backgroundImage = "url('./assets/food-bg1.webp')";
    document.querySelector("#header-image").style.backgroundImage = "url('./assets/bg-header.webp')";
}

const loadYoutubeVideo = () => {
    const containerYtVideo = document.querySelector("#container-youtube-video");

    containerYtVideo.innerHTML = `<iframe src="https://www.youtube.com/embed/ht13rSe4_Go?si=WuQXcXPywCc1vNaz" loading="lazy" title="YouTube video player"></iframe>`;
}

hideImagesAfterLoad();
loadYoutubeVideo();