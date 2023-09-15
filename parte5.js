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
function obtenerListadoPorGeneroAleatorio() {
    const generosDisponibles = ['Action', 'Adventure', 'RPG', 'Platformer', 'Sports', 'Fighting', 'Survival Horror', 'Strategy', 'Mini-Games', 'Tactical RPG', 'Turn-Based Strategy', 'Rail Shooter', 'Party', 'Vehicular Combat', 'Action-Adventure'];
    const generoAleatorioCinco = generosDisponibles[Math.floor(Math.random() * generosDisponibles.length)];
    const juegosFiltradosCinco = [];
  
    for (const consola of consolasDisponibles) {
      const datosCinco = cargarDatos(consola);
      const juegosFiltradosConsola = datosCinco.filter((juego) => juego.genres.includes(generoAleatorioCinco));
      juegosFiltradosCinco.push(...juegosFiltradosConsola);
    }
  
    return juegosFiltradosCinco;
  }
  
  const listadoGeneroAleatorio = obtenerListadoPorGeneroAleatorio();
  
  console.log(`\nListado de juegos del género aleatorio "${listadoGeneroAleatorio[0].genres[0]}":`);
  listadoGeneroAleatorio.forEach((juego) => {
    console.log('- Nombre:', juego.name);
    console.log('  Consola:', juego.video_console);
    console.log('  Género:', juego.genres.join(', '));
    console.log('  ¿Es multigénero?', juego.genres.length > 1);
    console.log('---');
  });

  process.exit(0);