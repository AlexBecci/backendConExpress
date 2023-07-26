const express = require('express');
const cors = require("cors")
const routerApi = require('./routes')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler.js')
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
/*

const whitelist = ["http://localhost:3000", "http://localhost:5173/"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    }
    else {
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options));
 */

app.get('/', (req, res) => {
  res.send('Hola mi server en express Home')
})
app.get('/api', (req, res) => {
  res.send('Hola mi server en express')
})
app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta/endpoint')
})
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);


app.listen(port, () => {
  console.log("Estamos corriendo en el puerto.." + port)
})

