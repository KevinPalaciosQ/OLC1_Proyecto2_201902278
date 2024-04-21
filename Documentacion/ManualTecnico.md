# Manual  Técnico 🖥️
# Organización de Lenguajes y Compiladores 1

![](manualtecnico.jfif)
# Kevin Estuardo Palacios Quiñonez 
# 201902278
---
# Indice 
1. Introducción 

2. Objetivos

3. Diriido

4. Especificación Técnica

5. Lógica del Programa 

6. Créditos
---
# 1. Introducción 🤖
El programa de CompiScript+ se encarde de un IDE del lenguaje OLC que es un lenguaje de programación donde se usa la arquitectura de cliente servidor para poder interpretar el código ingresado por el usuario.
---
# 2. Objetivos ✨
El objetivo primordial de este manual es ayudar a los distintos programadores y aspirantes al conocimiento de las ciencias de la computación, así mismo del funcionamiento de los compiladores en su analisis léxico, sintáctico y semantico para la solución de problemas y desarollar nuevos lenguajes.
---
# 3. Dirigido 🤩
Este manual esta orientado a todos los distintos programadores interesados en el campo de las ciencias de la computación y el funcionamiento de los compiladores así mismo de conocer como funciona el análisis léxico y sintáctico en la estructura de nuevos lenguajes basados en la herramienta jison.
---
# 4. Especificación Técnica 😎
## 4.1 Requisitos de Hardware
- Computadora de Escritorio o Portatil.
- Mínimo 4 Gigas de Memoria RAM.
- 20 GB disponibles de Disco Duro.
- Procesador Core i3 o Superior.
- Procesador a 64 bits.
- Pantalla con Resolución Gráfica de 1024*768 píxeles.
## 4.2 Requisitos de Software
- Tener instalado Windows 10 o Superior.
- Tener instalado node js.
- Tener instalado react.
- Tener instalado Jison.
---
# 5. Lógica del Programa 👀
Lenguaje CompiScript+
Para conocer como esta constituido el lenguaje CompiScript, puede visualizar la parte de Análissi Léxico para poder entender la sintaxis del Lenguaje.
### Análisis Léxico
La siguiente tabla mostrará los siguientes tokens generados en el analizador léxico.
| Token          | Descripción       | Lexema        |
|----------------|-------------------|---------------|
| int            |PALABRA RESERVADA  | R_INT         |
| double         |PALABRA RESERVADA  | R_DOUBLE      |
| true           |PALABRA RESERVADA  |R_TRUE         |
| false          |PALABRA RESERVADA  |R_FALSE        |
| char           |PALABRA RESERVADA  |R_CHAR         |
| std::string    |PALABRA RESERVADA  |R_CADENA       |
| std::          |PALABRA RESERVADA  |CASTEO         |
| bool           |PALABRA RESERVADA  | R_BOOL        |
| ,              |PALABRA RESERVADA  |  COMA         |
| ==             |OPERADOR RELACIONAL| IGUALDAD      |
| =              |PALABRA RESERVADA  | IGUAL         |
| ;              |PALABRA RESERVADA  | PUNTOYCOMA    |
| :              |PALABRA RESERVADA  | DOSPUNTOS     |
| ?              |OPERADOR TERNARIO  |INTERROGACION  |
| (              |PALABRA RESERVADA  |PARABRE        |
| )              |PALABRA RESERVADA  |PARCIERRA      |
| {              |PALABRA RESERVADA  |LLAVEABRE      |             
| }              |PALABRA RESERVADA  |LLAVECIERRA    |             
| [              |PALABRA RESERVADA  |CORCHETECIERRA |             
| ]              |PALABRA RESERVADA  |CORCHETEABRE   |             
| new            |PALABRA RESERVADA  | NEW           |
| if             |PALABRA RESERVADA  | RESERVADAIF   |
| else           |PALABRA RESERVADA  |  RESELSE      |
| switch         |PALABRA RESERVADA  |SWITCH         |
| case           |PALABRA RESERVADA  |      CASE     |
| default        |PALABRA RESERVADA  |    RDEFAULT   |        
| while          |PALABRA RESERVADA  | RESERVADAWHILE|            
| for            |PALABRA RESERVADA  |         FOR   |        
| do             |PALABRA RESERVADA  |RDO            |             
| break          |PALABRA RESERVADA  | BREAK         |             
| continue       |PALABRA RESERVADA  | CONTINUE      |             
| return         |PALABRA RESERVADA  |RETURN         |             
| void           |PALABRA RESERVADA  | VOID          |             
| cout           |PALABRA RESERVADA  | COUT          |             
| endl           |PALABRA RESERVADA  |  ENDL         |             
| tolower        |PALABRA RESERVADA  | RTOLOWER      |             
| toupper        |PALABRA RESERVADA  |RTOUPPER       |             
| round          |PALABRA RESERVADA  |ROUND          |             
| length         |PALABRA RESERVADA  |LENGTH         |             
| typeof         |PALABRA RESERVADA  |TYPEOF         |             
| tostring       |PALABRA RESERVADA  |TOSTRING       |             
| c_str          |PALABRA RESERVADA  |C_STR          |             
| execute        |PALABRA RESERVADA  |EXECUTE        |             
| ++             |PALABRA RESERVADA  |INCREMENTO     |            
| +              |PALABRA RESERVADA  |MAS            |             
| --             |PALABRA RESERVADA  |DECREMENTO     |            
| -              |OPERADOR ARITMETICO|MENOS          |             
| *              |OPERADOR ARITMETICO|MULTIPLICACION |             
| /              |OPERADOR ARITMETICO|DIVISION       |             
| pow            |OPERADOR ARITMETICO|POTENCIA       |             
| %              |OPERADOR ARITMETICO|MODULO         |             
| !=             |OPERADOR RELACIONAL|DIFERENTE      |             
| <=             |OPERADOR RELACIONAL|MENORIGUAL     |             
| <<             |OPERADOR RELACIONAL|MDOBLE         |             
| <              |OPERADOR RELACIONAL|MENOR          |             
| >=             |OPERADOR RELACIONAL|MAYORIGUAL     |            
| >              |OPERADOR RELACIONAL|MAYOR          |             
| \|\|           | OPERADOR LOGICO   | OR            |
| &&             | OPERADOR LOGICO   | AND           |   
| !              | OPERADOR LOGICO   | NOT           |

