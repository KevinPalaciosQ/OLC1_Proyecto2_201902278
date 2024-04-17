import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";
import Break from "./Break";
import Continue from "./Continue";
import Return from "./Return";

export default class Caso extends Instruccion {
    condicion: Instruccion;
    instrucciones: Instruccion[];
    constructor(condicion: Instruccion, instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let tablaLocal = new tablaSimbolo(tabla);
        for(let i of this.instrucciones){
            let instruccion = i.interpretar(arbol, tablaLocal);
            if(instruccion instanceof Break){
                break;
            }
        }
    }
}