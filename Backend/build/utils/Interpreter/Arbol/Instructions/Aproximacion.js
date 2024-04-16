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
class Aproximacion extends Instruccion_1.Instruccion {
    constructor(valor, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        // Obtener el tipo de la variable
        let tipoVariable = this.valor % 1 === 0 ? Type_1.DataType.ENTERO : Type_1.DataType.DECIMAL;
        // Verificar si es entero o decimal
        if (tipoVariable === Type_1.DataType.ENTERO || tipoVariable === Type_1.DataType.DECIMAL) {
            // Redondear el número según las reglas
            let redondeado;
            if (tipoVariable === Type_1.DataType.DECIMAL) {
                const entero = Math.floor(this.valor); // Obtener la parte entera
                const decimal = this.valor - entero; // Obtener la parte decimal
                // Redondear según las reglas
                if (decimal >= 0.5) {
                    redondeado = Math.ceil(this.valor); // Aproximar al entero superior
                }
                else {
                    redondeado = Math.floor(this.valor); // Aproximar al número inferior
                }
            }
            else {
                redondeado = this.valor; // Si es entero, no hace falta redondear
            }
            return redondeado;
        }
        else {
            return console.log("Error en Semántico: El valor proporcionado no es un número entero ni decimal.");
        }
    }
}
exports.default = Aproximacion;
