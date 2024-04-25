
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
        //console.log("condicion if");
        //console.log(condicion);
        //console.log("La condición es :", condicion);
        if (typeof condicion === "boolean") {
            
            if (condicion === true) {
                console.log(condicion.valueOf());
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
                if (this.listaElseIf !== undefined && this.listaElseIf !== null) {
                    for (let i of this.listaElseIf) {
                        i.interpretar(arbol, tablaLocal);
                    }
                }
                if (this.listaInsElse !== undefined && this.listaInsElse !== null) {
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


