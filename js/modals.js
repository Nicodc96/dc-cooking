import { createElementCustom } from "./utils/elementos.js"

const svgDuracion = (duracion) => {
    return `
    <div class="d-flex gap-1">
        <img src="../assets/svg/reloj.svg" alt="tiempo-de-coccion">
        <p class="mb-1">${duracion}</p>
    </div>`;
}
const svgPorciones = (porciones) => {
    return `
    <div class="d-flex gap-1">
        <img src="../assets/svg/persona.svg" alt="porciones">
        <p class="mb-1">${porciones} porciones</p>
    </div>`;
}
/**
 * Funcion que genera el código necesario para renderizar el contenido de una ventana modal de bootstrap. Dicho
 * contenido está directamente relacionado con una receta de comida.
 * @param {String} imgPrincipalSrc Ruta de la imagen principal
 * @param {String} imgPrincipalAlt Texto para el 'alt' de la imágen principal
 * @param {String} duracionReceta Texto con la duración de la receta
 * @param {Number} cantPorciones Cantidad de porciones
 * @param {Array<String>} arrayIngredientes Lista de ingredientes de la receta
 * @param {String} contenidoCol4 Pasos a seguir que se agregará al *innerHtml* de la última columna
 * @returns {Array<HTMLElement>} Contenido a rendezidar dentro de un `<div class='modal-body'>`
 */
const esqueletoReceta = (imgPrincipalSrc, imgPrincipalAlt, duracionReceta, cantPorciones, arrayIngredientes, contenidoCol4) => {
    const divRow = createElementCustom("div", ["mb-3", "row"], "", {});
    const col_divRow = createElementCustom("div", ["col", "d-flex", "justify-content-center"], "", {});
    const img = createElementCustom("img", ["img-top-modal"], "", {
        "width": "500px", 
        "height": "500px",
        "src": `../assets/${imgPrincipalSrc}`,
        "alt": `${imgPrincipalAlt}`
    });
    col_divRow.appendChild(img);
    divRow.appendChild(col_divRow);

    const divRow2 = createElementCustom("div", ["mb-3", "row"], "", {});
    const col_divRow2 = createElementCustom("div", ["col", "d-flex", "gap-2"], "", {});

    col_divRow2.innerHTML += svgDuracion(duracionReceta);        
    col_divRow2.innerHTML += svgPorciones(cantPorciones);
    divRow2.appendChild(col_divRow2);

    const divRow3 = createElementCustom("div", ["mb-3", "row"], "", {});
    const col_divRow3 = createElementCustom("div", ["col"], "", {});
    const h3 = createElementCustom("h3", [], "Ingredientes", {});

    col_divRow3.appendChild(h3);

    let ulIngredientes = "<ul>";
    arrayIngredientes.forEach(ingrediente => { ulIngredientes += `<li>${ingrediente}</li>` });
    ulIngredientes += "</ul>";
    col_divRow3.innerHTML += ulIngredientes;
    divRow3.appendChild(col_divRow3);

    const divRow4 = createElementCustom("div", ["mb-3", "row"], "", {});
    const col_divRow4 = createElementCustom("div", ["col"], "", {});

    col_divRow4.innerHTML += `<h4 class="text-center">Pasos a seguir</h4>${contenidoCol4}`;
    divRow4.appendChild(col_divRow4);

    return [divRow, divRow2, divRow3, divRow4];
}

/**
 * Array que contiene las funciones que generan el contenido necesario para las ventanas modales de cada receta, 
 * de orden 0 - N *(siendo N un número natural indeterminado)*
 * PD: Lo hice así para evitar demasiado código en JS al re pedo
 */
