const express = require('express');
const { faker } = require('@faker-js/faker')

const app = express();

const port = 3000;


app.get('/', (req, res) => {
  res.send('Hola mi server en express')
})
app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta/endpoint')
})
app.get('/products', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    })

  }
  res.json(products)
})

app.get('/products/filter', (req, res) => {
  res.send('Yo spy un filter')
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    name: 'Producto 1',
    price: 1000
  })
})


app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  })
})

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.send("No hay parametros");

    res.json({
      limit,
      offset
    })
  }
  else {
    res.send("No hay parametros");
  }

})

app.get('/categories', (req, res) => {
  res.json({
    name: 'category 1',
    color: "red"
  })
})
app.listen(port, () => {
  console.log("Estamos corriendo en el puerto.." + port)
})

