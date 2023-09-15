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

const consolasDisponibles = ['GBA', 'N64', 'PS2'];
const generosDisponibles = [];

for (const consola of consolasDisponibles) {
  const datosDos = cargarDatos(consola);
  for (const juego of datosDos) {
    generosDisponibles.push(...juego.genres);
  }
}

if (consolasDisponibles.length > 0) {
  const generoAleatorioDos = generosDisponibles[Math.floor(Math.random() * generosDisponibles.length)];

  console.log(`\nGénero seleccionado aleatoriamente: ${generoAleatorioDos}`);

  const consolasSeleccionadas = new Set();
  
  let juegosSeleccionados = 0;

  const juegosDisponibles = [];
  for (const consola of consolasDisponibles) {
    const datosDos = cargarDatos(consola);
    const juegosFiltradosDos = datosDos.filter((juego) => juego.genres.includes(generoAleatorioDos));
    juegosDisponibles.push(...juegosFiltradosDos);
  }

  if (juegosDisponibles.length < 3) {
    console.log('No hay suficientes juegos con el mismo género en las consolas disponibles.');
  } else {
    while (juegosSeleccionados < 3) {
      const juegoAleatorioDos = juegosDisponibles.splice(Math.floor(Math.random() * juegosDisponibles.length), 1)[0];

      mostrarJuego(juegoAleatorioDos);

      consolasSeleccionadas.add(juegoAleatorioDos.video_console);

      juegosSeleccionados++;
    }
  }
} else {
  console.log('No se encontraron juegos en las consolas disponibles.');
}

process.exit(0);