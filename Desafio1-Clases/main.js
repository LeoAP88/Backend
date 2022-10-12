class Container {
    #products;
    constructor() {
        this.#products = [];
    }

    // Recibe un objeto y lo guarda
    save(id, title, price, url) {
        let prd = { id: id, title: title, price: price, thumbnail: url };
        this.#products.push(prd);
    }

    // Recibe un id y devuelve el objeto o null
    getById(id) {
        return (this.#products.find(prd => prd.id == id))
            ? this.#products.find(prd => prd.id == id)
            : null
    }

    // Devuelve un array con todos los objetos
    getAll() {
        return this.#products;
    }

    // Elimina el objeto con el id buscado
    deleteById(id) {
        return this.#products = this.#products.filter(prd => prd.id !== id)
        
        // Otra opcion //
        // let itemToDelete = this.#products.map(prd => prd.id).indexOf(id);
        // return this.#products.splice(itemToDelete, 1);
    }

    // Elimina todos los objetos
    deleteAll() {
        return this.#products.splice(0, this.#products.length);
    }

    // Retorna el length del array products
    getLength() {
        return `El largo del array products es de: ${this.#products.length}`;
    }

}

Cont1 = new Container();

Cont1.save(1, 'campera', 300, 'campera.jpg');
Cont1.save(2, 'pantalon', 200, 'pantalon.jpg');
Cont1.save(3, 'remera', 150, 'remera.jpg');

console.log(Cont1.getAll());

console.log(Cont1.getById(1));
console.log(Cont1.getById(2));
console.log(Cont1.getById(4));

Cont1.deleteById(2);

console.log(Cont1.getAll());

console.log(Cont1.getLength());

Cont1.deleteAll();

console.log(Cont1.getAll());

console.log(Cont1.getLength());
