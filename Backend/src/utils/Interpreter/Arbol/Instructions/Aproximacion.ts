import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, {DataType} from "../Symbol/Type";

export default class Aproximacion extends Instruccion {
    private valor: number;

    constructor(valor: number, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.valor = valor;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        // Obtener el tipo de la variable
        let tipoVariable = this.valor % 1 === 0 ? DataType.ENTERO : DataType.DECIMAL;

        // Verificar si es entero o decimal
        if (tipoVariable === DataType.ENTERO || tipoVariable === DataType.DECIMAL) {
            // Redondear el número según las reglas
            let redondeado: number;
            if (tipoVariable === DataType.DECIMAL) {
                const entero = Math.floor(this.valor); // Obtener la parte entera
                const decimal = this.valor - entero; // Obtener la parte decimal

                // Redondear según las reglas
                if (decimal >= 0.5) {
                    redondeado = Math.ceil(this.valor); // Aproximar al entero superior
                } else {
                    redondeado = Math.floor(this.valor); // Aproximar al número inferior
                }
            } else {
                redondeado = this.valor; // Si es entero, no hace falta redondear
            }

            return redondeado;
        } else {
            return console.log("Error en Semántico: El valor proporcionado no es un número entero ni decimal.");
        }
    }
}
