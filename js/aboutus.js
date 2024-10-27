/* Sección para navbar sticky effect */
window.onscroll = () => toggleSticky();

const navbar = document.querySelector(".navbar");
let sticky = navbar.offsetTop;

const toggleSticky = () => {
    window.scrollY >= sticky ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}
/* ---------------------------------- */

/* Sección para control de eventos */
const offcanvas_btnInicioA = document.querySelector("#offcBtnInicioA");
const offcanvas_btnRecetasA = document.querySelector("#offcBtnRecetasA");
const offcanvas_btnContactoA = document.querySelector("#offcBtnContactoA");
const offcanvas_btnAboutUsA = document.querySelector("#offcBtnAcercaDeA");

offcanvas_btnInicioA.addEventListener("click", () => {
    window.location.href = "../index.html";
});
offcanvas_btnRecetasA.addEventListener("click", () => {
    window.location.href = "./recetas.html";
});
offcanvas_btnContactoA.addEventListener("click", () => {
    window.location.href = "./contacto.html";
});
offcanvas_btnAboutUsA.addEventListener("click", () => {
    window.location.href = "./aboutus.html";
})
/* ---------------------------------- */