"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataType = void 0;
class Type {
    constructor(tipo) {
        this.tipo = tipo;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
}
exports.default = Type;
var DataType;
(function (DataType) {
    DataType[DataType["ENTERO"] = 0] = "ENTERO";
    DataType[DataType["DECIMAL"] = 1] = "DECIMAL";
    DataType[DataType["CADENA"] = 2] = "CADENA";
    DataType[DataType["CARACTER"] = 3] = "CARACTER";
    DataType[DataType["BOOLEAN"] = 4] = "BOOLEAN";
    DataType[DataType["IDENTIFICADOR"] = 5] = "IDENTIFICADOR";
    DataType[DataType["INDEFINIDO"] = 6] = "INDEFINIDO";
    DataType[DataType["VOID"] = 7] = "VOID";
})(DataType || (exports.DataType = DataType = {}));
