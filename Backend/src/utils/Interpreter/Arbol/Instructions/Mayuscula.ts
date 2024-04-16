/*
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Decremento extends Instruccion {
    private identificador: string;

    constructor(identificador: string, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let variable = tabla.getValor(this.identificador);
        if (variable instanceof Simbolo) {
            let tipoVariable = variable.gettipo().getTipo();
            if (tipoVariable === DataType.CADENA || tipoVariable === DataType.CARACTER) {
                // Si es una cadena o caracter, devolver el valor en mayúsculas
                let valor = variable.getvalor();
                    return valor.toUpperCase();
            }
        } else {
            return "Error Semantico: No se puede convertir a mayúsculas la variable " + this.identificador + " porque su valor no es de tipo cadena o caracter";
        }
    }
}
*/
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";
/*
export default class Mayusculas extends Instruccion {
    private identificador: string;

    constructor(identificador: string, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let variable = tabla.getValor(this.identificador);
    
        if (variable instanceof Simbolo) {
            let tipoVariable = variable.gettipo().getTipo();
            if (tipoVariable === DataType.ENTERO || tipoVariable === DataType.DECIMAL) {
                let valor = variable.getvalor();
                valor++;
                tabla.setValor(this.identificador, new Simbolo(variable.gettipo(), variable.getidentificador(), valor));
                return valor;
            } else if (tipoVariable === DataType.CADENA || tipoVariable === DataType.CARACTER) {
                let valor = variable.getvalor();
                return valor.toUpperCase();
            } else {
                return console.log("Error Semántico: No se puede incrementar la variable " + this.identificador + " porque su valor no es numérico.");
            }
        } else {
            return console.log("Error Semántico: No se encontró la variable " + this.identificador);
        }
    }
    }
    */
    /*
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let errores: string[] = [];

        let variable = tabla.getValor(this.identificador);
        if (!(variable instanceof Simbolo)) {
            return [`Error Semantico: No se encontró la variable ${this.identificador}`];
        }

        let tipoVariable = variable.gettipo().getTipo();
        if (tipoVariable !== DataType.CADENA && tipoVariable !== DataType.CARACTER) {
            return [`Error Semantico: No se puede convertir a mayúsculas la variable ${this.identificador} porque su valor no es de tipo cadena o caracter`];
        }

        let valor = variable.getvalor();
        if (typeof valor !== 'string') {
            return [`Error Semantico: No se puede convertir a mayúsculas la variable ${this.identificador} porque su valor no es de tipo cadena o caracter`];
        }
        console.log("ESTE ES EL VALOR M"+valor);
        return String(valor.toUpperCase());
    }
}*/

/*
export default class Mayusculas extends Instruccion {
    private identificador: string;
    private lu: string;
    constructor(identificador: string, linea: number, columna: number, lu: string) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
        this.lu = lu;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let variable = tabla.getValor(this.identificador);
    
        if (!(variable instanceof Simbolo)) {
            return (`Error Semantico: No se encontró la variable ${this.identificador}`);
        }
    
        let valor = variable.getvalor();
        if (this.lu === "upper") {
            console.log("ESTE ES EL VALOR M" + valor);
            return (valor.toUpperCase());
        } else {
            return [valor];
        }
    }
}*/
/*
export default class Mayusculas extends Instruccion {
    private identificador: string;

    constructor(identificador: string, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let variable = tabla.getValor(this.identificador);
        console.log("VARIABLE", variable);
        if (variable instanceof Simbolo) {
            let tipoVariable = variable.gettipo().getTipo();
            if (tipoVariable === DataType.CADENA || tipoVariable === DataType.CARACTER) {
                let valor = variable.getvalor();
                valor = valor.toUpperCase(); // Asignar el resultado a la variable valor
                return valor;
            } 
        } else {
            throw new Error("Error Semántico: No se encontró la variable " + this.identificador);
        }
    }
}
*/
// -------------------------------------------------En la clase Mayusculas

/*
export default class Mayusculas extends Instruccion {
    private identificador: string;

    constructor(identificador: string, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let variable = tabla.getValor(this.identificador);
        console.log("VARIABLE", variable);
        if (variable instanceof Simbolo) {
            let tipoVariable = variable.gettipo().getTipo();
            if (tipoVariable === DataType.CADENA || tipoVariable === DataType.CARACTER) {
                let valor = variable.getvalor();
                let valorEnMayusculas = valor.toUpperCase(); // Convertir a mayúsculas
                variable.setvalor(valorEnMayusculas); // Actualizar el valor en la tabla de símbolos
                return valorEnMayusculas; // Devolver el valor en mayúsculas
            } 
        }
    }
}


*/
export default class Mayusculas extends Instruccion {
    
    private identificador: string;

    constructor(identificador: string, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let variable = tabla.getValor(this.identificador);
        console.log("VARIABLE", variable);
        if (variable instanceof Simbolo) {
            let tipoVariable = variable.gettipo().getTipo();
            if (tipoVariable === DataType.CADENA || tipoVariable === DataType.CARACTER) {
                let valor = variable.getvalor();
                
                valor = valor.toUpperCase();
                tabla.setValor(this.identificador, new Simbolo(variable.gettipo(), variable.getidentificador(), valor));
                return valor;
            } 
        }else{
            return "Error Semántico: No se encontró la variable " + this.identificador;
        }
    }
}