La siguiente tabla muestra las expresiones regulares utilizadas  para obtener Tokens aceptados en el lenguaje CompiScript+
| Token                 | Expresión Regular                                  |Ejemplo                              |
|-----------------------|----------------------------------------------------|-------------------------------------|
| Comentario Multilinea |[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]                 |/* Este es un comentario multi linea |     
| Comentario Simple     |"//".*                                              |// Comentario Simple                 |
| Identificidaror       |[A-Za-z]+["_"0-9A-Za-z]*                            |Variable                             |
| Decimal               |[0-9]+"."[0-9]+                                     | 9.5                                 |
| Entero                |[0-9]+                                              | 5                                   |
| Cadena                |\"[^\"]*\"                                          |  "Hola Mundo"                       |
| Caracter              |\'(([^\"\'\\\\]{0,1}|\\\'|\\\"|\\n|\\r|\\t|\\\\))\' | 'A'                                 |
---
## 5.1 Creación del Backend y Frontend 
Se utilizó node js y React para el frontend, para su ejecución en consola se utilizaron los siguientes comandos:
```console
$ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>CREAR BACKEND<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
$ npm init -y
$ npm i --save-dev typescript ts-node nodemon
$ npx tsc --init
$ npm i --save express dotenv morgan cors body-parser config lodash jison
$ npm i --save-dev @types/express @types/cors @types/morgan @types/node @types/config @types/lodash copy rimraf
```
```console
$ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>CREAR FRONTEND<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
$ npx create-react-app frontend
$ cd frontend
$ npm start
$ npm run build

$ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>INSTALAR JISON<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
$ npm i jision 
$ npm i --save-dev
```
## 5.2 Funcionamiento del Backend

## Parser.ts
```typescript
import { Response, Request } from "express";
import Errores from "../../utils/Interpreter/Arbol/Exceptions/Error"; // Lista de Errores
import Three from "../../utils/Interpreter/Arbol/Symbol/Three";
import SymbolTable from "../../utils/Interpreter/Arbol/Symbol/SymbolTable"; // Tabla de Símbolos
import { Instruccion } from "../../utils/Interpreter/Arbol/Abstract/Instruccion";

// Array para almacenar errores
export let listaErrores: Array<Errores> = [];

// Función para manejar la solicitud de parseo
export const parse = (req: Request & unknown, res: Response): void => {
    // Limpiar la lista de errores antes de comenzar el análisis
    listaErrores = new Array<Errores>();

    // Requiere el parser para analizar la petición
    let parser = require('../../utils/Interpreter/Arbol/analizador');
    const { peticion } = req.body;

    try {
        // Crear un árbol sintáctico abstracto (AST) con el resultado del análisis
        let ast = new Three(parser.parse(peticion));
        
        // Crear una tabla de símbolos global
        var tabla = new SymbolTable();
        ast.settablaGlobal(tabla);

        // Iterar sobre las instrucciones del AST
        for (let i of ast.getinstrucciones()) {
            if (i instanceof Errores) {
                // Si la instrucción es un error, añadirlo a la lista de errores y actualizar la consola del AST
                listaErrores.push(i);
                ast.actualizaConsola((<Errores>i).returnError());
            }

            // Interpretar la instrucción y obtener el resultado
            var resultado = i instanceof Instruccion ? i.interpretar(ast, tabla) : new Errores("ERROR SEMANTICO", "no se puede ejecutrar la instruccion", 0, 0);
            
            // Si el resultado es un error, añadirlo a la lista de errores y actualizar la consola del AST
            if (resultado instanceof Errores) {
                listaErrores.push(resultado);
                ast.actualizaConsola((<Errores>resultado).returnError());
            }
        }

        // Enviar respuesta JSON con la consola, errores y símbolos generados durante el análisis
        res.json({ consola: ast.getconsola(), errores: listaErrores, simbolos: [] });
    } catch (err) {
        // Capturar cualquier error y enviar una respuesta JSON con información de error
        console.log(err);
        res.json({ consola: '', error: err, errores: listaErrores, simbolos: [] });
    }
}
```
El código en parser.ts se encarga de ralizar las solicitudes para el casteo del analizador utilizando Node.js, y se encarga también de :

- Importa los módulos `Response` y `Request` de Express, así como otros módulos necesarios.
- Define una función `parse` que toma una solicitud y una respuesta como parámetros.
- Dentro de la función `parse`, se realiza el análisis sintáctico de una petición utilizando un parser específico.
- Se crea un árbol sintáctico abstracto (AST) a partir del resultado del análisis.
- Se crea una tabla de símbolos global y se asigna al AST.
- Se recorren las instrucciones del AST, interpretándolas y manejando cualquier error que pueda ocurrir.
- Se envía una respuesta JSON que incluye la consola generada durante el análisis, los errores encontrados y los símbolos generados.

## Server.ts 
```typescript
import dotenv from 'dotenv';
import { application } from 'express';
import { PORT } from "./utils/enviroments"; // Se asume que esto es un archivo donde se define el puerto
import appServer from "./app"; // Se asume que esto es un archivo que exporta la aplicación Express

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Inicia el servidor de la aplicación
appServer()
    .then((app: typeof application) => {
        // Inicia el servidor Express en el puerto especificado
        app.listen(PORT, () => {
            console.log(`Server Ready on PORT ${PORT} ${process.env.NODE_ENV}`);
        });
    })
    .catch((err: Partial<Error> & unknown) => console.log(err));
```

El código de Prser.ts inicia un servidor de aplicación Express utilizando un archivo `.env` para cargar las variables de entorno y el puerto especificado en un archivo `enviroments.ts`.

Aquí está lo que hace:

- Importa `dotenv` para cargar las variables de entorno desde un archivo `.env`.
- Importa `application` de Express y `PORT` del archivo `enviroments.ts`.
- Carga las variables de entorno utilizando `dotenv.config()`.
- Inicia el servidor de la aplicación llamando a `appServer()`.
- Cuando la promesa se resuelve, inicia el servidor Express en el puerto especificado utilizando `app.listen()`.
- Imprime un mensaje en la consola indicando que el servidor está listo y en qué puerto se está ejecutando, junto con el entorno de Node.js (`process.env.NODE_ENV`).
- Si se produce un error durante el inicio del servidor, se captura y se imprime en la consola.

## Instruccion.ts

```Typescript

import Arbol from "../Symbol/Three"
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo from '../Symbol/Type';

export abstract class Instruccion {
  public tipoDato: Tipo;
  public linea: number;
  public columna: number;

  constructor(tipo: Tipo, linea: number, columna: number) {
    this.tipoDato = tipo;
    this.linea = linea;
    this.columna = columna;
  }

  abstract interpretar(arbol: Arbol, tabla: tablaSimbolo): any;
}
```
Esta clase define una instrucción abstracta que puede ser interpretada en un árbol de syntax trees y en una tabla de símbolos, y que tiene un tipo de dato, una línea y una columna associadas. Las clases hijas deben implementar el método interpretar para interpretar la instrucción en el contexto del árbol de syntax trees y la tabla de símbolos.

## Error.ts
```Typescript
export default class Error {
    private tipoError: String;//lexico o sintactico 
    private desc: String;
    private fila: number;
    private columna: number;
    public getDesc(): String {
      return this.desc;
    }
    public getTipoError(): String {
      return this.tipoError;
    }
    public getcolumna(): number {
      return this.columna;
    }
    public getFila(): number {
      return this.fila;
    }
    constructor(tipo: String, desc: String, fila: number, columna: number) {
      this.tipoError = tipo;
      this.desc = desc;
      this.fila = fila;
      this.columna = columna;
    }
    public returnError(): String {
      return (
        'Se obtuvo: ' +
        this.tipoError +
        ' desc:{' +
        this.desc +
        '} en la fila: ' +
        this.fila +
        ' en la columna: ' +
        this.columna +
        '\n'
      );
    }
  }
```
Esta clase representa un error léxico o sintáctico que se ha producido durante el análisis de un código fuente, y proporciona información sobre el tipo de error, la descripción del error, y la fila y columna en la que se ha producido el error.
## Symbol.ts
```Typescript
import Tipo from './Type';

export default class Symbol {
  private tipo: Tipo;
  private identificador: String;
  private valor: any;

  constructor(tipo: Tipo, identificador: String, valor?: any) {
    this.tipo = tipo;
    this.identificador = identificador;
    this.valor = valor;
  }
  public gettipo(): Tipo {
    return this.tipo;
  }
  public settipo(value: Tipo) {
    this.tipo = value;
  }
  public getidentificador(): String {
    return this.identificador;
  }
  public setidentificador(value: String) {
    this.identificador = value;
  }
  public getvalor(): any {
    return this.valor;
  }
  public setvalor(value: any) {
    this.valor = value;
  }
}
```
Esta clase representa un símbolo en una tabla de símbolos, y proporciona información sobre el tipo de dato del símbolo, el identificador del símbolo, y el valor del símbolo. También proporciona métodos para establecer y obtener estos valores.

## SymbolTable.js
```Typescript
import Simbolo from './Symbol';

export default class SymbolTable {
  private tablaAnterior: SymbolTable | any;
  private tablaActual: Map<String, Simbolo>;//Map es una Tabla Hash

  constructor(anterior?: SymbolTable) {
    this.tablaAnterior = anterior;
    this.tablaActual = new Map<String, Simbolo>();
  }

  public getValor(id: String): any{
    let valor = this.tablaActual.get(id);
    if(!valor) {//si la tabla actual no es nula y se encuentra el valor
      let actual: SymbolTable = this.getAnterior();
      while(actual && !valor){
        valor = actual.getTabla().get(id);//valor = actual.getValor(id);
        actual = actual.getAnterior();
      }
    }
    return valor;
  }

  public setValor(id: String, valor: Simbolo,declaration=true): any{//para declarar bloque interno dentro del if
    if(declaration) this.tablaActual.set(id, valor);//si es declaracion se hace un registro en la tabla actual
    else {//sino es una declaracion, esta es la nueva tabla actual 
      let actual: SymbolTable = this
      let oldValue = null
      while(actual){
        if(actual.getValor(id)){
          oldValue = actual.getTabla().get(id);
          actual.getTabla().delete(id);
          actual.getTabla().set(id, valor);
          break;
        }
        actual = actual.getAnterior();
      }
      if(!oldValue) console.log('Error la variable no existe')//Si el valor anterior nunca existio la variable que se trata de actualizar no existe
    }  
    return null;
  }
  
  public getAnterior() {
    return this.tablaAnterior;
  }
  public setAnterior(anterior: SymbolTable) {
    this.tablaAnterior = anterior;
  }
  public getTabla() {
    return this.tablaActual;
  }
  //Setea una nueva tabla
  public setTabla(Tabla: Map<String, Simbolo>) {
    this.tablaActual = Tabla;
  }
```
La clase SymbolTable utiliza la clase Map para representar la tabla de símbolos actual. La clase Map es una clase incorporada en TypeScript que representa una colección de pares clave-valor. La clase Map tiene varios métodos, como get(), set(), delete(), etc.

## Type.ts
```Typescript
export default class Type{
    private tipo: DataType;
    constructor(tipo: DataType) {
      this.tipo = tipo;
    }
    public getTipo(): DataType {
      return this.tipo;
    }
    public setTipo(tipo: DataType): void {
      this.tipo = tipo;
    }
}
  
export enum DataType {
    ENTERO,  
    DECIMAL,
    CADENA, 
    CARACTER, 
    BOOLEAN,
    IDENTIFICADOR,
    INDEFINIDO
}
```
La clase DataType es un enum que define los tipos de datos soportados por el lenguaje:

    ENTERO: representa un entero.
    DECIMAL: representa un número decimal.
    CADENA: representa una cadena de texto.
    CARACTER: representa un carácter individual.
    BOOLEAN: representa un valor booleano (verdadero o falso).
    IDENTIFICADOR: representa un identificador (por ejemplo, el nombre de una variable).
    INDEFINIDO: representa un valor indefinido.

El enum DataType se exporta utilizando la palabra clave export, lo que significa que puede ser importado desde otros módulos de TypeScript.
## Aritmetica.ts
```Typescript
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo,{DataType} from "../Symbol/Type";

export default class Aritmetico extends Instruccion {
    operacionIzq: Instruccion;
    operacionDer: Instruccion;
    tipo: tipoOp;
    
    constructor(tipo: tipoOp, opIzq: Instruccion, opDer: Instruccion, fila: number, columna: number) {
      super(new Tipo(DataType.INDEFINIDO), fila, columna);
      this.tipo = tipo;
      this.operacionIzq = opIzq;
      this.operacionDer = opDer;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (this.tipo === tipoOp.SUMA) {    
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            
            if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return Number(valueIzq) + Number(valueDer);
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valueIzq) + Number(valueDer)).toFixed(2);
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === DataType.BOOLEAN) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valueIzq) + (valueDer ? 1 : 0));
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === DataType.BOOLEAN) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valueIzq) + (valueDer ? 1 : 0)).toFixed(2);
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === DataType.CARACTER) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return Number(valueIzq) +valueDer.charCodeAt(0);
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === DataType.CADENA) {
                this.tipoDato.setTipo(DataType.CADENA);//aca estoy 
                return Number(valueIzq).toString() + valueDer;
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valueIzq) + Number(valueDer)).toFixed(2);
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valueIzq) + Number(valueDer)).toFixed(2);
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === DataType.CARACTER) {//revisando aca
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valueIzq) +valueDer.charCodeAt(0)).toFixed(2);
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === DataType.CADENA) {
                this.tipoDato.setTipo(DataType.CADENA);//aca estoy 
                return Number(valueIzq).toString() + valueDer;
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.BOOLEAN && this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return ((valueIzq ? 1 : 0) + Number(valueDer));
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.BOOLEAN && this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return ((valueIzq ? 1 : 0)  + Number(valueDer)).toFixed(2);
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.BOOLEAN && this.operacionDer.tipoDato.getTipo() === DataType.CADENA) {
                this.tipoDato.setTipo(DataType.CADENA);
                return ((valueIzq) + valueDer).toString();
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return ((valueIzq).charCodeAt(0) + Number(valueDer));
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return ((valueIzq).charCodeAt(0) + Number(valueDer)).toFixed(2);
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === DataType.CARACTER) {
                this.tipoDato.setTipo(DataType.CADENA);
                return ((valueIzq)+(valueDer)).toString();
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === DataType.CADENA) {
                this.tipoDato.setTipo(DataType.CADENA);
                return ((valueIzq)+(valueDer)).toString();
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.CADENA && this.operacionDer.tipoDato.getTipo() === DataType.CADENA) {
                this.tipoDato.setTipo(DataType.CADENA);
                return ((valueIzq)+(valueDer)).toString();
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.CADENA && this.operacionDer.tipoDato.getTipo() === DataType.CARACTER) {
                this.tipoDato.setTipo(DataType.CADENA);
                return ((valueIzq)+(valueDer)).toString();
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.CADENA && this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.CADENA);
                return ((valueIzq)+(valueDer)).toString();
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.CADENA && this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL) {
                this.tipoDato.setTipo(DataType.CADENA);
                return ((valueIzq)+Number(valueDer).toFixed(2)).toString();
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.CADENA && this.operacionDer.tipoDato.getTipo() === DataType.BOOLEAN) {
                this.tipoDato.setTipo(DataType.CADENA);
                return ((valueIzq)+(valueDer)).toString();
            }   else {
                // Manejar otras combinaciones de tipos aquí si es necesario
                return "error semantico";
            }
            //if resta
        }else if (this.tipo === tipoOp.RESTA) {    
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            
            if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return Number(valueIzq) - Number(valueDer);
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valueIzq) - Number(valueDer)).toFixed(2);
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valueIzq) - Number(valueDer)).toFixed(2);
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valueIzq) - Number(valueDer)).toFixed(2);
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === DataType.CARACTER) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return Number(valueIzq) - valueDer.charCodeAt(0);
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === DataType.CARACTER) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valueIzq) - valueDer.charCodeAt(0)).toFixed(2);
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.BOOLEAN && this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {//boolean-entero
                this.tipoDato.setTipo(DataType.ENTERO);
                return ((valueDer ? 1 : 0)-  Number(valueDer));
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.BOOLEAN && this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL) {//boolean-decimal
                this.tipoDato.setTipo(DataType.DECIMAL);
                return ((valueDer ? 1 : 0) -  Number(valueDer)).toFixed(2);
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === DataType.CARACTER) {//entero-caracter
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valueIzq)-valueDer.charCodeAt(0));
            }else if (this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === DataType.CARACTER) {//entero-double
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valueIzq)-valueDer.charCodeAt(0)).toFixed(2);
            }     else {
                // Manejar otras combinaciones de tipos aquí si es necesario
                return NaN;
            }
        }else if (this.tipo === tipoOp.MULTIPLICACION) {
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            
            if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return Number(valueIzq) * Number(valueDer);
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valueIzq) * Number(valueDer)).toFixed(2);
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valueIzq) * Number(valueDer)).toFixed(2);
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valueIzq) * Number(valueDer)).toFixed(2);
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return (valueIzq.charCodeAt(0)* Number(valueDer));
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (valueIzq.charCodeAt(0)* Number(valueDer)).toFixed(2);
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === DataType.CARACTER) {//validando aca
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valueIzq)* valueDer.charCodeAt(0));
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === DataType.CARACTER) {//validando aca
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valueIzq)* valueDer.charCodeAt(0)).toFixed(2);
            }  else {
                // Manejar otras combinaciones de tipos aquí si es necesario
                return NaN;
            }
          }else if (this.tipo === tipoOp.DIVISION) {
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            // Validar que el divisor sea diferente de cero
            if (valueDer !== 0) {
                if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                    this.tipoDato.setTipo(DataType.DECIMAL);
                    return (Number(valueIzq) / Number(valueDer)).toFixed(2);
                } else if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL) {
                    this.tipoDato.setTipo(DataType.DECIMAL);
                    return (Number(valueIzq) / Number(valueDer)).toFixed(2);
                }else if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO && this.operacionDer.tipoDato.getTipo() === DataType.CARACTER) {
                    this.tipoDato.setTipo(DataType.DECIMAL);
                    return (Number(valueIzq) / valueDer.charCodeAt(0)).toFixed(2);
                }else if (this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                    this.tipoDato.setTipo(DataType.DECIMAL);
                    return (Number(valueIzq) / Number(valueDer)).toFixed(2);
                } else if (this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL) {
                    this.tipoDato.setTipo(DataType.DECIMAL);
                    return (Number(valueIzq) / Number(valueDer)).toFixed(2);
                }else if (this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operacionDer.tipoDato.getTipo() === DataType.CARACTER) {
                    this.tipoDato.setTipo(DataType.DECIMAL);
                    return (Number(valueIzq) / valueDer.charCodeAt(0)).toFixed(2);
                } else if (this.operacionIzq.tipoDato.getTipo() === DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === DataType.CARACTER) {
                    this.tipoDato.setTipo(DataType.DECIMAL);
                    // Convertir el carácter a su valor ASCII y luego realizar la división
                    return (valueIzq.charCodeAt(0) / Number(valueDer)).toFixed(2);
                } else if (this.operacionIzq.tipoDato.getTipo() === DataType.CARACTER && this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL) {
                    this.tipoDato.setTipo(DataType.DECIMAL);
                    // Convertir el carácter a su valor ASCII y luego realizar la división
                    return (valueIzq.charCodeAt(0) / Number(valueDer)).toFixed(2);
                }else {
                    // Manejar otras combinaciones de tipos aquí si es necesario
                    return NaN;
                }
            } else {
                return "No se puede dividir entre cero";
            }
        }else if (this.tipo === tipoOp.POTENCIA) {
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO) {
                if (this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL) {
                    this.tipoDato.setTipo(DataType.DECIMAL); // Entero y decimal resulta en decimal
                    return Math.pow(Number(valueIzq), Number(valueDer)).toFixed(2);; // Realizamos la potencia
                } else if (this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                    this.tipoDato.setTipo(DataType.ENTERO); // Entero y entero resulta en entero
                    return Math.pow(Number(valueIzq), Number(valueDer)); // Realizamos la potencia
                }
            } else if (this.operacionIzq.tipoDato.getTipo() === DataType.DECIMAL) {
                if (this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL || this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                    this.tipoDato.setTipo(DataType.DECIMAL); // Decimal y decimal o entero resulta en decimal
                    return Math.pow(Number(valueIzq), Number(valueDer)).toFixed(2);; // Realizamos la potencia
                }
            }
          }else if (this.tipo === tipoOp.MODULO) {
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            //console.log("modulo")
            if (valueDer !== 0) { // Validar que el divisor sea diferente de 0
                if (this.operacionIzq.tipoDato.getTipo() === DataType.ENTERO &&
                    this.operacionDer.tipoDato.getTipo() === DataType.ENTERO) {
                    // Si ambos operandos son enteros
                    this.tipoDato.setTipo(DataType.DECIMAL); // Establecer el tipo de dato del resultado como double
                    return (valueIzq % valueDer).toFixed(2); // Realizar el cálculo del módulo y devolver como double
                } else {
                    // Si al menos uno de los operandos es double
                    this.tipoDato.setTipo(DataType.DECIMAL); // Establecer el tipo de dato del resultado como double
                    return (valueIzq % valueDer).toFixed(2); // Realizar el cálculo del módulo y devolver como double
                }
            }    
            }else if (this.tipo === tipoOp.NEGACIONUNARIA) {
                const validTypesOperations = [DataType.ENTERO, DataType.DECIMAL];
                let valueDer = this.operacionDer.interpretar(arbol, tabla);
                // Verificar si el valor es numérico
                if (!isNaN(valueDer)) {
                    if (validTypesOperations.includes(this.operacionDer.tipoDato.getTipo())) {
                        this.tipoDato.setTipo(this.operacionDer.tipoDato.getTipo());
                        // Verificar si el operando es un decimal
                        if (this.operacionDer.tipoDato.getTipo() === DataType.DECIMAL) {
                            return -valueDer.toFixed(2); // Devolver el valor negativo como decimal
                        } else {
                            return -valueDer; // Devolver el valor negativo como entero
                        }
                    } else {
                        // Devolver NaN si el tipo de dato no es admitido
                        return NaN;
                    }
                } else {
                    // Devolver NaN si el valor no es numérico
                    return NaN;
                }
            }
    }
}
    export enum tipoOp{
      SUMA,
      RESTA,
      DIVISION,
      MULTIPLICACION,
      POTENCIA,
      MODULO,
      NEGACIONUNARIA
    }
```
Este código define una clase Aritmetico que hereda de la clase Instruccion y representa una expresión aritmética en un árbol de sintaxis abstracta (AST). La clase tiene una variable tipo que indica el tipo de operación aritmética (suma, resta, multiplicación, división, potencia, módulo o negación unaria) y dos variables operacionIzq y operacionDer que representan las dos operaciones aritméticas que se están realizando.

La clase tiene un constructor que recibe el tipo de operación, las dos operaciones aritméticas y las coordenadas de la línea y columna en el código fuente.

## Logica.ts
```Typescript
import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';

export default class Logica extends Instruccion {
  operacionIzq: Instruccion;
  operacionDer: Instruccion;
  tipo: tipoOp;
  

  constructor(tipo: tipoOp, opIzq: Instruccion, opDer: Instruccion, fila: number, columna: number) {
    super(new Tipo(DataType.INDEFINIDO), fila, columna);
    this.tipo = tipo;
    this.operacionIzq = opIzq;
    this.operacionDer = opDer;
  }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        const validTypesOperations = [DataType.BOOLEAN]

        let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
        let valueDer = this.operacionDer.interpretar(arbol, tabla);
        if(validTypesOperations.includes(this.operacionIzq.tipoDato.getTipo())
            && validTypesOperations.includes(this.operacionDer.tipoDato.getTipo())) {
            if(this.tipo===tipoOp.OR){      
                this.tipoDato = new Tipo(DataType.BOOLEAN);
                if (valueIzq || valueDer){
                    return true;
                }return false
            }
            else if(this.tipo===tipoOp.IGUAL){      
                console.log(valueIzq,"",valueDer)
                this.tipoDato = new Tipo(DataType.BOOLEAN);  
                if (valueIzq === valueDer){
                    console.log(DataType.BOOLEAN)
                    return true;
            }return false
        }
            else if(this.tipo===tipoOp.AND){      
                this.tipoDato = new Tipo(DataType.BOOLEAN);  
                if (valueIzq && valueDer){
                    return true;
            }return false
        }else if (this.tipo === tipoOp.NOT) {      
            this.tipoDato = new Tipo(DataType.BOOLEAN);
            console.log(valueDer);
            return !valueDer; // Negar el valor de valueDer
            }
        }  else {
            return null;
        }
    }  
}

export enum tipoOp{//OPERADORES LOGICOS A TRABAJAR, AND-OR, NOT 
    AND,
    OR,
    NOT,
    IGUAL
}
```
La clase Logica tiene un método interpretar que evalúa la expresión lógica y devuelve el resultado. El método interpretar primero verifica que los tipos de datos de las expresiones lógicas operacionIzq y operacionDer sean booleanos. Si los tipos de datos son booleanos, el método interpretar aplica el operador lógico tipo a las expresiones lógicas operacionIzq y operacionDer y devuelve el resultado. Si los tipos de datos no son booleanos, el método interpretar devuelve null.
## Native.ts
```typescript
import { Instruccion } from '../Abstract/Instruccion';
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import Type, { DataType } from '../Symbol/Type';
import get from 'lodash/get';
export default class Nativo extends Instruccion {
    valor: any;//Valor del tipo de dato que se va a interpretar
    constructor(tipo: Type, valor: any, fila: number, columna: number) {
      super(tipo, fila, columna);
      this.valor = valor;
    }
    interpretar(arbol: Three, tabla: SymbolTable) {
      if(this.tipoDato.getTipo() === DataType.ENTERO){
          return this.valor;
      }else if(this.tipoDato.getTipo() === DataType.CADENA){
          return this.valor.toString().replace(/\\n/g,'\n').replace(/\\t/g,'\t').replace(/\'g/,"'").replace(/\\\\/g,'\\');   
      }else if(this.tipoDato.getTipo() === DataType.IDENTIFICADOR){
        let value = tabla.getValor(this.valor);
        this.tipoDato = get(value,"tipo",new Type(DataType.INDEFINIDO));//CASTEANDO A ENTERO 
        return get(value, 'valor');
      }else if(this.tipoDato.getTipo() === DataType.DECIMAL){
        return parseFloat(this.valor); 
      }else if (this.tipoDato.getTipo() === DataType.BOOLEAN){
        if (this.valor === "true"){
          return true;
        }else{
          return false;
        }
      }else if (this.tipoDato.getTipo() === DataType.CARACTER){
        return this.valor.toString();
      }
    }
  } 

```
## Relacional.ts 
```typescript
import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';

export default class Relacional extends Instruccion {
  operacionIzq: Instruccion;
  operacionDer: Instruccion;
  tipo: tipoOp;
  

  constructor(tipo: tipoOp, opIzq: Instruccion, opDer: Instruccion, fila: number, columna: number) {
    super(new Tipo(DataType.INDEFINIDO), fila, columna);
    this.tipo = tipo;
    this.operacionIzq = opIzq;
    this.operacionDer = opDer;
  }

  interpretar(arbol: Arbol, tabla: tablaSimbolo) {
    const validTypesOperations = [DataType.ENTERO, DataType.DECIMAL]//tipos de datos permitidos para operaciones relacionales 

    let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
    let valueDer = this.operacionDer.interpretar(arbol, tabla);
    if(validTypesOperations.includes(this.operacionIzq.tipoDato.getTipo())
        && validTypesOperations.includes(this.operacionDer.tipoDato.getTipo())) {
        if(this.tipo===tipoOp.MAYOR){        
            this.tipoDato = new Tipo(DataType.BOOLEAN);
            if (valueIzq > valueDer){
                return true;
            }
            return false
        }else if (this.tipo===tipoOp.MAYOR_IGUAL){
            this.tipoDato = new Tipo(DataType.BOOLEAN);
            if (valueIzq >= valueDer){
                return true;
            }return false
        }else if (this.tipo===tipoOp.MENOR){
            this.tipoDato = new Tipo(DataType.BOOLEAN);
            if (valueIzq < valueDer){
                return true;
            }return false
        }else if (this.tipo===tipoOp.MENOR_IGUAL){
            this.tipoDato = new Tipo(DataType.BOOLEAN);
            if (valueIzq <= valueDer){
                return true;
            }return false
        }else if (this.tipo===tipoOp.IGUALACION){
            this.tipoDato = new Tipo(DataType.BOOLEAN);
            if (valueIzq === valueDer){
                return true;
            }
            return false 
        }else if (this.tipo===tipoOp.DIFERENCIACION){
            this.tipoDato = new Tipo(DataType.BOOLEAN);
            if (valueIzq !== valueDer){
                return true;
            }return false
        }    
    }  else {
        return null;
    }
}  
}

export enum tipoOp{//LAS OPERACIONES RELACIONALES TRABAJAN; >, >=, <,<=, ==, !=
MAYOR, //>
MAYOR_IGUAL, //>=
MENOR, //<
MENOR_IGUAL, //<=
IGUALACION, //==
DIFERENCIACION //.!=
}
```
Clase Relacional que hereda de la clase Instruccion. Representa una operación relacional en un árbol de sintaxis abstracta (AST). Tiene cuatro propiedades: operacionIzq y operacionDer de tipo Instruccion, tipo de tipo tipoOp y tipoDato de tipo Tipo.

El constructor toma cuatro parámetros: tipo, opIzq, opDer, fila y columna. tipo es el tipo de operación relacional, opIzq y opDer son las instrucciones a ser comparadas y fila y columna son los números de fila y columna en el código fuente.

El método interpretar toma dos parámetros: arbol y tabla. Comprueba si los tipos de datos de operacionIzq y operacionDer son válidos para operaciones relacionales y devuelve null en caso contrario. De lo contrario, realiza la operación relacional correspondiente y devuelve el resultado.
## Asinacion.ts
```typescript
import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import Simbolo from '../Symbol/Symbol';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';

export default class Asignacion extends Instruccion {
    private id: String;
    private valor: Instruccion;

    constructor(id: String, valor: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.id = id;
        this.valor = valor;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        const valorToAsign = this.valor.interpretar(arbol, tabla);
        tabla.setValor(this.id, new Simbolo(this.valor.tipoDato, this.id, valorToAsign), false);//en lugar de setear un campo lo asigna
        return null;
    }
}
```
La clase Asignacion tiene un constructor que recibe los parámetros id, valor, linea y columna. El parámetro id indica el identificador de la variable a la que se le asignará un valor. El parámetro valor indica el valor a ser asignado a la variable. Los parámetros linea y columna indican la posición del nodo en el archivo fuente.

## Aproximacion.ts
```typescript 
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Aproximacion extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        console.log(this.identificador.tipoDato)
        try {
            let valor = this.identificador.interpretar(arbol, tabla);
            if (typeof valor === 'number') {
                // Redondear el valor según las reglas
                const entero = Math.floor(valor); // Obtener la parte entera
                const decimal = valor - entero; // Obtener la parte decimal
                // Redondear según las reglas
                let valorAproximado: number;
                if (decimal >= 0.5) {
                    valorAproximado = entero + 1; // Aproximar al entero superior
                } else {
                    valorAproximado = entero; // Aproximar al número inferior
                }

                return valorAproximado.toFixed(2);
            } else {
                console.log(`Error: El identificador "${this.identificador}" no es una cadena ni un número.`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
```

## Cout 
```typescript
import { Instruccion } from '../Abstract/Instruccion';
import Errores from '../Exceptions/Error';
import Operacion from "../Expresions/Native"
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import Type, { DataType } from '../Symbol/Type';

export default class Cout extends Instruccion {//implementando la interfaz de instruccion en esta clase 
  private expresion: Instruccion;//Operacion->Instruccion
  private saltoextra: string; // Declaración de la propiedad saltoextra
  constructor(expresion: Instruccion, linea: number, columna: number,saltoextra:string) {//Operacion Nativa a Instruccion; Operacion->Instruccion
    super(new Type(DataType.INDEFINIDO), linea, columna);//Para compilar tipos de dato
    this.expresion = expresion;
    this.saltoextra = saltoextra;
  }

  public interpretar(arbol: Three, tabla: SymbolTable) {
    let valor = this.expresion.interpretar(arbol, tabla);//Obtener el valor de la expresion al interpretarlo 
    if (valor instanceof Errores) return valor;
    if (this.saltoextra == "saltoextra") {
      valor=valor + '\n';
    }
    arbol.actualizaConsola(valor + '');
  }
}
```
La clase Cout se utiliza para imprimir valores en la consola en un lenguaje de programación.
## Instruccionif.ts
```typescript
import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import SymbolTable from '../Symbol/SymbolTable';

export default class If extends Instruccion {
    private operacionIf: Instruccion;//Operacion principal del if 
    private listaInstrucciones: Instruccion [];//Lista de instrucciones del if
    private listaElseIf: Instruccion [] | undefined;//cada else if a if y convertido a arreglo
    private listaInsElse: Instruccion [] | undefined;

    constructor(
        operacion: Instruccion, 
        listaInstrucciones: Instruccion[], 
        listaElseIf: Instruccion[] | undefined, 
        listaInsElse: Instruccion[] | undefined,
        linea: number, 
        columna: number
    ){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.operacionIf = operacion
        this.listaInstrucciones = listaInstrucciones
        this.listaElseIf = listaElseIf
        this.listaInsElse = listaInsElse
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        const condition = this.operacionIf.interpretar(arbol, tabla)
        if((condition)){
            console.log("estoy en if");
            console.log(this.listaInstrucciones)
            const tablaLocal = new SymbolTable(tabla)
            for(let i of this.listaInstrucciones){
                i.interpretar(arbol, tablaLocal)
            }
            return true
        }else{//revisando los else if
            if(this.listaElseIf){ 
                console.log(this.listaElseIf)
                for(let i of this.listaElseIf){
                    const operation = i.interpretar(arbol, tabla);
                    if(operation){
                        return false;
                    }
                }
            }
            if(this.listaInsElse){//si existe un else se crea un nuevo entorno 
                console.log(this.listaInsElse)
                const tablaLocal = new SymbolTable(tabla)
                for(let i of this.listaInsElse){
                    i.interpretar(arbol, tablaLocal)
                }
                return false
            }
        }
    }
}
```
Esta clase representa una instrucción If en un árbol de sintaxis abstracta. La instrucción If consta de una condición y una o más instrucciones que se ejecutan si la condición es verdadera. Además, puede tener cero o más instrucciones ElseIf y una instrucción Else opcional.

## ToString.ts
```typescript
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class ToString extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.CADENA), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        try {
            let valor = this.identificador.interpretar(arbol, tabla);
            switch (this.identificador.tipoDato.getTipo()) {
                case DataType.BOOLEAN:
                case DataType.DECIMAL:
                case DataType.ENTERO:
                    console.log("Tipo: " + typeof valor);
                    console.log("Valor: " + valor);
                    console.log("El tipo es: " + typeof valor);
                    return valor.toString();
                default:
                    console.log(`Error: El identificador "${this.identificador}" no es un booleano, decimal ni entero.`);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
```
Esta función se encarga de Realizar el casteo de las funciones para poder convertir el tipo de dato a String.

## Tipode.ts
```typescript
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Tipode extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        try {
            const tipoNumero = this.identificador.tipoDato.getTipo();
            const nombresTipos: { [key: number]: string } = {
                [DataType.ENTERO]: "R_INT",
                [DataType.DECIMAL]: "DOUBLE",
                [DataType.CARACTER]: "CHAR",
                [DataType.CADENA]: "CADENA",
                [DataType.BOOLEAN]: "BOOL"
            };

            const tipoNombre = nombresTipos[tipoNumero as number]; // Conversión explícita a number

            console.log("El tipo de dato es: " + tipoNombre);
            return tipoNombre;
        } catch (error) {
            console.log(error);
        }
    }
}
```
Esta función se encarga de obtener el nombre con el que se declara la función y retornarlo.

## Minúscula.ts
```typescript
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Minuscula extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }
    
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        try {
            let valor = this.identificador.interpretar(arbol, tabla);
            if (typeof valor === 'string') {
                return valor.toLowerCase();
            } else {
                console.log(`Error: El identificador "${this.identificador}" no es una cadena.`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
```
La clase Minuscula se utiliza para convertir el valor de un identificador a minúsculas.
## Mayuscula.ts
```typescript 
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";

export default class Mayuscula extends Instruccion {
    private identificador: Instruccion;

    constructor(identificador: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
    }
    
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        console.log("entró a Mayuscula")
        try {
            let valor = this.identificador.interpretar(arbol, tabla);
            if (typeof valor === 'string') {
                return valor.toUpperCase();
            } else {
                console.log(`Error: El identificador "${this.identificador}" no es una cadena.`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
```
La clase Mayuscula se utiliza para convertir el valor de un identificador a mayusculas.
## Minetras.ts 
```typescript
import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import SymbolTable from '../Symbol/SymbolTable';
import cloneDeep from 'lodash/cloneDeep';//copia datos y asigna a nuevas variables

export default class Mientras extends Instruccion {
    private operacion: Instruccion;
    private listaInstrucciones: Instruccion [];    

    constructor(
        operacion: Instruccion, 
        listaInstrucciones: Instruccion[], 
        linea: number, 
        columna: number
    ){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.operacion = operacion
        this.listaInstrucciones = listaInstrucciones
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        const tablaLocal = new SymbolTable(tabla)
        while(cloneDeep(this.operacion).interpretar(arbol, tablaLocal)){   
            const instructionsToExec = cloneDeep(this.listaInstrucciones)    
            for(let i of instructionsToExec){
                i.interpretar(arbol, tablaLocal)
            }
        }
        return null;
    }
}
```
La clase Mientras implementa el método interpretar, el cual es responsable de ejecutar la instrucción while. El método interpretar crea una nueva tabla de símbolos tablaLocal como una copia de la tabla de símbolos actual tabla. Luego, mientras la condición operacion sea verdadera, se ejecutan las instrucciones en el bloque listaInstrucciones. Después de cada iteración, se crea una copia profunda de listaInstrucciones para evitar efectos secundarios en la siguiente iteración.

## Else
```typescript
import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from "../Symbol/Type";
import Break from "./Break";
import Continue from "./Continue";
import Return from "./Return";
export default class Else extends Instruccion{
    condicion:  Instruccion;
    listaInstrucciones: Instruccion[];
    constructor(condicion: Instruccion, listaInstrucciones: Instruccion[], linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.condicion = condicion;
        this.listaInstrucciones = listaInstrucciones;
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        console.log("ELSE");
        let tablaLocal = new tablaSimbolo(tabla);
        let condicion = this.condicion.interpretar(arbol, tablaLocal);
        if (typeof condicion === "boolean") {
            console.log("estoy en else");
            if (condicion === true) {
                for (let i of this.listaInstrucciones) {
                    let instrucciones1 = i.interpretar(arbol, tablaLocal);
                    if (instrucciones1 instanceof Break) {
                        return; // Cambiado a "return" para salir del bucle
                    } else if (instrucciones1 instanceof Return) {
                        return instrucciones1;
                    } else if (instrucciones1 instanceof Continue) {
                        return instrucciones1;
                    }
                }
            }
        } else {
            console.log("Error en la condicion del else");
        }
    }
}
```
La clase Else extiende de la clase Instruccion y representa una instrucción else en un programa. La instrucción else se utiliza en conjunto con una instrucción if y especifica un bloque de código que se ejecuta si la condición del if es falsa.
## 5.3 Funcionamiento del Frontend  

Este es un fragmento de código JavaScript que describe un componente de React llamado `App`. Sus funciones son las siguientes:

- Importa React y algunos otros módulos y archivos CSS necesarios para el funcionamiento de la aplicación.
- Define una función llamada `App` que devuelve un fragmento de JSX (sintaxis de JavaScript XML) que representa la estructura de la aplicación.
- Dentro del fragmento de JSX, se crea un div con la clase 'App' que contiene otro div anidado. Este div anidado tiene un estilo en línea que establece una altura mínima del 100% del viewport.
- Dentro del div anidado, se renderiza el componente `Principal`, que es  otro componente de React definido en el archivo './Components/principal.js'.
- Finalmente, exporta la función `App` como el componente predeterminado para que pueda ser importado y utilizado en otros archivos de la aplicación.

```javascript
import React from 'react';
import './App.css';
import Principal from './Components/principal';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className='App'>
          <div style={{ minHeight:"100vh" }} >
            <Principal />
          </div>
    </div>
  );
}
export default App;
```
### Conexión Backend con Frontend 
```javascript
import axios from 'axios'
const instance = axios.create(
    {
        baseURL: 'http://localhost:5001/api',
        timeout: 15000,
        headers: {
            'Content-Type': 'application/json'
        }
    }
)
export const parse = async (value) => {
    const { data } = await instance.post("/parse", { peticion: value })
    return data
}
export const ping = async () => {
    const { data } = await instance.get("/ping")
    return data
}
```

Esta funcion de  JavaScript muestra cómo se utiliza Axios, una biblioteca para realizar solicitudes HTTP en el navegador y en Node.js. Aquí está lo que está haciendo, y se encarga de conectar el backend con el frontend:

- Importa Axios desde el módulo 'axios'.
- Crea una instancia de Axios llamada `instance` con cierta configuración, como la URL base, el tiempo de espera y los encabezados.
- Define dos funciones exportadas, `parse` y `ping`, que realizan solicitudes HTTP utilizando la instancia de Axios.
- La función `parse` realiza una solicitud POST a la ruta '/parse' con un objeto que contiene una propiedad llamada 'peticion' y su valor se establece como el parámetro `value`.
- La función `ping` realiza una solicitud GET a la ruta '/ping'.




---
# 6. Créditos
---
[Enlace a mi repositorio en GitHub](https://github.com/KevinPalaciosQ/OLC1_Proyecto2_201902278.git)