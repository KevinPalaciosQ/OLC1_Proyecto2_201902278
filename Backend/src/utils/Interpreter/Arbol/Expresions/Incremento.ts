
import { Instruccion } from "../Abstract/Instruccion";
import Three from "../Symbol/Three";
import SymbolTable from "../Symbol/SymbolTable";
import Type, { DataType } from "../Symbol/Type";

export default class Incremento extends Instruccion {
    private id: string;

    constructor(id: string, linea: number, columna: number) {
        super(new Type(DataType.INDEFINIDO), linea, columna);
        this.id = id;
    }

    public interpretar(arbol: Three, tabla: SymbolTable) {
        let variable = tabla.getValor(this.id);
        if (variable != null) {
            if (variable.getTipo() == DataType.ENTERO || variable.getTipo() == DataType.DECIMAL) {
                let valor = variable.getValor() + 1;
                tabla.setValor(this.id, valor);
                return valor;
            }
        } else {
            return "No se encontró la variable";
        }
    }

    public incrementarValor(arbol: Three, tabla: SymbolTable) {
        let variable = tabla.getValor(this.id);
        if (variable != null) {
            if (variable.getTipo() == DataType.ENTERO || variable.getTipo() == DataType.DECIMAL) {
                let valor = variable.getValor() + 1;
                tabla.setValor(this.id, valor);
                return valor;
            }
        } else {
            return "No se encontró la variable";
        }
    }
}
