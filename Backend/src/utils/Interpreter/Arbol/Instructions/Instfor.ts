import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, { DataType } from '../Symbol/Type';
import SymbolTable from '../Symbol/SymbolTable';
import cloneDeep from 'lodash/cloneDeep'; // Copia datos y asigna a nuevas variables

export default class For extends Instruccion {
    private inicializacion: Instruccion;
    private condicion: Instruccion;
    private actualizacion: Instruccion;
    private listaInstrucciones: Instruccion[];

    constructor(
        inicializacion: Instruccion,
        condicion: Instruccion,
        actualizacion: Instruccion,
        listaInstrucciones: Instruccion[],
        linea: number,
        columna: number
    ) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.inicializacion = inicializacion;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.listaInstrucciones = listaInstrucciones;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        const tablaLocal = new SymbolTable(tabla);

        // Ejecutar la inicialización
        this.inicializacion.interpretar(arbol, tablaLocal);

        // Evaluar la condición
        while (cloneDeep(this.condicion).interpretar(arbol, tablaLocal)) {
            const instructionsToExec = cloneDeep(this.listaInstrucciones);

            // Ejecutar las instrucciones en el bloque del for
            for (let instruccion of instructionsToExec) {
                instruccion.interpretar(arbol, tablaLocal);
            }

            // Actualizar la variable de control
            this.actualizacion.interpretar(arbol, tablaLocal);
        }

        return null;
    }
}
