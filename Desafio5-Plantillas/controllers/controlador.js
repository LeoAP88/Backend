const fs = require('fs/promises');

class Container {
    #productos
    #ruta
    constructor(ruta) {
        this.#ruta = ruta;
        this.#productos = [];
    }

    async getProductos() {
        try {
            this.#productos = JSON.parse(await fs.readFile(this.#ruta, 'utf-8'))
            return this.#productos
        }
        catch {
            return 'No hay productos para mostrar'
        }
    }

    async agregarProducto(producto) {
        this.#productos.push(producto);
        await fs.writeFile(this.#ruta, JSON.stringify(this.#productos))
    }

}

module.exports = Container;