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

offcanvas_btnInicioC.addEventListener("click", () => {
    window.location.href = "../index.html";
});
offcanvas_btnRecetasC.addEventListener("click", () => {
    window.location.href = "./recetas.html";
});
offcanvas_btnContactoC.addEventListener("click", () => {
    window.location.href = "./contacto.html";
});
/* ---------------------------------- */