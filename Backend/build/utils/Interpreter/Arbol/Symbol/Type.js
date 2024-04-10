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
    DataType[DataType["BOOLEAN"] = 3] = "BOOLEAN";
    DataType[DataType["IDENTIFICADOR"] = 4] = "IDENTIFICADOR";
    DataType[DataType["INDEFINIDO"] = 5] = "INDEFINIDO";
})(DataType || (exports.DataType = DataType = {}));
