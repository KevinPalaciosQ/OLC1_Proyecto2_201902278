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

## 5.3 Funcionamiento del Frontend  
---
# 6. Créditos
---
[Enlace a mi repositorio en GitHub](https://github.com/KevinPalaciosQ/OLC1_Proyecto2_201902278.git)