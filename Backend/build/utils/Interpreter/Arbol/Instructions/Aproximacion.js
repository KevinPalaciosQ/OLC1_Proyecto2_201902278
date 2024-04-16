"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = __importStar(require("../Symbol/Type"));
class Aproximacion extends Instruccion_1.Instruccion {
    constructor(identificador, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }
    interpretar(arbol, tabla) {
        console.log(this.identificador.tipoDato);
        try {
            let valor = this.identificador.interpretar(arbol, tabla);
            if (typeof valor === 'number') {
                // Redondear el valor según las reglas
                const entero = Math.floor(valor); // Obtener la parte entera
                const decimal = valor - entero; // Obtener la parte decimal
                // Redondear según las reglas
                let valorAproximado;
                if (decimal >= 0.5) {
                    valorAproximado = entero + 1; // Aproximar al entero superior
                }
                else {
                    valorAproximado = entero; // Aproximar al número inferior
                }
                return valorAproximado.toFixed(2);
            }
            else {
                console.log(`Error: El identificador "${this.identificador}" no es una cadena ni un número.`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = Aproximacion;
