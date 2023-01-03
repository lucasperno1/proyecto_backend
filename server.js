import express from 'express';
import ProductManager from './productManager.js';
let file = new ProductManager("./products.json")

const app = express()

const PORT = process.env.PORT || 4000
//app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.get('/products/:id', async (req, res) => {
  const {id} = req.params
  const products = await file.getProducts()
  let product = products.find(product => product.id === Number(id))

  if(!product) {
    return res.send('Product not found')
  }
  res.json(product)
})

app.get('/products',  (req, res) => {
  const {title, price} = req.query
  const product = products.find(prod => prod.title === title || prod.price === price)

  if(!product) {
    return res.send('Product not found')
  }
  res.json(product)
})

app.listen(PORT,() => console.log('Listening on port 4000'))