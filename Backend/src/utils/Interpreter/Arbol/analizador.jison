%{
//importaciones
const controller = require("../../../controller/parser/parser");//Lista de Errores 
const errores = require("./Exceptions/Error");
const nativo = require('./Expresions/Native');
const aritmetico = require('./Expresions/Aritmetica');
const relacional = require('./Expresions/Relacional');
const logica = require('./Expresions/Logica');
const Tipo = require("./Symbol/Type");
const impresioncout = require('./Instructions/Cout');   
const ifIns = require('./Instructions/Instruccionif');
const declaracion = require('./Instructions/Declaracion');
const asignacionv = require('./Instructions/Asignacion');
const whileIns = require('./Instructions/Mientras');
const incremento = require('./Instructions/Incremento');
const decremento = require('./Instructions/Decremento');
const mayuscula = require('./Instructions/Mayuscula');
const minuscula = require('./Instructions/Minuscula');
const aproximacion = require('./Instructions/Aproximacion');
%}

%lex

%options case-insensitive

%%
//>>>>>>>>>>>>>>>>>>>>>>>>>>EXPRESIONES REGULARES<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
"//".*		//comentario simple	
// comentario multiples líneas                              
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {   }// comentario multiples líneas    
//>>>>>>>>>>>>>>>>>>>>>>>>>>SE IGNORAN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
\s+                 //espacios en blanco
[ \r\t]+ { }
\n {}             
//>>>>>>>>>>>>>>>>>>>>>>>>>>AUXILIARES<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<             
//"entero"        return "RESINT";

//>>>>>>>>>>>>>>>>>>>>>>>>>>TIPOS DE DATOS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
"int"                  return "R_INT";
"double"               return "R_DOUBLE";
"true"                 return  "R_TRUE"
"false"                return  "R_FALSE"
"char"                 return "R_CHAR";
"std::string"          return "R_CADENA";
"bool"                 return "R_BOOL";
//>>>>>>>>>>>>>>>>>>>>>>>>>>SIMBOLOS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
","                    return "COMA"; 
"=="                    return "IGUALDAD";
"="                    return "IGUAL";
";"                    return "PUNTOYCOMA";
":"                    return "DOSPUNTOS";
"?"                    return "INTERROGACION";
"("                    return 'PARABRE';
")"                    return 'PARCIERRA';
"{"                    return "LLAVEABRE";
"}"                    return "LLAVECIERRA";
"["                    return "CORCHETECIERRA";
"]"                    return "CORCHETEABRE";
"new"                  return "NEW";
//>>>>>>>>>>>>>>>>>>>>>>>>>>PALABRAS RESERVADAS<<<<<<<<<<<<<<<<<<<<<<<<<<
"if"                    return "RESERVADAIF";
"else"                  return "RESELSE";
"switch"                return "SWITCH";
"case"                  return "CASE";
"default"               return "DEFAULT";
"while"                 return "RESERVADAWHILE";
"for"                   return "FOR";
"do"                    return "DO";
"break"                 return "BREAK";
"continue"              return "CONTINUE";
"return"                return "RETURN";
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>METODOS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
"void"                   return "VOID";
"cout"                   return "COUT";
"endl"                   return "ENDL";
"tolower"                return "RTOLOWER";
"toupper"                return "RTOUPPER";
"round"                  return "ROUND";
//>>>>>>>>>>>>>>>>>>>>>>>>>>FUNCIONES NATIVAS<<<<<<<<<<<<<<<<<<<<<<<<<<<<
"length"                return "LENGTH";
"typeof"                return "TYPEOF";
"tostring"              return "TOSTRING";
"c_str"                 return "C_STR";
"execute"               return "EXECUTE";
//>>>>>>>>>>>>>>>>>>>>>>>>>>EXPRESIONES NATIVAS<<<<<<<<<<<<<<<<<<<<<<<<<<
"++"                    return "INCREMENTO";
"+"                     return "MAS";
"--"                    return "DECREMENTO";
"-"                     return "MENOS";
"*"                     return "MULTIPLICACION"; 
"/"                     return "DIVISION";
"pow"                   return "POTENCIA";
"%"                     return "MODULO";
//>>>>>>>>>>>>>>>>>>>>>>>>>>OPERADORES RELACIONALES<<<<<<<<<<<<<<<<<<<<<<<<<<

"!="                    return "DIFERENTE";
"<="                    return "MENORIGUAL";
"<"                     return "MENOR";
">="                    return "MAYORIGUAL";
">"                     return "MAYOR";

