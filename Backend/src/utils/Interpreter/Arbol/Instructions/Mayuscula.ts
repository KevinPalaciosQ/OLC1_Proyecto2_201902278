/*
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Decremento extends Instruccion {
    private identificador: string;

    constructor(identificador: string, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let variable = tabla.getValor(this.identificador);
        if (variable instanceof Simbolo) {
            let tipoVariable = variable.gettipo().getTipo();
            if (tipoVariable === DataType.CADENA || tipoVariable === DataType.CARACTER) {
                // Si es una cadena o caracter, devolver el valor en mayúsculas
                let valor = variable.getvalor();
                    return valor.toUpperCase();
            }
        } else {
            return "Error Semantico: No se puede convertir a mayúsculas la variable " + this.identificador + " porque su valor no es de tipo cadena o caracter";
        }
    }
}
*/
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Decremento extends Instruccion {
    private identificador: string;

    constructor(identificador: string, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let variable = tabla.getValor(this.identificador);
        if (variable instanceof Simbolo) {
            let tipoVariable = variable.gettipo().getTipo();
            if (tipoVariable === DataType.CADENA || tipoVariable === DataType.CARACTER) {
                // Si es una cadena o caracter, devolver el valor en mayúsculas
                let valor = variable.getvalor();
                if (typeof valor === 'string') {
                    return valor.toUpperCase();
                } else {
                    throw new Error(`Error Semantico: No se puede convertir a mayúsculas la variable ${this.identificador} porque su valor no es de tipo cadena o caracter`);
                }
            } else {
                throw new Error(`Error Semantico: No se puede convertir a mayúsculas la variable ${this.identificador} porque su valor no es de tipo cadena o caracter`);
            }
        } else {
            throw new Error(`Error Semantico: No se encontró la variable ${this.identificador}`);
        }
    }
}
