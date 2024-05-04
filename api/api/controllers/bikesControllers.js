let bikesInfo = [
    {
        id: 1,
        marca: "Yamaha",
        modelo: "Fz-S",
        año: 2021,
        color: "Azul-Negro",
        kilometraje: 200,
        imagen: "http://localhost:3001/images/fz-s.jpg"
    },
    {
        id: 2,
        marca: "KTM",
        modelo: "Duke 390-NG",
        año: 2023,
        color: "Negro-Naranja",
        kilometraje: 180,
        imagen: "http://localhost:3001/images/ktm 390.jpg"
    },
    {
        id: 3,
        marca: "Kawasaki",
        modelo: "Ninja 400",
        año: 2024,
        color: "Verde Kawasaki",
        kilometraje: 0,
        imagen: "http://localhost:3001/images/ninja 400.jpg"
    },
    {
        id: 4,
        marca: "BMW",
        modelo: "S1000RR",
        año: 2025,
        color: "Negra-Paquete-M",
        kilometraje: 1000,
        imagen: "http://localhost:3001/images/S1000RR.jpg"
    },
    
  {
    "id": 5,
    "marca": "Honda",
    "modelo": "CB1000RR",
    "año": 2025,
    "color": "Naranja",
    "kilometraje": 1200,
    imagen: "http://localhost:3001/images/v4r.jpg"
  },
  {
    "id": 6,
    "marca": "Ducati",
    "modelo": "V4R",
    "año": 2025,
    "color": "Roja",
    "kilometraje": 0,
    imagen: "http://localhost:3001/images/cb1000.jpg"
  }
]

const getBikes = (req, res) => {
    res.status(200).json(bikesInfo)
}

const getBikesById = (req, res) => {
    const idBike = parseInt(req.params.id);
    const bike = bikesInfo.find(bike => bike.id === idBike);
    if (bike) {
        res.send(bike);
    } else {
        res.status(404).send('Motocicleta no encontrada');
    }
};

const postBike = (req, res) => {
    const { id, marca, modelo, año, color, kilometraje } = req.body
    bikesInfo.push({ id, marca, modelo, año, color, kilometraje })
    res.send('Motocicleta añadida satisfactoriamente')
}

const deleteBike = (req, res) => {
    const idBike = parseInt(req.params.id);
    const index = bikesInfo.findIndex(bike => bike.id === idBike);
    if (index !== -1) {
        bikesInfo.splice(index, 1);
        res.send("Motocicleta eliminada satisfactoriamente");
    } else {
        res.status(404).send('Motocicleta no encontrada');
    }
};

const putBike = (req, res) => {
    const idBike = parseInt(req.params.id);
    const { marca, modelo, año, color, kilometraje } = req.body;

    const index = bikesInfo.findIndex(bike => bike.id === idBike);
    if (index !== -1) {
        bikesInfo[index] = { id: idBike, marca, modelo, año, color, kilometraje };
        res.send('Motocicleta actualizada satisfactoriamente');
    } else {
        res.status(404).send('Motocicleta no encontrada');
    }
};

module.exports = {
    getBikes,
    getBikesById,
    postBike,
    deleteBike,
    putBike
}