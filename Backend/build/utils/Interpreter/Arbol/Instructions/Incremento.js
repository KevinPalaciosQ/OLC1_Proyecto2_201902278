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
const Instruccion_1 = require("../Abstract/Instruccion");
const Symbol_1 = __importDefault(require("../Symbol/Symbol"));
const Type_1 = __importStar(require("../Symbol/Type"));
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
class Incremento extends Instruccion_1.Instruccion {
    constructor(identificador, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }
    interpretar(arbol, tabla) {
        let variable = tabla.getValor(this.identificador);
        if (variable instanceof Symbol_1.default) {
            let tipoVariable = variable.gettipo().getTipo();
            if (tipoVariable === Type_1.DataType.ENTERO || tipoVariable === Type_1.DataType.DECIMAL) {
                let valor = variable.getvalor();
                // Redondear el valor antes de incrementarlo
                const entero = Math.floor(valor); // Obtener la parte entera
                const decimal = valor - entero; // Obtener la parte decimal
                let valorAproximado;
                if (decimal >= 0.5) {
                    valorAproximado = entero + 1; // Aproximar al entero superior
                }
                else {
                    valorAproximado = entero; // Aproximar al número inferior
                }
                valorAproximado++; // Incrementar el valor
                tabla.setValor(this.identificador, new Symbol_1.default(variable.gettipo(), variable.getidentificador(), valorAproximado));
                return valorAproximado;
            }
            else {
                return console.log("Error en Semantico: No se puede incrementar la variable " + this.identificador + " porque su valor no es numérico.");
            }
        }
        else {
            return console.log("Error en Semantico: No se encontró la variable " + this.identificador);
        }
    }
}
exports.default = Incremento;
