import express from 'express';
import ProductManager from './productManager';



const app = express()

//app.use(express.urlencoded({extended:true}))

app.get('/', (request, response) => {
  response.send('Hola mundo')
})

app.get('/products/:id', async (request, response) => {
  const {id} = req.params.id
  const products = await userManager.getProducts()
  const product = products.find(product => product.id === id)

  if(!product) {
    return response.send('Product not found')
  }
  response.json(product)
})

app.listen(4000, () => console.log('Listening on port 4000'))