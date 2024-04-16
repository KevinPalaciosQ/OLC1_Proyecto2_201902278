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
Object.defineProperty(exports, "__esModule", { value: true });
/*1
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Tipode extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        try {
            console.log("El tipo de dato es: " + this.identificador.tipoDato.getTipo());
            // No se devuelve el resultado de interpretar, solo se muestra el tipo de dato
        } catch (error) {
            console.log(error);
        }
    }
}
*/
/*
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Tipode extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        try {
            if (this.identificador.tipoDato.getTipo() === DataType.CARACTER) {
                return 'CARACTER';
            } else if (this.identificador.tipoDato.getTipo() === DataType.CADENA) {
                return 'CADENA';
            } else if (this.identificador.tipoDato.getTipo() === DataType.CADENA) {
                return 'ENTERO';
            } else if (this.identificador.tipoDato.getTipo() === DataType.DECIMAL) {
                return 'DECIMAL';
            }else if (this.identificador.tipoDato.getTipo() === DataType.BOOLEAN) {
                return 'BOOLEANO';
            }
    }
        catch (error) {
            console.log(error);
        }
    }
}
*/
/*
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Tipode extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        try {
            console.log("El tipo de dato es: " + this.identificador.tipoDato.getTipo);
            return this.identificador.tipoDato.getTipo();
        } catch (error) {
            console.log(error);
        }
    }
}

*/
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = __importStar(require("../Symbol/Type"));
class Tipode extends Instruccion_1.Instruccion {
    constructor(identificador, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }
    interpretar(arbol, tabla) {
        try {
            const tipoNumero = this.identificador.tipoDato.getTipo();
            const nombresTipos = {
                [Type_1.DataType.ENTERO]: "R_INT",
                [Type_1.DataType.DECIMAL]: "DOUBLE",
                [Type_1.DataType.CARACTER]: "CHAR",
                [Type_1.DataType.CADENA]: "CADENA",
                [Type_1.DataType.BOOLEAN]: "BOOL"
            };
            const tipoNombre = nombresTipos[tipoNumero]; // Conversión explícita a number
            console.log("El tipo de dato es: " + tipoNombre);
            return tipoNombre;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = Tipode;
