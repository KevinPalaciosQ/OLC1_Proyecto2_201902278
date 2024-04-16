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
class ToString extends Instruccion_1.Instruccion {
    constructor(identificador, linea, columna) {
        super(new Type_1.default(Type_1.DataType.CADENA), linea, columna);
        this.identificador = identificador;
    }
    interpretar(arbol, tabla) {
        try {
            let valor = this.identificador.interpretar(arbol, tabla);
            switch (this.identificador.tipoDato.getTipo()) {
                case Type_1.DataType.BOOLEAN:
                case Type_1.DataType.DECIMAL:
                case Type_1.DataType.ENTERO:
                    console.log("Tipo: " + typeof valor);
                    console.log("Valor: " + valor);
                    console.log("El tipo es: " + typeof valor);
                    return valor.toString();
                default:
                    console.log(`Error: El identificador "${this.identificador}" no es un booleano, decimal ni entero.`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = ToString;
