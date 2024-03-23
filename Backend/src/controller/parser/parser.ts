
//import parser from "../../utils/Interpreter/Arbol/analizador.jison";
/*
import parser from "Backend/src/utils/Interpreter/Arbol/analizador.jison";
let info: any[] = [];

const index = (req: any, res: any) => {
    res.status(200).json({ message: 'Bienvenido a mi API' });
}

const analizar = (req: any, res: any) => {
    const { entrada } = req.body;
    let resultado = parser.parse(entrada);
    info.push(resultado);
    res.status(200).json({
        message: 'Análisis Realizado',
        entrada: entrada,
        resultado: resultado
    });
}

const getdata = (req: any, res: any) => {
    res.status(200).json({ message: "Datos obtenidos", info: info });
}

export {
    index,
    analizar,
    getdata
}

*/
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
