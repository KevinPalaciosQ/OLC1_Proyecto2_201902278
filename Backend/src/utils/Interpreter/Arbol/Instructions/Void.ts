import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, { DataType } from '../Symbol/Type';
import SymbolTable from '../Symbol/SymbolTable';
import cloneDeep from 'lodash/cloneDeep'; // copia datos y asigna a nuevas variables
import Simbolo from "../Symbol/Symbol";

export default class Void extends Instruccion {
    private listaInstrucciones: Instruccion[];
    private id: string;

    constructor(
        id: string,
        listaInstrucciones: Instruccion[],
        linea: number,
        columna: number,
    ) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.id = id;
        this.listaInstrucciones = listaInstrucciones;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        const tablaLocal = new SymbolTable(tabla);

        const instructionsToExec = cloneDeep(this.listaInstrucciones);
        for (let instruccion of instructionsToExec) {
            instruccion.interpretar(arbol, tablaLocal); // Interpretar cada instrucción individualmente
        }

        // Después de interpretar todas las instrucciones, asignar VOID al símbolo
 //       tabla.setValor(this.id, new Simbolo(DataType.VOID, this.id, null));
    }
}