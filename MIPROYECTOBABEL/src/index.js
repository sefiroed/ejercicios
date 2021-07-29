import express from 'express';
import fs from 'fs';
import path from 'path';

const puerto = 8080;
const app = express();
let visitas = 0;
let visitasRandom = 0;

const server = app.listen(puerto, () =>
  console.log('Server Up en puerto', puerto)
);

server.on('error', (err) => {
  console.log('ERROR =>', err);
});

//ENVIO DE UN TXT BASICO USANDO EXPRESS
app.get('/', (request, response) => {
  total++;
  const myfilePath = path.resolve(__dirname, './views/productos.txt');
  response.sendFile(myfilePath);
});

//Llamamos a item para que nos devuelva los productos y la cantidad total dentro el array de productos.txt
app.get('/items', (request, response) => {
  visitas++;
  const myfilePath = path.resolve(__dirname, './views/productos.txt');
  const data = fs.readFileSync(myfilePath, 'utf-8');
  const producto = JSON.parse(data);
  console.log(producto);

  response.json({
    items: producto,
    cantidad: producto.length,
  });
});

//Llamamos a item-random para que nos devuelva un objeto al azar dentro el array de productos.txt
app.get('/item-random', (request, response) => {
  visitasRandom++;
  const myfilePath = path.resolve(__dirname, './views/productos.txt');
  const data = fs.readFileSync(myfilePath, 'utf-8');
  const producto = JSON.parse(data);
  response.json({
    items: producto[Math.floor(Math.random() * producto.length)],
  });
});

//Llamamos a visitas para que nos devuelva el numero de visitas tanto para items como para item-random.
app.get('/visitas', (request, response) => {
  response.json({
    visitas: {
      items: visitas,
      itemRandom: visitasRandom,
    },
  });
});
