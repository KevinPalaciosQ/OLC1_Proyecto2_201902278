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
"entero"        return "RESINT";

//>>>>>>>>>>>>>>>>>>>>>>>>>>TIPOS DE DATOS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
"int"                  return "R_INT";
"double"               return "R_DOUBLE";
"true"                 return  "R_TRUE"
"false"                return  "R_FALSE"
"char"                 return "R_CHAR";
"std::string"          return "R_CADENA";
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
"else"                  return "RESERVADAELSE";
"switch"                return "SWITCH";
"case"                  return "CASE";
"default"               return "DEFAULT";
"while"                 return "WHILE";
"for"                   return "FOR";
"do"                    return "DO";
"break"                 return "BREAK";
"continue"              return "CONTINUE";
"return"                return "RETURN";
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>METODOS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
"void"                   return "VOID";
"cout"                   return "COUT";
"endl"                   return "ENDL";
"tolower"                return "TOLOWER";
"toupper"                return "TOUPPER";
"round"                  return "ROUND";
//>>>>>>>>>>>>>>>>>>>>>>>>>>FUNCIONES NATIVAS<<<<<<<<<<<<<<<<<<<<<<<<<<<<
"length"                return "LENGTH";
"typeof"                return "TYPEOF";
"tostring"              return "TOSTRING";
"c_str"                 return "C_STR";
"execute"               return "EXECUTE";
//>>>>>>>>>>>>>>>>>>>>>>>>>>EXPRESIONES NATIVAS<<<<<<<<<<<<<<<<<<<<<<<<<<
"+"                     return "MAS";
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
"++"                        return "INCREMENTO";
"--"                        return "DECREMENTO";
[A-Za-z]+["_"0-9A-Za-z]*    return 'IDENTIFICADOR';
[0-9]+"."[0-9]+             return 'DECIMAL';
[0-9]+                      return 'ENTERO';
\'([^']|"\\n"|"\\r"|"\\t")*\'    {
                        //Quitamos las comillas simples
                       yytext=yytext.slice(1, -1);
                       return 'CARACTER';
                    }                               

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

INSTRUCCION : DECLARACION PUNTOYCOMA {$$=$1}
        |FUNCIONCOUT       {$$=$1;}
        |IFSIMPLE          {$$=$1;}
        |INVALID           {controller.listaErrores.push(new errores.default('ERROR LEXICO',$1,@1.first_line,@1.first_column));} //errores Léxicos
        |error PUNTOYCOMA  {controller.listaErrores.push(new errores.default(`ERROR SINTACTICO`,"Se esperaba token",@1.first_line,@1.first_column));}//errores Sintácticos
        |SENTENCIASCONTROL
        |DECLARACIONN      {$$=$1;}
;
IFSIMPLE: RESERVADAIF PARABRE EXPRESION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA {$$=new ifIns.default($3,$6, undefined, undefined, @1.first_line, @1.first_column);}
;


DECLARACION : TIPODECLARACION IDENTIFICADOR IGUAL EXPRESION
        |TIPODECLARACION IDENTIFICADOR
;