//>>>>>>>>>>>>>>>>>>>>>>>>>>OPERADOR TERNARIO<<<<<<<<<<<<<<<<<<<<<<<<<<
"||"                    return "OR";
"&&"                    return "AND";
"!"                     return "NOT";




//>>>>>>>>>>>>>>>>>>>>>>>>>>INCREMENTO/DECREMENTO<<<<<<<<<<<<<<<<<<<<<<<<<<


[A-Za-z]+["_"0-9A-Za-z]*    return 'IDENTIFICADOR';
[0-9]+"."[0-9]+             return 'DECIMAL';
[0-9]+                      return 'ENTERO';
\'(([^\"\'\\\\]{0,1}|\\\'|\\\"|\\n|\\r|\\t|\\\\))\'                         { yytext=yytext.substr(1,yyleng-2); return 'CARACTER'; }
/*\'([^']|"\\n"|"\\r"|"\\t")*\'    {
                        //Quitamos las comillas simples
                       yytext=yytext.slice(1, -1);
                       return 'CARACTER';
                    }                               
*/
\"[^\"]*\"                  { yytext=yytext.substr(1,yyleng-2); return 'CADENA'; }
//>>>>>>>>>>>>>>>>>>>>>>>>>>CONTINUACION<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

<<EOF>>                     return 'EOF';
.                           return 'INVALID'
/lex
//PRESEDENCIA
//%left INTERROGACION
%left OR
%left AND 
%left DIFERENTE 
%right NOT

%left IGUALDAD 
%left MENORIGUAL MAYORIGUAL MAYOR MENOR
%left MAS MENOS
%left DIVISION MULTIPLICACION MODULO
%left POTENCIA
%right NEGACIONUNARIA 
//INICIO
%start INIT

%%

INIT: INSTRUCCIONES EOF {return $1;}
;

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION     {$1.push($2); $$=$1;}
            |INSTRUCCION                     {$$=[$1];}
;

INSTRUCCION : DECLARACION PUNTOYCOMA    {$$=$1}
        //DA                              {$$=$1;}
        |FUNCIONCOUT                    {$$=$1;}
        |WHILEINS                       {$$=$1;}
        |AUMENTO                        {$$=$1;}
        //|FUNCIONTOUPPER                 {$$=$1;}
        //|FUNCIONTOUPPER                 {$$=$1;}
        //|ASIGNACION                     {$$=$1;}
        |IFINS                          {$$=$1;}
        |INVALID                        {controller.listaErrores.push(new errores.default('ERROR LEXICO',$1,@1.first_line,@1.first_column));} //errores Léxicos
        |error PUNTOYCOMA               {controller.listaErrores.push(new errores.default(`ERROR SINTACTICO`,"Se esperaba token",@1.first_line,@1.first_column));}//errores Sintácticos
;
AUMENTO: IDENTIFICADOR INCREMENTO  PUNTOYCOMA     {$$=new incremento.default($1,@1.first_line,@1.first_column);}
        |IDENTIFICADOR DECREMENTO  PUNTOYCOMA     {$$=new decremento.default($1,@1.first_line,@1.first_column);}
;
ASIGNACION: R_INT IDENTIFICADOR IGUAL EXPRESION PUNTOYCOMA  {$$=new asignacionv.default($1,$3,@1.first_line,@1.first_column);}
;
//para lista de asignaciones hacer la misma logica de instrucciones
WHILEINS: RESERVADAWHILE PARABRE EXPRESION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA
        {$$=new whileIns.default($3,$6,@1.first_line,@1.first_column);}
;

IFINS: SIMPLEIF {$$=$1;}
        //RESERVADAIF PARABRE EXPRESION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA 
        //{$$=new ifIns.default($3,$6, undefined, undefined, @1.first_line, @1.first_column);}
        |RESERVADAIF PARABRE EXPRESION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA ELSEIFINS RESELSE LLAVEABRE INSTRUCCIONES LLAVECIERRA
        {$$=new ifIns.default($3,$6,$8,$11,@1.first_line,@1.first_column);}//hacer una produccion donde no se acepte el else
;
SIMPLEIF:
        RESERVADAIF PARABRE EXPRESION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA 
        {$$=new ifIns.default($3,$6, undefined, undefined, @1.first_line, @1.first_column);}
        
;

ELSEIFINS:
        ELSEIFINS RESELSE SIMPLEIF {$1.push($3); $$=$1;}
        |RESELSE SIMPLEIF {$$=[$2];}
