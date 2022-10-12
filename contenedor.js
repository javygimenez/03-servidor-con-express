const fs = require("fs");
const path = require("path");

class Contenedor {
    constructor (fileName) {
        this.fileName = fileName;
        this.objects = [];
    }


    // Guardar objetos //
    async save(data) {
        try {
            let id = 1;
            const productos = await this.getAll();            
            if (productos.length) {
                id = productos[productos.length -1].id +1;               
            }

            const nuevoProducto = {
                title: data.title,
                price: data.price,
                thumbnail: data.thumbnail,
                id: id
            }

            productos.push(nuevoProducto);
            this.objects = productos          
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.objects, null, 2));
            return nuevoProducto.id;                 
        } catch (error) {
            console.log(error);
        }
    }

    // Devuelve el objeto con el ID indicado //
    async getById(id) {
        try {            
            const getById = await fs.promises.readFile(this.fileName, 'utf-8');
            this.objects = JSON.parse(getById);
            const obj = this.objects.find(el => el.id === Number(id));
            console.log(obj ? obj : null);
            return obj ? obj : null;
        } catch (err) {
            console.log(err);
        }
    }


    // Muestra el array de objetos en el archivo //
    async getAll() {
        try {
            const contenidoData = await fs.promises.readFile(this.fileName, 'utf-8');
            const data = JSON.parse(contenidoData);
            return data;
        } catch (error) {
            console.log(error);
        }
    }


    // Elimina el objeto con el ID indicado // 
    async deleteById(id) {
        try {            
            const deleteById = await fs.promises.readFile(this.fileName, 'utf-8');
            this.objects = JSON.parse(deleteById);
            this.objects = this.objects.filter(el => el.id != Number(id));            
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.objects, null, 2));
            console.log("El archivo se eliminó con éxito");
        } catch (err) {
            console.log(err);
        }
    }


    // Elimina todos los objetos guardados //
    async deleteAll() {
        try {            
            const deleteAll = await fs.promises.readFile(this.fileName, 'utf-8');
            this.objects = JSON.parse(deleteAll);
            this.objects = [];            
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.objects, null, 2));
            console.log("Los archivos se eliminaron con éxito");
        } catch (err) {
            console.log(err);
        }
    }
}

// const productos = new Contenedor('productos.json');

// const testSave = async () => {
// 	const data = await productos.save({ title: "Lavandina", price: "100", thumbnail: "img del producto"});
// 	console.log(productos.objects);
// }

module.exports = Contenedor;