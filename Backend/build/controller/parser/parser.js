"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSymbol = exports.parse = exports.listaSimbolos = exports.listaErrores = void 0;
const Error_1 = __importDefault(require("../../utils/Interpreter/Arbol/Exceptions/Error")); // Lista de Errores
const Three_1 = __importDefault(require("../../utils/Interpreter/Arbol/Symbol/Three"));
const SymbolTable_1 = __importDefault(require("../../utils/Interpreter/Arbol/Symbol/SymbolTable")); // Tabla de Símbolos
const Instruccion_1 = require("../../utils/Interpreter/Arbol/Abstract/Instruccion");
const GenerarAST_1 = __importDefault(require("../../utils/Interpreter/Arbol/GenerarAST"));
exports.listaErrores = [];
exports.listaSimbolos = [];
const parse = (req, res) => {
    exports.listaErrores = new Array();
    let parser = require('../../utils/Interpreter/Arbol/analizador');
    let parserast = require("../../utils/Interpreter/Arbol/AST");
    const { peticion } = req.body;
    var raiz = new GenerarAST_1.default();
    try {
        let ast = new Three_1.default(parser.parse(peticion));
        var tabla = new SymbolTable_1.default();
        tabla.creartablasimbolos();
        const tablaGlobal = tabla.getlistatablas();
        console.log(tabla.creartablasimbolos());
        raiz.recorrer_arbol(parserast.parse(peticion));
        ast.settablaGlobal(tabla);
        var arbol = raiz.cadena + "}";
        console.log(arbol);
        const tabladesimbolos = ast.gettablaGlobal();
        for (let i of ast.getinstrucciones()) {
            if (i instanceof Error_1.default) {
                exports.listaErrores.push(i);
                ast.actualizaConsola(i.returnError());
            }
            const listatabla = tabladesimbolos.getlistatablas();
            console.log("lista de tablas: " + listatabla);
            var resultador = i instanceof Instruccion_1.Instruccion ? i.interpretar(ast, tabla) : new Error_1.default("ERROR SEMANTICO", "no se puede ejecutrar la instruccion", 0, 0); //aca
            if (resultador instanceof Error_1.default) {
                exports.listaErrores.push(resultador);
                ast.actualizaConsola(resultador.returnError());
            }
        }
        res.json({ consola: ast.getconsola(), errores: exports.listaErrores, simbolos: tablaGlobal });
    }
    catch (err) {
        console.log(err);
        res.json({ consola: '', error: err, errores: exports.listaErrores, simbolos: [] });
    }
};
exports.parse = parse;
const getSymbol = (req, res) => {
    let tablasimbolos = require("../../utils/Interpreter/Arbol/Symbol/SymbolTable");
    tablasimbolos.creartablasimbolos();
};
exports.getSymbol = getSymbol;
