const fs = require('fs/promises');
const express = require('express');
const app = express()
const port = 8080
const server = app.listen(port, () => { })
server.on('error', error => console.log(error))

class Container {
    #productos
    #ruta
    constructor(ruta) {
        this.#ruta = ruta;
        this.#productos = [];
    }

    //Muestra todos los productos del archivo productos.txt
    async getAll() {
        this.#productos = JSON.parse(await fs.readFile(this.#ruta, 'utf-8'))
        return this.#productos
    }

}

async function main() {

    const container1 = new Container('./productos.txt')

    try {
        const productos = await container1.getAll()

        app.get('/productos', (req, res) => {
            res.send(productos)
        })

        app.get('/productoRandom', (req, res) => {
            const randomIndex = Math.floor(Math.random() * productos.length)
            container1.getAll().then(() => res.send(productos[randomIndex]))
        })
    }
    catch (error) {
        console.log(error);
    }
}

main()




