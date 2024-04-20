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
    constructor(identificador, td, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
        this.td = td;
    }
    interpretar(arbol, tabla) {
        try {
            let valor = this.identificador.interpretar(arbol, tabla);
            let tipoDato = this.identificador.tipoDato.getTipo();
            let auxiliar = this.td.getTipo();
            console.log("auxiliar", auxiliar);
            console.log("td" + tipoDato);
            //console.log("valor"+valor)
            if (tipoDato === Type_1.DataType.ENTERO) {
                console.log("casteando entero");
                if (auxiliar === Type_1.DataType.DECIMAL) {
                    console.log("Casteo entero a decimal");
                    // int a double
                    return parseFloat(valor).toFixed(1);
                }
                else if (auxiliar === Type_1.DataType.CADENA) {
                    console.log("Casteo entero a cadena");
                    // int a string
                    return valor.toString();
                }
                else if (auxiliar === Type_1.DataType.CARACTER) {
                    console.log("Casteo entero a caracter");
                    // int a char
                    if (valor >= 0 && valor <= 255) {
                        valor = String.fromCharCode(valor);
                        return valor;
                    }
                    else {
                        throw new Error(`Error: El valor '${valor}' no se puede convertir a char`);
                    }
                }
            }
            else if (tipoDato === Type_1.DataType.DECIMAL) {
                if (auxiliar === Type_1.DataType.ENTERO) {
                    console.log("Cateo decimal a entero");
                    // double a int
                    return Math.round(valor);
                }
                else if (auxiliar === Type_1.DataType.CADENA) {
                    console.log("Casteo decimal a cadena");
                    // double a string
                    return valor.toString();
                }
            }
            else if (tipoDato === Type_1.DataType.CARACTER) {
                if (auxiliar === Type_1.DataType.ENTERO) {
                    console.log("Casteo caracter a entero");
                    // char a int
                    return valor.charCodeAt(0);
                }
                else if (auxiliar === Type_1.DataType.DECIMAL) {
                    console.log("Casteo caracter a decimal");
                    // char a double
                    let valorauxiliar = valor.charCodeAt(0);
                    return parseFloat(valorauxiliar).toFixed(1);
                }
            }
            else {
                return console.log("No se puede castear los tipos de datos erroneos");
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
}
exports.default = ToString;
