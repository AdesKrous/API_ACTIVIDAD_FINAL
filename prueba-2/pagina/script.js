function getBikes() {
    fetch('http://localhost:3001/')
    .then(response => response.json())
    .then(bikes => {
        const bikesList = document.getElementById('bikes-list');
        bikesList.innerHTML = ''; // Limpiar el contenido anterior
        bikes.forEach(bike => {
            const bikeElement = document.createElement('div');
            bikeElement.className = 'card mb-3';
            bikeElement.innerHTML = `
                <div class="card-body" id="bike-${bike.id}">
                    <h5 class="card-title">${bike.marca} ${bike.modelo}</h5>
                    <p class="card-text">Año: ${bike.año}</p>
                    <p class="card-text">Color: ${bike.color}</p>
                    <p class="card-text">Kilometraje: ${bike.kilometraje}</p>
                    <img src="${bike.imagen}" class="card-img-top" alt="">
                    <button class="btn btn-danger" onclick="deleteBike(${bike.id})">Eliminar</button>
                    <button class="btn btn-primary" onclick="editBike(${bike.id})"></button>
                </div>
            `
            bikesList.appendChild(bikeElement);
        });
    })
    .catch(error => console.error('Error al obtener las motocicletas:', error));
}


// Función para agregar una nueva motocicleta
function addBike(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

        // Obtener el archivo de la entrada de archivo (input[type="file"])
        const fileInput = form.querySelector('input[type="file"]');
        const file = fileInput.files[0];
        
        // Agregar la foto al FormData
        formData.append('photo', file);

    fetch('http://localhost:3001/bike', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })
    .then(response => {
        if (response.ok) {
            getBikes(); // Actualizar la lista de motocicletas
            form.reset(); // Limpiar el formulario
        } else {
            throw new Error('Error al agregar la motocicleta');
        }
    })
    .catch(error => console.error(error));
}


// Función para eliminar una motocicleta
function deleteBike(id) {
    fetch(`http://localhost:3001/Bike/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            // Eliminar la motocicleta del DOM
            const bikeElement = document.getElementById(`bike-${id}`);
            if (bikeElement) {
                bikeElement.remove();
            }
            // Eliminar la motocicleta de la lista
            bikes = bikes.filter(bike => bike.id !== id);
        } else {
            throw new Error('Error al eliminar la motocicleta');
        }
    })
    .catch(error => console.error(error));
}


// Función para actualizar una motocicleta
function updateBike() {
    const id = document.getElementById('edit-bike-id').value;
    const formData = new FormData(document.getElementById('add-bike-form'));
    fetch(`http://localhost:3001/bike/marca/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })
    .then(response => {
        if (response.ok) {
            getBikes(); // Actualizar la lista de motocicletas
            $('#editModal').modal('hide'); // Cerrar el modal de edición
        } else {
            throw new Error('Error al actualizar la motocicleta');
        }
    })
    .catch(error => console.error(error));
}



// Llamar a la función para obtener las motocicletas al cargar la página
getBikes();

// Agregar un event listener al formulario para agregar una motocicleta
document.getElementById('add-bike-form').addEventListener('submit', addBike);
