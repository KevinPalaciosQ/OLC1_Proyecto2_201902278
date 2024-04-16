import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class ToString extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.CADENA), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        try {
            let valor = this.identificador.interpretar(arbol, tabla);
            switch (this.identificador.tipoDato.getTipo()) {
                case DataType.BOOLEAN:
                case DataType.DECIMAL:
                case DataType.ENTERO:
                    console.log("Tipo: " + typeof valor);
                    console.log("Valor: " + valor);
                    console.log("El tipo es: " + typeof valor);
                    return valor.toString();
                default:
                    console.log(`Error: El identificador "${this.identificador}" no es un booleano, decimal ni entero.`);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
