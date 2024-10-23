/* Sección para navbar sticky effect */
window.onscroll = () => toggleSticky();

const navbar = document.querySelector(".navbar");
let sticky = navbar.offsetTop;

const toggleSticky = () => {
    window.scrollY >= sticky ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}
/* ---------------------------------- */

/* Sección para control de eventos */
const offcanvas_btnInicioR = document.querySelector("#offcBtnInicioR");
const offcanvas_btnRecetasR = document.querySelector("#offcBtnRecetasR");
const offcanvas_btnContactoR = document.querySelector("#offcBtnContactoR");

offcanvas_btnInicioR.addEventListener("click", () => {
    window.location.href = "../index.html";
});
offcanvas_btnRecetasR.addEventListener("click", () => {
    window.location.href = "./recetas.html";
});
offcanvas_btnContactoR.addEventListener("click", () => {
    window.location.href = "./contacto.html";
});
/* ---------------------------------- */

/* Sección lógica para cards */
import { contenedorModales } from "./modals.js";
import { crearModal, createElementCustom } from "./elementos.js";
const contenedorCardsRecetas = document.querySelector("#contenedorCardsR");
/*
    Abajo lo que hago es utilizar un div escrito en el HTML para
    anclar mis elementos creados dinámicamente. No es la manera más elegante ni reutilizable
    pero es temporal, hecho con este propósito para en el futuro ser reemplazado con métodos
    fetch o axios.
*/
contenedorCardsRecetas.appendChild(crearModal(1, contenedorModales[0](), "Budín con arándanos"));
contenedorCardsRecetas.appendChild(crearModal(2, contenedorModales[1](), "Alitas fritas super crujientes"));
contenedorCardsRecetas.appendChild(crearModal(3, contenedorModales[2](), "Revuelto de gramajo"));
contenedorCardsRecetas.appendChild(crearModal(4, contenedorModales[3](), "Fideos con crema, jamón y champiñones"));
contenedorCardsRecetas.appendChild(crearModal(5, contenedorModales[4](), "Tarta de banana split"));

/* ---------------------------------- */

/* Seccion para zoom de imagenes */
const modalPasosRecetaBootstrap = new bootstrap.Modal("#modalPasosReceta", { keyboard: false });
const modalPasosReceta = document.querySelector("#modalPasosReceta");
const modalPasosRecetaBody = document.querySelector("#modalPasosRecetaBody");

window.addEventListener("click", (e) => {
    if (e.target.matches(".img-steps-recipe")){
        let modalRecetaPadre = e.target.parentNode;
        /*
            Mejora de código: Necesito encontrar el nodo contenedor del modal padre 'modalReceta#'
            siendo '#' el número de la receta que irá cambiando. Para esto uso un búcle while
            donde con ayuda de las expresiones regulares verifico que, mientras el id del contenedor
            en ese momento no sea el que yo busco ('modalReceta#'), seguiré iterando reemplazando
            la referencia con la de su nodo padre hasta encontrarlo.
        */
        while (!/^(modalReceta(.*?))$/.test(modalRecetaPadre.id)){
            modalRecetaPadre = modalRecetaPadre.parentNode;
        }
        if (modalPasosRecetaBody.firstElementChild){
            modalPasosRecetaBody.removeChild(modalPasosRecetaBody.firstElementChild);
        }

        modalPasosRecetaBody.appendChild(createElementCustom("img", ["img-fluid"], "", {
            "id": e.target.alt,
            "src": e.target.src,
            "alt": e.target.alt
        }));
        
        modalPasosRecetaBootstrap.show(modalPasosReceta);
        modalRecetaPadre.classList.add("toggleZIndex");
        modalPasosReceta.addEventListener("hide.bs.modal", () => {
            modalRecetaPadre.classList.remove("toggleZIndex");
        });
    }
})