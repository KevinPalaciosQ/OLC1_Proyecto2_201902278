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
---
# 6. Créditos
---
[Enlace a mi repositorio en GitHub](https://github.com/KevinPalaciosQ/OLC1_Proyecto2_201902278.git)