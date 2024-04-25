import { realpathSync } from 'fs';
import Simbolo from './Symbol';

export default class SymbolTable {
  private tablaAnterior: SymbolTable | any;
  private tablaActual: Map<String, Simbolo>;//Map es una Tabla Hash
  private tablasimbolos: Map<String, Simbolo>[] = [];//esto es nuevo

  constructor(anterior?: SymbolTable) {
    this.tablaAnterior = anterior;
    this.tablaActual = new Map<String, Simbolo>();
  }


  public getValor(id: String): any {
    let valor = this.tablaActual.get(id);
    if (!valor) {//si la tabla actual no es nula y se encuentra el valor
      let actual: SymbolTable = this.getAnterior();
      while (actual && !valor) {
        valor = actual.getTabla().get(id);//valor = actual.getValor(id);
        actual = actual.getAnterior();
      }
    }
    return valor;

  }



  public setValor(id: String, valor: Simbolo, declaration = true): any {//para declarar bloque interno dentro del if
    if (declaration) this.tablaActual.set(id, valor);//si es declaracion se hace un registro en la tabla actual
    else {//sino es una declaracion, esta es la nueva tabla actual 
      let actual: SymbolTable = this
      let oldValue = null
      while (actual) {
        if (actual.getValor(id)) {
          oldValue = actual.getTabla().get(id);
          actual.getTabla().delete(id);
          actual.getTabla().set(id, valor);
          break;
        }
        actual = actual.getAnterior();
      }
      if (!oldValue) console.log('Error la variable no existe')//Si el valor anterior nunca existio la variable que se trata de actualizar no existe
      this.tablasimbolos.push(new Map(this.tablaActual))//se guarda la tabla actual en la lista de tablas
    }
    return null;
  }

  public getAnterior() {
    return this.tablaAnterior;
  }
  public setAnterior(anterior: SymbolTable) {
    this.tablaAnterior = anterior;
  }
  public getTabla() {
    return this.tablaActual;
  }
  //Setea una nueva tabla
  public setTabla(Tabla: Map<String, Simbolo>) {
    this.tablaActual = Tabla;
  }
  //agregado para el manejo de variables
  public getValueByIdentifier(identifier: string): any {
    let symbol = this.getValor(identifier);
    if (!symbol) {
      throw new Error(`Error Semántico: No se encontró la variable ${identifier}`);
    }
    return symbol.tipoDato; // Devuelve el tipo de dato del símbolo
  }
  public creartablasimbolos() {
    this.tablaActual.forEach((value, key) => {
      console.log(`Key: ${key}, Value: ${value}`);
    });
  }


  public getTablasimbolos(): Map<String, any> {
    const tablaInterpretada = new Map<String, any>();

    this.tablaActual.forEach((value, key) => {
      //console.log(`Key: ${key}, Value: ${value.getvalor()}`);
      tablaInterpretada.set(key, value.getvalor()+","+value.getDataTypo()); // Suponiendo que getvalor() devuelve el valor interpretado
    })

    return tablaInterpretada;
  }


}