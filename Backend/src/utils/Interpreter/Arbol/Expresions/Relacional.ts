import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';

export default class Relacional extends Instruccion {
  operacionIzq: Instruccion;
  operacionDer: Instruccion;
  tipo: tipoOp;
  

  constructor(tipo: tipoOp, opIzq: Instruccion, opDer: Instruccion, fila: number, columna: number) {
    super(new Tipo(DataType.INDEFINIDO), fila, columna);
    this.tipo = tipo;
    this.operacionIzq = opIzq;
    this.operacionDer = opDer;
  }

  interpretar(arbol: Arbol, tabla: tablaSimbolo) {
    const validTypesOperations = [DataType.ENTERO, DataType.DECIMAL]//tipos de datos permitidos para operaciones relacionales 

    let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
    let valueDer = this.operacionDer.interpretar(arbol, tabla);
    if(validTypesOperations.includes(this.operacionIzq.tipoDato.getTipo())
        && validTypesOperations.includes(this.operacionDer.tipoDato.getTipo())) {
        if(this.tipo===tipoOp.MAYOR){        
            this.tipoDato = new Tipo(DataType.BOOLEAN);
            return valueIzq > valueDer;
        }else if (this.tipo===tipoOp.MAYOR_IGUAL){
            this.tipoDato = new Tipo(DataType.BOOLEAN);
            return valueIzq >= valueDer;
        }else if (this.tipo===tipoOp.MENOR){
            this.tipoDato = new Tipo(DataType.BOOLEAN);
            return valueIzq < valueDer;
        }else if (this.tipo===tipoOp.MENOR_IGUAL){
            this.tipoDato = new Tipo(DataType.BOOLEAN);
            return valueIzq <= valueDer;
        }else if (this.tipo===tipoOp.IGUALACION){
            this.tipoDato = new Tipo(DataType.BOOLEAN);
            return valueIzq === valueDer;
        }else if (this.tipo===tipoOp.DIFERENCIACION){
            this.tipoDato = new Tipo(DataType.BOOLEAN);
            return valueIzq !== valueDer;
        }    
    }  else {
        return null;
    }
}  
}

export enum tipoOp{//LAS OPERACIONES RELACIONALES TRABAJAN; >, >=, <,<=, ==, !=
MAYOR, //>
MAYOR_IGUAL, //>=
MENOR, //<
MENOR_IGUAL, //<=
IGUALACION, //==
DIFERENCIACION //.!=
}


