import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import Simbolo from '../Symbol/Symbol';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';

export default class Asignacion extends Instruccion {
    private id: String[];
    private valor: Instruccion;

    constructor(id: String[], valor: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.id = id;
        this.valor = valor;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        for (let i = 0; i < this.id.length; i++) {
        const valorToAsign = this.valor.interpretar(arbol, tabla);
        tabla.setValor(this.id[i], new Simbolo(this.valor.tipoDato, this.id[i], valorToAsign), false);//en lugar de setear un campo lo asigna
        }
        return null;
    }
}