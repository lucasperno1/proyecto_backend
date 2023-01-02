import express from 'express';
import ProductManager from './productManager.js';

const app = express()

const PORT = process.env.PORT || 4000
//app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.get('/product/:id', async (req, res) => {
  const {id} = req.params
  const products = await ProductManager.getProducts()
  const product = products.find(product => product.id === id)

  if(!product) {
    return res.send('Product not found')
  }
  res.json(product)
})

app.get('/product', (req, res) => {
  const {name, price} = req.query
  const product = products.find(prod => prod.name === name || prod.price === price)

  if(!product) {
    return res.send('Product not found')
  }
  res.json(product)
})

app.listen(PORT,() => console.log('Listening on port 4000'))