import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";
export default class Minuscula extends Instruccion {
    private identificador: string;

    constructor(identificador: string, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }
/*
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let variable = tabla.getValor(this.identificador);

        if (variable instanceof Simbolo) {
            let tipoVariable = variable.gettipo().getTipo();
            if (tipoVariable === DataType.CADENA|| tipoVariable === DataType.CARACTER) {
                let valor = variable.getvalor();
                let cadenaMayusculas = valor.toUpperCase();
                console.log(cadenaMayusculas);
                return cadenaMayusculas;
            } else {
                return console.log("Error en Semántico: No se puede convertir a mayúsculas la variable " + this.identificador + " porque no es una cadena.");
            }
        } else {
            return console.log("Error en Semántico: La variable " + this.identificador + " no está definida.");
        }
    }
}
*/
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        try{
           
            

        } catch (error) {
        }
    }
}