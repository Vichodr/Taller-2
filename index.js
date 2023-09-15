const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mostrarMenu() {
  console.log('Menú:');
  console.log('1. Recomendacion de dos juegos para una consola');
  console.log('2. Recomendacion de tres juegos para un genero');
  console.log('3. Recomendacion de un juego para una consola y genero especifico');
  console.log('4. Buscar un juego por su nombre');
  console.log('5. Mostrar lista de juegos por una categoria en especifico');
  console.log('0. Salir');
}

function manejarSeleccion(opcion) {
  switch (opcion) {
    case '1':
      console.log(" ")
      require('./parte1');
      break;
    case '2':
      require('./parte2');
      break;
    case '3':
      require('./parte3');
      break;
    case '4':
      console.log(" ")
      require('./parte4');
      break;
    case '5':
      console.log(" ")
      require('./parte5');
      break;
    case '0':
      console.log('Saliendo del programa.');
      rl.close();
      break;
    default:
      console.log('Opción no válida.');
      break;
  }
}

mostrarMenu();

rl.question('Selecciona una opción: ', (opcion) => {
  manejarSeleccion(opcion); 
});
