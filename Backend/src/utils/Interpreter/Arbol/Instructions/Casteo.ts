
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class ToString extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion ,linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;


    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        try {
            let valor = this.identificador.interpretar(arbol, tabla);
            let tipoDato = this.identificador.tipoDato.getTipo();
            //console.log("td"+tipoDato)
            //console.log("valor"+valor)
            if (tipoDato === DataType.ENTERO && typeof valor === 'number') {
                console.log("caso 1")
                // int a double
                return valor.toFixed(2);
            } else if (tipoDato === DataType.DECIMAL && typeof valor === 'number') {
                // double a int
                console.log("caso 2")//este so sirve
                return Math.floor(valor);
            } else if (tipoDato === DataType.ENTERO && typeof valor === 'number') {
                // int a string
                console.log("caso 3")
                valor = String.fromCharCode(valor);
                
                return valor;
            } else if (tipoDato === DataType.ENTERO && typeof valor === 'number') {
                console.log("caso 4")
                // int a char
                if (valor >= 0 && valor <= 255) {
                     valor = String.fromCharCode(valor);
                    return valor;
                } else {
                    throw new Error(`Error: El valor '${valor}' no se puede convertir a char`);
                }
            } else if (tipoDato === DataType.DECIMAL && typeof valor === 'number') {
                console.log("caso 5")
                // double a string
                return valor.toString();
            } else if (tipoDato === DataType.CARACTER && typeof valor === 'string' && valor.length === 1) {
                console.log("caso 6")
                // char a int
                return valor.charAt(0);
            } else if (tipoDato === DataType.CARACTER && typeof valor === 'string' && valor.length === 1) {
                console.log("caso 7")
                // char a double
                return parseFloat(valor);
            } else {
                throw new Error(`Error: No se puede convertir el identificador "${this.identificador}" a string`);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }
}

/*
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class ToString extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        try {
            let valor = this.identificador.interpretar(arbol, tabla);
            let tipoDato = this.identificador.tipoDato.getTipo();
            console.log("td" + tipoDato)
            console.log("valor" + valor)

            switch (tipoDato) {
                case DataType.ENTERO:
                    if (typeof valor === 'number') {
                        // int a double
                        return valor.toFixed(2);
                    } else if (typeof valor === 'string') {
                        // int a string
                        return valor;
                    }
                    break;

                case DataType.DECIMAL:
                    if (typeof valor === 'number') {
                        // double a int
                        return Math.floor(valor);
                    } else if (typeof valor === 'string') {
                        // double a string
                        return valor.toString();
                    }
                    break;

                case DataType.CARACTER:
                    if (typeof valor === 'string' && valor.length === 1) {
                        // char a int
                        return valor.charCodeAt(0);
                    } else if (typeof valor === 'string' && valor.length === 1) {
                        // char a double
                        return parseFloat(valor);
                    }
                    break;

                default:
                    throw new Error(`Error: No se puede convertir el identificador "${this.identificador}" a string`);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }
}
*/