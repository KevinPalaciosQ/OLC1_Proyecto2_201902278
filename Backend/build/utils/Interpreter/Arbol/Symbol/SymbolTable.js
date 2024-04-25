"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SymbolTable {
    constructor(anterior) {
        this.tablasimbolos = []; //esto es nuevo
        this.tablaAnterior = anterior;
        this.tablaActual = new Map();
        this.tablasimbolos = []; //esto es nuevo
    }
    getValor(id) {
        let valor = this.tablaActual.get(id);
        if (!valor) { //si la tabla actual no es nula y se encuentra el valor
            let actual = this.getAnterior();
            while (actual && !valor) {
                valor = actual.getTabla().get(id); //valor = actual.getValor(id);
                actual = actual.getAnterior();
            }
        }
        return valor;
    }
    setValor(id, valor, declaration = true) {
        if (declaration)
            this.tablaActual.set(id, valor); //si es declaracion se hace un registro en la tabla actual
        else { //sino es una declaracion, esta es la nueva tabla actual 
            let actual = this;
            let oldValue = null;
            while (actual) {
                if (actual.getValor(id)) {
                    oldValue = actual.getTabla().get(id);
                    actual.getTabla().delete(id);
                    actual.getTabla().set(id, valor);
                    break;
                }
                actual = actual.getAnterior();
            }
            if (!oldValue)
                console.log('Error la variable no existe'); //Si el valor anterior nunca existio la variable que se trata de actualizar no existe
            this.tablasimbolos.push(new Map(this.tablaActual)); //se guarda la tabla actual en la lista de tablas
        }
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
    //agregado para el manejo de variables
    getValueByIdentifier(identifier) {
        let symbol = this.getValor(identifier);
        if (!symbol) {
            throw new Error(`Error Semántico: No se encontró la variable ${identifier}`);
        }
        return symbol.tipoDato; // Devuelve el tipo de dato del símbolo
    }
    creartablasimbolos() {
        this.tablaActual.forEach((value, key) => {
            console.log(`Key: ${key}, Value: ${value}`);
        });
    }
    getlistatablas() {
        let tablax = []; // Explicitly declare the type as an array of strings
        this.tablaActual.forEach((value, key) => {
            console.log(`Key: ${key}, Value: ${value}`);
            tablax.push((`Key: ${key}, Value: ${value}`));
        });
        return tablax;
    }
}
exports.default = SymbolTable;
