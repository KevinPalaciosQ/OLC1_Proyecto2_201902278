/*import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class TO extends Instruccion {
    operacionIzq: Instruccion;
    constructor(opIzq: Instruccion, opDer: Instruccion, fila: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), fila, columna);
        this.operacionIzq = opIzq;
        
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        // Obtener el tipo de dato del operando izquierdo
        const tipoIzq = this.operacionIzq.tipoDato.getTipo();

        // Validar el tipo de dato del operando izquierdo y retornarlo
        if (tipoIzq === DataType.ENTERO) {
            return DataType.ENTERO;
        } else if (tipoIzq === DataType.DECIMAL) {
            return DataType.DECIMAL;
        } else if (tipoIzq === DataType.BOOLEAN) {
            return DataType.BOOLEAN;
        } else if (tipoIzq === DataType.CARACTER) {
            return DataType.CARACTER;

        } else if (tipoIzq === DataType.CADENA) {
            return DataType.CADENA;   
        } else if (tipoIzq === DataType.IDENTIFICADOR) {
            return "IDENTIFICADOR";
        } else {
            // Si el tipo de dato no es ninguno de los esperados, retornar indefinido
            return DataType.INDEFINIDO;
        }
    }
}
*/
/*
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class TO extends Instruccion {
    operacionIzq: Instruccion;

    constructor(opIzq: Instruccion, fila: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), fila, columna);
        this.operacionIzq = opIzq;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        // Obtener el tipo de dato de la operación izquierda
        const tipoIzq = this.operacionIzq.interpretar(arbol, tabla);

        // Si el tipo de dato de la operación izquierda es un identificador, buscar su tipo en las reglas específicas
        if (tipoIzq === "IDENTIFICADOR") {
            // Realizar la comparación con las reglas específicas
            switch (this.operacionIzq.toString().trim()) {
                case "int":
                    return "INT";
                case "double":
                    return "DOUBLE";
                case "char":
                    return "CHAR";
                case "std::string":
                    return "CADENA";
                case "bool":
                    return "BOOL";
                default:
                    return DataType.INDEFINIDO; // Si no coincide con ninguna regla, devolver indefinido
            }
        }

        // Si el tipo de dato no es un identificador, devolver el tipo tal como está
        return tipoIzq;
    }
}
*/


/*
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class TO extends Instruccion {
    operacionIzq: Instruccion;

    constructor(opIzq: Instruccion, fila: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), fila, columna);
        this.operacionIzq = opIzq;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        // Obtener el valor de la operación izquierda
        const valorIzq = this.operacionIzq.interpretar(arbol, tabla);

        // Si el valor de la operación izquierda es un identificador, extraer el tipo de dato de la tabla de símbolos
        if (valorIzq === "IDENTIFICADOR") {
            // Obtener el nombre del identificador
            const nombreIdentificador = this.operacionIzq.toString().trim();
            // Buscar el tipo de dato correspondiente en la tabla de símbolos
            const simbolo = tabla.getValor(nombreIdentificador);
            if (simbolo) {
                // Si se encuentra el símbolo, devolver su tipo de dato
                return simbolo.tipoDato.getNombre(); // O simbolo.tipoDato.getTipo() si quieres devolver el DataType en lugar del nombre
            } else {
                // Si no se encuentra el símbolo, devolver indefinido
                return DataType.INDEFINIDO;
            }
        }

        // Si no es un identificador, devolver el valor tal como está
        return valorIzq;
    }
}
*/
/*
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class TO extends Instruccion {
    operacionIzq: Instruccion;

    constructor(opIzq: Instruccion, fila: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), fila, columna);
        this.operacionIzq = opIzq;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        // Obtener el valor de la operación izquierda
        const valorIzq = this.operacionIzq.interpretar(arbol, tabla);

        // Si el valor de la operación izquierda es un identificador, extraer el tipo de dato de la tabla de símbolos
        if (valorIzq === "IDENTIFICADOR") {
            // Obtener el nombre del identificador
            const nombreIdentificador = this.operacionIzq.toString().trim();
            // Buscar el tipo de dato correspondiente en la tabla de símbolos
            const simbolo = tabla.getValor(nombreIdentificador);
            if (simbolo) {
                // Si se encuentra el símbolo, devolver su tipo de dato
                return simbolo.tipoDato.getNombre(); // O simbolo.tipoDato.getTipo() si quieres devolver el DataType en lugar del nombre
            } else {
                // Si no se encuentra el símbolo, devolver indefinido
                return DataType.INDEFINIDO;
            }
        }

        // Si no es un identificador, devolver el valor tal como está
        return valorIzq;
    }
}
*/

import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";
/*
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
export default class Tipode extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        try {
            tabla.getTabla().forEach((valor, nombreIdentificador) => {
                console.log("El nombre es: " + nombreIdentificador );
                return nombreIdentificador;
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}
*/
export default class Tipode extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }
public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
    let nombreEncontrado = null;
    try {
        tabla.getTabla().forEach((valor, nombreIdentificador) => {
            //console.log("El nombre es: " + nombreIdentificador );
            nombreEncontrado = nombreIdentificador;
        });
    } catch (error) {
        console.log(error);
    }
    return nombreEncontrado;
}
}