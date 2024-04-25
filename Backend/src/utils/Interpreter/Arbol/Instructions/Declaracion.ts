import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Declaracion extends Instruccion {
    private id: String[]; // Recibe una lista
    private tipo: Tipo;
    private valor: Instruccion; // Valor guardado en la variable
    
    constructor(id: String[], tipo: Tipo, valor: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        for (let i = 0; i < this.id.length; i++) { 
            tabla.setValor(this.id[i], new Simbolo(this.tipo, this.id[i], this.valor.interpretar(arbol, tabla))); // Definir el tipo de dato que se mande sea igual al tipo definido
        }
        return null;
    }
}
