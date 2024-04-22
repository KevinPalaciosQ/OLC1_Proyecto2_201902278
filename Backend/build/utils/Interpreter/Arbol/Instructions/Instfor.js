"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = __importStar(require("../Symbol/Type"));
const SymbolTable_1 = __importDefault(require("../Symbol/SymbolTable"));
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep")); // Copia datos y asigna a nuevas variables
class For extends Instruccion_1.Instruccion {
    constructor(inicializacion, condicion, actualizacion, listaInstrucciones, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.inicializacion = inicializacion;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.listaInstrucciones = listaInstrucciones;
    }
    interpretar(arbol, tabla) {
        const tablaLocal = new SymbolTable_1.default(tabla);
        // Ejecutar la inicialización
        this.inicializacion.interpretar(arbol, tablaLocal);
        // Evaluar la condición
        while ((0, cloneDeep_1.default)(this.condicion).interpretar(arbol, tablaLocal)) {
            const instructionsToExec = (0, cloneDeep_1.default)(this.listaInstrucciones);
            // Ejecutar las instrucciones en el bloque del for
            for (let instruccion of instructionsToExec) {
                instruccion.interpretar(arbol, tablaLocal);
            }
            // Actualizar la variable de control
            this.actualizacion.interpretar(arbol, tablaLocal);
        }
        return null;
    }
}
exports.default = For;
