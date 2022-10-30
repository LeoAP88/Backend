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
            ContainerProd.getProductos().then((data) => res.json(data))
        });

        routerApi.get('/:id', ({ params: { id } }, res) => {
            ContainerProd.buscarProducto(id).then((data) => {
                if (!data) {
                    res.status(404);
                    res.json({ mensaje: `No se encontró un producto con el id: (${id})` });
                } else {
                    res.json(data);
                }
            })
        });

        routerApi.post('/', (req, res) => {
            const prodNuevo = req.body;
            prodNuevo.id = randomUUID();
            ContainerProd.agregarProducto(prodNuevo);
            res.status(201);
            res.json(prodNuevo);
        });

        routerApi.put('/:id', ({ body, params: { id } }, res) => {
            ContainerProd.getProductos().then((data) => {
                const indiceBuscado = data.findIndex(prd => prd.id === id);
                if (indiceBuscado === -1) {
                    res.status(404);
                    res.json({ mensaje: `No se encontró un producto con el id: (${id})` });
                } else {
                    data[indiceBuscado] = body;
                    ContainerProd.actualizarProductos(data)
                    res.json(body);
                }
            })
        });

        routerApi.delete('/:id', ({ params: { id } }, res) => {
            ContainerProd.getProductos().then((data) => {
                const indiceBuscado = data.findIndex(prd => prd.id === id);
                if (indiceBuscado === -1) {
                    res.status(404);
                    res.json({ mensaje: `No se encontró un producto con el id: (${id})` });
                } else {
                    const borrado = data.splice(indiceBuscado, 1);
                    ContainerProd.actualizarProductos(data);
                    res.json(borrado[0]);
                }
            })
        });

    } catch (error) {
        console.log(error);
    }
}

main()

exports.routerApi = routerApi;