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
  console.log(`${juego.video_console} - ${juego.genres.join(', ')} - ${juego.name}`);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const consolas = ['GBA', 'N64', 'PS2'];
const generosDisponibles = ['Action', 'Adventure', 'RPG', 'Platformer', 'Sports', 'Fighting', 'Survival Horror', 'Strategy', 'Mini-Games', 'Tactical RPG', 'Turn-Based Strategy', 'Rail Shooter', 'Party', 'Vehicular Combat', 'Action-Adventure'];

const consolaAleatoriaTres = consolas[Math.floor(Math.random() * consolas.length)];
const generoAleatorioTres = generosDisponibles[Math.floor(Math.random() * generosDisponibles.length)];

console.log(`\nConsola seleccionada aleatoriamente: ${consolaAleatoriaTres}`);
console.log(`Género seleccionado aleatoriamente: ${generoAleatorioTres}`);

const datosTres = cargarDatos(consolaAleatoriaTres);

const juegosFiltradosTres = datosTres.filter((juego) => juego.genres.includes(generoAleatorioTres));

if (juegosFiltradosTres.length > 0) {
  console.log('\nJuego recomendado que coincide con la consola y el género seleccionados:');
  mostrarJuego(juegosFiltradosTres[Math.floor(Math.random() * juegosFiltradosTres.length)]);
} else {
  console.log('No se encontraron juegos que coincidan con la consola y el género seleccionados en la Parte 3.');
}

process.exit(0);