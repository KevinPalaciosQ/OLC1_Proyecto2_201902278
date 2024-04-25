%{
    //codigo js
    const Nodo = require('./Nodo');
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

INIT: INSTRUCCIONES EOF                    {$$=new Nodo.default("INICIO","");
                                            $$.agregarHijo($1);
                                            return $$;
                                            }
;

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION {$$= new Nodo.default("INSTRUCCIONES","");
                                    $$.agregarHijo($1);
                                    $$.agregarHijo($2);
                                }
            |INSTRUCCION                     {$$=new Nodo.default("INSTRUCCIONES","");
                                                $$.agregarHijo($1);
                                                }
;

INSTRUCCION : DECLARACION PUNTOYCOMA        {$$=new Nodo.default("DECLARACION","");
                                            $$.agregarHijo($1);
                                            }


        |ASIGNACION PUNTOYCOMA          {$$=new Nodo.default("ASIGNACION","");
                                        $$.agregarHijo($1);
                                        return $$;
                                        }
        |FUNCIONCOUT                    {$$=new Nodo.default("INSTRUCCION","");
                                                                            $$.agregarHijo($1);
                                                                            }
        |INSTRUCCIONFOR                 {$$=new Nodo.default("INSTRUCCIONFOR","");
                                        $$.agregarHijo($1);
                                        return $$;}
        |WHILEINS                       {$$=new Nodo.default("WHILEINS","");
                                        $$.agregarHijo($1);
                                        return $$;}
        |CICLODOWHILE                   {$$=new Nodo.default("CICLODOWHILE","");
                                        $$.agregarHijo($1);
                                        return $$;}
        |SENTENCIAIF                    {$$=new Nodo.default("INSTRUCCIONES","");
                                        $$.agregarHijo($1);
                                        return $$;}
        |SENTENCIASWITCH                {$$=new Nodo.default("SENTENCIASWITCH","");
                                        $$.agregarHijo($1);
                                        return $$;}
        |AUMENTODECRE                   {$$=new Nodo.default("AUMENTODECRE","");
                                        $$.agregarHijo($1);
                                        return $$;}
        |INVALID                        {$$=new Nodo.default("INSTRUCCIONES","");
                                        $$.agregarHijo(new Nodo.default("ERROR LEXICO",""));
                                        }
        |error PUNTOYCOMA               {$$=new Nodo.default("INSTRUCCIONES","");
                                        $$.agregarHijo(new Nodo.default("ERROR SEMANTICO",""));
                                        $$.agregarHijo(new Nodo.default(";","PUNTOYCOMA"));
                                        }         
;

AUMENTODECRE: IDENTIFICADOR INCREMENTO  PUNTOYCOMA     
        |IDENTIFICADOR DECREMENTO  PUNTOYCOMA     
;


//para lista de asignaciones hacer la misma logica de instrucciones
WHILEINS: RESERVADAWHILE PARABRE EXPRESION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA
        
;

CICLODOWHILE: RDO ENCAPSULAMIENTO RESERVADAWHILE PARABRE EXPRESION PARCIERRA PUNTOYCOMA 
;
//CREANDO EL IF Y ELSE

INSTRUCCIONCONTINUE: CONTINUE 
;

INSTRUCCIONBREAK: RBREAK 
;

INSTRUCCIONRETURN: RETURN  
        |RETURN OPCIONES  
;

ENCAPSULAMIENTO: LLAVEABRE INSTRUCCIONES LLAVECIERRA                       {$$=new Nodo.default("ENCAPSULAMIENTO", "");
                                                                            $$.agregarHijo(new Nodo.default("{", "LLAVEA"));
                                                                            $$.agregarHijo($2);
                                                                            $$.agregarHijo(new Nodo.default("}", "LLAVEC"));
                                                                            } 
        |LLAVEABRE LLAVECIERRA                                            {$$=new Nodo.default("ENCAPSULAMIENTO", "");
                                                                            $$.agregarHijo(new Nodo.default("{", "LLAVEA"));
                                                                            $$.agregarHijo(new Nodo.default("}", "LLAVEC"));
                                                                            }  
;

SENTENCIAIF: RESERVADAIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO                           {$$ = new Nodo.default("SENTENCIA IF","");
                                                                                                $$.agregarHijo(new Nodo.default("if","IF"));
                                                                                                $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                                $$.agregarHijo($3);
                                                                                                $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                                $$.agregarHijo($5);
                                                                                                }                              
        |RESERVADAIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO RESELSE ENCAPSULAMIENTO       {$$ = new Nodo.default("SENTENCIA IF","");
                                                                                                $$.agregarHijo(new Nodo.default("if","IF"));
                                                                                                $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                                $$.agregarHijo($3);
                                                                                                $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                                $$.agregarHijo($5);
                                                                                                $$.agregarHijo(new Nodo.default("else","RELSE"));
                                                                                                $$.agregarHijo($7);
                                                                                                }          
        |RESERVADAIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO LISTA_IF                       {$$ = new Nodo.default("SENTENCIA IF","");
                                                                                                $$.agregarHijo(new Nodo.default("if","IF"));
                                                                                                $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                                $$.agregarHijo($3);
                                                                                                $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                                $$.agregarHijo($5);
                                                                                                $$.agregarHijo($6);
                                                                                                }                        
        |RESERVADAIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO LISTA_IF RESELSE ENCAPSULAMIENTO {$$ = new Nodo.default("SENTENCIA IF","");
                                                                                                $$.agregarHijo(new Nodo.default("if","IF"));
                                                                                                $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                                $$.agregarHijo($3);
                                                                                                $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                                $$.agregarHijo($5);
                                                                                                $$.agregarHijo($6);
                                                                                                $$.agregarHijo(new Nodo.default("else","RELSE"));
                                                                                                $$.agregarHijo($8);
                                                                                                }

;

LISTA_IF: LISTA_IF  PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO  {$$ = new Nodo.default("LISTA IF","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("elseif","ELSEIF"));
                                                                            $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                            $$.agregarHijo($4);
                                                                            $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                            $$.agregarHijo($6);
                                                                            }
        | PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO {$$ = new Nodo.default("LISTA IF","");
                                                                            $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                            $$.agregarHijo($3);
                                                                            $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                            $$.agregarHijo($5);
                                                                            }
;

SENTENCIASWITCH: SWITCH PARABRE EXPRESION PARCIERRA LLAVEABRE LISTACASOS LLAVECIERRA                               {$$=new Nodo.default("SENTENCIA SWITCH","");
                                                                                                                    $$.agregarHijo(new Nodo.default("switch","SWITCH"));
                                                                                                                    $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                                                    $$.agregarHijo($3);
                                                                                                                    $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                                                    $$.agregarHijo(new Nodo.default("{","LLAVEABRE"));
                                                                                                                    $$.agregarHijo($6);
                                                                                                                    $$.agregarHijo(new Nodo.default("}","LLAVECIERRA"));
                                                                                                                    }                                 
                |SWITCH PARABRE EXPRESION PARCIERRA LLAVEABRE LISTACASOS RDEFAULT DOSPUNTOS INSTRUCCIONES LLAVECIERRA {$$=new Nodo.default("SENTENCIA SWITCH","");
                                                                                                                    $$.agregarHijo(new Nodo.default("switch","SWITCH"));
                                                                                                                    $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                                                    $$.agregarHijo($3);
                                                                                                                    $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                                                    $$.agregarHijo(new Nodo.default("{","LLAVEABRE"));
                                                                                                                    $$.agregarHijo($6);
                                                                                                                    $$.agregarHijo(new Nodo.default("default","RDEFAULT"));
                                                                                                                    $$.agregarHijo(new Nodo.default(":","DOSPUNTOS"));
                                                                                                                    $$.agregarHijo($9);
                                                                                                                    $$.agregarHijo(new Nodo.default("}","LLAVECIERRA"));
                                                                                                                    }
                |SWITCH PARABRE EXPRESION PARCIERRA LLAVEABRE RDEFAULT DOSPUNTOS INSTRUCCIONES LLAVECIERRA {$$=new Nodo.default("SENTENCIA SWITCH","");
                                                                                                                    $$.agregarHijo(new Nodo.default("switch","SWITCH"));
                                                                                                                    $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                                                    $$.agregarHijo($3);
                                                                                                                    $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                                                    $$.agregarHijo(new Nodo.default("{","LLAVEA"));
                                                                                                                    $$.agregarHijo($6);
                                                                                                                    $$.agregarHijo(new Nodo.default("default","RDEFAULT"));
                                                                                                                    $$.agregarHijo(new Nodo.default(":","DOSPUNTOS"));
                                                                                                                    $$.agregarHijo($9);
                                                                                                                    $$.agregarHijo(new Nodo.default("}","LLAVEC"));
                                                                                                                    }        
;

LISTACASOS: LISTACASOS CASE EXPRESION DOSPUNTOS INSTRUCCIONES            {$$= new Nodo.default("LISTACASOS","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("case","CASE"));
                                                                            $$.agregarHijo($3);
                                                                            $$.agregarHijo(new Nodo.default(":","DOSPUNTOS"));
                                                                            $$.agregarHijo($5);
                                                                            }
        |CASE EXPRESION DOSPUNTOS INSTRUCCIONES                         {$$= new Nodo.default("LISTACASOS","");
                                                                            $$.agregarHijo(new Nodo.default("case","CASE"));
                                                                            $$.agregarHijo($2);
                                                                            $$.agregarHijo(new Nodo.default(":","DOSPUNTOS"));
                                                                            $$.agregarHijo($4);
                                                                            }
;

TIPOSFOR: DECLARACION 
        |ASIGNACION  
;
ACTUALIZACIONFOR: IDENTIFICADOR INCREMENTO      
        |IDENTIFICADOR DECREMENTO       
        |ASIGNACION                    
;



INSTRUCCIONFOR:  RFOR PARABRE TIPOSFOR PUNTOYCOMA EXPRESION PUNTOYCOMA ACTUALIZACIONFOR PARCIERRA  ENCAPSULAMIENTO 
;

ASIGNACION: LISTA_IDENTIFICADORES IGUAL EXPRESION  
;
DECLARACION : R_INT LISTA_IDENTIFICADORES IGUAL OPCIONES                                                   {$$=new Nodo.default("DECLARACION","");
                                                                                                            $$.agregarHijo($1);
                                                                                                            $$.agregarHijo(new Nodo.default("ENTERO","int"));
                                                                                                            $$.agregarHijo($2);
                                                                                                            $$.agregarHijo(new Nodo.default("IGUAL","="));
                                                                                                            $$.agregarHijo($4);
                                                                                                            }   
        |R_DOUBLE  LISTA_IDENTIFICADORES IGUAL OPCIONES                                                   {$$=new Nodo.default("DECLARACION","");
                                                                                                            $$.agregarHijo($1);
                                                                                                            $$.agregarHijo(new Nodo.default("Double","double"));
                                                                                                            $$.agregarHijo($2);
                                                                                                            $$.agregarHijo(new Nodo.default("IGUAL","="));
                                                                                                            $$.agregarHijo($4);
                                                                                                            }  
        |R_BOOL    LISTA_IDENTIFICADORES IGUAL OPCIONES  
        |R_CHAR    LISTA_IDENTIFICADORES IGUAL OPCIONES  
        |R_CADENA  LISTA_IDENTIFICADORES IGUAL OPCIONES   
;
OPCIONES: EXPRESION  {$$=new Nodo.default("OPCIONES","");//aca empieza a fallar
                        $$.agregarHijo($1);
                        return $$;
                        }
        |FUNCIONCASTEO {$$=new Nodo.default("OPCIONES","");//AHORA FUNCIONA PERO NO SUBE
                        $$.agregarHijo($1);
                        return $$;
                        }
;

LISTA_IDENTIFICADORES : LISTA_IDENTIFICADORES COMA IDENTIFICADOR    {$$=new Nodo.default("LISTA_IDENTIFICADORES", "");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default(",", "COMA"));
                                                                            $$.agregarHijo(new Nodo.default($3, "IDENTIFICADOR"));
                                                                            }        
        | IDENTIFICADOR                                        {$$=new Nodo.default("LISTA_IDENTIFICADORES", "");
                                                                            $$.agregarHijo(new Nodo.default($1, "IDENTIFICADOR"));
                                                                            }                                      
;


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.13 OPERACIONES ARITMETICAS <<<<<<<<<<<<<<<<<<<<<<<<<<<
EXPRESION: OPERACIONES                  {$$ = new Nodo.default("OPERACIONES",""); 
                                        $$.agregarHijo($1);}                
        |OPERACIONESLOGICAS             {$$ = new Nodo.default("OPERACIONESLOGICAS",""); 
                                            $$.agregarHijo($1);}               
        |OPERACIONESRELACIONALES        {$$ = new Nodo.default("OPERACIONESRELACIONALES","");
                                            $$.agregarHijo($1);
                                            }         
        |ENTERO                                                          {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default($1,"ENTERO"));}                                
        |CADENA                                                          {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default($1,"CADENA"));}                              
        |DECIMAL                                                          {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default($1,"DECIMAL"));}                               
        |CARACTER                                                          {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default($1,"CARACTER"));}                              
        |IDENTIFICADOR                                                          {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default($1,"IDENTIFICADOR"));}                         
        |R_TRUE                                                          {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default($1,"TRUE"));}                                
        |R_FALSE                                                          {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default($1,"FALSE"));}                              
        |FUNCIONESVARIAS                                                          {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default($1,"FUNCIONESVARIAS"));}                       
        |OPERADORTERNARIO                                                          {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default($1,"OPERADORTERNARIO"));}                   
