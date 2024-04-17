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
const SymbolTable_1 = __importDefault(require("../Symbol/SymbolTable"));
const Type_1 = __importStar(require("../Symbol/Type"));
const Break_1 = __importDefault(require("./Break"));
const Continue_1 = __importDefault(require("./Continue"));
const Return_1 = __importDefault(require("./Return"));
class Else extends Instruccion_1.Instruccion {
    constructor(condicion, listaInstrucciones, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.condicion = condicion;
        this.listaInstrucciones = listaInstrucciones;
    } /*
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        console.log("ELSE");
        let tablaLocal = new tablaSimbolo(tabla);
        let condicion = this.condicion.interpretar(arbol, tablaLocal);
        if (condicion.tipo.getTipos() == DataType.BOOLEAN){
            console.log("estoy en else");
            if (condicion.value == true){
                for (let i of this.listaInstrucciones){
                    let instrucciones1 = i.interpretar(arbol, tablaLocal);
                    if (instrucciones1 instanceof Break){
                        break;
                    } else if (instrucciones1 instanceof Return){
                        return instrucciones1;
                    } else if (instrucciones1 instanceof Continue){
                        return instrucciones1;
                    }
                }
            }
        }else{
            return  console.log("Error en la condicion del else");
        }
    }
    */
    interpretar(arbol, tabla) {
        console.log("ELSE");
        let tablaLocal = new SymbolTable_1.default(tabla);
        let condicion = this.condicion.interpretar(arbol, tablaLocal);
        if (typeof condicion === "boolean") {
            console.log("estoy en else");
            if (condicion === true) {
                for (let i of this.listaInstrucciones) {
                    let instrucciones1 = i.interpretar(arbol, tablaLocal);
                    if (instrucciones1 instanceof Break_1.default) {
                        return; // Cambiado a "return" para salir del bucle
                    }
                    else if (instrucciones1 instanceof Return_1.default) {
                        return instrucciones1;
                    }
                    else if (instrucciones1 instanceof Continue_1.default) {
                        return instrucciones1;
                    }
                }
            }
        }
        else {
            console.log("Error en la condicion del else");
            // Si deseas salir de la función después de imprimir el error, simplemente regresa
            // return; 
        }
    }
}
exports.default = Else;
