import express from 'express';
import ProductManager from './productManager.js';
let file = new ProductManager("./products.json")

const app = express()

const PORT = process.env.PORT || 4000




app.use(express.urlencoded({extended:true})) //Incrementa el dinamismo en las urls


app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.get('/products', async (req, res) => { 
  const {title, id, price, limit} = req.query
  const products = await file.getProducts()
  const product = products.filter(prod => prod.title === title || prod.price === price || prod.id === id)

  if(limit) {
    const choosenProducts = products.slice(0,limit)
    return res.json(choosenProducts)
  } 
  
  res.json(product)
   
  
})



app.listen(PORT,() => console.log('Listening on port 4000'))