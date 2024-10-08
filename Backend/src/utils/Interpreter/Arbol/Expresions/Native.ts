import { Instruccion } from '../Abstract/Instruccion';
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import Type, { DataType } from '../Symbol/Type';
import get from 'lodash/get';
export default class Nativo extends Instruccion {
    valor: any;//Valor del tipo de dato que se va a interpretar
  
    constructor(tipo: Type, valor: any, fila: number, columna: number) {
      super(tipo, fila, columna);
      this.valor = valor;
    }
  
    interpretar(arbol: Three, tabla: SymbolTable) {
      //console.log(this.valor.toString());
      if(this.tipoDato.getTipo() === DataType.ENTERO){
          return this.valor;
      }else if(this.tipoDato.getTipo() === DataType.CADENA){
          return this.valor.toString().replace(/\\n/g,'\n').replace(/\\t/g,'\t').replace(/\'g/,"'").replace(/\\\\/g,'\\');   
      }else if(this.tipoDato.getTipo() === DataType.IDENTIFICADOR){
        let value = tabla.getValor(this.valor);
        this.tipoDato = get(value,"tipo",new Type(DataType.INDEFINIDO));//CASTEANDO A ENTERO 
        //console.log(value);
        return get(value, 'valor');
      }else if(this.tipoDato.getTipo() === DataType.DECIMAL){
        //console.log("El valor decimal es: "+this.valor);
        //return this.valor.toFixed(2);
        //return this.valor;
        return parseFloat(this.valor); 
      }else if (this.tipoDato.getTipo() === DataType.BOOLEAN){
        if (this.valor === "true"){
          return true;
        }else{
          return false;
        }

      }else if (this.tipoDato.getTipo() === DataType.CARACTER){
        //console.log("soy un caracter")
        return this.valor.toString();
      }
    }
  } 
  //double a valor 
  //char a .tostring
  //boolean a valor