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
const tipoDe = require('./Instructions/TO');
const acadena = require('./Instructions/ToString');
const ifsito = require('./Instructions/SentenciaIf');
const elsito = require('./Instructions/Else');
const inswitch = require('./Instructions/SentenciaSwitch');
const caso = require('./Instructions/Caso');
const tocast = require('./Instructions/Casteo');
const insdowhile = require('./Instructions/DuWhile');
const ternario = require('./Instructions/Operadorternario');
//const Break = require('./Instructions/BreakAuxiliar');
const { agregarVariable, obtenerVariable, concatenacionl, limpieza } =require("./Instructions/identificadores");
const instruccionfor = require('./Instructions/Instfor');
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
"std::"                return "CASTEO";
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
"default"               return "RDEFAULT";
"while"                 return "RESERVADAWHILE";
"for"                   return "RFOR";
"do"                    return "RDO";
"break"                 return "RBREAK";
"continue"              return "RCONTINUE";
"return"                return "RRETURN";
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
"<<"                    return "MDOBLE";
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
%left INTERROGACION
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

INSTRUCCION : DECLARACION PUNTOYCOMA    {$$=$1;}
        |ASIGNACION PUNTOYCOMA        {$$=$1;}
        |FUNCIONCOUT                    {$$=$1;}
        |INSTRUCCIONBREAK PUNTOYCOMA //              {$$=$1;}//se agregó para el caso de break    |AGREGADOS Y NO SE SI SIRVEN 
        //|INSTRUCCIONCONTINUE             {$$=$1;}//se agregó para el caso de continue |AGREGADOS Y NO SE SI SIRVEN
        //|INSTRUCCIONRETURN  PUNTOYCOMA  {$$=$1;}//se agregó para el caso de return   |AGREGADOS Y NO SE SI SIRVEN
        |INSTRUCCIONFOR                 {$$=$1;}//esto es nuevo
        |WHILEINS                       {$$=$1;}
        |CICLODOWHILE                   {$$=$1;}
        |SENTENCIAIF                    {$$=$1;}
        |SENTENCIASWITCH                {$$=$1;}
        |AUMENTODECRE                   {$$=$1;}
        |INVALID                        {controller.listaErrores.push(new errores.default('ERROR LEXICO',$1,@1.first_line,@1.first_column));console.log(INVALID);console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);} //errores Léxicos
        |error PUNTOYCOMA               {controller.listaErrores.push(new errores.default(`ERROR SINTACTICO`,$1,@1.first_line,@1.first_column));console.error(yytext +' Es un error sintáctico '+ ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }//errores Sintácticos
;

AUMENTODECRE: IDENTIFICADOR INCREMENTO  PUNTOYCOMA     {$$=new incremento.default($1,@1.first_line,@1.first_column);}
        |IDENTIFICADOR DECREMENTO  PUNTOYCOMA     {$$=new decremento.default($1,@1.first_line,@1.first_column);}
;


//para lista de asignaciones hacer la misma logica de instrucciones
WHILEINS: RESERVADAWHILE PARABRE EXPRESION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA
        {$$=new whileIns.default($3,$6,@1.first_line,@1.first_column);}
;

CICLODOWHILE: RDO ENCAPSULAMIENTO RESERVADAWHILE PARABRE EXPRESION PARCIERRA PUNTOYCOMA {$$= new insdowhile.default($5,$2,@1.first_line,@1.first_column);}
;
//CREANDO EL IF Y ELSE

INSTRUCCIONCONTINUE: CONTINUE {}
;

INSTRUCCIONBREAK: RBREAK //{$$=$1;}// {$$=new Break.default(@first_line,@first_column);}
;

INSTRUCCIONRETURN: RETURN  {} //{ $$= new Inst_return(null, @1.first_line, @1.first_column); }
        |RETURN OPCIONES{}    //{ $$= new Inst_return($2, @1.first_line, @1.first_column); }
;

ENCAPSULAMIENTO: LLAVEABRE INSTRUCCIONES LLAVECIERRA {$$=$2;}
        |LLAVEABRE LLAVECIERRA  {[];}
;

SENTENCIAIF: RESERVADAIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO                              {$$=new ifsito.default($3,$5,null,null,@1.first_line,@1.first_column);console.log("3");}
        |RESERVADAIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO RESELSE ENCAPSULAMIENTO          {$$=new ifsito.default($3,$5,null,$7,@1.first_line,@1.first_column);console.log("4");} 
        |RESERVADAIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO LISTA_IF                         {$$=new ifsito.default($3,$5,$6,null,@1.first_line,@1.first_column);console.log("5");}
        |RESERVADAIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO LISTA_IF RESELSE ENCAPSULAMIENTO {$$=new ifsito.default($3,$5,$6,$8,@1.first_line,@1.first_column);console.log("6");}
;

LISTA_IF: LISTA_IF  PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO {$1.push(new elsito.default($4,$6,@1.first_line,@1.first_column)); $$=$1}
        | PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO{$$=[new elsito.default($3,$5,@1.first_line,@1.first_column)];}
;

//trabajando en switch
SENTENCIASWITCH: SWITCH PARABRE EXPRESION PARCIERRA LLAVEABRE LISTACASOS LLAVECIERRA                                  {$$=new inswitch.default($3,$6,null,@1.first_line,@1.first_column);console.log("switch 1");}
                |SWITCH PARABRE EXPRESION PARCIERRA LLAVEABRE LISTACASOS RDEFAULT DOSPUNTOS INSTRUCCIONES LLAVECIERRA {$$= new inswitch.default($3,$6,$9,@1.first_line,@1.first_column);console.log("switch 2");}
                |SWITCH PARABRE EXPRESION PARCIERRA LLAVEABRE RDEFAULT DOSPUNTOS INSTRUCCIONES LLAVECIERRA            {$$= new inswitch.default($3,null,$8,@1.first_line,@1.first_column);console.log("switch 3");}
;

LISTACASOS: LISTACASOS CASE EXPRESION DOSPUNTOS INSTRUCCIONES {$1.push(new caso.default($3,$5,@1.first_line,@1.first_column)); $$=$1;console.log("caso a");}
        |CASE EXPRESION DOSPUNTOS INSTRUCCIONES {$$=[new caso.default($2,$4,@1.first_line,@1.first_column)];console.log("caso b");}
;

//-----------------INSTRUCCION FOR-----------------
TIPOSFOR: DECLARACION {$$=$1;}
        |ASIGNACION   {$$=$1;}
;
ACTUALIZACIONFOR: IDENTIFICADOR INCREMENTO       {$$=new incremento.default($1,@1.first_line,@1.first_column);}
        |IDENTIFICADOR DECREMENTO       {$$=new decremento.default($1,@1.first_line,@1.first_column);}
        |ASIGNACION                     {$$=$1;}
;



INSTRUCCIONFOR:  RFOR PARABRE TIPOSFOR PUNTOYCOMA EXPRESION PUNTOYCOMA ACTUALIZACIONFOR PARCIERRA  ENCAPSULAMIENTO {$$= new instruccionfor.default($3,$5, $7, $9, @1.first_line, @1.first_column);console.log("DECLARACION-ASIGNACION"+$3);console.log("EXPRESION-CONDICIONAL"+$5);console.log("ITERACION"+$7);console.log("ACTUALIZACION"+$9);}
                 //for   (     dec-asig     ;       expt         ;           )
;

ASIGNACION: LISTA_IDENTIFICADORES IGUAL EXPRESION  {$$=new asignacionv.default($1,$3,@1.first_line,@1.first_column);console.log("soy asinacion");limpieza();}
;
DECLARACION : R_INT LISTA_IDENTIFICADORES IGUAL OPCIONES  {$$=new declaracion.default($2,new Tipo.default(Tipo.DataType.ENTERO),$4,@1.first_line,@1.first_column);limpieza();}
        |R_DOUBLE  LISTA_IDENTIFICADORES IGUAL OPCIONES   {$$=new declaracion.default($2,new Tipo.default(Tipo.DataType.DECIMAL),$4,@1.first_line,@1.first_column);limpieza();}
        |R_BOOL    LISTA_IDENTIFICADORES IGUAL OPCIONES   {$$=new declaracion.default($2,new Tipo.default(Tipo.DataType.BOOLEAN),$4,@1.first_line,@1.first_column);limpieza();}
        |R_CHAR    LISTA_IDENTIFICADORES IGUAL OPCIONES   {$$=new declaracion.default($2,new Tipo.default(Tipo.DataType.CARACTER),$4,@1.first_line,@1.first_column);limpieza();}
        |R_CADENA  LISTA_IDENTIFICADORES IGUAL OPCIONES   {$$=new declaracion.default($2,new Tipo.default(Tipo.DataType.CADENA),$4,@1.first_line,@1.first_column);limpieza();}

;
OPCIONES: EXPRESION     {$$=$1;}
        |FUNCIONCASTEO  {$$=$1;}
;
LISTA_IDENTIFICADORES : LISTA_IDENTIFICADORES COMA IDENTIFICADOR            {agregarVariable($3);concatenacionl($1);$$=obtenerVariable();}
        | IDENTIFICADOR                                                     {agregarVariable($1);$$=obtenerVariable();}
;


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.13 OPERACIONES ARITMETICAS <<<<<<<<<<<<<<<<<<<<<<<<<<<
EXPRESION: OPERACIONES                         {$$=$1;}
        |OPERACIONESLOGICAS                    {$$=$1;}
        |OPERACIONESRELACIONALES               {$$=$1;} 
        |ENTERO                                {$$=new nativo.default(new Tipo.default(Tipo.DataType.ENTERO),$1,@1.first_line,@1.first_column);}
        |CADENA                                {$$=new nativo.default(new Tipo.default(Tipo.DataType.CADENA),$1,@1.first_line,@1.first_column);}
        |DECIMAL                               {$$=new nativo.default(new Tipo.default(Tipo.DataType.DECIMAL),$1,@1.first_line,@1.first_column);}
        |CARACTER                              {$$=new nativo.default(new Tipo.default(Tipo.DataType.CARACTER),$1,@1.first_line,@1.first_column);}
        |IDENTIFICADOR                         {$$=new nativo.default(new Tipo.default(Tipo.DataType.IDENTIFICADOR),$1,@1.first_line,@1.first_column);}
        |R_TRUE                                {$$=new nativo.default(new Tipo.default(Tipo.DataType.BOOLEAN),$1,@1.first_line,@1.first_column);}
        |R_FALSE                               {$$=new nativo.default(new Tipo.default(Tipo.DataType.BOOLEAN),$1,@1.first_line,@1.first_column);}
        |FUNCIONESVARIAS                       {$$=$1;}    
        |OPERADORTERNARIO                      {$$=$1;}

;

OPERACIONES: MENOS EXPRESION %prec NEGACIONUNARIA             {$$=new aritmetico.default(aritmetico.tipoOp.NEGACIONUNARIA,$2,$2,@1.first_line,@1.first_column);} 
        |EXPRESION MAS EXPRESION                              {$$=new aritmetico.default(aritmetico.tipoOp.SUMA,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION MENOS EXPRESION                            {$$=new aritmetico.default(aritmetico.tipoOp.RESTA,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION MULTIPLICACION EXPRESION                   {$$=new aritmetico.default(aritmetico.tipoOp.MULTIPLICACION,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION DIVISION EXPRESION                         {$$=new aritmetico.default(aritmetico.tipoOp.DIVISION,$1,$3,@1.first_line,@1.first_column);}
        |EXPRESION MODULO EXPRESION                           {$$=new aritmetico.default(aritmetico.tipoOp.MODULO,$1,$3,@1.first_line,@1.first_column);}
        |POTENCIA PARABRE EXPRESION COMA EXPRESION PARCIERRA  {$$=new aritmetico.default(aritmetico.tipoOp.POTENCIA,$3,$5,@1.first_line,@1.first_column);}
        |PARABRE EXPRESION PARCIERRA                          {$$=$2;}
;

OPERACIONESLOGICAS: NOT EXPRESION             {$$=new logica.default(logica.tipoOp.NOT,$2,$2,@1.first_line,@1.first_column);}
                   |EXPRESION  OR EXPRESION   {$$=new logica.default(logica.tipoOp.OR,$1,$3,@1.first_line,@1.first_column);}
                   |EXPRESION  AND EXPRESION  {$$=new logica.default(logica.tipoOp.AND,$1,$3,@1.first_line,@1.first_column);}
;
OPERACIONESRELACIONALES:  EXPRESION MAYORIGUAL EXPRESION  {$$=new relacional.default(relacional.tipoOp.MAYOR_IGUAL,$1,$3,@1.first_line,@1.first_column);} 
                         |EXPRESION MAYOR EXPRESION       {$$=new relacional.default(relacional.tipoOp.MAYOR,$1,$3,@1.first_line,@1.first_column);}
                         |EXPRESION MENORIGUAL EXPRESION  {$$=new relacional.default(relacional.tipoOp.MENOR_IGUAL,$1,$3,@1.first_line,@1.first_column);}                         
                         |EXPRESION MENOR EXPRESION       {$$=new relacional.default(relacional.tipoOp.MENOR,$1,$3,@1.first_line,@1.first_column);}
                         |EXPRESION IGUALDAD EXPRESION    {$$=new relacional.default(relacional.tipoOp.IGUALACION,$1,$3,@1.first_line,@1.first_column);}
                         |EXPRESION DIFERENTE EXPRESION   {$$=new relacional.default(relacional.tipoOp.DIFERENCIACION,$1,$3,@1.first_line,@1.first_column);}
;

OPERADORTERNARIO: EXPRESION INTERROGACION EXPRESION DOSPUNTOS EXPRESION  {$$= new ternario.default($1,$3,$5,@1.first_line,@1.first_column);console.log("Ternario");}
;

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.13 CASTEOS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONCASTEO:  PARABRE TIPODECLARACION PARCIERRA EXPRESION  {$$=new tocast.default($4,$2,@1.first_line,@1.first_column);}
;

TIPODECLARACION: R_INT {$$=new Tipo.default(Tipo.DataType.ENTERO);}
        |R_DOUBLE      {$$=new Tipo.default(Tipo.DataType.DECIMAL);}
        |R_CHAR        {$$=new Tipo.default(Tipo.DataType.CARACTER);}
        |R_CADENA      {$$=new Tipo.default(Tipo.DataType.CADENA);}
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
FUNCIONCOUT : COUT MDOBLE  EXPRESION MDOBLE ENDL PUNTOYCOMA {$$=new impresioncout.default($3,@1.first_line,@1.first_column,"saltoextra");}
        |COUT MDOBLE EXPRESION  PUNTOYCOMA                  {$$=new impresioncout.default($3,@1.first_line,@1.first_column,"");}//EXPRESIONLOGICA
;
FUNCIONESVARIAS: FUNCIONTOUPPER  {$$=$1;}
                |FUNCIONTOLOWER  {$$=$1;}
                |FUNCIONROUND    {$$=$1;}
                |FUNCIONTYPEOF   {$$=$1;}
                |FUNCIONTOSTRING {$$=$1;}
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.22 FUNCION TOLOWER<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONTOLOWER: RTOLOWER PARABRE EXPRESION PARCIERRA {$$=new minuscula.default($3,@1.first_line,@1.first_column);}
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.23 FUNCION TOUPPER<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONTOUPPER: RTOUPPER PARABRE EXPRESION PARCIERRA {$$=new mayuscula.default($3,@1.first_line,@1.first_column);}
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.24 FUNCION ROUND<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONROUND: ROUND PARABRE EXPRESION PARCIERRA  {$$=new aproximacion.default($3,@1.first_line,@1.first_column);}
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.25.1 FUNCION LENGTH<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONLENGHT: EXPRESION PUNTO LENGTH PARABRE PARCIERRA PUNTOYCOMA 
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.25.2 FUNCION TYPEOF<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONTYPEOF: TYPEOF PARABRE EXPRESION PARCIERRA  {$$=new tipoDe.default($3,@1.first_line,@1.first_column);}
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.25.3 FUNCION TOSTRING<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONTOSTRING: CASTEO TOSTRING PARABRE EXPRESION PARCIERRA  {$$=new acadena.default($4,@1.first_line,@1.first_column);console.log("ToString");}
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.25.4 FUNCION C_STR<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONCSTR: EXPRESION PUNTO C_STR PARABRE PARCIERRA PUNTOYCOMA
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.25.5 FUNCION EXECUTE<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONEXECUTE: EXECUTE IDENTIFICADOR PARABRE PARCIERRA PUNTOYCOMA 
        |EXECUTE IDENTIFICADOR PARABRE CORCHETEABRE EXPRESION CORCHETECIERRA PARCIERRA PUNTOYCOMA
;


