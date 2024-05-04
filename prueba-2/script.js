document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3001/')
    .then(response => response.json())
    .then(bikes => {
        bikes.forEach(bike => {
            const bikeList = document.getElementById('bike-list');
            const existingBikeCard = document.getElementById(`bike-${bike.id}`);
            
            if (!existingBikeCard) {
                const bikeCard = document.createElement('div');
                bikeCard.id = `bike-${bike.id}`; // Asignar un ID único a cada tarjeta de motocicleta
                bikeCard.classList.add('card', 'col-md-4');

                const bikeImage = document.createElement('img');
                bikeImage.src = bike.imagen;
                bikeImage.alt = `${bike.marca} ${bike.modelo}`;
                bikeImage.classList.add('card-img-top');

                const bikeCardBody = document.createElement('div');
                bikeCardBody.classList.add('card-body');

                const bikeTitle = document.createElement('h2');
                bikeTitle.classList.add('card-title');
                bikeTitle.textContent = `${bike.marca} ${bike.modelo}`;

                const bikeYear = document.createElement('p');
                bikeYear.classList.add('card-text');
                bikeYear.textContent = `Año: ${bike.año}`;

                const bikeColor = document.createElement('p');
                bikeColor.classList.add('card-text');
                bikeColor.textContent = `Color: ${bike.color}`;

                const bikeMileage = document.createElement('p');
                bikeMileage.classList.add('card-text');
                bikeMileage.textContent = `Kilometraje: ${bike.kilometraje} km`;

                bikeCardBody.appendChild(bikeTitle);
                bikeCardBody.appendChild(bikeYear);
                bikeCardBody.appendChild(bikeColor);
                bikeCardBody.appendChild(bikeMileage);

                bikeCard.appendChild(bikeImage);
                bikeCard.appendChild(bikeCardBody);

                bikeList.appendChild(bikeCard);
            }
        });
    })
    .catch(error => console.error('Error al obtener las motocicletas:', error));
});
