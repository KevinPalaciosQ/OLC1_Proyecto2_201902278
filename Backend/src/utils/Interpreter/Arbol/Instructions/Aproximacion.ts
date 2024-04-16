/*
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Aproximacion extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }
    
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        console.log("entró a minuscula")
        try {
            let valor = this.identificador.interpretar(arbol, tabla);
            if (typeof valor === 'string') {
                return valor.toLowerCase();
            } else if (typeof valor === 'number') {
                const entero = Math.floor(valor); // Obtener la parte entera
                const decimal = valor - entero; // Obtener la parte decimal

                // Redondear según las reglas
                if (decimal >= 0.5) {
                    return Math.ceil(valor); // Aproximar al entero superior
                } else {
                    return Math.floor(valor); // Aproximar al número inferior
                }
            } else {
                console.log(`Error: El identificador "${this.identificador}" no es una cadena ni un número.`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
*/


/*2
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Aproximacion extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }
    
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        console.log("entró a aproximacion")
        try {
            let valor = this.identificador.interpretar(arbol, tabla);
            if (typeof valor === 'string') {
                return valor.toLowerCase();
            } else if (typeof valor === 'number') {
                // Obtener la parte decimal
                const decimal = valor - Math.floor(valor);

                // Redondear según las reglas
                let valorAproximado: number;
                if (decimal >= 0.5) {
                    valorAproximado = Math.ceil(valor); // Aproximar al entero superior
                } else {
                    valorAproximado = Math.floor(valor); // Aproximar al número inferior
                }

                return valorAproximado;
            } else {
                console.log(`Error: El identificador "${this.identificador}" no es una cadena ni un número.`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

*/
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Aproximacion extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        console.log(this.identificador.tipoDato)
        try {
            let valor = this.identificador.interpretar(arbol, tabla);
            if (typeof valor === 'number') {
                // Redondear el valor según las reglas
                const entero = Math.floor(valor); // Obtener la parte entera
                const decimal = valor - entero; // Obtener la parte decimal
                // Redondear según las reglas
                let valorAproximado: number;
                if (decimal >= 0.5) {
                    valorAproximado = entero + 1; // Aproximar al entero superior
                } else {
                    valorAproximado = entero; // Aproximar al número inferior
                }

                return valorAproximado.toFixed(2);
            } else {
                console.log(`Error: El identificador "${this.identificador}" no es una cadena ni un número.`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