;
/*
IFINS: SIMPLEIF {$$=$1;}
        //RESERVADAIF PARABRE EXPRESION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA 
        //{$$=new ifIns.default($3,$6, undefined, undefined, @1.first_line, @1.first_column);}
        |RESERVADAIF PARABRE EXPRESION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA ELSEIFINS LLAVEABRE INSTRUCCIONES LLAVECIERRA
        {$$=new ifIns.default($3,$6,$8,$11,@1.first_line,@1.first_column);}//hacer una produccion donde no se acepte el else
;
SIMPLEIF:
        RESERVADAIF PARABRE EXPRESION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA 
        {$$=new ifIns.default($3,$6, undefined, undefined, @1.first_line, @1.first_column);}
;

ELSEIFINS:
        ELSEIFINS RESELSE SIMPLEIF {$1.push($3); $$=$1;}
        |RESELSE SIMPLEIF {$$=[$2];}
;
*/
/*
IFINS: SIMPLEIF {$$=$1;}
        |RESELSE PARABRE EXPRESION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA ELSEIFINS RESELSE LLAVEABRE INSTRUCCIONES LLAVECIERRA{$$=new ifIns.default($3,$6,$8,$11,@1.first_line,@1.first_column);}
;       //HACER UNA OPCION DONDE NO SE ACEPTE EL ELSE, PRODUCCION CON $8 NULO Y $11 CON VALOR Y OTRA IGUAL PERO AL REVES

SIMPLEIF: RESERVADAIF PARABRE EXPRESION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA {$$=new ifIns.default($3,$6, undefined, undefined, @1.first_line, @1.first_column);}
;//hola

ELSEIFINS: ELSEIFINS RESELSE SIMPLEIF {$1.push($3); $$=$1;}
        |RESELSE SIMPLEIF {$$=[$2];}
;
*/

//DA: DECLARACION PUNTOYCOMA {$$=$1;}
    //    |ASIGNACIONN {$$=$1;}
//;
DECLARACION : R_INT IDENTIFICADOR IGUAL EXPRESION  {$$=new declaracion.default($2,new Tipo.default(Tipo.DataType.ENTERO),$4,@1.first_line,@1.first_column);}
        |R_DOUBLE  IDENTIFICADOR IGUAL EXPRESION   {$$=new declaracion.default($2,new Tipo.default(Tipo.DataType.DECIMAL),$4,@1.first_line,@1.first_column);}
        |R_BOOL    IDENTIFICADOR IGUAL EXPRESION   {$$=new declaracion.default($2,new Tipo.default(Tipo.DataType.BOOLEAN),$4,@1.first_line,@1.first_column);}
        |R_CHAR    IDENTIFICADOR IGUAL EXPRESION   {$$=new declaracion.default($2,new Tipo.default(Tipo.DataType.CARACTER),$4,@1.first_line,@1.first_column);}
        |R_CADENA  IDENTIFICADOR IGUAL EXPRESION   {$$=new declaracion.default($2,new Tipo.default(Tipo.DataType.CADENA),$4,@1.first_line,@1.first_column);}
;
ASIGNACIONN: RESINT IDENTIFICADOR IGUAL EXPRESION PUNTOYCOMA  {$$=new asignacionv.default($1,$3,@1.first_line,@1.first_column);}
        |R_DOUBLE IDENTIFICADOR IGUAL EXPRESION PUNTOYCOMA  {$$=new asignacionv.default($1,$3,@1.first_line,@1.first_column);}
        |R_BOOL IDENTIFICADOR IGUAL EXPRESION PUNTOYCOMA  {$$=new asignacionv.default($1,$3,@1.first_line,@1.first_column);}
        |R_CHAR IDENTIFICADOR IGUAL EXPRESION PUNTOYCOMA  {$$=new asignacionv.default($1,$3,@1.first_line,@1.first_column);}
        |R_CADENA IDENTIFICADOR IGUAL EXPRESION PUNTOYCOMA  {$$=new asignacionv.default($1,$3,@1.first_line,@1.first_column);}
;

LISTA_IDENTIFICADORES : LISTA_IDENTIFICADORES COMA IDENTIFICADOR            {$1.push($3); $$=$1;}
        | IDENTIFICADOR                                                     {$$=[$1];}
;

