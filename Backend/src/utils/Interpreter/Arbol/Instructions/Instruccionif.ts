import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import SymbolTable from '../Symbol/SymbolTable';

export default class If extends Instruccion {
    private operacionIf: Instruccion;//Operacion principal del if 
    private listaInstrucciones: Instruccion [];//Lista de instrucciones del if
    private listaElseIf: Instruccion [] | undefined;//cada else if a if y convertido a arreglo
    private listaInsElse: Instruccion [] | undefined;

    constructor(
        operacion: Instruccion, 
        listaInstrucciones: Instruccion[], 
        listaElseIf: Instruccion[] | undefined, 
        listaInsElse: Instruccion[] | undefined,
        linea: number, 
        columna: number
    ){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.operacionIf = operacion
        this.listaInstrucciones = listaInstrucciones
        this.listaElseIf = listaElseIf
        this.listaInsElse = listaInsElse
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        const condition = this.operacionIf.interpretar(arbol, tabla)
        if((condition)){
            console.log("estoy en if");
            console.log(this.listaInstrucciones)
            const tablaLocal = new SymbolTable(tabla)
            for(let i of this.listaInstrucciones){
                i.interpretar(arbol, tablaLocal)
            }
            return true
        }else{//revisando los else if
            if(this.listaElseIf){ 
                console.log(this.listaElseIf)
                for(let i of this.listaElseIf){
                    const operation = i.interpretar(arbol, tabla);
                    if(operation){
                        return false;
                    }
                }
            }
            if(this.listaInsElse){//si existe un else se crea un nuevo entorno 
                console.log(this.listaInsElse)
                const tablaLocal = new SymbolTable(tabla)
                for(let i of this.listaInsElse){
                    i.interpretar(arbol, tablaLocal)
                }
                return false
            }
        }
    }
}