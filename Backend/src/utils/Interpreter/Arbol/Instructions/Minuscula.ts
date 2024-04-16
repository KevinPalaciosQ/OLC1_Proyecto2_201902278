import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Minuscula extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }
    
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        console.log("entró a minuscula")
        try {
            let valor = this.identificador.interpretar(arbol, tabla);
            if (typeof valor === 'string') {
                return valor.toLowerCase();
            } else {
                console.log(`Error: El identificador "${this.identificador}" no es una cadena.`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

