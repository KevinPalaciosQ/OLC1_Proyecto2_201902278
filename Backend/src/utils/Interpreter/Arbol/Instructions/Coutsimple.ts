import { Instruccion } from '../Abstract/Instruccion';
import Errores from '../Exceptions/Error';
import Operacion from "../Expresions/Native"
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import Type, { DataType } from '../Symbol/Type';

export default class Cout extends Instruccion {//implementando la interfaz de instruccion en esta clase 
  private expresion: Operacion;//Operacion->Instruccion

  constructor(expresion: Operacion, linea: number, columna: number) {//Operacion Nativa a Instruccion; Operacion->Instruccion
    super(new Type(DataType.INDEFINIDO), linea, columna);//Para compilar tipos de dato
    this.expresion = expresion;
  }

  public interpretar(arbol: Three, tabla: SymbolTable) {
    let valor = this.expresion.interpretar(arbol, tabla);//Obtener el valor de la expresion al interpretarlo 
    if (valor instanceof Errores) return valor;
    console.log(valor)
    arbol.actualizaConsola(valor + '');
  }
}