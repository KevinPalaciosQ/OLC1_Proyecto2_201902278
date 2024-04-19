"use strict";
/*
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";
import Break from "./Break";
import Continue from "./Continue";
import Return from "./Return";
export let bucle = false;
export default class SentenciaIf extends Instruccion {
    private condicion: Instruccion;//Operacion principal del if
    private listaInstrucciones: Instruccion [];//Lista de instrucciones del if
    private listaElseIf: Instruccion [] | undefined;//cada else if a if y convertido a arreglo
    private listaInsElse: Instruccion [] | undefined;

    constructor(
        condicion: Instruccion,
        listaInstrucciones: Instruccion[],
        listaElseIf: Instruccion[] | undefined, //listaelif
        listaInsElse: Instruccion[] | undefined,//listainstruccioneselse
        linea: number,
        columna: number
    ){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.condicion = condicion
        this.listaInstrucciones = listaInstrucciones
        this.listaElseIf = listaElseIf
        this.listaInsElse = listaInsElse
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
    let tablalocal = new tablaSimbolo(tabla);
    let condicion = this.condicion.interpretar(arbol, tabla);
    console.log("condicion if");
    console.log(condicion);
    if(condicion.tipo.getTipos() == DataType.BOOLEAN){
        if(condicion.value=true){
            for(let i of this.listaInstrucciones){
                let instrucciones1 = i.interpretar(arbol,tablalocal);
                if(instrucciones1 instanceof Break){
                    break;
                }else if(instrucciones1 instanceof Return){
                    return instrucciones1;
                }else if(instrucciones1 instanceof Continue){
                    return instrucciones1;
                }
            }
            }else{
                if(this.listaElseIf!=null){
                    for(let i of this.listaElseIf){
                        i.interpretar(arbol,tablalocal);
                    }
                }
                if(this.listaInsElse!=null){
                    for(let i of this.listaInsElse){
                        let instrucciones3 = i.interpretar(arbol,tablalocal);
                        if(instrucciones3 instanceof Break){
                            break;
                        }else if(instrucciones3 instanceof Return){
                            return instrucciones3;
                        }else if(instrucciones3 instanceof Continue){
                            return instrucciones3;
                        }
                    }
                }
            }
        }else{
            return console.log("Error en la condicion del if");
        }
    }
}
*/
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
exports.bucle = void 0;
/*2
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";
import Break from "./Break";
import Continue from "./Continue";
import Return from "./Return";

export let bucle = false;

export default class SentenciaIf extends Instruccion {
    private condicion: Instruccion;
    private listaInstrucciones: Instruccion [];
    private listaElseIf: Instruccion [] | undefined;
    private listaInsElse: Instruccion [] | undefined;

    constructor(
        condicion: Instruccion,
        listaInstrucciones: Instruccion[],
        listaElseIf: Instruccion[] | undefined,
        listaInsElse: Instruccion[] | undefined,
        linea: number,
        columna: number
    ) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.condicion = condicion;
        this.listaInstrucciones = listaInstrucciones;
        this.listaElseIf = listaElseIf;
        this.listaInsElse = listaInsElse;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let tablaLocal = new tablaSimbolo(tabla);
        let condicion = this.condicion.interpretar(arbol, tablaLocal);
        console.log("condicion if");
        console.log(condicion);
        
        if (typeof condicion === "boolean") {
            if (condicion === true) {
                for (let i of this.listaInstrucciones) {
                    let instruccion = i.interpretar(arbol, tablaLocal);
                    if (instruccion instanceof Break) {
                        break;
                    } else if (instruccion instanceof Return) {
                        return instruccion;
                    } else if (instruccion instanceof Continue) {
                        return instruccion;
                    }
                }
            } else {
                if (this.listaElseIf !== undefined) {
                    for (let i of this.listaElseIf) {
                        i.interpretar(arbol, tablaLocal);
                    }
                }
                if (this.listaInsElse !== undefined) {
                    for (let i of this.listaInsElse) {
                        let instruccion = i.interpretar(arbol, tablaLocal);
                        if (instruccion instanceof Break) {
                            break;
                        } else if (instruccion instanceof Return) {
                            return instruccion;
                        } else if (instruccion instanceof Continue) {
                            return instruccion;
                        }
                    }
                }
            }
        } else {
            console.log("Error en la condicion del if");
            // Si deseas salir de la función después de imprimir el error, simplemente regresa
            // return;
        }
    }
}
*/
const Instruccion_1 = require("../Abstract/Instruccion");
const SymbolTable_1 = __importDefault(require("../Symbol/SymbolTable"));
const Type_1 = __importStar(require("../Symbol/Type"));
const Break_1 = __importDefault(require("./Break"));
const Continue_1 = __importDefault(require("./Continue"));
const Return_1 = __importDefault(require("./Return"));
exports.bucle = false;
class SentenciaIf extends Instruccion_1.Instruccion {
    constructor(condicion, listaInstrucciones, listaElseIf, listaInsElse, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.condicion = condicion;
        this.listaInstrucciones = listaInstrucciones;
        this.listaElseIf = listaElseIf;
        this.listaInsElse = listaInsElse;
    }
    interpretar(arbol, tabla) {
        let tablaLocal = new SymbolTable_1.default(tabla);
        let condicion = this.condicion.interpretar(arbol, tablaLocal);
        //console.log("condicion if");
        //console.log(condicion);
        //console.log("La condición es :", condicion);
        if (typeof condicion === "boolean") {
            if (condicion === true) {
                console.log(condicion.valueOf());
                for (let i of this.listaInstrucciones) {
                    let instruccion = i.interpretar(arbol, tablaLocal);
                    if (instruccion instanceof Break_1.default) {
                        break;
                    }
                    else if (instruccion instanceof Return_1.default) {
                        return instruccion;
                    }
                    else if (instruccion instanceof Continue_1.default) {
                        return instruccion;
                    }
                }
            }
            else {
                if (this.listaElseIf !== undefined && this.listaElseIf !== null) {
                    for (let i of this.listaElseIf) {
                        i.interpretar(arbol, tablaLocal);
                    }
                }
                if (this.listaInsElse !== undefined && this.listaInsElse !== null) {
                    for (let i of this.listaInsElse) {
                        let instruccion = i.interpretar(arbol, tablaLocal);
                        if (instruccion instanceof Break_1.default) {
                            break;
                        }
                        else if (instruccion instanceof Return_1.default) {
                            return instruccion;
                        }
                        else if (instruccion instanceof Continue_1.default) {
                            return instruccion;
                        }
                    }
                }
            }
        }
        else {
            console.log("Error en la condicion del if");
            // Si deseas salir de la función después de imprimir el error, simplemente regresa
            // return;
        }
    }
}
exports.default = SentenciaIf;
