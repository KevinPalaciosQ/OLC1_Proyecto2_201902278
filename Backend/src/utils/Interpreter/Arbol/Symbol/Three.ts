import {Instruccion} from "../Abstract/Instruccion";
import Errores from "../Exceptions/Error";
import tablaSimbolo from "./SymbolTable";


export default class Three {
  private instrucciones: Array<Instruccion>;
  private errores: Array<Errores>;
  private consola: String;
  private tablaGlobal: tablaSimbolo;

  constructor(instrucciones: Array<Instruccion>) {
    this.instrucciones = instrucciones;
    this.consola = '';//consola inicializa en cadena vacia
    this.tablaGlobal = new tablaSimbolo();//tabla de simbolos nueva
    this.errores = new Array<Errores>();//tabla de errores vacia 
  }

  public getconsola(): String {//retornar impresiones de consola
    return this.consola;
  }
  public setconsola(value: String) {
    this.consola = value;
  }
  public actualizaConsola(uptodate: String) {//actualizar consola o agregar un nuevo dato
    this.consola = `${this.consola}${uptodate}\n`;
  }
  public getinstrucciones(): Array<Instruccion> {//Retorna arreglo de instrucciones
    return this.instrucciones;
  }
  public setinstrucciones(value: Array<Instruccion>) {//Retorna nuevo arreglo de Instrucciones
    this.instrucciones = value;
  }
  public getErrores(): Array<Errores> {
    return this.errores;
  }
  public seterrores(value: Array<Errores>) {
    this.errores = value;
  }
  public gettablaGlobal(): tablaSimbolo {
    return this.tablaGlobal;
  }
  public settablaGlobal(value: tablaSimbolo) {
    this.tablaGlobal = value;
  }

}