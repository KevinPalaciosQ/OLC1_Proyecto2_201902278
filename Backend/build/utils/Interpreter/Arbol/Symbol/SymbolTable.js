"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SymbolTable {
    constructor(anterior) {
        this.tablaAnterior = anterior;
        this.tablaActual = new Map();
    }
    getValor(id) {
        let valor = this.tablaActual.get(id);
        if (!valor) {
            let actual = this.getAnterior();
            while (actual && !valor) {
                valor = actual.getTabla().get(id);
                actual = actual.getAnterior();
            }
        }
        return valor;
    }
    setValor(id, valor) {
        this.tablaActual.set(id, valor);
        //console.log(id+"="+this.tablaActual.get(id)?.getvalor());
        return null;
    }
    getAnterior() {
        return this.tablaAnterior;
    }
    setAnterior(anterior) {
        this.tablaAnterior = anterior;
    }
    getTabla() {
        return this.tablaActual;
    }
    //Setea una nueva tabla
    setTabla(Tabla) {
        this.tablaActual = Tabla;
    }
}
exports.default = SymbolTable;
