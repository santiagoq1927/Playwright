const persona = new Persona("Alice",30);
persona.mostrarDetalles();

//una simple funcion
function sumar(a:number,b:number){
    return a+b;
}

const resultadoSuma = sumar(2,4);
console.log("El valor de la suma es: ", resultadoSuma);

//funcion flecha basica
const suma = (a:number,b:number): number =>{
    return a+b;
}

const resultadoSumaFlecha = suma(3,5);
console.log("El valor de la suma con flecha es: ", resultadoSumaFlecha);