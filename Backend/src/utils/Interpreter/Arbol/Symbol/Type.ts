export default class Type{
    private tipo: DataType;
    constructor(tipo: DataType) {
      this.tipo = tipo;
    }
    public getTipo(): DataType {
      return this.tipo;
    }
    public setTipo(tipo: DataType): void {
      this.tipo = tipo;
    }
}
  
export enum DataType {
    ENTERO,   //1                 YA
    DECIMAL,// 2 Double           YA
    CADENA, //5                   YA
    CARACTER, //4
    BOOLEAN,//3                   YA
    IDENTIFICADOR,//              YA
    INDEFINIDO,
    VOID
}