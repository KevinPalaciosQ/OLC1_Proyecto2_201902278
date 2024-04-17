import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Continue extends Instruccion {
    public exp: Instruccion | null; // Añadimos un tipo opcional
    constructor(exp: Instruccion | null, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.exp = exp; // Asignamos el valor del constructor a la propiedad exp
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (this.exp != null) {
            return this.exp.interpretar(arbol, tabla);
        } else {
            return this;
        }
    }
}