TIPODECLARACION: R_INT
            |R_DOUBLE
            |bool
            |R_CHAR
            |R_CADENA
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.13 OPERACIONES ARITMETICAS <<<<<<<<<<<<<<<<<<<<<<<<<<<
DECLARACIONN: RESINT IDENTIFICADOR IGUAL EXPRESION PUNTOYCOMA {$$=new declaracion.default($2,new Tipo.default(Tipo.DataType.ENTERO),$4,@1.first_line,@1.first_column);}
;
EXPRESION:EXPRESION MAS EXPRESION              {$$=new aritmetico.default(aritmetico.tipoOp.SUMA,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION MENOS EXPRESION             {$$=new aritmetico.default(aritmetico.tipoOp.RESTA,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION DIVISION EXPRESION          {$$=new aritmetico.default(aritmetico.tipoOp.DIVISION,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION MULTIPLICACION EXPRESION    {$$=new aritmetico.default(aritmetico.tipoOp.MULTIPLICACION,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION MODULO EXPRESION            {$$=new aritmetico.default(aritmetico.tipoOp.MODULO,$1,$3,@1.first_line,@1.first_column);}
        |POTENCIA PARABRE EXPRESION COMA EXPRESION PARCIERRA  {$$=new aritmetico.default(aritmetico.tipoOp.POTENCIA,$3,$5,@1.first_line,@1.first_column);}
        |MENOS EXPRESION %prec NEGACIONUNARIA  {$$=new aritmetico.default(aritmetico.tipoOp.NEGACIONUNARIA,$2,$2,@1.first_line,@1.first_column);}   
        |ENTERO                                {$$=new nativo.default(new Tipo.default(Tipo.DataType.ENTERO),$1,@1.first_line,@1.first_column);}
        |CADENA                                {$$=new nativo.default(new Tipo.default(Tipo.DataType.CADENA),$1,@1.first_line,@1.first_column);}
        |DECIMAL                               {$$=new nativo.default(new Tipo.default(Tipo.DataType.DECIMAL),$1,@1.first_line,@1.first_column);}
        |CARACTER                              {$$=new nativo.default(new Tipo.default(Tipo.DataType.CARACTER),$1,@1.first_line,@1.first_column);}
        |IDENTIFICADOR                         {$$=new nativo.default(new Tipo.default(Tipo.DataType.IDENTIFICADOR),$1,@1.first_line,@1.first_column);}
        |PARABRE EXPRESION PARCIERRA           {$$=$2;}
        |R_TRUE                                {$$=new nativo.default(new Tipo.default(Tipo.DataType.BOOLEAN),$1,@1.first_line,@1.first_column);}
        |R_FALSE                               {$$=new nativo.default(new Tipo.default(Tipo.DataType.BOOLEAN),$1,@1.first_line,@1.first_column);}
        |EXPRECIONRELACIONALYLOGICA            {$$=$1;}
        |EXPRESION MAYOR EXPRESION             {$$=new relacional.default(relacional.tipoOp.MAYOR,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION MAYORIGUAL EXPRESION              {$$=new relacional.default(relacional.tipoOp.MAYOR_IGUAL,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION MENOR EXPRESION                   {$$=new relacional.default(relacional.tipoOp.MENOR,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION MENORIGUAL EXPRESION              {$$=new relacional.default(relacional.tipoOp.MENOR_IGUAL,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION IGUALDAD EXPRESION                {$$=new relacional.default(relacional.tipoOp.IGUALACION,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION DIFERENTE EXPRESION               {$$=new relacional.default(relacional.tipoOp.DIFERENCIACION,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION  OR EXPRESION                     {$$=new logica.default(logica.tipoOp.OR,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION  AND EXPRESION                    {$$=new logica.default(logica.tipoOp.AND,$1,$3,@1.first_line,@1.first_column);}
        |NOT EXPRESION                               {$$=new logica.default(logica.tipoOp.NOT,$2,$2,@1.first_line,@1.first_column);}
        //|EXPRESION PARABRE EXPRESION PARCIERRA {$$=$1;}-----------------expresion (expresion);
        //double
        //char -caracter|
        //id
;

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

SENTENCIASCONTROL: IF CORCHETEABRE CORCHETECIERRA
;




//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.13 CASTEOS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONCASTEO:  PARABRE TIPOCASTEO PARCIERRA EXPRESION 
;

TIPOCASTEO: R_INT
        |R_DOUBLE
        |R_CHAR
        |R_CADENA
;

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.14 AUMENTO/DECREMENTO<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONAUMENTODECREMENTO: EXPRESION MAS MAS PUNTOYCOMA
        |EXPRESION MENOS MENOS PUNTOYCOMA
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

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.22 FUNCION TOLOWER<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONTOLOWER: TOLOWER PARABRE EXPRESION PARCIERRA PUNTOYCOMA
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.23 FUNCION TOUPPER<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONTOUPPER: TOUPPER PARABRE EXPRESION PARCIERRA PUNTOYCOMA
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.24 FUNCION ROUND<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONROUND: ROUND PARABRE EXPRESION PARCIERRA PUNTOYCOMA
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