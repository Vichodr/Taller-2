const GBAData = require('./data/GBA.json');
const N64Data = require('./data/N64.json');
const PS2Data = require('./data/PS2.json');

const fs = require('fs');
const readline = require('readline');


function cargarDatos(consola) {
  try {
    const data = fs.readFileSync(`data/${consola}.json`, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error al cargar datos para ${consola}: ${error}`);
    return [];
  }
}

function mostrarJuego(juego) {
  console.log(`${juego.name} - ${juego.video_console} - ${juego.genres.join(', ')}`);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const consolas = ['GBA', 'N64', 'PS2'];
const consolaAleatoria = consolas[Math.floor(Math.random() * consolas.length)];

console.log(`Consola seleccionada aleatoriamente: ${consolaAleatoria}`);
const datos = cargarDatos(consolaAleatoria);

if (datos.length > 0) {
  console.log('Dos juegos recomendados de la consola seleccionada:');
  mostrarJuego(datos[Math.floor(Math.random() * datos.length)]);
  mostrarJuego(datos[Math.floor(Math.random() * datos.length)]);
} else {
  console.log('No se encontraron juegos para la consola seleccionada.');
}

process.exit(0);