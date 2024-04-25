import { Response, Request } from "express";
import Error from "../../utils/Interpreter/Arbol/Exceptions/Error";
import GenerarAST from "../../utils/Interpreter/Arbol/GenerarAST";


export let listaErrores: Array<Error> = []

const fs = require('fs')

export const arbolast = (req: Request, res: Response): void => {
    let parserast = require('../../utils/Interpreter/Arbol/AST');
    const { peticion } = req.body;

    try{
        var raiz = new GenerarAST();
        raiz.recorrer_arbol(parserast.parse(peticion));
        var arbol = raiz.cadena + "}";
        console.log(arbol);
        res.json({ grafo: arbol});
    }catch(err){
        console.log(err)
        res.json({ consola: '', error: err, errores: listaErrores, simbolos: [] })
    }
}