TDD: R_INT         {$$=new nativo.default(new Tipo.default(Tipo.DataType.ENTERO),$1,@1.first_line,@1.first_column);}
        |R_DOUBLE  {$$=new nativo.default(new Tipo.default(Tipo.DataType.DECIMAL),$1,@1.first_line,@1.first_column);}
        |R_BOOL    {$$=new nativo.default(new Tipo.default(Tipo.DataType.BOOLEAN),$1,@1.first_line,@1.first_column);}
        |R_CHAR    {$$=new nativo.default(new Tipo.default(Tipo.DataType.CARACTER),$1,@1.first_line,@1.first_column);}
        |R_CADENA  {$$=new nativo.default(new Tipo.default(Tipo.DataType.CADENA),$1,@1.first_line,@1.first_column);}
;
/*
//>>>>>>>>>>>>>>>>>>>>>>>>>>TIPOS DE DATOS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
"int"                  return "R_INT";
"double"               return "R_DOUBLE";
"true"                 return  "R_TRUE"
"false"                return  "R_FALSE"
"char"                 return "R_CHAR";
"std::string"          return "R_CADENA";
"bool"                 return "R_BOOL";
*/


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.13 OPERACIONES ARITMETICAS <<<<<<<<<<<<<<<<<<<<<<<<<<<
//DECLARACIONN: RESINT IDENTIFICADOR IGUAL EXPRESION PUNTOYCOMA {$$=new declaracion.default($2,new Tipo.default(Tipo.DataType.ENTERO),$4,@1.first_line,@1.first_column);}
//;
//---->corregir asignacion
//ASIGNACIONN: RESINT IDENTIFICADOR IGUAL EXPRESION PUNTOYCOMA  {$$=new asignacionv.default($1,$3,@1.first_line,@1.first_column);}
//;
//------------------------asignacion de prueba


