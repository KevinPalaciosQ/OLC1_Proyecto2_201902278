%{
//importaciones
const nativo = require('./Expresions/Native');
const Tipo = require("./Symbol/Type");
const impresioncout = require('./Instructions/Cout');   
const impresioncouts = require('./Instructions/Coutsimple');   
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
//>>>>>>>>>>>>>>>>>>>>>>>>>>TIPOS DE DATOS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
"int"                  return "R_INT";
"double"               return "R_DOUBLE";
("true"|"false")\b      return 'bool';
"char"                 return "R_CHAR";
"std::string"          return "R_CADENA";
//>>>>>>>>>>>>>>>>>>>>>>>>>>SIMBOLOS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
","                    return "COMA"; 
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
"if"                    return "IF";
"else"                  return "ELSE";
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
"=="                    return "IGUALDAD";
"!="                    return "DIFERENTE";
"<"                     return "MENOR";
"<="                    return "MENORIGUAL";
">"                     return "MAYOR";
">="                    return "MAYORIGUAL";
//>>>>>>>>>>>>>>>>>>>>>>>>>>OPERADOR TERNARIO<<<<<<<<<<<<<<<<<<<<<<<<<<
"||"                    return "OR";
"&&"                    return "AND";
"!"                     return "NOT";




//>>>>>>>>>>>>>>>>>>>>>>>>>>INCREMENTO/DECREMENTO<<<<<<<<<<<<<<<<<<<<<<<<<<
"++"                    return "INCREMENTO";
"--"                    return "DECREMENTO";
[A-Za-z]+["_"0-9A-Za-z]*    return 'IDENTIFICADOR';
[0-9]+                      return 'ENTERO';
[0-9]+"."[0-9]+             return 'DECIMAL';  
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
%left INTERROGACION
%left OR
%left AND
%left MAS MENOS
%left MULTIPLICACION DIVISION MODULO
%left POTENCIA
%right not
//INICIO
%start INIT

%%

INIT: INSTRUCCIONES EOF {return $1;}
;

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION     {$1.push($2); $$=$1;}
            |INSTRUCCION                     {$$=[$1];}
;

INSTRUCCION : DECLARACION PUNTOYCOMA {$$=$1}
        |FUNCIONCOUT {$$=$1;}
        |INVALID {;} //errores Léxicos
        |error PUNTOYCOMA{;}//errores Sintácticos
        |SENTENCIASCONTROL
        |OPERADORESRELACIONALES
        
;

DECLARACION : TIPODECLARACION IDENTIFICADOR IGUAL EXPRESION
        |TIPODECLARACION IDENTIFICADOR
;

TIPODECLARACION:
            R_INT
            |R_DOUBLE
            |bool
            |R_CHAR
            |R_CADENA
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.13 OPERACIONES ARITMETICAS <<<<<<<<<<<<<<<<<<<<<<<<<<<

EXPRESION: ENTERO {$$=new nativo.default(new Tipo.default(Tipo.DataType.ENTERO),$1,@1.first_line,@1.first_column);}
        |CADENA {$$=new nativo.default(new Tipo.default(Tipo.DataType.CADENA),$1,@1.first_line,@1.first_column);}

;

SENTENCIASCONTROL: IF CORCHETEABRE CORCHETECIERRA
;

OPERADORESRELACIONALES: EXPRESION IGUALDAD EXPRESION
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
FUNCIONCOUT : COUT MENOR MENOR EXPRESION  PUNTOYCOMA {$$=new impresioncout.default($4,@1.first_line,@1.first_column,"");}
        |COUT MENOR MENOR EXPRESION MENOR MENOR ENDL PUNTOYCOMA {$$=new impresioncout.default($4,@1.first_line,@1.first_column,"saltoextra");}
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