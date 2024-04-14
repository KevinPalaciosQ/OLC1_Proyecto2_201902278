import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo,{DataType} from "../Symbol/Type";

export default class Aritmetico extends Instruccion {
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
          if(this.tipo===tipoOp.SUMA){
              let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
              let valueDer = this.operacionDer.interpretar(arbol, tabla);
              if(this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL){
                  if(this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL){
                      this.tipoDato.setTipo(DataType.DECIMAL);
                      return (Number(valueIzq)+Number(valueDer));
                  }else if(this.operacionDer.tipoDato.getTipo() === DataType.CADENA){
                      this.tipoDato.setTipo(DataType.CADENA);
                      return (`${valueIzq.toString()}${valueDer.toString()}`);
                  }
              }
          } else if(this.tipo===tipoOp.RESTA){    
              let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
              let valueDer = this.operacionDer.interpretar(arbol, tabla);
              if(this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO){
                  if(this.operacionDer.tipoDato.getTipo() === DataType.ENTERO){
                      this.tipoDato.setTipo(DataType.ENTERO);
                      return (Number(valueIzq)-Number(valueDer));
                  }
              }
          }else if (this.tipo===tipoOp.MULTIPLICACION){
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            if(this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO){
                if(this.operacionDer.tipoDato.getTipo() === DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO);
                    return (Number(valueIzq)*Number(valueDer));
                }
            }
          } else if (this.tipo===tipoOp.DIVISION){//validar que el hijo derecho sea diferente de 0, retornar no se puede dividir entre 0
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            if(this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO){
                if(this.operacionDer.tipoDato.getTipo() === DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO);
                    return (Number(valueIzq)/Number(valueDer));
                }
            }
          }else if (this.tipo === tipoOp.POTENCIA) {
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO) {
                if (this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL) {
                    this.tipoDato.setTipo(DataType.DECIMAL); // Entero y decimal resulta en decimal
                    return Math.pow(Number(valueIzq), Number(valueDer)).toFixed(2);; // Realizamos la potencia
                } else if (this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                    this.tipoDato.setTipo(DataType.ENTERO); // Entero y entero resulta en entero
                    return Math.pow(Number(valueIzq), Number(valueDer)); // Realizamos la potencia
                }
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL) {
                if (this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL || this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                    this.tipoDato.setTipo(DataType.DECIMAL); // Decimal y decimal o entero resulta en decimal
                    return Math.pow(Number(valueIzq), Number(valueDer)).toFixed(2);; // Realizamos la potencia
                }
            }
          }else if (this.tipo === tipoOp.MODULO) {
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            //console.log("modulo")
            if (valueDer !== 0) { // Validar que el divisor sea diferente de 0
                if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO &&
                    this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                    // Si ambos operandos son enteros
                    this.tipoDato.setTipo(DataType.DECIMAL); // Establecer el tipo de dato del resultado como double
                    return (valueIzq % valueDer).toFixed(2); // Realizar el cálculo del módulo y devolver como double
                } else {
                    // Si al menos uno de los operandos es double
                    this.tipoDato.setTipo(DataType.DECIMAL); // Establecer el tipo de dato del resultado como double
                    return (valueIzq % valueDer).toFixed(2); // Realizar el cálculo del módulo y devolver como double
                }
            }    
            }else if (this.tipo===tipoOp.NEGACIONUNARIA){
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            if(this.operacionDer.tipoDato.getTipo() === DataType.ENTERO){
                this.tipoDato.setTipo(DataType.ENTERO);
                return -Number(valueDer);
            }
          }return null;
    }
}
    export enum tipoOp{
      SUMA,
      RESTA,
      DIVISION,
      MULTIPLICACION,
      POTENCIA,
      MODULO,
      NEGACIONUNARIA
    }