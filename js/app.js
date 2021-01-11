// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // cuando agregas un curso presionando "agregar carrito"
    listaCursos.addEventListener('click', agregarCurso);
    
    // elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    
    // vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el arreglo
        limpiarHTML(); // eliminamos todo el html
    })
}

// Funciones

function agregarCurso(e){
    e.preventDefault();   // previene que al hacer click haga scrooll
    
    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        // console.log(e.target.parentElement.parentElement);
        leerDatosCurso(cursoSeleccionado);
    }

    //console.log(e.target.classList); dice a que clase de elemento le estoy dando click
}

// Elimina el curso del carrito
function eliminarCurso(e){
    // console.log(e.target.classList);
    if ( e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        // elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        carritoHTML(); // iterar sobre el carrito y mostrar su html
    }
} 

// lee el contenido del html al que le dimos click y extrae la info del curso

function leerDatosCurso(curso){                       // llama a agregarCurso()
    // console.log(cursoSeleccionado);
    
    // crear un objeto con el contenido del curso actual
     const infoCurso = {
         imagen: curso.querySelector('img').src,
         titulo: curso.querySelector('h4').textContent,
         precio: curso.querySelector('.precio span').textContent,
         id: curso.querySelector('a').getAttribute('data-id'),
         cantidad: 1 
     }

    //  revisa si un elemento ya existe en el carrito
     const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
     if (existe){
        //  actualizamos la cantidad
        const cursos = articulosCarrito.map( curso =>{
            if ( curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;     // retorna el objeto actualizado
            }else{
                return curso;     // retorna los objetos que no son duplicados
            }

        });
            articulosCarrito = [...cursos];
     }else{
        //  agregamos elementos al arreglo carrito
       
        articulosCarrito = [...articulosCarrito, infoCurso];
        // console.log(articulosCarrito);


     }

    
     carritoHTML();
}


// muestra el carrito de compras en el html

function carritoHTML() {
    // limpiar elhtml
    limpiarHTML();

    // recorre el carrito y genera el html
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');  // crea el elemento
        console.log(curso);
        // template de string o template literal
        row.innerHTML = ` 
            <td><img  src=" ${ curso.imagen}" whidth="100"></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}" > x </a></td>
        `;

        //  agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

// elimina los cursos del tbody

function limpiarHTML(){
    // forma lenta de limpiar
    // contenedorCarrito.innerHTML = "";
   
    // forma rapida
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}