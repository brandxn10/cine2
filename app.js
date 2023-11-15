const inputNombre = document.getElementById("nombre");
const inputCorreo = document.getElementById("correo");
const selectPelicula = document.getElementById("pelicula");
const inputBoletos = document.getElementById("boletos");
const tabla = document.getElementById("contTabla");
const tabla2 = document.getElementById("tabla2");
const imagen = document.getElementById("imagen").getElementsByTagName("img")[0];
let filaEditando = null;

function guardar() {
    let nom = inputNombre.value;
    let corr = inputCorreo.value;
    let pel = selectPelicula.options[selectPelicula.selectedIndex].text;
    let numB = inputBoletos.value;
    let total = numB * 50;
    let img;

    switch (selectPelicula.value) {
        case '1':
            img = 'starWars';
            break;
        case '2':
            img = 'saw';
            break;
        case '3':
            img = 'it';
            break;
        case '4':
            img = 'leather';
            break;
        default:
            img = 'king';
            break;
    }

    if (filaEditando) {
        filaEditando.cells[0].textContent = nom;
        filaEditando.cells[1].textContent = corr;
        filaEditando.cells[2].textContent = pel;
        filaEditando.cells[3].innerHTML = `<img src="img/${img}.jpg" alt="" style="max-width: 120px;">`;
        filaEditando.cells[4].textContent = numB;
        filaEditando.cells[5].textContent = total;
        filaEditando.style.display = '';  
        filaEditando = null;
    } else {
        tabla.innerHTML += `
        <tr>
            <td>${nom}</td>
            <td>${corr}</td>
            <td>${pel}</td>
            <td> <img src="img/${img}.jpg" alt="" style="max-width: 120px;"></td>
            <td>${numB}</td>
            <td>${total}</td>
            <td>
                <a href="#" class="btn btn-info m-1" onclick="editarFila(this)">Editar</a>
                <a href="#" class="btn btn-danger m-1" onclick="eliminarFila(this)">Eliminar</a>
            </td>
        </tr>
        `;
        tabla2.style.display = 'block';
    }

    inputNombre.value = '';
    inputCorreo.value = '';
    selectPelicula.value = '1';
    inputBoletos.value = '';
    imagen.src = 'img/starWars.jpg';
}

function cambiarImagen() {
    switch (selectPelicula.value) {
        case '1':
            imagen.src = 'img/starWars.jpg';
            break;
        case '2':
            imagen.src = 'img/saw.jpg';
            break;
        case '3':
            imagen.src = 'img/it.jpg';
            break;
        case '4':
            imagen.src = 'img/leather.jpg';
            break;
        case '5':
            imagen.src = 'img/king.jpg';
            break;
        default:
            imagen.src = 'img/starWars.jpg'; 
            break;
    }
}

function editarFila(botonEditar) {
    filaEditando = botonEditar.closest('tr');
    inputNombre.value = filaEditando.cells[0].textContent;
    inputCorreo.value = filaEditando.cells[1].textContent;
    selectPelicula.value = obtenerValorPelicula(filaEditando.cells[2].textContent);
    inputBoletos.value = filaEditando.cells[4].textContent;
    cambiarImagen();
    filaEditando.style.display = 'none';
}

function eliminarFila(botonEliminar) {
    let filaEliminar = botonEliminar.closest('tr');
    filaEliminar.remove();
}

function obtenerValorPelicula(nombrePelicula) {
    switch (nombrePelicula) {
        case 'Star Wars':
            return '1';
        case 'Saw':
            return '2';
        case 'It':
            return '3';
        case 'Leatherface':
            return '4';
        case 'King kong':
            return '5';
        default:
            return '1';
    }
}
