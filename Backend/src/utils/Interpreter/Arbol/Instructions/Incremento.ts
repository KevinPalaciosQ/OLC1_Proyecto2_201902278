import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, {DataType} from "../Symbol/Type";
/*
export default class Incremento extends Instruccion {
    private identificador: string;

    constructor(identificador: string, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let variable = tabla.getValor(this.identificador);
        if (variable instanceof Simbolo) {
            let tipoVariable = variable.gettipo().getTipo();
            if (tipoVariable === DataType.ENTERO || tipoVariable === DataType.DECIMAL) {
                let valor = variable.getvalor();
                valor++;
                tabla.setValor(this.identificador, new Simbolo(variable.gettipo(), variable.getidentificador(), valor));
                return valor;
            
        } else {
            return console.log("Error en Semantico: No se puede incrementar la variable " + this.identificador + " porque su valor no es numérico.");
        }
    }
    }
}*/



export default class Incremento extends Instruccion {
    private identificador: string;

    constructor(identificador: string, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let variable = tabla.getValor(this.identificador);
        if (variable instanceof Simbolo) {
            let tipoVariable = variable.gettipo().getTipo();
            if (tipoVariable === DataType.ENTERO || tipoVariable === DataType.DECIMAL) {
                let valor = variable.getvalor();
                
                // Redondear el valor antes de incrementarlo
                const entero = Math.floor(valor); // Obtener la parte entera
                const decimal = valor - entero; // Obtener la parte decimal
                let valorAproximado: number;
                if (decimal >= 0.5) {
                    valorAproximado = entero + 1; // Aproximar al entero superior
                } else {
                    valorAproximado = entero; // Aproximar al número inferior
                }

                valorAproximado++; // Incrementar el valor

                tabla.setValor(this.identificador, new Simbolo(variable.gettipo(), variable.getidentificador(), valorAproximado));
                return valorAproximado;
            } else {
                return console.log("Error en Semantico: No se puede incrementar la variable " + this.identificador + " porque su valor no es numérico.");
            }
        } else {
            return console.log("Error en Semantico: No se encontró la variable " + this.identificador);
        }
    }
}