EXPRESION:EXPRESION MAS EXPRESION                             {$$=new aritmetico.default(aritmetico.tipoOp.SUMA,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION MENOS EXPRESION                            {$$=new aritmetico.default(aritmetico.tipoOp.RESTA,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION DIVISION EXPRESION                         {$$=new aritmetico.default(aritmetico.tipoOp.DIVISION,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION MULTIPLICACION EXPRESION                   {$$=new aritmetico.default(aritmetico.tipoOp.MULTIPLICACION,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION MODULO EXPRESION                           {$$=new aritmetico.default(aritmetico.tipoOp.MODULO,$1,$3,@1.first_line,@1.first_column);}
        |POTENCIA PARABRE EXPRESION COMA EXPRESION PARCIERRA  {$$=new aritmetico.default(aritmetico.tipoOp.POTENCIA,$3,$5,@1.first_line,@1.first_column);}
        |MENOS EXPRESION %prec NEGACIONUNARIA                 {$$=new aritmetico.default(aritmetico.tipoOp.NEGACIONUNARIA,$2,$2,@1.first_line,@1.first_column);}   
        |ENTERO                                               {$$=new nativo.default(new Tipo.default(Tipo.DataType.ENTERO),$1,@1.first_line,@1.first_column);}
        |CADENA                                               {$$=new nativo.default(new Tipo.default(Tipo.DataType.CADENA),$1,@1.first_line,@1.first_column);}
        |DECIMAL                                              {$$=new nativo.default(new Tipo.default(Tipo.DataType.DECIMAL),$1,@1.first_line,@1.first_column);}
        |CARACTER                                             {$$=new nativo.default(new Tipo.default(Tipo.DataType.CARACTER),$1,@1.first_line,@1.first_column);}
        |IDENTIFICADOR                                        {$$=new nativo.default(new Tipo.default(Tipo.DataType.IDENTIFICADOR),$1,@1.first_line,@1.first_column);}
        |PARABRE EXPRESION PARCIERRA                          {$$=$2;}
        
        |R_TRUE                                               {$$=new nativo.default(new Tipo.default(Tipo.DataType.BOOLEAN),$1,@1.first_line,@1.first_column);}
        |R_FALSE                                              {$$=new nativo.default(new Tipo.default(Tipo.DataType.BOOLEAN),$1,@1.first_line,@1.first_column);}
        |EXPRESION MAYOR EXPRESION                            {$$=new relacional.default(relacional.tipoOp.MAYOR,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION MAYORIGUAL EXPRESION                       {$$=new relacional.default(relacional.tipoOp.MAYOR_IGUAL,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION MENOR EXPRESION                            {$$=new relacional.default(relacional.tipoOp.MENOR,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION MENORIGUAL EXPRESION                       {$$=new relacional.default(relacional.tipoOp.MENOR_IGUAL,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION IGUALDAD EXPRESION                         {$$=new relacional.default(relacional.tipoOp.IGUALACION,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION DIFERENTE EXPRESION                        {$$=new relacional.default(relacional.tipoOp.DIFERENCIACION,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION  OR EXPRESION                              {$$=new logica.default(logica.tipoOp.OR,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION  AND EXPRESION                             {$$=new logica.default(logica.tipoOp.AND,$1,$3,@1.first_line,@1.first_column);}
        |NOT EXPRESION                                        {$$=new logica.default(logica.tipoOp.NOT,$2,$2,@1.first_line,@1.first_column);}
        |FUNCIONESUPERLOWER                                   {$$=$1;}
        |FUNCIONROUND                                         {$$=$1;}    
        //|IDENTIFICADOR INCREMENTO  PUNTOYCOMA                 {$$=new incremento.default($1,@1.first_line,@1.first_column);}
;
/*
EXPRECION_RELACIONAL : EXPRESION MAYOR EXPRESION       {$$=new relacional.default(relacional.tipoOp.MAYOR,$1,$3,@1.first_line,@1.first_column);}
                |EXPRESION MAYORIGUAL EXPRESION              {$$=new relacional.default(relacional.tipoOp.MAYOR_IGUAL,$1,$3,@1.first_line,@1.first_column);}
                |EXPRESION MENOR EXPRESION                   {$$=new relacional.default(relacional.tipoOp.MENOR,$1,$3,@1.first_line,@1.first_column);}
                |EXPRESION MENORIGUAL EXPRESION              {$$=new relacional.default(relacional.tipoOp.MENOR_IGUAL,$1,$3,@1.first_line,@1.first_column);}
                |EXPRESION IGUALDAD EXPRESION                {$$=new relacional.default(relacional.tipoOp.IGUALACION,$1,$3,@1.first_line,@1.first_column);}
                |EXPRESION DIFERENTE EXPRESION               {$$=new relacional.default(relacional.tipoOp.DIFERENCIACION,$1,$3,@1.first_line,@1.first_column);}
EXPRECION_LOGICA : EXPRECION_RELACIONAL  OR EXPRECION_RELACIONAL                     {$$=new logica.default(logica.tipoOp.OR,$1,$3,@1.first_line,@1.first_column);}
                |EXPRECION_RELACIONAL  AND EXPRECION_RELACIONAL                    {$$=new logica.default(logica.tipoOp.AND,$1,$3,@1.first_line,@1.first_column);}
                |NOT EXPRECION_RELACIONAL                               {$$=new logica.default(logica.tipoOp.NOT,$2,$2,@1.first_line,@1.first_column);}
;
*/
/*
EXPRECIONRELACIONALYLOGICA : EXPRESION MAYOR EXPRESION       {$$=new relacional.default(relacional.tipoOp.MAYOR,$1,$3,@1.first_line,@1.first_column);}
                |EXPRESION MAYORIGUAL EXPRESION              {$$=new relacional.default(relacional.tipoOp.MAYOR_IGUAL,$1,$3,@1.first_line,@1.first_column);}
                |EXPRESION MENOR EXPRESION                   {$$=new relacional.default(relacional.tipoOp.MENOR,$1,$3,@1.first_line,@1.first_column);}
                |EXPRESION MENORIGUAL EXPRESION              {$$=new relacional.default(relacional.tipoOp.MENOR_IGUAL,$1,$3,@1.first_line,@1.first_column);}
                |EXPRESION IGUALDAD EXPRESION                {$$=new relacional.default(relacional.tipoOp.IGUALACION,$1,$3,@1.first_line,@1.first_column);}
                |EXPRESION DIFERENTE EXPRESION               {$$=new relacional.default(relacional.tipoOp.DIFERENCIACION,$1,$3,@1.first_line,@1.first_column);}
                |EXPRESION  OR EXPRESION                     {$$=new logica.default(logica.tipoOp.OR,$1,$3,@1.first_line,@1.first_column);}
                |EXPRESION  AND EXPRESION                    {$$=new logica.default(logica.tipoOp.AND,$1,$3,@1.first_line,@1.first_column);}
                |NOT EXPRESION                               {$$=new logica.default(logica.tipoOp.NOT,$2,$2,@1.first_line,@1.first_column);}
;
*/





//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.13 CASTEOS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONCASTEO:  PARABRE TIPOCASTEO PARCIERRA EXPRESION 
;

TIPOCASTEO: R_INT     {$$=new Tipo.default(Tipo.DataType.ENTERO);}
        |R_DOUBLE     {$$=new Tipo.default(Tipo.DataType.DECIMAL);}
        |R_CHAR       {$$=new Tipo.default(Tipo.DataType.CARACTER);}
        |R_CADENA     {$$=new Tipo.default(Tipo.DataType.CADENA);}
;


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.15 ESTRUCTURAS DE DATOS<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONESTRUCTURADATOS: VECTORES
        |ACCESOVECTORES
        |MODIFICACIONVECTORES
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.15.1 VECTORES<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
VECTORES: TIPOVECTOR IDENTIFICADOR CORCHETEABRE CORCHETECIERRA IGUAL NEW TIPOVECTOR CORCHETEABRE EXPRESION CORCHETECIERRA PUNTOYCOMA
        |TIPOVECTOR IDENTIFICADOR CORCHETEABRE CORCHETECIERRA CORCHETEABRE CORCHETECIERRA NEW TIPOVECTOR CORCHETEABRE EXPRESION CORCHETECIERRA  CORCHETEABRE EXPRESION CORCHETECIERRA PUNTOYCOMA
        //TIPO2
        |TIPOVECTOR IDENTIFICADOR CORCHETEABRE CORCHETECIERRA IGUAL CORCHETEABRE LISTAVALORES CORCHETECIERRA PUNTOYCOMA 
;
TIPOVECTOR: R_INT
        |R_DOUBLE
        |R_CHAR
        |R_CADENA
;
LISTAVALORES: R_CADENA
;

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.11 ACCESO VECTORES<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
ACCESOVECTORES: IDENTIFICADOR CORCHETEABRE EXPRESION CORCHETECIERRA
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.15.13 MODIFICACIONES VECTORES<<<<<<<<<<<<<<<<<<<<
MODIFICACIONVECTORES: ID CORCHETEABRE EXPRESION CORCHETECIERRA IGUAL EXPRESION PUNTOYCOMA
        |ID CORCHETEABRE EXPRESION CORCHETECIERRA CORCHETEABRE EXPRESION CORCHETECIERRA IGUAL EXPRESION PUNTOYCOMA
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.21 METODOS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.21 FUNCION COUT<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONCOUT : COUT MENOR MENOR EXPRESION  PUNTOYCOMA {$$=new impresioncout.default($4,@1.first_line,@1.first_column,"");}//EXPRESIONLOGICA
        |COUT MENOR MENOR  EXPRESION MENOR MENOR ENDL PUNTOYCOMA {$$=new impresioncout.default($4,@1.first_line,@1.first_column,"saltoextra");}
;
FUNCIONESUPERLOWER: FUNCIONTOUPPER {$$=$1;}
        |FUNCIONTOLOWER {$$=$1;}

;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.22 FUNCION TOLOWER<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONTOLOWER: RTOLOWER PARABRE EXPRESION PARCIERRA PUNTOYCOMA {$$=new minuscula.default($3,@1.first_line,@1.first_column);console.log($3);}
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.23 FUNCION TOUPPER<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONTOUPPER: RTOUPPER PARABRE EXPRESION PARCIERRA PUNTOYCOMA {$$=new mayuscula.default($3,@1.first_line,@1.first_column);console.log("hola");}
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.24 FUNCION ROUND<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONROUND: ROUND PARABRE EXPRESION PARCIERRA PUNTOYCOMA {$$=new aproximacion.default($3,@1.first_line,@1.first_column);}
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.25.1 FUNCION LENGTH<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONLENGHT: EXPRESION PUNTO LENGTH PARABRE PARCIERRA PUNTOYCOMA
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.25.2 FUNCION TYPEOF<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONTYPEOF: TYPEOF PARABRE EXPRESION PARCIERRA PUNTOYCOMA
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.25.3 FUNCION TOSTRING<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONTOSTRING: R_CADENA TOSTRING PARABRE EXPRESION PARCIERRA PUNTOYCOMA
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.25.4 FUNCION C_STR<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONCSTR: EXPRESION PUNTO C_STR PARABRE PARCIERRA PUNTOYCOMA
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.25.5 FUNCION EXECUTE<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONEXECUTE: EXECUTE IDENTIFICADOR PARABRE PARCIERRA PUNTOYCOMA 
        |EXECUTE IDENTIFICADOR PARABRE CORCHETEABRE EXPRESION CORCHETECIERRA PARCIERRA PUNTOYCOMA
;