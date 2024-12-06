/* Sección para navbar sticky effect */
window.onscroll = () => toggleSticky();

const navbar = document.querySelector(".navbar");
let sticky = navbar.offsetTop;

const toggleSticky = () => {
    window.scrollY >= sticky ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}

/* Sección para control de eventos */
const offcanvas_btnInicio = document.querySelector("#offcBtnInicio");
const offcanvas_btnRecetas = document.querySelector("#offcBtnRecetas");
const offcanvas_btnContacto = document.querySelector("#offcBtnContacto");
const offcanvas_btnAboutUs = document.querySelector("#offcBtnAcercaDe");
const offcanvas_btnServicios = document.querySelector("#offcBtnServicios");

offcanvas_btnInicio.addEventListener("click", () => {
    window.location.href = "./index.html";
});
offcanvas_btnRecetas.addEventListener("click", () => {
    window.location.href = "./pages/recetas.html";
});
offcanvas_btnContacto.addEventListener("click", () => {
    window.location.href = "./pages/contacto.html";
});
offcanvas_btnAboutUs.addEventListener("click", () => {
    window.location.href = "./pages/aboutus.html";
});
offcanvas_btnServicios.addEventListener("click", () => {
    window.location.href = "./pages/servicios.html";
});