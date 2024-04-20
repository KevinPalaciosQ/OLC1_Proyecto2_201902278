import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";
import Type from "../Symbol/Type";

export default class ToString extends Instruccion {
    private identificador: Instruccion;
    private td: Type;
    constructor(identificador: Instruccion ,td:Type,linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
        this.td = td;


    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        try {
            let valor = this.identificador.interpretar(arbol, tabla);
            let tipoDato = this.identificador.tipoDato.getTipo();
            let auxiliar = this.td.getTipo();
            console.log("auxiliar",auxiliar)
            console.log("td"+tipoDato)
            //console.log("valor"+valor)
            if (tipoDato===DataType.ENTERO){
                console.log("casteando entero")
                if (auxiliar===DataType.DECIMAL){
                    console.log("Casteo entero a decimal")
                    // int a double
                    return parseFloat(valor).toFixed(1);
                }else if (auxiliar===DataType.CADENA){
                    console.log("Casteo entero a cadena")
                    // int a string
                    return valor.toString();
                }else if(auxiliar===DataType.CARACTER){
                    console.log("Casteo entero a caracter")
                    // int a char
                    if (valor >= 0 && valor <= 255) {
                        valor = String.fromCharCode(valor);
                        return valor;
                    } else {
                        throw new Error(`Error: El valor '${valor}' no se puede convertir a char`);
                    }
                }
            }else if (tipoDato===DataType.DECIMAL){
                if(auxiliar===DataType.ENTERO){
                    console.log("Cateo decimal a entero")
                    // double a int
                    return Math.round(valor);
                }else if(auxiliar===DataType.CADENA){
                    console.log("Casteo decimal a cadena")
                    // double a string
                    return valor.toString();
                }
            }else if(tipoDato===DataType.CARACTER){
                if(auxiliar===DataType.ENTERO){
                    console.log("Casteo caracter a entero")
                    // char a int
                    return valor.charCodeAt(0);
                }else if(auxiliar===DataType.DECIMAL){
                    console.log("Casteo caracter a decimal")
                    // char a double
                    let valorauxiliar= valor.charCodeAt(0);
                    return parseFloat(valorauxiliar).toFixed(1);
                }
            }else{
                return console.log("No se puede castear los tipos de datos erroneos")
            }    
        } catch (error: any) {
            console.log(error.message);
        }
    }
}
