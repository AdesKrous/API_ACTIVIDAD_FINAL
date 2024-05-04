const express = require('express');
const cors = require('cors');
const router = require('./api/routes/bikes.routes');

const app = express();
app.use('/images', express.static('images'));

app.use(express.json());
app.use(cors()); // Agrega esta línea para permitir solicitudes desde cualquier origen

app.use('/', router);

app.use((req, res, next) => {
    res.status(404).send('Ruta no encontrada');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});

app.listen(3001, () => {
    console.log('Funcionando Correctamente')
})


//const PORT = process.env.PORT || 3001;
//app.listen(PORT, () => {
  //console.log(`Servidor corriendo en el puerto ${PORT}`);
//});