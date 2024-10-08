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
const Type_1 = __importStar(require("../Symbol/Type"));
const get_1 = __importDefault(require("lodash/get"));
class Nativo extends Instruccion_1.Instruccion {
    constructor(tipo, valor, fila, columna) {
        super(tipo, fila, columna);
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        //console.log(this.valor.toString());
        if (this.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
            return this.valor;
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.CADENA) {
            return this.valor.toString().replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\'g/, "'").replace(/\\\\/g, '\\');
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.IDENTIFICADOR) {
            let value = tabla.getValor(this.valor);
            this.tipoDato = (0, get_1.default)(value, "tipo", new Type_1.default(Type_1.DataType.INDEFINIDO)); //CASTEANDO A ENTERO 
            //console.log(value);
            return (0, get_1.default)(value, 'valor');
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
            //console.log("El valor decimal es: "+this.valor);
            //return this.valor.toFixed(2);
            //return this.valor;
            return parseFloat(this.valor);
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.BOOLEAN) {
            if (this.valor === "true") {
                return true;
            }
            else {
                return false;
            }
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
            //console.log("soy un caracter")
            return this.valor.toString();
        }
    }
}
exports.default = Nativo;
//double a valor 
//char a .tostring
//boolean a valor
