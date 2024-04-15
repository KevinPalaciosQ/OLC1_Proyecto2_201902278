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
class Decremento extends Instruccion_1.Instruccion {
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
                valor--;
                tabla.setValor(this.identificador, new Symbol_1.default(variable.gettipo(), variable.getidentificador(), valor));
                return valor;
            }
            else {
                return console.log("Error en Semantico: No se puede decrementar la variable " + this.identificador + " porque su valor no es numérico.");
            }
        }
    }
}
exports.default = Decremento;
