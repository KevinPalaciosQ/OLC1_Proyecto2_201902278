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
    public getDataType(): String {
      switch (this.tipo) {
        case DataType.ENTERO:
          return "ENTERO";
        case DataType.DECIMAL:
          return "DECIMAL";
        case DataType.CADENA:
          return "CADENA";
        case DataType.CARACTER:
          return "CARACTER";
        case DataType.BOOLEAN:
          return "BOOLEAN";
        case DataType.IDENTIFICADOR:
          return "IDENTIFICADOR";
        case DataType.INDEFINIDO:
          return "INDEFINIDO";
        case DataType.VOID:
          return "VOID";
        default:
          return "TIPO NO DEFINIDO";
      }
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

