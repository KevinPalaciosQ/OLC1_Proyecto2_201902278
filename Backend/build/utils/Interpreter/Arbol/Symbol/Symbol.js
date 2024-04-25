"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Symbol {
    constructor(tipo, identificador, valor) {
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor;
    }
    gettipo() {
        return this.tipo;
    }
    settipo(value) {
        this.tipo = value;
    }
    getidentificador() {
        return this.identificador;
    }
    setidentificador(value) {
        this.identificador = value;
    }
    getvalor() {
        return this.valor;
    }
    setvalor(value) {
        this.valor = value;
    }
    getDataTypo() {
        return this.tipo.getDataType();
    }
}
exports.default = Symbol;
