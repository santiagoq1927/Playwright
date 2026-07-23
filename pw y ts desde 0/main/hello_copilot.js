function calculate_fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    console.log(n);
    return calculate_fibonacci(n - 1) + calculate_fibonacci(n - 2);
}
console.log(calculate_fibonacci(10));

/**
 * Calcula los primeros números primos.
 * @param {number} cantidad - La cantidad de números primos a calcular.
 * @returns {number[]} Un arreglo con los primeros números primos encontrados.
 */
function calcularPrimos(cantidad) {
    const primos = [];
    let num = 2;
    while (primos.length < cantidad) {
        let esPrimo = true;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                esPrimo = false;
                break;
            }
        }
        if (esPrimo) {
            primos.push(num);
        }
        num++;
    }
    return primos;
}

// Ejemplo de uso: calcular y mostrar los primeros 100 primos
const cienPrimos = calcularPrimos(100);
console.log(cienPrimos);


// Juego de piedra, papel o tijera
function jugarPiedraPapelTijera(eleccionUsuario) {
    const opciones = ['piedra', 'papel', 'tijera'];
    const eleccionComputadora = opciones[Math.floor(Math.random() * 3)];
    console.log('Tú elegiste:', eleccionUsuario);
    console.log('La computadora eligió:', eleccionComputadora);
    if (eleccionUsuario === eleccionComputadora) {
        console.log('¡Empate!');
    } else if (
        (eleccionUsuario === 'piedra' && eleccionComputadora === 'tijera') ||
        (eleccionUsuario === 'papel' && eleccionComputadora === 'piedra') ||
        (eleccionUsuario === 'tijera' && eleccionComputadora === 'papel')
    ) {
        console.log('¡Ganaste!');
    } else {
        console.log('¡Perdiste!');
    }
}

// Prueba del juego
jugarPiedraPapelTijera('piedra');
