import express from 'express';
import fs from 'fs';
import path from 'path';

const puerto = 8080;

const app = express();

const server = app.listen(puerto, () =>
  console.log('Server Up en puerto', puerto)
);

server.on('error', (err) => {
  console.log('ERROR =>', err);
});

let visitas = 0;
let visitasRandom = 0;

app.get('/', (request, response) => {
  total++;
  const myfilePath = path.resolve(__dirname, './views/productos.txt');
  //   const data = fs.readFileSync(myfilePath, 'utf-8');
  response.sendFile(myfilePath);
});

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

app.get('/item-random', (request, response) => {
  visitasRandom++;
  const myfilePath = path.resolve(__dirname, './views/productos.txt');
  const data = fs.readFileSync(myfilePath, 'utf-8');
  const producto = JSON.parse(data);
  response.json({
    items: producto[Math.floor(Math.random() * producto.length)],
  });
});

app.get('/visitas', (request, response) => {
  response.json({
    visitas: {
      items: visitas,
      itemRandom: visitasRandom,
    },
  });
});
