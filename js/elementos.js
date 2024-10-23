/* 
    Ventana modal customizada diseñada por Nicolás L. Díaz, año 2022. Usted es libre de utilizar,
    modificar, mejorar o agregar el contenido que desee a este archivo.
*/

/**
*   Crea una ventana modal diseñada por *Bootstrap* que servirá como contenedor
*   para visualizar la receta correspondiente.
*   @param {Number} numReceta N° de la receta
*   @param {Array<HTMLElement>} elementsModalBody Array de elementos a agregar dentro del modalBody
*   @returns {HTMLDivElement} Referencia del *HTMLElement* modal diseñado.
*/
const crearModal = (numReceta, elementsModalBody, tituloReceta) => {
    let id = `modalReceta${numReceta}`;
    const mainModal = createElementCustom("div", ["modal", "fade"], "", {
        "data-bs-keyboard": "false",
        "data-bs-backdrop": "static",
        "id": id,
        "aria-labelledby": `${id}Label`,
        "aria-hidden": "true"
    });
    const modalDialog = createElementCustom("div", ["modal-dialog", "modal-dialog-centered", "modal-lg"], "", {});
    const modalContent = createElementCustom("div", ["modal-content"], "", {});
    modalContent.appendChild(modalHeader(tituloReceta));
    modalContent.appendChild(modalBody(elementsModalBody));
    modalContent.appendChild(modalFooter());
    modalDialog.appendChild(modalContent);
    mainModal.appendChild(modalDialog);
    return mainModal;
};

const modalHeader = (tituloReceta) => {
    const modalHeader = createElementCustom("div", ["modal-header"], "", {});
    modalHeader.appendChild(createElementCustom("h4", ["modal-title", "fs-5"], `${tituloReceta}`, {}));
    modalHeader.appendChild(createElementCustom("button", ["btn-close"], "", {
        "type": "button",
        "data-bs-dismiss": "modal",
        "aria-label": "Close"
    }));
    return modalHeader;
}

const modalBody = (elements) => {
    const modalBody = createElementCustom("div", ["modal-body"], "", {});
    if (Array.isArray(elements) && elements.length > 0) elements.forEach(el => modalBody.appendChild(el));
    return modalBody;
}

const modalFooter = () => {
    const modalFooter = createElementCustom("div", ["modal-footer"], "", {});
    modalFooter.appendChild(createElementCustom("button", ["btn", "btn-secondary"], "Cerrar", {
        "type": "button",
        "data-bs-dismiss": "modal"
    }));
    return modalFooter;
}
/**
 * Crea un *HTMLElement* de tipo *button* que tiene como *data-bs-target*
 * el ID del modal según el número de la receta ingresada.
 * @param {Number} numReceta N° de la receta
 * @returns {HTMLElement} Referencia del *HTMLElement* de tipo button creado dinámicamente.
 */
const crearModalButton = (numReceta) => {
    return createElementCustom("button", ["btn", "btn-primary"], `Receta N° ${numEjercicio}`, { 
    "data-bs-toggle": "modal",
    "data-bs-target": `#modalReceta${numReceta}`
    });
}
/**
 * Crea un *HTMLElement* de tipo *article* que servirá como contenedor de la ventana
 * modal con su ID único según el N° de la receta.
 * @param {Number} numReceta N° de la receta a apuntar
 * @returns {HTMLDivElement} Referencia del *HTMLElement* article diseñado.
 */
const crearContenedorModal = (numReceta) => createElementCustom("article", [], "", { "id": `contenedorReceta${numReceta}` });

/**
 * Crea un *HTMLElement* personalizado agregando en él las clases, atributos y/o contenido de tipo texto que recibe por parámetro.
 * @param {String} tipoElemento Nombre del tipo de elemento a crear.
 * @param {Array<String>} clases Array de strings con los nombres de las clases CSS a agregar al elemento ***opcional***.
 * @param {String} contenidoTexto Contenido textual del elemento ***opcional***.
 * @param {Object} atributos Atributos a agregar al elemento en forma de string tanto la clave como el valor ***opcional***.
 * @returns {HTMLElement} Referencia del **HTMLElement* diseñado.
 */
const createElementCustom = (tipoElemento, clases, contenidoTexto, atributos) => {
    const newElement = document.createElement(tipoElemento);
    if (Array.isArray(clases) && clases.length > 0) newElement.classList.add(...clases);
    if (contenidoTexto.length > 0 && contenidoTexto != null && contenidoTexto != undefined) newElement.textContent = contenidoTexto;
    if (typeof (atributos) == "object") {
        Object.keys(atributos).forEach((atributo) => {
            newElement.setAttribute(atributo, atributos[atributo]);
        })
    }
    return newElement;
}

export { createElementCustom, crearModal, crearModalButton, crearContenedorModal }