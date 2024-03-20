import * as health from '../controller/health/ping'
import * as parser from '../controller/parser/parser'
export default {
    ...health,
    ...parser
}