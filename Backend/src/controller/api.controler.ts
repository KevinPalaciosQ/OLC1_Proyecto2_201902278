import * as health from '../controller/health/ping'
import * as parser from '../controller/parser/parser'
import * as arbolast from "../controller/AST/Arbol_AST"
import * as getSymbol from '../controller/parser/parser'
export default {
    ...health,
    ...parser,
    ...arbolast,
    ...getSymbol
}