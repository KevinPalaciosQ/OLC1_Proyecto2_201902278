"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limpieza = exports.concatenacionl = exports.obtenerVariable = exports.agregarVariable = void 0;
let variableIdentificador = [];
function agregarVariable(identificador) {
    variableIdentificador.push(identificador);
}
exports.agregarVariable = agregarVariable;
function obtenerVariable() {
    return variableIdentificador;
}
exports.obtenerVariable = obtenerVariable;
function concatenacionl(listita) {
    variableIdentificador = variableIdentificador.concat(listita);
}
exports.concatenacionl = concatenacionl;
function limpieza() {
    variableIdentificador = [];
}
exports.limpieza = limpieza;
