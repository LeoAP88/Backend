const express = require('express');
const Container = require("../controllers/controlador");
const fs = require('fs/promises');
const { randomUUID } = require('crypto');
const routerApi = express.Router();


async function main() {

    const ContainerProd = new Container('./productos.txt')
    await fs.writeFile('./productos.txt', '[]')

    try {

        routerApi.get('/', (req, res) => {
            res.render('form');
        });

        routerApi.get('/productos', (req, res) => {
            ContainerProd.getProductos().then(data => res.render('lista', { hayProductos: data.length > 0, data }));
        });

        routerApi.post('/productos', (req, res) => {
            const prodNuevo = req.body;
            prodNuevo.id = randomUUID();
            ContainerProd.agregarProducto(prodNuevo);
            res.redirect('/')
        });

    } catch (error) {
        console.log(error);
    }
}

main()

exports.routerApi = routerApi;