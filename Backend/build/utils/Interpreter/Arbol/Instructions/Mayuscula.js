"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const Instruccion_1 = require("../Abstract/Instruccion");
const Symbol_1 = __importDefault(require("../Symbol/Symbol"));
const Type_1 = __importStar(require("../Symbol/Type"));
/*
export default class Mayusculas extends Instruccion {
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
            } else if (tipoVariable === DataType.CADENA || tipoVariable === DataType.CARACTER) {
                let valor = variable.getvalor();
                return valor.toUpperCase();
            } else {
                return console.log("Error Semántico: No se puede incrementar la variable " + this.identificador + " porque su valor no es numérico.");
            }
        } else {
            return console.log("Error Semántico: No se encontró la variable " + this.identificador);
        }
    }
    }
    */
/*
public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
    let errores: string[] = [];

    let variable = tabla.getValor(this.identificador);
    if (!(variable instanceof Simbolo)) {
        return [`Error Semantico: No se encontró la variable ${this.identificador}`];
    }

    let tipoVariable = variable.gettipo().getTipo();
    if (tipoVariable !== DataType.CADENA && tipoVariable !== DataType.CARACTER) {
        return [`Error Semantico: No se puede convertir a mayúsculas la variable ${this.identificador} porque su valor no es de tipo cadena o caracter`];
    }

    let valor = variable.getvalor();
    if (typeof valor !== 'string') {
        return [`Error Semantico: No se puede convertir a mayúsculas la variable ${this.identificador} porque su valor no es de tipo cadena o caracter`];
    }
    console.log("ESTE ES EL VALOR M"+valor);
    return String(valor.toUpperCase());
}
}*/
/*
export default class Mayusculas extends Instruccion {
    private identificador: string;
    private lu: string;
    constructor(identificador: string, linea: number, columna: number, lu: string) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
        this.lu = lu;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let variable = tabla.getValor(this.identificador);
    
        if (!(variable instanceof Simbolo)) {
            return (`Error Semantico: No se encontró la variable ${this.identificador}`);
        }
    
        let valor = variable.getvalor();
        if (this.lu === "upper") {
            console.log("ESTE ES EL VALOR M" + valor);
            return (valor.toUpperCase());
        } else {
            return [valor];
        }
    }
}*/
/*
export default class Mayusculas extends Instruccion {
    private identificador: string;

    constructor(identificador: string, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let variable = tabla.getValor(this.identificador);
        console.log("VARIABLE", variable);
        if (variable instanceof Simbolo) {
            let tipoVariable = variable.gettipo().getTipo();
            if (tipoVariable === DataType.CADENA || tipoVariable === DataType.CARACTER) {
                let valor = variable.getvalor();
                valor = valor.toUpperCase(); // Asignar el resultado a la variable valor
                return valor;
            }
        } else {
            throw new Error("Error Semántico: No se encontró la variable " + this.identificador);
        }
    }
}
*/
// -------------------------------------------------En la clase Mayusculas
/*
export default class Mayusculas extends Instruccion {
    private identificador: string;

    constructor(identificador: string, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let variable = tabla.getValor(this.identificador);
        console.log("VARIABLE", variable);
        if (variable instanceof Simbolo) {
            let tipoVariable = variable.gettipo().getTipo();
            if (tipoVariable === DataType.CADENA || tipoVariable === DataType.CARACTER) {
                let valor = variable.getvalor();
                let valorEnMayusculas = valor.toUpperCase(); // Convertir a mayúsculas
                variable.setvalor(valorEnMayusculas); // Actualizar el valor en la tabla de símbolos
                return valorEnMayusculas; // Devolver el valor en mayúsculas
            }
        }
    }
}


*/
class Mayusculas extends Instruccion_1.Instruccion {
    constructor(identificador, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }
    interpretar(arbol, tabla) {
        let variable = tabla.getValor(this.identificador);
        console.log("VARIABLE", variable);
        if (variable instanceof Symbol_1.default) {
            let tipoVariable = variable.gettipo().getTipo();
            if (tipoVariable === Type_1.DataType.CADENA || tipoVariable === Type_1.DataType.CARACTER) {
                let valor = variable.getvalor();
                valor = valor.toUpperCase();
                tabla.setValor(this.identificador, new Symbol_1.default(variable.gettipo(), variable.getidentificador(), valor));
                return valor;
            }
        }
        else {
            return "Error Semántico: No se encontró la variable " + this.identificador;
        }
    }
}
exports.default = Mayusculas;
