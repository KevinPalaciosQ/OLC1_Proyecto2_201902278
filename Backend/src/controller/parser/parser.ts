/*
import { Response,Request } from "express";
const fs = require("fs")

export const parse = (req: Request & unknown, res: Response):void => {
    fs.readFile("./public/index.html",function(err:any,html:any){
        if(err){
            throw err
        }
        res.write(html)
        res.end()
    })    

}
*/
import { Response,Request } from "express";
import Errores from "../../utils/Interpreter/Arbol/Exceptions/Error";//Lista de Errores
import Three from "../../utils/Interpreter/Arbol/Symbol/Three";
import SymbolTable from "../../utils/Interpreter/Arbol/Symbol/SymbolTable";//Tabla de Símbolos 
export let listaErrores: Array<Errores> =[];
const fs = require("fs")
export const parse = (req: Request & unknown, res: Response):void => {
    listaErrores= new Array<Errores>();
    let parser = require('../../utils/Interpreter/Arbol/analizador');
    const { peticion } = req.body;
    try { 
        let ast = new Three(parser.parse(peticion));
        var tabla = new SymbolTable();
        ast.settablaGlobal(tabla);
        console.log(ast.getinstrucciones());
        for (let i of ast.getinstrucciones()) {
          if (i instanceof Errores) {
            listaErrores.push(i);
            ast.actualizaConsola((<Errores>i).returnError());
          }
          var resultador =  i.interpretar(ast, tabla);
          if (resultador instanceof Errores) {
            listaErrores.push(resultador);
            ast.actualizaConsola((<Errores>resultador).returnError());
          }        
        }      
        res.json({ consola: ast.getconsola(), errores: listaErrores, simbolos: [] });
      } catch (err) {
          console.log(err)
          res.json({ consola: '', error: err, errores: listaErrores, simbolos: [] });
      }
  }