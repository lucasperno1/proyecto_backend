import fs from 'fs'
class ProductManager {
  constructor (filename) {
    this.filename = filename
    try {
      this.products = fs.readFileSync(this.filename, 'utf-8')
      this.products = JSON.parse(this.products)
    } catch (error){
      
      this.products = []
    }

  }

  getProducts() {
    return this.products
  }

  getProductsById(id) {
    try {
      return this.products.filter(product => product.id === id)
    } catch (error) {
      return "No se encontraron productos"
    }
  }

  async save (producto) {
    if(this.products.length === 0) {
      producto.id = 1
    } else {
      producto.id = this.products[this.products.length -1].id + 1
    }
    this.products.push(producto)
    try {
      await fs.promises.writeFile(this.filename, JSON.stringify(this.products, null, '\t'))
      console.log('Element saved')
    } catch (error){
      console.log('Error saving element', error)
    }
  }

  deleteProduct() {
    fs.truncateSync(this.filename, 0, () => console.log('Content deleted')) 
  }

  async deleteById(id) {
    try {
      const product = this.products.findIndex((producto) => producto.id === id)
      if(product !== 1) {
        this.products.splice(product, 1)
        await fs.promises.writeFile(this.filename, JSON.stringify(this.products, null, '\t'))
      }
      else {
        console.log('Product not found')
      }
      
    }
    catch(error) {
        console.log('Error deletedById', error)
      }
  }
  async updateProduct(id, product) {
    try {
      const oldProduct = this.products.find((product) => product.id === id)
      const index = this.products.findIndex((producto) => producto.id === id)
      
      if (index !== -1) {
      const newProduct = {...oldProduct, ...product}
      this.products[index] = newProduct
      await fs.promises.writeFile(this.filename, JSON.stringify(this.products, null, '\t'))
      console.log('Content updated')
      }
    }
    catch(error) {
      console.log('Error updated', error)
    }
  }
}

const file = new ProductManager("./products.json")

//file.save({title:'Milka', price: 350,description:'Aireado Blanco', stock: 6})
//file.save({title:'Cadbury', price: 400,description:'Frutilla Negro', stock: 3})
//file.save({title:'Milka', price: 350,description:'Aireado Negro', stock: 5})

//console.log(file.getProducts()).
//file.deleteById(1)

//file.update(3, {title:"Arcor"})
//console.log(file.getProducts())

export default new ProductManager()
