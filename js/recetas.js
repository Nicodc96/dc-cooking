/* Sección para navbar sticky effect */
import { toggleSticky } from "./utils/navbarSticky.js";
import { handleOffCanvasClick } from "./utils/offcanvasClick.js";
import { contenedorModales } from "./modals.js";
import { crearModal, createElementCustom } from "./utils/elementos.js";

const navbar = document.querySelector(".navbar");
let sticky = navbar.offsetTop;

window.onscroll = () => toggleSticky(navbar, sticky);

/* Sección para control de eventos click de offcanvas */
document.querySelector("#offcBtnInicioR").addEventListener("click", () => handleOffCanvasClick("../index.html"));
document.querySelector("#offcBtnRecetasR").addEventListener("click", () => handleOffCanvasClick("./recetas.html"));
document.querySelector("#offcBtnContactoR").addEventListener("click", () => handleOffCanvasClick("./contacto.html"));
document.querySelector("#offcBtnAcercaDeR").addEventListener("click", () => handleOffCanvasClick("./aboutus.html"));
document.querySelector("#offcBtnServiciosR").addEventListener("click", () => handleOffCanvasClick("./servicios.html"));

/* Sección lógica para cards */
const contenedorCardsRecetas = document.querySelector("#contenedor-cards-recetas");

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
contenedorCardsRecetas.appendChild(crearModal(6, contenedorModales[5](), "Pastafrola de batata"));
contenedorCardsRecetas.appendChild(crearModal(7, contenedorModales[6](), "Guiso de lentejas"));
contenedorCardsRecetas.appendChild(crearModal(8, contenedorModales[7](), "Filet de merluza"));

/* Seccion para zoom de imagenes */
const modalPasosRecetaBootstrap = new bootstrap.Modal("#modal-pasos-recetas", { keyboard: false });
const modalPasosReceta = document.querySelector("#modal-pasos-recetas");
const modalPasosRecetaBody = document.querySelector("#modal-pasos-receta-body");

window.addEventListener("click", (e) => {
    if (e.target.matches(".img-steps-recipe")){
        let modalRecetaPadre = e.target.parentNode;
        /*
            Mejora de código: Necesito encontrar el nodo contenedor del modal padre 'modal-receta-#'
            siendo '#' el número de la receta que irá cambiando. Para esto uso un búcle while
            donde con ayuda de las expresiones regulares verifico que, mientras el id del contenedor
            en ese momento no sea el que yo busco ('modal-receta-#'), seguiré iterando reemplazando
            la referencia con la de su nodo padre hasta encontrarlo.
        */
        while (!/^(modal-receta-.*[1-9])$/.test(modalRecetaPadre.id)){
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
        modalRecetaPadre.classList.add("toggle-z-index");
        modalPasosReceta.addEventListener("hide.bs.modal", () => {
            modalRecetaPadre.classList.remove("toggle-z-index");
        });
    }
})