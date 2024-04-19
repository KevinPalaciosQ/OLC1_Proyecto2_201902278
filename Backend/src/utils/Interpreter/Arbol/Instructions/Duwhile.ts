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
                i.interpretar(arbol, tablaLocal);
            }
        } while (cloneDeep(this.operacion).interpretar(arbol, tablaLocal));
        return null;
    }
}
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