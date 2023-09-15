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
const generosDisponibles = ['Action', 'Adventure', 'RPG', 'Platformer', 'Sports', 'Fighting', 'Survival Horror', 'Strategy', 'Mini-Games', 'Tactical RPG', 'Turn-Based Strategy', 'Rail Shooter', 'Party', 'Vehicular Combat', 'Action-Adventure'];
const consolasDisponibles = ['GBA', 'N64', 'PS2'];

rl.question('\nIngrese el nombre del juego que desea buscar: ', (nombreJuego) => {
    const nombreJuegoLowerCase = nombreJuego.toLowerCase();
  
    let juegoEncontrado = false;
  
    for (const consola of consolasDisponibles) {
      const datosCuatro = cargarDatos(consola);
      for (const juego of datosCuatro) {
        if (juego.name.toLowerCase() === nombreJuegoLowerCase) {
          console.log(`\nJuego encontrado: ${juego.video_console} - ${juego.genres.join(', ')}`);
          juegoEncontrado = true;
          break;
        }
      }
      if (juegoEncontrado) {
        break;
      }
    }
  
    if (!juegoEncontrado) {
      console.log('Juego no encontrado en nuestra base de datos.');
    }
  
    rl.close();
  });