const contenedorModales = [
    function(){ // 1 - [0]
        let contenidoCol4 = `
        <h5>Primer paso</h5>
        <p>Cremar azúcar, ralladura de limón, manteca pomada y queso crema. Agregar huevos de a uno por vez y luego harina tamizada.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/budin_paso1.webp" alt="receta_budin_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/budin_paso2.webp" alt="receta_budin_paso2" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/budin_paso3.webp" alt="receta_budin_paso3" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Segundo paso</h5>
        <p>Batir hasta lograr una crema. Sumar los arándanos limpios, secos y rociados con un poco de jugo de limón (el ácido del jugo del limón hace que luego no se forme esa aureola verde alrededor de los arándanos). Mezclar y poner dentro de la budinera previamente forrada la base con papel manteca. Esta budinera es de aproximadamente 25 x 10 cm.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/budin_paso4.webp" alt="receta_budin_paso4" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/budin_paso5.webp" alt="receta_budin_paso5" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/budin_paso6.webp" alt="receta_budin_paso6" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Tercer paso</h5>
        <p>Cocinar en horno pre-calentado a 180° por aproximadamente 45 minutos (controlar cocción). Una vez frío desmoldar y glasear. Para el glaseado mezclar azúcar impalpable con parte del jugo de limón, ir agregando poco a poco hasta lograr una mezcla fluida pero con consistencia. Decorar con arándanos frescos.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/budin_paso7.webp" alt="receta_budin_paso7" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/budin_paso8.webp" alt="receta_budin_paso8" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/budin-arandanos.webp" alt="receta_budin_paso_final" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>`;

        return esqueletoReceta("budin-arandanos.webp", "budin de arándanos", "50 minutos", 12,
        [
            "160gr de harina leudante",
            "100gr de manteca",
            "120gr de queso crema",
            "150gr de azúcar",
            "2 huevos",
            "1 cucharadita de escencia de vainilla",
            "1 ralladura de limón",
            "Glaseado a gusto",
            "1 taza de azúcar impalpable",
            "Jugo de 1/2 limón aproximadamente"
        ], contenidoCol4);
    },
    function(){ // 2 - [1]
        let contenidoCol4 = `
        <h5>Primer paso</h5>
        <p>Siempre que hago alitas, las hago hervir por lo menos 15 minutos. Es opcional pero haciendo esto sé que en el momento de freír van a estar a punto.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/alitas_paso1.webp" alt="receta_alitas_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Segundo paso</h5>
        <p>Agregamos lo seco primero, harina y los condimentos.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/alitas_paso2.webp" alt="receta_alitas_paso2" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/alitas_paso3.webp" alt="receta_alitas_paso2" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Tercer paso</h5>
        <p>En este paso lo húmedo el huevo y la leche. Luego, mezclar hasta que te quede la mezcla como en la segunda imagen.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/alitas_paso4.webp" alt="receta_alitas_paso3" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/alitas_paso5.webp" alt="receta_alitas_paso3" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Cuarto paso</h5>
        <p>En una fuente ponemos la harina y, en este caso no tenía cereal y coloqué puré instantáneo (puede hacer solo con harina no hay problema; la única diferencia entre el cereal y el puré instantáneo es lo crocante y quedan más sequitas las alitas)...</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/alitas_paso6.webp" alt="receta_alitas_paso4" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Quinto paso</h5>
        <p>...rebozamos y dejamos descansar en un freezer o congelador 20 minutos.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/alitas_paso7.webp" alt="receta_alitas_paso5" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/alitas_paso8.webp" alt="receta_alitas_paso5" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Sexto paso</h5>
        <p>Luego de sacar las alitas del freezer, fritamos unos diez minutos o el punto que usted desee.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/alitas_paso9.webp" alt="receta_alitas_paso_final" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/alitas_paso10.webp" alt="receta_alitas_paso_final" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/alitas_paso11.webp" alt="receta_alitas_paso_final" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>`;

        return esqueletoReceta("alitas-fritas.webp", "alitas fritas", "40 minutos", 4,
        [
            "1Kg o 10 alitas de pollo",
            "1 huevo",
            "1 taza de leche entera",
            "1/2 taza de harina común 0000",
            "Cereal sin sabor o puré instantáneo para rebosar",
            "1 Cucharada de sal, pimienta, pimentón dulce, comino y orégano"
        ], contenidoCol4);
    },
    function(){ // 3 - [2]
        let contenidoCol4 = `
        <h5>Primer paso</h5>
        <p>Cortar las papas en bastón, fritar hasta cocinarlas, no dejar que se doren demasiado.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/gramajo_paso1.webp" alt="receta_gramajo_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Segundo paso</h5>
        <p>Rehogar la cebolla con un chorrito de aceite. Agregar el jamón cortado en tiras y las arvejas.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/gramajo_paso2.webp" alt="receta_gramajo_paso2" class="rounded img-steps-recipe" width="100px" height="100px">
            </div>
        <h5>Tercer paso</h5>
        <p>En un bol mezclar los huevos con la crema ligeramente. Incorporar a la preparación anterior, junto con las papas fritas.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/gramajo_paso3.webp" alt="receta_gramajo_paso3" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Cuarto paso</h5>
        <p>Cocinar unos minutos más hasta que los huevos se cocinen. Servir y ¡a disfrutar! 🤤</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/gramajo_paso4.webp" alt="receta_gramajo_paso_final" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        `;

        return esqueletoReceta("img-recipes/gramajo_paso4.webp", "revuelto de gramajo", "1h 15min", 4,
        [
            "1Kg de papas",
            "1/2 cebolla mediana o 1 cebolla de verdeo",
            "100gr de jamón cocido (york)",
            "3 huevos",
            "4 cucharaditas de crema de leche",
            "1/2 taza de arvejas en lata",
        ], contenidoCol4);
    },
    function(){ // 4 - [3]
        let contenidoCol4 = `
        <h5>Primer paso</h5>
        <p>Saltear la cebolla en la manteca, agregar el jamón cocido y los champiñones.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/fideoscremachampiñones_paso1.webp" alt="receta_ficrecha_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/fideoscremachampiñones_paso1-2.webp" alt="receta_ficrecha_paso1-2" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/fideoscremachampiñones_paso1-3.webp" alt="receta_ficrecha_paso1-3" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Segundo paso</h5>
        <p>Agregar a la olla/sartén los fideos previamente hervidos. Luego agregar el caldo, seguido de pizca de sal y pimienta (ir probando). Agregar la crema, el agua y revolver.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/fideoscremachampiñones_paso2.webp" alt="receta_ficrecha_paso2" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/fideoscremachampiñones_paso2-2.webp" alt="receta_ficrecha_paso2-2" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/fideoscremachampiñones_paso2-3.webp" alt="receta_ficrecha_paso2-3" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Tercer paso</h5>
        <p>Cocinar a fuego medio bajo con ella tapada hasta que la pasta está en su punto (depende de cada pasta el tiempo). Es importante ir revolviendo cada tanto y controlar que no falte el líquido. Servir con queso rallado por encima.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/fideoscremachampiñones_paso3.webp" alt="receta_ficrecha_paso3" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/fideoscremachampiñones_pasofinal.webp" alt="receta_ficrecha_pasofinal" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        `;
        return esqueletoReceta("img-recipes/fideoscremachampiñones_pasofinal.webp", "fideos con crema y champiñones", "25 minutos", 4,
        [
            "1 cebolla grande picada en cubitos",
            "2 cucharadas de manteca",
            "200gr de jamón cocido (york)",
            "1 cubito de caldo de verdura",
            "1 taza o lata de champiñones congelados",
            "200cc de crema de leche",
            "1 paquete (500gr) de fideos secos a elección",
            "Sal y pimienta",
            "400cc de agua"
        ], contenidoCol4);
    },
    function(){ // 5 - [4]
        let contenidoCol4 = `
        <h5>Primer paso</h5>
            <p>En un bowls ponemos, la harina, los huevos, el aceite, la esencia de vainilla y mezclamos. Lo pueden hacer con batidora, yo preferí hacerlo con un tenedor.</p>
            <div class="d-flex justify-content-center gap-2 container-img-pasos">
                <img src="../assets/img-recipes/tartabanana_paso1.webp" alt="receta_tartabanana_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
            </div>
            <h5>Segundo paso</h5>
            <p>Agregamos la harina y vamos uniendo bien todos los ingredientes. Nos va a quedar una masa media arenosa, así que vamos a llevar a la mesada y vamos a amasar unos 2 minutos hasta que nos quede bien unida y suave. Dejamos descansar la masa por 15 minutos preparamos la crema.</p>
            <div class="d-flex justify-content-center gap-2 container-img-pasos">
                <img src="../assets/img-recipes/tartabanana_paso2.webp" alt="receta_tartabanana_paso2" class="rounded img-steps-recipe" width="100px" height="100px">
                <img src="../assets/img-recipes/tartabanana_paso2-2.webp" alt="receta_tartabanana_paso2-2" class="rounded img-steps-recipe" width="100px" height="100px">
                <img src="../assets/img-recipes/tartabanana_paso2-3.webp" alt="receta_tartabanana_paso2-3" class="rounded img-steps-recipe" width="100px" height="100px">
            </div>
            <h5>Tercer paso</h5>
            <p>En un bolws ponemos el pote de crema y batimos un poco a velocidad baja, agregamos las 3 cucharadas soperas de azúcar impalpable y las 2 cucharaditas de esencia de vainilla y seguimos batiendo, si quieren ahí pueden subir la velocidad. Una vez que esté firme llevar a la heladera.</p>
            <div class="d-flex justify-content-center gap-2 container-img-pasos">
                <img src="../assets/img-recipes/tartabanana_paso3.webp" alt="receta_tartabanana_paso3" class="rounded img-steps-recipe" width="100px" height="100px">
            </div>
            <h5>Cuarto paso</h5>
            <p>Prendemos el horno a fuego mínimo, enmantecamos un molde y volvemos a la masa.</p>
            <div class="d-flex justify-content-center gap-2 container-img-pasos">
                <img src="../assets/img-recipes/tartabanana_paso4.webp" alt="receta_tartabanana_paso4" class="rounded img-steps-recipe" width="100px" height="100px">
            </div>
            <h5>Quinto paso</h5>
            <p>Con un poco de harina en la mesada, o papel manteca vamos a estirar la mesa, si se rompe no importa, se arregla. Acomodamos la masa en el molde, pinchamos con tenedor y cocinamos unos 15/20 minutos (cuando esté dorada la masa la sacamos y dejamos enfriar)</p>
            <div class="d-flex justify-content-center gap-2 container-img-pasos">
                <img src="../assets/img-recipes/tartabanana_paso5.webp" alt="receta_tartabanana_paso5" class="rounded img-steps-recipe" width="100px" height="100px">
                <img src="../assets/img-recipes/tartabanana_paso5-2.webp" alt="receta_tartabanana_paso5-2" class="rounded img-steps-recipe" width="100px" height="100px">
            </div>
            <h5>Sexto paso</h5>
            <p>Cortamos las bananas en rodajas finas y reservamos. Por otro lado rallamos 3 o 4 barritas de chocolate y vamos a reservar también.</p>
            <div class="d-flex justify-content-center gap-2 container-img-pasos">
                <img src="../assets/img-recipes/tartabanana_paso6.webp" alt="receta_tartabanana_paso6" class="rounded img-steps-recipe" width="100px" height="100px">
                <img src="../assets/img-recipes/tartabanana_paso6-2.webp" alt="receta_tartabanana_paso6-2" class="rounded img-steps-recipe" width="100px" height="100px">
            </div>
            <h5>Septimo paso</h5>
            <p>Pegamos la tarta a la bandeja o plato que usemos con un poco de dulce de leche para prevenir algún accidente y se resbale de la bandeja.</p>
            <div class="d-flex justify-content-center gap-2 container-img-pasos">
                <img src="../assets/img-recipes/tartabanana_paso7.webp" alt="receta_tartabanana_paso7" class="rounded img-steps-recipe" width="100px" height="100px">
            </div>
            <h5>Octavo paso</h5>
            <p>Ponemos una buena capa de dulce de leche y acomodamos las bananas 🍌.</p>
            <div class="d-flex justify-content-center gap-2 container-img-pasos">
                <img src="../assets/img-recipes/tartabanana_paso8.webp" alt="receta_tartabanana_paso8" class="rounded img-steps-recipe" width="100px" height="100px">
                <img src="../assets/img-recipes/tartabanana_paso8-2.webp" alt="receta_tartabanana_paso8-2" class="rounded img-steps-recipe" width="100px" height="100px">
                <img src="../assets/img-recipes/tartabanana_paso8-3.webp" alt="receta_tartabanana_paso8-2" class="rounded img-steps-recipe" width="100px" height="100px">
            </div>
            <h5>Noveno paso</h5>
            <p>Ponemos la crema 😋.</p>
            <div class="d-flex justify-content-center gap-2 container-img-pasos">
                <img src="../assets/img-recipes/tartabanana_paso9.webp" alt="receta_tartabanana_paso9" class="rounded img-steps-recipe" width="100px" height="100px">
                <img src="../assets/img-recipes/tartabanana_paso9-2.webp" alt="receta_tartabanana_paso9-2" class="rounded img-steps-recipe" width="100px" height="100px">
            </div>
            <h5>Decimo paso</h5>
            <p>Por último, rallamos el chocolate en barrita a gusto sobre la crema.</p>
            <div class="d-flex justify-content-center gap-2 container-img-pasos">
                <img src="../assets/img-recipes/tartabanana_paso10.webp" alt="receta_tartabanana_paso9" class="rounded img-steps-recipe" width="100px" height="100px">
                <img src="../assets/img-recipes/tartabanana_paso10-2.webp" alt="receta_tartabanana_paso9-2" class="rounded img-steps-recipe" width="100px" height="100px">
            </div>
            <h5>Paso 11</h5>
            <p>Finalmente, dejar enfríar la tarta en la heladera para que se asienten los ingredientes hasta servir.</p>
            <div class="d-flex justify-content-center gap-2 container-img-pasos">
                <img src="../assets/img-recipes/tartabanana_paso11.webp" alt="receta_tartabanana_paso9" class="rounded img-steps-recipe" width="100px" height="100px">
            </div>
        `;
        return esqueletoReceta("img-recipes/tartabanana_principal.webp", "tarta de banana principal", "1 hora", 6,
        [
            `<p class='fw-semibold'>Para la masa:</p>
                <ul>
                    <li>400gr de harina leudante</li>
                    <li>15 cucharadas soperas de aceite y 15 de azúcar</li>
                    <li>2 huevos</li>
                    <li>2 cucharaditas de esencia de vainilla</li>
                </ul>`,
            `<p class='fw-semibold'>Para el relleno:</p>
                <ul>
                    <li>2 bananas medianas o grandes</li>
                    <li>1 pote/vaso de crema chico para batir</li>
                    <li>1 pote pequeño de dulce de leche (recomendado pastelero)</li>
                    <li>3 cucharadas soperas de azúcar impalpable</li>
                    <li>2 cucharaditas esencia de vainilla</li>
                    <li>1-2 barritas de chocolate amargo</li>
                </ul>`
        ], contenidoCol4);
    },
    function(){ // 6 - [5]
        let contenidoCol4 = `
        <h5>Primer paso</h5>
        <p>Batir los huevos junto con el azúcar, la vainilla y la ralladura de naranja, agregar el aceite y volver a batir hasta integrar. Agregar de a poco la harina junto con la pizca de sal, mezclar con espátula luego bajar a la mesada y terminar de unir pero sin amasar sí es necesario le pueden agregar un poquito más de harina.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/pastafrola-batata_paso1.webp" alt="receta_ficrecha_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/pastafrola-batata_paso1-1.webp" alt="receta_ficrecha_paso1-2" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Segundo paso</h5>
        <p>Tiene que quedar una masa tierna pero que no se pegue a las manos. Envolver en film y llevar a la heladera 30 min.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/pastafrola-batata_paso2.webp" alt="receta_ficrecha_paso2" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Tercer paso</h5>
        <p>Mezclar la ricota junto con el azúcar, la ralladura de naranja y la clara integrar bien con un tenedor y reservar. También hacer puré el dulce, si les cuesta le pueden agregar un poquito de agua hirviendo.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/pastafrola-batata_paso3.webp" alt="receta_ficrecha_paso3" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/pastafrola-batata_paso3-1.webp" alt="receta_ficrecha_pasofinal" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Cuarto paso</h5>
        <p>Estirar la masa no muy fina y fonzar un molde previamente enmantecado y enharinado de 20 cm. Colocar la ricota emparejarla bien con una cuchara y arriba colocar el dulce.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/pastafrola-batata_paso4.webp" alt="receta_ficrecha_paso3" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/pastafrola-batata_paso4-1.webp" alt="receta_ficrecha_pasofinal" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Quinto paso</h5>
        <p>Con la masa que nos sobró volver a estirarla y cortar tiritas para formar el enrejado, llevar a horno moderado precalentado 180° por aproximadamente 30 minutos o hasta que esté dorada.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/pastafrola-batata_paso5.webp" alt="receta_ficrecha_paso3" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/pastafrola-batata_paso5-1.webp" alt="receta_ficrecha_pasofinal" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Último paso</h5>
        <p>Pueden reemplazar el dulce de batata por dulce de membrillo, si no tienen harina leudante pueden utilizar harina 0000 y 2cditas. de polvo para hornear🤗. También pueden reemplazar la ralladura de naranja por limón🍋.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/pastafrola-batata_paso6.webp" alt="receta_ficrecha_paso3" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/pastafrola-batata_paso6-1.webp" alt="receta_ficrecha_pasofinal" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        `;
        return esqueletoReceta("img-recipes/pastafrola-batata.webp", "pastafrola-batata", "70 minutos", 4,
        [
            "2 huevos",
            "140gr. de azúcar",
            "1 cucharadita de esencia de vainilla",
            "Ralladura de limón o naranja a gusto",
            "90cc de aceite",
            "350gr. de harina leudante",
            "Una pizca de sal",
            "200gr. de ricota - relleno",
            "1 clara de huevo - relleno",
            "1 cucharada de azúcar - relleno",
            "Ralladura de naranja o limón a gusto - relleno",
            "200gr. de dulce de batata/membrillo - relleno"
        ], contenidoCol4);
    },
    function(){ // 7 - [6]
        let contenidoCol4 = `
        <h5>Primer paso</h5>
        <p>Cortamos la panceta en tiritas finas y la doramos en una olla sin aceite.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/guiso-lentejas_paso1.webp" alt="receta_ficrecha_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Segundo paso</h5>
        <p>Agregamos el chorizo colorado en rodajas y doramos. Luego reservamos.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/guiso-lentejas_paso2.webp" alt="receta_ficrecha_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Tercer paso</h5>
        <p>En el fondo de cocción agregamos la carne, el chorizo de cerdo y la salchicha parrillera. Doramos y reservamos.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/guiso-lentejas_paso3.webp" alt="receta_ficrecha_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Cuarto paso</h5>
        <p>Ahora agregamos la cebolla, ajo, apio, morrón y la cebolla de verdeo (reservamos un poco para el final).</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/guiso-lentejas_paso4.webp" alt="receta_ficrecha_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Quinto paso</h5>
        <p>Una vez dorada la verdura, agregamos la carne, las salchichas, el chorizo y la panceta con el chorizo colorado, cocinamos 5 minutos y agregamos el vino blanco, luego dejamos cocinar para evaporar el vino.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/guiso-lentejas_paso5.webp" alt="receta_ficrecha_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Sexto paso</h5>
        <p>Agregamos la zanahoria y mezclamos bien, dejamos cocinar dos minutos y agregamos los tomates y los condimentos, revolvemos bien.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/guiso-lentejas_paso6.webp" alt="receta_ficrecha_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Séptimo paso</h5>
        <p>Agregamos la lenteja escurrida y cocinamos con la olla semitapada durante 30 minutos. Cubrimos con caldo si hace falta.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/guiso-lentejas_paso6.webp" alt="receta_ficrecha_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Octavo paso</h5>
        <p>Cuando las lentejas están un poco tiernas agregamos el resto del caldo y las papas. 15 minutos y agregamos la morcilla para que se cocine<./p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/guiso-lentejas_paso8.webp" alt="receta_ficrecha_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/guiso-lentejas_paso8-1.webp" alt="receta_ficrecha_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Noveno paso</h5>
        <p>Una vez que las papas están tiernas, mezclamos para deshacer la morcilla, apagamos el fuego y dejamos descansar 5 minutos antes de servir.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/guiso-lentejas_paso9.webp" alt="receta_ficrecha_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Último paso</h5>
        <p>Servir y decorar con la parte verde la cebolla de verdeo.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/guiso-lentejas.webp" alt="receta_ficrecha_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        `;
        return esqueletoReceta("img-recipes/guiso-lentejas.webp", "guiso-lentejas", "120 minutos", 6,
        [
            "600gr. de roast beef",
            "400gr. de lentejas",
            "1 chorizo colorado, 3 chorizos de cerde y 3 salchichas parrilleras",
            "200gr. de panceta ahumada",
            "3 cebollas y 2 cebollas de verdeo",
            "3 ramitas de apio",
            "2 dientes de ajo",
            "2 zanahorias grandes y 1 morrón rojo/verde",
            "3 tomates peritas",
            "2 cucharadas de salsa de tomate concentrado",
            "1/2 rueda de morcilla",
            "1kg de papa",
            "Sal y pimienta a gusto",
            "1 cucharada de orégano, finas hierbas",
            "1 cucharadita de pimentón dulce, tomillo, curry en polvo",
            "1/2 cucharadita de nuez moscada",
            "2 calditos de verdura",
            "1 vaso de vino blanco"
        ], contenidoCol4);
    },
    function(){ // 8 - [7]
        let contenidoCol4 = `
        <h5>Primer paso</h5>
        <p>Marinar la merluza en limón al menos 30 minutos previamente.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/filet-merluza_paso1.webp" alt="receta_ficrecha_paso1" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Segundo paso</h5>
        <p>Batir levemente los huevos condimentar, luego añadir el resto (perejil leche y harina). Es una mezcla cremosa como para crepes.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/filet-merluza_paso2.webp" alt="receta_ficrecha_paso2" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/filet-merluza_paso2-1.webp" alt="receta_ficrecha_paso2-2" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Tercer paso</h5>
        <p>Cuando calienta el aceite tomar los filetes (escurrirlos previamente del limón) y pasar por la mezcla y llevarlos a freír. Retirar y apoyar sobre papel.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/filet-merluza_paso3.webp" alt="receta_ficrecha_paso2" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        <h5>Cuarto paso</h5>
        <p>Servir con puré y o ensaladas. Se puede utilizar más cantidad de harina para un mayor grosor del preparado.</p>
        <div class="d-flex justify-content-center gap-2 container-img-pasos">
            <img src="../assets/img-recipes/filet-merluza_paso4.webp" alt="receta_ficrecha_paso3" class="rounded img-steps-recipe" width="100px" height="100px">
            <img src="../assets/img-recipes/filet-merluza.webp" alt="receta_ficrecha_pasofinal" class="rounded img-steps-recipe" width="100px" height="100px">
        </div>
        `;
        return esqueletoReceta("img-recipes/filet-merluza.webp", "filet de merluza", "30 minutos", 4,
        [
            "8 filetes de merluza",
            "2 cucharadas de manteca",
            "200gr de jamón cocido (york)",
            "1 cubito de caldo de verdura",
            "1 taza o lata de champiñones congelados",
            "200cc de crema de leche",
            "1 paquete (500gr) de fideos secos a elección",
            "Sal y pimienta",
            "400cc de agua"
        ], contenidoCol4);
    }
];
export { contenedorModales };