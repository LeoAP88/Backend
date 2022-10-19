const fs = require('fs/promises');

class Container {
    #file
    #products
    constructor(file) {
        this.#file = file;
        this.#products = [];
    }

    async getAll() {
        this.#products = JSON.parse(await fs.readFile(this.#file, 'utf-8'))
        return this.#products
    }

    async getById(id) {
        await this.getAll()
        console.log(this.#products.find(prd => prd.id == id)
            ? this.#products.find(prd => prd.id == id)
            : null)
    }

    async deleteById(id) {
        await this.getAll()
        this.#products = this.#products.filter(prd => prd.id !== id)
        await fs.writeFile(this.#file, JSON.stringify(this.#products))
    }

    async deleteAll() {
        await this.getAll()
        this.#products = []
        await fs.writeFile(this.#file, JSON.stringify(this.#products))
    }

    async save(product) {
        this.#products.push(product);
        await fs.writeFile(this.#file, JSON.stringify(this.#products))
    }

}

async function main() {

    const container1 = new Container('./products.txt')
    await fs.writeFile('./products.txt', '[]')

    try {
        await container1.save({ id: 1, title: 'campera', price: 300, url: 'campera.jpg' });
        await container1.save({ id: 2, title: 'pantalon', price: 200, url: 'pantalon.jpg' });
        await container1.save({ id: 3, title: 'remera', price: 150, url: 'remera.jpg' });
        await container1.getById(2);
        await container1.getById(5);
        await container1.deleteById(1);
        await container1.deleteAll();
    }

    catch (error) {
        console.log(error);
    }

}

main()




