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
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = __importStar(require("../Symbol/Type"));
class Operadorternario extends Instruccion_1.Instruccion {
    constructor(condicion, verdadero, falso, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.condicion = condicion;
        this.verdadero = verdadero;
        this.falso = falso;
    }
    interpretar(arbol, tabla) {
        const condicion = this.condicion.interpretar(arbol, tabla);
        if (condicion.tipo.getTipos() == Type_1.DataType.BOOLEAN) {
            console.log(Type_1.default);
            if (condicion.value) {
                console.log("true" + this.verdadero.interpretar(arbol, tabla));
                return this.verdadero.interpretar(arbol, tabla);
            }
            else {
                console.log("false" + this.falso.interpretar(arbol, tabla));
                return this.falso.interpretar(arbol, tabla);
            }
        }
        else {
            console.log("a");
        }
    }
}
exports.default = Operadorternario;
/*
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class OperadorTernario extends Instruccion {
    private condicion: Instruccion;
    private verdadero: Instruccion;
    private falso: Instruccion;

    constructor(condicion: Instruccion, verdadero: Instruccion, falso: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.condicion = condicion;
        this.verdadero = verdadero;
        this.falso = falso;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        const condicion = this.condicion.interpretar(arbol, tabla);
        if (condicion.tipo.getTipos() === DataType.BOOLEAN) {
            return condicion.value ? this.verdadero.interpretar(arbol, tabla) : this.falso.interpretar(arbol, tabla);
        } else {
            console.error("La condición en el operador ternario no es booleana.");
            return null; // O devuelve un valor predeterminado
        }
    }
}
*/ 
