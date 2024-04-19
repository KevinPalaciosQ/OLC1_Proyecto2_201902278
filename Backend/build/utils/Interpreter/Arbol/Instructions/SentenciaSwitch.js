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
class SentenciaSwitch extends Instruccion_1.Instruccion {
    constructor(condicion, listacasos, listainsdefault, fila, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), fila, columna);
        this.condicion = condicion;
        this.listacasos = listacasos;
        this.listainsdefault = listainsdefault;
    }
    interpretar(arbol, tabla) {
        let tablaLocal = new SymbolTable_1.default(tabla);
        let entrar = false;
        let breakint = false;
        for (let caso of this.listacasos) {
            console.log("entrando al switch");
            let condicionInterpretada = this.condicion.interpretar(arbol, tabla);
            let casoCondicionInterpretada = caso.condicion.interpretar(arbol, tabla);
            if (this.condicion.interpretar(arbol, tabla).type === caso.condicion.interpretar(arbol, tabla).type) {
                let condswitch = condicionInterpretada.value;
                let condcaso = casoCondicionInterpretada.value;
                if (condswitch === condcaso || entrar) {
                    entrar = true;
                    let ejecutar = caso.interpretar(arbol, tablaLocal);
                    if (ejecutar instanceof Break_1.default) {
                        breakint = true;
                        return ejecutar;
                    }
                }
            }
            else {
                console.log("Error semántico en switch: Los tipos de condición no coinciden");
                // Aquí puedes lanzar una excepción o manejar el error de otra manera
            }
        }
        //DEFAULT
        if (!breakint && this.listainsdefault !== undefined) {
            for (let i of this.listainsdefault) {
                let instrucciones1 = i.interpretar(arbol, tablaLocal);
                if (instrucciones1 instanceof Break_1.default) {
                    return instrucciones1;
                }
            }
        }
    }
}
exports.default = SentenciaSwitch;
