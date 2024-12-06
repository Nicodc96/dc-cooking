/* Sección para navbar sticky effect */
window.onscroll = () => toggleSticky();

const navbar = document.querySelector(".navbar");
let sticky = navbar.offsetTop;

const toggleSticky = () => {
    window.scrollY >= sticky ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
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
/* ---------------------------------- */