import { Response, Request } from "express";
import Errores from "../../utils/Interpreter/Arbol/Exceptions/Error"; // Lista de Errores
import Three from "../../utils/Interpreter/Arbol/Symbol/Three";
import SymbolTable from "../../utils/Interpreter/Arbol/Symbol/SymbolTable"; // Tabla de SÃmbolos
import { Instruccion } from "../../utils/Interpreter/Arbol/Abstract/Instruccion";
import GenerarAST from "../../utils/Interpreter/Arbol/GenerarAST";
export let listaErrores: Array<Errores> = [];
export let listaSimbolos=  [];
export const parse = (req: Request & unknown, res: Response): void => {
    listaErrores = new Array<Errores>();
    let parser = require('../../utils/Interpreter/Arbol/analizador');
    let parserast = require("../../utils/Interpreter/Arbol/AST");
    const { peticion } = req.body;
    var raiz = new GenerarAST();
    try {
        let ast = new Three(parser.parse(peticion));
        var tabla = new SymbolTable();
        tabla.creartablasimbolos();
        console.log(tabla.creartablasimbolos())
        raiz.recorrer_arbol(parserast.parse(peticion));
        ast.settablaGlobal(tabla);

        var arbol = raiz.cadena + "}";
        console.log(arbol);
        let tablan = ast.gettablaGlobal();





        for (let i of ast.getinstrucciones()) {
            if (i instanceof Errores) {
                listaErrores.push(i);
                ast.actualizaConsola((<Errores>i).returnError());

            }

            
         
           

            var resultador = i instanceof Instruccion ? i.interpretar(ast, tabla) : new Errores("ERROR SEMANTICO", "no se puede ejecutrar la instruccion", 0, 0); //aca
            if (resultador instanceof Errores) {
                listaErrores.push(resultador);
                ast.actualizaConsola((<Errores>resultador).returnError());
            }
        }
        let tablaSimb = tablan.getTablasimbolos();
        const listaSimbolos: { id: any, valorsito: string }[] = [];

        tablaSimb.forEach((ket, value) => {
            console.log(ket + " " + value)
            const objetoJson: { valorsito: string, id: any } = {
                id: value,
                valorsito: ket
               
            };
            listaSimbolos.push(objetoJson);
        });
        console.log(listaSimbolos);

        res.json({ consola: ast.getconsola(), errores: listaErrores, simbolos: listaSimbolos,ast:arbol });
    } catch (err) {
        console.log(err)
        res.json({ consola: '', error: err, errores: listaErrores, simbolos: [] });
    }
}

export const getSymbol = (req: Request & unknown, res: Response): void => {
    let tablasimbolos = require("../../utils/Interpreter/Arbol/Symbol/SymbolTable")
    tablasimbolos.creartablasimbolos();

}