;

OPERACIONES: MENOS EXPRESION %prec NEGACIONUNARIA                          {$$ = new Nodo.default("OPERACIONES","");
                                                                            $$.agregarHijo(new Nodo.default("-","NEGATIVO"));
                                                                            $$.agregarHijo($2);
                                                                            }             
        |EXPRESION MAS EXPRESION                                           {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("+","MAS"));
                                                                            $$.agregarHijo($3);
                                                                            }                              
        |EXPRESION MENOS EXPRESION                                       {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("-","MENOS"));
                                                                            $$.agregarHijo($3);
                                                                            }                           
        |EXPRESION MULTIPLICACION EXPRESION                              {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("*","MULTIPLICACION"));
                                                                            $$.agregarHijo($3);
                                                                            }                   
        |EXPRESION DIVISION EXPRESION                                    {$$ = new Nodo.default("/","DIVISION");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("+","MAS"));
                                                                            $$.agregarHijo($3);
                                                                            }                         
        |EXPRESION MODULO EXPRESION                                      {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("%","MODULO"));
                                                                            $$.agregarHijo($3);
                                                                            }                          
        |POTENCIA PARABRE EXPRESION COMA EXPRESION PARCIERRA                                    {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("^","POW"));
                                                                            $$.agregarHijo($3);
                                                                            } 
        |PARABRE EXPRESION PARCIERRA                                     {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default("(",""));
                                                                            $$.agregarHijo($2);
                                                                            $$.agregarHijo(new Nodo.default(")",""));
                                                                            }                        
