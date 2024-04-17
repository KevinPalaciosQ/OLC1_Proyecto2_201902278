import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";
import Break from "./Break";
import Continue from "./Continue";
import Return from "./Return";
export default class Else extends Instruccion{
    condicion:  Instruccion;
    listaInstrucciones: Instruccion[];
    constructor(condicion: Instruccion, listaInstrucciones: Instruccion[], linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.condicion = condicion;
        this.listaInstrucciones = listaInstrucciones;
    }/*
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
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        console.log("ELSE");
        let tablaLocal = new tablaSimbolo(tabla);
        let condicion = this.condicion.interpretar(arbol, tablaLocal);
        if (typeof condicion === "boolean") {
            console.log("estoy en else");
            if (condicion === true) {
                for (let i of this.listaInstrucciones) {
                    let instrucciones1 = i.interpretar(arbol, tablaLocal);
                    if (instrucciones1 instanceof Break) {
                        return; // Cambiado a "return" para salir del bucle
                    } else if (instrucciones1 instanceof Return) {
                        return instrucciones1;
                    } else if (instrucciones1 instanceof Continue) {
                        return instrucciones1;
                    }
                }
            }
        } else {
            console.log("Error en la condicion del else");
            // Si deseas salir de la función después de imprimir el error, simplemente regresa
            // return; 
        }
    }
      
}