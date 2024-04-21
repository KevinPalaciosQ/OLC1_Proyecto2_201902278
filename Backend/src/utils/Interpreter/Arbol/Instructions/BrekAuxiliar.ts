import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Break {
    constructor(linea: number, columna: number) {
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo, consola: string[]): null | string {
        return "break";
    }
}
