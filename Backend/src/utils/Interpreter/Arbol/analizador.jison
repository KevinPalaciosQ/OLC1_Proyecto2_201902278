//Importaciones
%{

%}

%lex

%options case-insensitive

%%

\s+                 //espacios en blanco
"//".*		        //comentario simple	
                    //comentario doble
[ \r\t]+ {}
//>>>>>>>>>>>>>>>>>>>>>>>>>>EXPRESIONES NATIVAS<<<<<<<<<<<<<<<<<<<<<<<<<<
"+"                     {return "MAS";}
"-"                     {return "MENOS";}
"*"                     {return "ASTERISCO";} 
"/"                     {return "DIAGONAL";}
"pow"                   {return "POTENCIA";}
"%"                     {return "MODULO";}
//>>>>>>>>>>>>>>>>>>>>>>>>>>OPERADORES RELACIONALES<<<<<<<<<<<<<<<<<<<<<<<<<<
"=="                    {return "IGUALDAD";}
"!="                    {return "DIFERENTE";}
"<"                     {return "MENOR";}
"<="                    {return "MENORIGUAL";}
">"                     {return "MAYOR";}
">="                    {return "MAYORIGUAL";}
//>>>>>>>>>>>>>>>>>>>>>>>>>>INCREMENTO/DECREMENTO<<<<<<<<<<<<<<<<<<<<<<<<<<
"++"                    {return "INCREMENTO";}
"--"                    {return "DECREMENTO";}
//>>>>>>>>>>>>>>>>>>>>>>>>>>PALABRAS RESERVADAS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

[0-9]+\b                return 'numero';
([a-zA-Z])[a-zA-Z0-9_]*	return 'id';
\'[^\']\'               return 'caracter';
\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; }

<<EOF>>             return 'EOF';
.                   return  "INVALID"
/lex

//Inicio de la Gramatica
%start INIT

%%

INIT: INSTRUCCIONES EOF {return $1;}
;

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION {$1.push($2); $$=$1;}
    | INSTRUCCION                        {$$=[$1];}
;

INSTRUCCION :   INVALID   {;}
        |error PUNTOYCOMA {;}

;