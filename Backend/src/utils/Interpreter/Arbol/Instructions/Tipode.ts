
/*1
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Tipode extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        try {
            console.log("El tipo de dato es: " + this.identificador.tipoDato.getTipo());
            // No se devuelve el resultado de interpretar, solo se muestra el tipo de dato
        } catch (error) {
            console.log(error);
        }
    }
}
*/
/*
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Tipode extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        try {
            if (this.identificador.tipoDato.getTipo() === DataType.CARACTER) {
                return 'CARACTER';
            } else if (this.identificador.tipoDato.getTipo() === DataType.CADENA) {
                return 'CADENA';
            } else if (this.identificador.tipoDato.getTipo() === DataType.CADENA) {
                return 'ENTERO';
            } else if (this.identificador.tipoDato.getTipo() === DataType.DECIMAL) {
                return 'DECIMAL';
            }else if (this.identificador.tipoDato.getTipo() === DataType.BOOLEAN) {
                return 'BOOLEANO';
            }
    }
        catch (error) {
            console.log(error);
        }
    }
}
*/
/*
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Tipode extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        try {
            console.log("El tipo de dato es: " + this.identificador.tipoDato.getTipo);
            return this.identificador.tipoDato.getTipo();
        } catch (error) {
            console.log(error);
        }
    }
}

*/
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Tipode extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        try {
            const tipoNumero = this.identificador.tipoDato.getTipo();
            const nombresTipos: { [key: number]: string } = {
                [DataType.ENTERO]: "R_INT",
                [DataType.DECIMAL]: "DOUBLE",
                [DataType.CARACTER]: "CHAR",
                [DataType.CADENA]: "CADENA",
                [DataType.BOOLEAN]: "BOOL"
            };

            const tipoNombre = nombresTipos[tipoNumero as number]; // Conversión explícita a number

            console.log("El tipo de dato es: " + tipoNombre);
            return tipoNombre;
        } catch (error) {
            console.log(error);
        }
    }
}

