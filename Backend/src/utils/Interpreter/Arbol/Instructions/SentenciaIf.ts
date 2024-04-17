import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";
import Break from "./Break";
import Continue from "./Continue";
import Return from "./Return";
export let bucle = false;
export default class SentenciaIf extends Instruccion {
    private condicion: Instruccion;//Operacion principal del if 
    private listaInstrucciones: Instruccion [];//Lista de instrucciones del if
    private listaElseIf: Instruccion [] | undefined;//cada else if a if y convertido a arreglo
    private listaInsElse: Instruccion [] | undefined;

    constructor(
        condicion: Instruccion, 
        listaInstrucciones: Instruccion[], 
        listaElseIf: Instruccion[] | undefined, //listaelif
        listaInsElse: Instruccion[] | undefined,//listainstruccioneselse
        linea: number, 
        columna: number
    ){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.condicion = condicion
        this.listaInstrucciones = listaInstrucciones
        this.listaElseIf = listaElseIf
        this.listaInsElse = listaInsElse
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
    let tablalocal = new tablaSimbolo(tabla);
    let condicion = this.condicion.interpretar(arbol, tabla);
    console.log(condicion);
    if(condicion.tipo.getTipos() == DataType.BOOLEAN){
        if(condicion.value=true){
            for(let i of this.listaInstrucciones){
                let instrucciones1 = i.interpretar(arbol,tablalocal);
                if(instrucciones1 instanceof Break){
                    break;
                }else if(instrucciones1 instanceof Return){
                    return instrucciones1;
                }else if(instrucciones1 instanceof Continue){
                    return instrucciones1;
                }    
            }
            }else{
                if(this.listaElseIf!=null){
                    for(let i of this.listaElseIf){
                        i.interpretar(arbol,tablalocal);
                    }
                }
                if(this.listaInsElse!=null){
                    for(let i of this.listaInsElse){
                        let instrucciones3 = i.interpretar(arbol,tablalocal);
                        if(instrucciones3 instanceof Break){
                            break;
                        }else if(instrucciones3 instanceof Return){
                            return instrucciones3;
                        }else if(instrucciones3 instanceof Continue){
                            return instrucciones3;
                        }
                    }
                }
            }
        }else{
            return console.log("Error en la condicion del if");
        }
    }
}
