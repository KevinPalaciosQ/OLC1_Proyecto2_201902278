import { Instruccion } from '../Abstract/Instruccion';
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import Type, { DataType } from '../Symbol/Type';
//import get from 'lodash/get';
export default class Nativo extends Instruccion {
    valor: any;//Valor del tipo de dato que se va a interpretar
  
    constructor(tipo: Type, valor: any, fila: number, columna: number) {
      super(tipo, fila, columna);
      this.valor = valor;
    }
  
    interpretar(arbol: Three, tabla: SymbolTable) {
      console.log(this.valor.toString());
      if(this.tipoDato.getTipo() === DataType.ENTERO){
          return this.valor;
      }else if(this.tipoDato.getTipo() === DataType.CADENA){
          return this.valor.toString().replace(/\\n/g,'\n').replace(/\\t/g,'\t').replace(/\'g/,"'").replace(/\\\\/g,'\\');   
      } //double a valor 
    }//char a .tostring

  }//boolean a valor 