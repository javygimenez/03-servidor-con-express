const Contenedor = require('./contenedor.js');
const express = require('express');

const PORT = process.env.PORT || 8080;
const app = express();


const productos = new Contenedor('productos.json');


app.get('/productos', async (req, res) => { 
    const verProductos = await productos.getAll();       
    res.send(verProductos);
})

app.get('/productoRandom', async (req, res) => {
    const prod = await productos.getAll();
    const productoRandom = Math.floor(Math.random() * prod.length);
    res.send(prod[productoRandom]);
})


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
    //console.log(`Servidor http escuchando en el puerto ${connectedServer.address().PORT}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));