;

OPERACIONESLOGICAS: NOT EXPRESION                                          {$$ = new Nodo.default("OPERACIONESLOGICAS","");
                                                                            $$.agregarHijo(new Nodo.default("!","NOT"));
                                                                            $$.agregarHijo($3);
                                                                            }             
                   |EXPRESION  OR EXPRESION                                {$$ = new Nodo.default("OPERACIONESLOGICAS","");
                                                                            $$.agregarHijo(new Nodo.default("||","OR"));
                                                                            $$.agregarHijo($3);
                                                                            }   
                   |EXPRESION  AND EXPRESION                               {$$ = new Nodo.default("OPERACIONESLOGICAS","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("&&","AND"));
                                                                            $$.agregarHijo($3);
                                                                            }  
;
OPERACIONESRELACIONALES:  EXPRESION MAYORIGUAL EXPRESION                   {$$ = new Nodo.default("OPERACIONESRELACIONALES","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("=>","MAYOR"));
                                                                            $$.agregarHijo($3);
                                                                            }
                         |EXPRESION MAYOR EXPRESION                       {$$ = new Nodo.default("OPERACIONESRELACIONALES","");
                                                                           $$.agregarHijo($1);
                                                                           $$.agregarHijo(new Nodo.default(">","MAYORIGUAL"));
                                                                           $$.agregarHijo($3);
                                                                           }       
                         |EXPRESION MENORIGUAL EXPRESION                  {$$ = new Nodo.default("OPERACIONESRELACIONALES","");
                                                                           $$.agregarHijo($1);
                                                                           $$.agregarHijo(new Nodo.default("<=","MENORIGUAL"));
                                                                           $$.agregarHijo($3);
                                                                            }                      
                         |EXPRESION MENOR EXPRESION                      {$$ = new Nodo.default("OPERACIONESRELACIONALES","");
                                                                          $$.agregarHijo($1);
                                                                          $$.agregarHijo(new Nodo.default("<","MENOR"));
                                                                          $$.agregarHijo($3);
                                                                            }       
                         |EXPRESION IGUALDAD EXPRESION                   {$$ = new Nodo.default("OPERACIONESRELACIONALES","");
                                                                          $$.agregarHijo($1);
                                                                          $$.agregarHijo(new Nodo.default("==","IGUALDAD"));
                                                                          $$.agregarHijo($3);
                                                                            }    
                         |EXPRESION DIFERENTE EXPRESION                  {$$ = new Nodo.default("OPERACIONESRELACIONALES","");
                                                                          $$.agregarHijo($1);
                                                                          $$.agregarHijo(new Nodo.default("!=","DIFERENTE"));
                                                                          $$.agregarHijo($3);
                                                                            }   
;

OPERADORTERNARIO: EXPRESION INTERROGACION EXPRESION DOSPUNTOS EXPRESION  
;

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.13 CASTEOS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONCASTEO:  PARABRE TIPODECLARACION PARCIERRA EXPRESION                {$$= new Nodo.default("FUNCIONCASTEO","");
                                                                            $$.agregarHijo(new Nodo.default("(",""));
                                                                            $$.agregarHijo($2);
                                                                            $$.agregarHijo(new Nodo.default(")",""));
                                                                            $$.agregarHijo($4);
                                                                            } 
;

TIPODECLARACION: R_INT                                                             {$$=new Nodo.default("TIPODECLARACION","");//FUNCIONA PERO NO SUBE 
                                                                            $$.agregarHijo(new Nodo.default("int","RINT"));
                                                                            }
                |R_DOUBLE                                                             {$$=new Nodo.default("TIPODECLARACION","");
                                                                            $$.agregarHijo(new Nodo.default("double","DOUBLE"));
                                                                            }
                |R_CHAR                                                              {$$=new Nodo.default("TIPODECLARACION","");
                                                                            $$.agregarHijo(new Nodo.default("char","CARACTER"));
                                                                            }
                |R_CADENA                                                              {$$=new Nodo.default("TIPODECLARACION","");
                                                                            $$.agregarHijo(new Nodo.default("cadena","CADENA"));
                                                                            } 
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
FUNCIONCOUT : COUT MDOBLE  EXPRESION MDOBLE ENDL PUNTOYCOMA {$$=new Nodo.default("FUNCIONCOUT","");//FUNCIONA PERFECTAMENTE
                                                                            $$.agregarHijo(new Nodo.default("cout","COUT"));
                                                                            $$.agregarHijo(new Nodo.default("<<","MDOBLE"));
                                                                            $$.agregarHijo($3);
                                                                            $$.agregarHijo(new Nodo.default("<<","MDOBLE"));
                                                                            $$.agregarHijo(new Nodo.default(";","PUNTOYCOMA"));
                                                                            }
        |COUT MDOBLE EXPRESION  PUNTOYCOMA {$$=new Nodo.default("FUNCIONCOUT","");
                                                                            $$.agregarHijo(new Nodo.default("cout","COUT"));
                                                                            $$.agregarHijo(new Nodo.default("<<","MDOBLE"));
                                                                            $$.agregarHijo($3);
                                                                            $$.agregarHijo(new Nodo.default(";","PUNTOYCOMA"));
                                                                            }                 
;
FUNCIONESVARIAS: FUNCIONTOUPPER {$$=new Nodo.default("FUNCIONTOUPPER","");//----------------------------------------DEBE REVISARSE
                        $$.agregarHijo($1);
                        return $$;
                        } 
                |FUNCIONTOLOWER {$$=new Nodo.default("FUNCIONTOLOWER","");
                        $$.agregarHijo($1);
                        return $$;
                        } 
                |FUNCIONROUND  {$$=new Nodo.default("FUNCIONROUND","");
                        $$.agregarHijo($1);
                        return $$;
                        }  
                |FUNCIONTYPEOF {$$=new Nodo.default("FUNCIONTYPEOF","");
                        $$.agregarHijo($1);
                        return $$;
                        }  
                |FUNCIONTOSTRING {$$=new Nodo.default("FUNCIONTOSTRING","");
                        $$.agregarHijo($1);
                        return $$;
                        }
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.22 FUNCION TOLOWER<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONTOLOWER: RTOLOWER PARABRE EXPRESION PARCIERRA                       {$$= new Nodo.default("FUNCIONTOLOWER","");//--------------------------FUNCIONA PERO DEBE SUBIR
                                                                            $$.agregarHijo(new Nodo.default("TOLOWER",""));
                                                                            $$.agregarHijo(new Nodo.default("(",""));
                                                                            $$.agregarHijo($3);
                                                                            $$.agregarHijo(new Nodo.default(")",""));
                                                                            } 
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.23 FUNCION TOUPPER<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONTOUPPER: RTOUPPER PARABRE EXPRESION PARCIERRA                {$$= new Nodo.default("FUNCIONTOUPPER","");//--------------------------FUNCIONA PERO DEBE SUBIR
                                                                            $$.agregarHijo(new Nodo.default("TOUPPER",""));
                                                                            $$.agregarHijo(new Nodo.default("(",""));
                                                                            $$.agregarHijo($3);
                                                                            $$.agregarHijo(new Nodo.default(")",""));
                                                                            }
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.24 FUNCION ROUND<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONROUND: ROUND PARABRE EXPRESION PARCIERRA                 {$$= new Nodo.default("FUNCIONROUND","");//--------------------------FUNCIONA PERO DEBE SUBIR
                                                                            $$.agregarHijo(new Nodo.default("ROUND",""));
                                                                            $$.agregarHijo(new Nodo.default("(",""));
                                                                            $$.agregarHijo($3);
                                                                            $$.agregarHijo(new Nodo.default(")",""));
                                                                            } 
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.25.1 FUNCION LENGTH<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONLENGHT: EXPRESION PUNTO LENGTH PARABRE PARCIERRA PUNTOYCOMA  
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.25.2 FUNCION TYPEOF<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONTYPEOF: TYPEOF PARABRE EXPRESION PARCIERRA                {$$= new Nodo.default("FUNCIONTYPEOF","");//--------------------------FUNCIONA PERO DEBE SUBIR
                                                                            $$.agregarHijo(new Nodo.default("TYPEOF",""));
                                                                            $$.agregarHijo(new Nodo.default("(",""));
                                                                            $$.agregarHijo($3);
                                                                            $$.agregarHijo(new Nodo.default(")",""));
                                                                            } 
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.25.3 FUNCION TOSTRING<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONTOSTRING: CASTEO TOSTRING PARABRE EXPRESION PARCIERRA  {$$= new Nodo.default("FUNCIONTOSTRING","");//--------------------------FUNCIONA PERO DEBE SUBIR
                                                                            $$.agregarHijo(new Nodo.default("std:: toString",""));
                                                                            $$.agregarHijo(new Nodo.default("(",""));
                                                                            $$.agregarHijo($4);
                                                                            $$.agregarHijo(new Nodo.default(")",""));
                                                                            } 
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.25.4 FUNCION C_STR<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONCSTR: EXPRESION PUNTO C_STR PARABRE PARCIERRA PUNTOYCOMA
;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>5.25.5 FUNCION EXECUTE<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
FUNCIONEXECUTE: EXECUTE IDENTIFICADOR PARABRE PARCIERRA PUNTOYCOMA 
        |EXECUTE IDENTIFICADOR PARABRE CORCHETEABRE EXPRESION CORCHETECIERRA PARCIERRA PUNTOYCOMA
;


