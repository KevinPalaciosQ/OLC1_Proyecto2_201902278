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
/*
import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';

import cloneDeep from 'lodash/cloneDeep';//copia datos y asigna a nuevas variables
import Continue from './Continue';
import Return from './Return';
import Break from './Break';
export default class Duwhile extends Instruccion {
    condicion: Instruccion;
    listainstrucciones: Instruccion[];
    constructor(condicion:Instruccion, listainstrucciones:Instruccion[], linea:number, columna:number){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.condicion = condicion;
        this.listainstrucciones = listainstrucciones;

    }
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let condiciontemp =true
        Continuacion: while(condiciontemp){
            let condicion = this.condicion.interpretar(arbol, tabla);
            if(condicion.type = DataType.BOOLEAN){
                console.log("entro al do-while")
                if(condicion.value===true){
                    const tablalocal = new tablaSimbolo(tabla);
                    for (let i of this.listainstrucciones){
                        let instrucciones = i.interpretar(arbol, tablalocal);
                        if(instrucciones instanceof Break){
                            break Continuacion;
                        }else if(instrucciones instanceof Return){
                            return instrucciones;
                        }else if(instrucciones instanceof Continue){
                            continue Continuacion;
                        }
                    }
                }
            }
        }
    }
}
*/
//----------------------con este estoy trabajando
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = __importStar(require("../Symbol/Type"));
const SymbolTable_1 = __importDefault(require("../Symbol/SymbolTable"));
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep")); // copia datos y asigna a nuevas variables
class Mientras extends Instruccion_1.Instruccion {
    constructor(operacion, listaInstrucciones, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.operacion = operacion;
        this.listaInstrucciones = listaInstrucciones;
    }
    interpretar(arbol, tabla) {
        const tablaLocal = new SymbolTable_1.default(tabla);
        do {
            const instructionsToExec = (0, cloneDeep_1.default)(this.listaInstrucciones);
            for (let i of instructionsToExec) {
                i.interpretar(arbol, tablaLocal);
            }
        } while ((0, cloneDeep_1.default)(this.operacion).interpretar(arbol, tablaLocal));
        return null;
    }
}
exports.default = Mientras;
/*reserva cpn break y continue
import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import SymbolTable from '../Symbol/SymbolTable';
import cloneDeep from 'lodash/cloneDeep'; // copia datos y asigna a nuevas variables

export default class Mientras extends Instruccion {
    private operacion: Instruccion;
    private listaInstrucciones: Instruccion[];

    constructor(
        operacion: Instruccion,
        listaInstrucciones: Instruccion[],
        linea: number,
        columna: number
    ){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.operacion = operacion
        this.listaInstrucciones = listaInstrucciones
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        const tablaLocal = new SymbolTable(tabla);
        do {
            const instructionsToExec = cloneDeep(this.listaInstrucciones);
            for (let i of instructionsToExec) {
                const result = i.interpretar(arbol, tablaLocal);
                if (result === 'break') {
                    return null; // Si hay un break, termina el bucle
                } else if (result === 'return') {
                    return result; // Si hay un return, devuelve el valor
                } else if (result === 'continue') {
                    break; // Si hay un continue, pasa a la siguiente iteración del bucle
                }
            }
        } while (cloneDeep(this.operacion).interpretar(arbol, tablaLocal));
        return null;
    }
}

*/ 
