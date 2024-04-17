import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo,{DataType} from "../Symbol/Type";
export default class Break extends Instruccion{
    constructor(linea:number, columna:number){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        return this;
    }
}