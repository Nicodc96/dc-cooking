/* Sección para navbar sticky effect */
window.onscroll = () => toggleSticky();

const navbar = document.querySelector(".navbar");
let stickyNavbar = navbar.offsetTop;

const toggleSticky = () => {
    window.scrollY >= stickyNavbar ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
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

const imgIconCart = document.querySelector("#img-icon-cart");

window.addEventListener("click", (e) => {
    if (e.target.matches(".icon-card-services")){
        const actualTarget = e.target;
        if (!actualTarget.classList.contains("rotate-center-backwards") && !actualTarget.classList.contains("rotate-center")){
            let iconStylesBgColor = "transform: scale(1.07);outline-offset: 2px;transition: all 0.4s;cursor: pointer;background-color: rgb(128, 197, 88);";
            let iconStylesNoColor = "transform: scale(1.07);outline-offset: 2px;transition: all 0.4s;cursor: pointer;";
            actualTarget.style.cssText = iconStylesBgColor;
            actualTarget.classList.toggle("rotate-center");
            imgIconCart.classList.toggle("rotate-scale-up");
            actualTarget.src = "../assets/svg/check.svg";
            setTimeout(() => {
                actualTarget.classList.toggle("rotate-center");
                imgIconCart.classList.toggle("rotate-scale-up");
                setTimeout(() => {
                    actualTarget.classList.toggle("rotate-center-backwards");
                }, 1500);
                actualTarget.classList.toggle("rotate-center-backwards");
                actualTarget.src = "../assets/svg/cart-plus.svg";
                actualTarget.style.cssText = iconStylesNoColor;
            }, 1500);
        }        
    }
})