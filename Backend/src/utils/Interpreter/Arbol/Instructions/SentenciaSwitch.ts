/*
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";
import Break from "./Break";
import Caso from "./Caso";

export default class SentenciaSwitch extends Instruccion {
    condicion: Instruccion;
    listacasos: Caso[];
    listainsdefault: Instruccion[] | undefined;
    listainstruccioneselse: Instruccion[] | undefined;

    constructor(condicion: Instruccion, listacasos: Caso[], listainsdefault: Instruccion[] | undefined, fila: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), fila, columna);
        this.condicion = condicion;
        this.listacasos = listacasos;
        this.listainsdefault = listainsdefault;
    }

interpretar(arbol: Arbol, tabla: tablaSimbolo) {
    let tablaLocal = new tablaSimbolo(tabla);
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
                let ejecutar: any = caso.interpretar(arbol, tablaLocal);
                
                if (ejecutar instanceof Break) {
                    breakint = true;
                    return ejecutar;
                }
            }
        } else {
            console.log("Error semántico en switch: Los tipos de condición no coinciden");
            // Aquí puedes lanzar una excepción o manejar el error de otra manera
        }
    }

    //DEFAULT
    if (!breakint && this.listainsdefault !== undefined) {
        for (let i of this.listainsdefault) {
            let instrucciones1 = i.interpretar(arbol, tablaLocal);
            if (instrucciones1 instanceof Break) {
                return instrucciones1;
            }
        }
    }
}
}*/

import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";
import Break from "./Break";
import Caso from "./Caso";

export default class SentenciaSwitch extends Instruccion {
    condicion: Instruccion;
    listacasos: Caso[];
    listainsdefault: Instruccion[] | undefined;
    listainstruccioneselse: Instruccion[] | undefined;

    constructor(condicion: Instruccion, listacasos: Caso[], listainsdefault: Instruccion[] | undefined, fila: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), fila, columna);
        this.condicion = condicion;
        this.listacasos = listacasos;
        this.listainsdefault = listainsdefault;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let tablaLocal = new tablaSimbolo(tabla);
        let condicion = this.condicion.interpretar(arbol, tablaLocal);
        if (typeof condicion === "string") {
            for (let caso of this.listacasos) {
                let casoCondicionInterpretada = caso.condicion.interpretar(arbol, tablaLocal);
                if (casoCondicionInterpretada === condicion) {
                    for (let instruccion of caso.instrucciones) {
                        let resultado = instruccion.interpretar(arbol, tablaLocal);
                        if (resultado instanceof Break) {
                            return null; // Si hay un break, salimos de la sentencia switch
                        }
                    }
                    return null; // Si se ejecutan las instrucciones de un caso, salimos de la sentencia switch
                }
            }
            // Si no se encuentra un caso coincidente, ejecutar las instrucciones en el default
            if (this.listainsdefault) {
                for (let instruccion of this.listainsdefault) {
                    let resultado = instruccion.interpretar(arbol, tablaLocal);
                    if (resultado instanceof Break) {
                        return null; // Si hay un break, salimos de la sentencia switch
                    }
                }
            }
        } else {
            console.log("Error: la condición del switch debe ser una cadena de texto.");
        }
        return null; // Si no se cumple ninguna condición, retornar null
    }
}

