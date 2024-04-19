
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo,{DataType} from "../Symbol/Type";
import { error } from "console";

export default class Operadorternario extends Instruccion{
    private condicion: Instruccion;
    private verdadero: Instruccion;
    private falso: Instruccion;

    constructor(condicion: Instruccion, verdadero: Instruccion, falso: Instruccion, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.condicion = condicion;
        this.verdadero = verdadero;
        this.falso = falso;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo){
        const condicion = this.condicion.interpretar(arbol, tabla);
        if(condicion.tipo.getTipos() == DataType.BOOLEAN){
            console.log(Tipo)
            if(condicion.value){
                console.log("true"+this.verdadero.interpretar(arbol, tabla))
                return this.verdadero.interpretar(arbol, tabla);
            }else{
                console.log("false"+this.falso.interpretar(arbol, tabla))
                return this.falso.interpretar(arbol, tabla);
                
            }
        }else{
        console.log("a")
        }
    }
}

/*
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class OperadorTernario extends Instruccion {
    private condicion: Instruccion;
    private verdadero: Instruccion;
    private falso: Instruccion;

    constructor(condicion: Instruccion, verdadero: Instruccion, falso: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.condicion = condicion;
        this.verdadero = verdadero;
        this.falso = falso;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        const condicion = this.condicion.interpretar(arbol, tabla);
        if (condicion.tipo.getTipos() === DataType.BOOLEAN) {
            return condicion.value ? this.verdadero.interpretar(arbol, tabla) : this.falso.interpretar(arbol, tabla);
        } else {
            console.error("La condición en el operador ternario no es booleana.");
            return null; // O devuelve un valor predeterminado
        }
    }
}
*/