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
const Error_1 = __importDefault(require("../Exceptions/Error"));
const Type_1 = __importStar(require("../Symbol/Type"));
class Cout extends Instruccion_1.Instruccion {
    constructor(expresion, linea, columna, saltoextra) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna); //Para compilar tipos de dato
        this.expresion = expresion;
        this.saltoextra = saltoextra;
    }
    interpretar(arbol, tabla) {
        let valor = this.expresion.interpretar(arbol, tabla); //Obtener el valor de la expresion al interpretarlo 
        if (valor instanceof Error_1.default)
            return valor;
        if (this.saltoextra == "saltoextra") {
            valor = valor + '\n';
        }
        arbol.actualizaConsola(valor + '');
    }
}
exports.default = Cout;
