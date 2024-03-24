%{

%}

%lex

%options case-insensitive

%%
//>>>>>>>>>>>>>>>>>>>>>>>>>>EXPRESIONES REGULARES<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
([a-zA-Z"_"])[a-z0-9A-Z"_""ñ""Ñ"]*      {yytext=yytext.toLowerCase();return "IDENTIFICADOR";}

\s+                 //espacios en blanco
"//".*		//comentario simple	
// comentario multiples líneas                              
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {   }// comentario multiples líneas                              
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
"*"                     return "ASTERISCO"; 
"/"                     return "DIAGONAL";
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
//>>>>>>>>>>>>>>>>>>>>>>>>>>PALABRAS RESERVADAS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<EOF>>             return 'EOF';
.                   {console.log(yylloc.first_line, yylloc.first_columm, 'Lexico', yytext)}
/lex


%start INI

%%

INI: INSTRUCCIONES EOF {return $1;}
;

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION     {if($2!=false)$1.push($2);$$=$1;}
            |INSTRUCCION                     {$$=($1!=false) ?[$1]:[];}
;

INSTRUCCION : DECLARACION PUNTOYCOMA
;

DECLARACION : TIPODEDATO IDENTIFICADOR IGUAL EXPRESION
;

TIPODEDATO:
            R_INT
            |R_DOUBLE
            |bool
            |R_CHAR
            |R_CADENA
;
EXPRESION: IDENTIFICADOR
;