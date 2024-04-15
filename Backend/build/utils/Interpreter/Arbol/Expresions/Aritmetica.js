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
exports.tipoOp = void 0;
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = __importStar(require("../Symbol/Type"));
class Aritmetico extends Instruccion_1.Instruccion {
    constructor(tipo, opIzq, opDer, fila, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), fila, columna);
        this.tipo = tipo;
        this.operacionIzq = opIzq;
        this.operacionDer = opDer;
    }
    interpretar(arbol, tabla) {
        if (this.tipo === tipoOp.SUMA) {
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return Number(valueIzq) + Number(valueDer);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valueIzq) + Number(valueDer)).toFixed(2);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.BOOLEAN) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valueIzq) + (valueDer ? 1 : 0));
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.BOOLEAN) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valueIzq) + (valueDer ? 1 : 0)).toFixed(2);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return Number(valueIzq) + valueDer.charCodeAt(0);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA); //aca estoy 
                return Number(valueIzq).toString() + valueDer;
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valueIzq) + Number(valueDer)).toFixed(2);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valueIzq) + Number(valueDer)).toFixed(2);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) { //revisando aca
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valueIzq) + valueDer.charCodeAt(0)).toFixed(2);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL); //aca estoy 
                return Number(valueIzq).toString() + valueDer;
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.BOOLEAN && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valueIzq) + Number(valueDer));
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.BOOLEAN && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valueIzq) + Number(valueDer)).toFixed(2);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.BOOLEAN && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return ((valueIzq) + valueDer).toString();
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return ((valueIzq).charCodeAt(0) + Number(valueDer));
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return ((valueIzq).charCodeAt(0) + Number(valueDer)).toFixed(2);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return ((valueIzq) + (valueDer)).toString();
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return ((valueIzq) + (valueDer)).toString();
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.CADENA && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return ((valueIzq) + (valueDer)).toString();
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.CADENA && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return ((valueIzq) + (valueDer)).toString();
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.CADENA && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return ((valueIzq) + (valueDer)).toString();
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.CADENA && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return ((valueIzq) + Number(valueDer).toFixed(2)).toString();
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.CADENA && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.BOOLEAN) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return ((valueIzq) + (valueDer)).toString();
            }
            else {
                // Manejar otras combinaciones de tipos aquí si es necesario
                return "error semantico";
            }
            //if resta
        }
        else if (this.tipo === tipoOp.RESTA) {
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return Number(valueIzq) - Number(valueDer);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valueIzq) - Number(valueDer)).toFixed(2);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valueIzq) - Number(valueDer)).toFixed(2);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valueIzq) - Number(valueDer)).toFixed(2);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return Number(valueIzq) - valueDer.charCodeAt(0);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valueIzq) - valueDer.charCodeAt(0)).toFixed(2);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.BOOLEAN) { //entero-boolean
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valueIzq) - Number(valueDer));
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.BOOLEAN) { //decimal-boolean
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valueIzq) - (valueDer ? 1 : 0)).toFixed(2);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (valueIzq.charCodeAt(0) - Number(valueDer));
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (valueIzq.charCodeAt(0) - Number(valueDer)).toFixed(2);
            }
            else {
                // Manejar otras combinaciones de tipos aquí si es necesario
                return NaN;
            }
        }
        else if (this.tipo === tipoOp.MULTIPLICACION) {
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return Number(valueIzq) * Number(valueDer);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valueIzq) * Number(valueDer)).toFixed(2);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valueIzq) * Number(valueDer)).toFixed(2);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valueIzq) * Number(valueDer)).toFixed(2);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (valueIzq.charCodeAt(0) * Number(valueDer));
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (valueIzq.charCodeAt(0) * Number(valueDer)).toFixed(2);
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) { //validando aca
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valueIzq) * valueDer.charCodeAt(0));
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) { //validando aca
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valueIzq) * valueDer.charCodeAt(0)).toFixed(2);
            }
            else {
                // Manejar otras combinaciones de tipos aquí si es necesario
                return NaN;
            }
        }
        else if (this.tipo === tipoOp.DIVISION) {
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            // Validar que el divisor sea diferente de cero
            if (valueDer !== 0) {
                if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                    this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                    return (Number(valueIzq) / Number(valueDer)).toFixed(2);
                }
                else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                    this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                    return (Number(valueIzq) / Number(valueDer)).toFixed(2);
                }
                else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                    this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                    return (Number(valueIzq) / valueDer.charCodeAt(0)).toFixed(2);
                }
                else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                    this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                    return (Number(valueIzq) / Number(valueDer)).toFixed(2);
                }
                else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                    this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                    return (Number(valueIzq) / Number(valueDer)).toFixed(2);
                }
                else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                    this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                    return (Number(valueIzq) / valueDer.charCodeAt(0)).toFixed(2);
                }
                else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                    this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                    // Convertir el carácter a su valor ASCII y luego realizar la división
                    return (valueIzq.charCodeAt(0) / Number(valueDer)).toFixed(2);
                }
                else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                    this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                    // Convertir el carácter a su valor ASCII y luego realizar la división
                    return (valueIzq.charCodeAt(0) / Number(valueDer)).toFixed(2);
                }
                else {
                    // Manejar otras combinaciones de tipos aquí si es necesario
                    return NaN;
                }
            }
            else {
                return "No se puede dividir entre cero";
            }
        }
        else if (this.tipo === tipoOp.POTENCIA) {
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                if (this.operacionDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                    this.tipoDato.setTipo(Type_1.DataType.DECIMAL); // Entero y decimal resulta en decimal
                    return Math.pow(Number(valueIzq), Number(valueDer)).toFixed(2);
                    ; // Realizamos la potencia
                }
                else if (this.operacionDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                    this.tipoDato.setTipo(Type_1.DataType.ENTERO); // Entero y entero resulta en entero
                    return Math.pow(Number(valueIzq), Number(valueDer)); // Realizamos la potencia
                }
            }
            else if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                if (this.operacionDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL || this.operacionDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                    this.tipoDato.setTipo(Type_1.DataType.DECIMAL); // Decimal y decimal o entero resulta en decimal
                    return Math.pow(Number(valueIzq), Number(valueDer)).toFixed(2);
                    ; // Realizamos la potencia
                }
            }
        }
        else if (this.tipo === tipoOp.MODULO) {
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            //console.log("modulo")
            if (valueDer !== 0) { // Validar que el divisor sea diferente de 0
                if (this.operacionIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO &&
                    this.operacionDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                    // Si ambos operandos son enteros
                    this.tipoDato.setTipo(Type_1.DataType.DECIMAL); // Establecer el tipo de dato del resultado como double
                    return (valueIzq % valueDer).toFixed(2); // Realizar el cálculo del módulo y devolver como double
                }
                else {
                    // Si al menos uno de los operandos es double
                    this.tipoDato.setTipo(Type_1.DataType.DECIMAL); // Establecer el tipo de dato del resultado como double
                    return (valueIzq % valueDer).toFixed(2); // Realizar el cálculo del módulo y devolver como double
                }
            }
        }
        else if (this.tipo === tipoOp.NEGACIONUNARIA) {
            const validTypesOperations = [Type_1.DataType.ENTERO, Type_1.DataType.DECIMAL];
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            // Verificar si el valor es numérico
            if (!isNaN(valueDer)) {
                if (validTypesOperations.includes(this.operacionDer.tipoDato.getTipo())) {
                    this.tipoDato.setTipo(this.operacionDer.tipoDato.getTipo());
                    // Verificar si el operando es un decimal
                    if (this.operacionDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                        return -valueDer.toFixed(2); // Devolver el valor negativo como decimal
                    }
                    else {
                        return -valueDer; // Devolver el valor negativo como entero
                    }
                }
                else {
                    // Devolver NaN si el tipo de dato no es admitido
                    return NaN;
                }
            }
            else {
                // Devolver NaN si el valor no es numérico
                return NaN;
            }
        }
    }
}
exports.default = Aritmetico;
var tipoOp;
(function (tipoOp) {
    tipoOp[tipoOp["SUMA"] = 0] = "SUMA";
    tipoOp[tipoOp["RESTA"] = 1] = "RESTA";
    tipoOp[tipoOp["DIVISION"] = 2] = "DIVISION";
    tipoOp[tipoOp["MULTIPLICACION"] = 3] = "MULTIPLICACION";
    tipoOp[tipoOp["POTENCIA"] = 4] = "POTENCIA";
    tipoOp[tipoOp["MODULO"] = 5] = "MODULO";
    tipoOp[tipoOp["NEGACIONUNARIA"] = 6] = "NEGACIONUNARIA";
})(tipoOp || (exports.tipoOp = tipoOp = {}));
