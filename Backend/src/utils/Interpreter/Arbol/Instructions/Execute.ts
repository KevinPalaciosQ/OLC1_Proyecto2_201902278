import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import Simbolo from '../Symbol/Symbol';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';

export class Execute extends Instruccion{
    constructor( linea: number, columna: number){
        super(new Tipo(DataType.VOID), linea, columna);
    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {


    }
}