import React, { useRef, useState  } from 'react';
import './Estilo.css'
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from "@codemirror/lang-cpp";
import { saveAs } from 'file-saver';
import Services from '../Services/Service';
//import Graphviz from 'graphviz-react';
//import Viz from 'viz.js';
function Principal() {
    //         id,   funcion
    //const [error, setError] = useState(''); // Estado para almacenar Errores
  //  const[astgraph, setAstgraph] = useState(`digraph G { "AST"->"INICIO";}`);
    const inputFileRef = useRef(null);
    const [codigo, setCodigo] = useState('');
    const [nombreArchivo, setNombreArchivo] = useState('');
    const [salida, setSalida] = useState(''); // Estado para almacenar la salida del analizador

    const ejecutar  = async() => {
        const response = await Services.parse(codigo);
        
        console.log("xd"+response.consola);    
        setSalida(response.consola);
        console.log("listaerrores"+response.errores)
        console.log("listasimbolos"+response.simbolos)
        //setAstgraph(response.astgraph);
        //console.log("contenido"+response.astgraph);
    }
    
    const abrirArchivo = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (event) => {
            const fileContent = event.target.result;
            console.log("Contenido del archivo abierto:", fileContent);
            setCodigo(fileContent); // Actualizar el estado con el contenido del archivo
            setNombreArchivo(file.name); // Actualizar el nombre del archivo
        };
        
        reader.readAsText(file);
    };
    const GuardarArchivo = () => {
        if (codigo.trim() !== '') {
            if (nombreArchivo.trim() !== '') {
                // Crear un nuevo Blob con el contenido del editor
                const blob = new Blob([codigo], { type: 'text/plain;charset=utf-8' });
                // Intentar guardar con el mismo nombre
                if (navigator.msSaveOrOpenBlob) {
                    navigator.msSaveOrOpenBlob(blob, nombreArchivo);
                } else {
                    saveAs(blob, nombreArchivo);
                }
                console.log('Archivo guardado exitosamente.');
            } else {
                console.log('No se ha proporcionado un nombre de archivo.');
            }
        } else {
            console.log('No hay contenido para guardar.');
        }
    };
    const CrearArchivo = () => {
        setCodigo(''); // Establecer el contenido como vacío
        setNombreArchivo('NuevoArchivo.sc'); // Establecer un nombre predeterminado para el nuevo archivo
    };
    const onchangecodigo = (value) => {
        setCodigo(value); // Actualizar el estado con el valor del editor
    };
    const ReporteErrores = () => {
        // Supongamos que tienes una lista de errores con la misma estructura que los símbolos
        const errores = [
            { numero:"1", tipo: "Léxico", descripcion: "El cáracter '$' no pertenece al lenguaje.", linea: 5, columna: 3 },
            {numero:"2", tipo: "Sintáctico", descripcion: "Se encontró un Identificador y se esperaba Expresión.", linea: 6, columna: 3 }
            // Puedes agregar más errores según necesites
        ];
    
        // Construir el contenido del archivo HTML
        let contenidoHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Reporte de Errores</title>
                <!-- Bootstrap CSS -->
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        background-color: #e3ded7; /* Fondo de la página */
                    }
                    .titulo {
                        text-align: center; /* Centrar el título */
                        color: #000; /* Color del título */
                        font-weight: bold; /* Texto en negrita */
                    }
                    .tabla-errores {
                        background-color: #e2432d; /* Fondo de las tablas */
                        color: #fff; /* Color del texto en las tablas */
                    }
                    .tabla-errores th {
                        background-color: #5064a5; /* Fondo de los encabezados de las tablas */
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h3 class="mt-5 mb-4 titulo">Reporte de Errores</h3>
                    <table class="table table-striped tabla-errores">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tipo</th>
                                <th>Descripción</th>
                                <th>Línea</th>
                                <th>Columna</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
    
        // Agregar cada error al contenido del archivo HTML
        errores.forEach((error, index) => {
            contenidoHTML += `
                <tr>
                    <td>${error.numero}</td>
                    <td>${error.tipo}</td>
                    <td>${error.descripcion}</td>
                    <td>${error.linea}</td>
                    <td>${error.columna}</td>
                </tr>
            `;
        });
    
        // Cerrar el archivo HTML
        contenidoHTML += `
                        </tbody>
                    </table>
                </div>
                <!-- Bootstrap JS (opcional, solo si necesitas funcionalidad de Bootstrap) -->
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
            </body>
            </html>
        `;
    
        // Generar un Blob con el contenido del archivo HTML
        const blob = new Blob([contenidoHTML], { type: 'text/html;charset=utf-8' });
        
        // Descargar el archivo
        saveAs(blob, 'reporte_errores.html', { autoBom: true }); // La opción autoBom asegura que se agregue una BOM al archivo para admitir caracteres especiales
    
        alert('El reporte de errores se ha descargado en tu carpeta de descargas.');
    };
    
    const ReporteSimbolos = () => {
        const simbolos =  Services.tabla();
        //const simbolo = await Services.tabla();/
        console.log("simbolos"+simbolos);
    };


        const generarHTMLconImagen = () => {
            // URL de la imagen PNG
            var urlImagen = "C:\\Users\\kevin\\Downloads\\graphviz.png"; // Modifica esta URL según tu ubicación
            
            // Crear el HTML con la imagen incrustada
            var htmlConImagen = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Reporte con Imagen</title>
                </head>
                <body>
                    <h1>Reporte</h1>
                    <img src="${urlImagen}" alt="Imagen">
                </body>
                </html>
            `;
    
            // Crear un Blob con el HTML
            var blob = new Blob([htmlConImagen], { type: 'text/html' });
    
            // Guardar el Blob como archivo
            saveAs(blob, 'ReporteAST.html');
        };
    
    return (
        <div>
            {/*Lista de Botones de opciones*/}

            <div>
                <div style={{ marginLeft: "40px" }}>
                    <label htmlFor="file-upload" className="tab_botones_inicio_diseno" style={{ background: "rgba(0, 128, 128, 0.2)",color:"white", textAlignLast: "center",fontWeight: "bold"}}>
                        <i className="fa fa-folder-open" aria-hidden="true"></i> Abrir
                    </label>
                    <input ref={inputFileRef} onChange={abrirArchivo} id="file-upload" type="file" accept=".sc"></input>
                </div>
                <div style={{ marginLeft: "210px" }}>
                <button className="tab_botones_inicio_diseno" style={{ background: "rgba(0, 128, 128, 0.2)", color: "white", fontWeight: "bold" }} onClick={GuardarArchivo}>
    <i className="fa fa-bookmark" aria-hidden="true"></i> Guardar
</button>
                </div>
                <div style={{ marginLeft: "350px" }}>
                    <button  className="tab_botones_inicio_diseno" style={{ background: "rgba(0, 128, 128, 0.2)", color: "white",fontWeight: "bold", width: "150px"}}onClick={CrearArchivo}>
                        <i className="fa fa-bookmark" aria-hidden="true"></i> Crear Archivo
                    </button>
                </div>
                <div style={{ marginLeft: "500px" }}>
                    <button  className="tab_botones_inicio_diseno" style={{ background: "rgba(255, 0, 0, 0.5)", color: "black",fontWeight: "bold", width: "180px"}}onClick={null}>
                        <i className="fa fa-bookmark" aria-hidden="true"></i> Reporte Errores
                    </button>
                </div>
                <div style={{ marginLeft: "650px" }}>
                    <button className="tab_botones_inicio_diseno" style={{ background: "rgba(113, 113, 113, 0.5)", color: "black",fontWeight: "bold", width: "180px"}}onClick={null}>
                        <i className="fa fa-bookmark" aria-hidden="true"></i> Reporte Simbolos
                    </button>
                </div>
                <div style={{ marginLeft: "800px" }}>
                <button className="tab_botones_inicio_diseno" style={{ background: "rgba(119, 199, 165, 0.6)", color: "black", fontWeight: "bold", width: "180px" }}onClick={generarHTMLconImagen}>
    <i className="fa fa-bookmark" aria-hidden="true"></i> Generar AST
</button>


 
                </div>
            </div>

            {/* Editores de Texto */}
            <div className="pagina">
                <div className="container1">
                    {/* Editor de Texto para entrada */}
                    <div style={{ width: "50%" }}>
                        <h2 style={{ color: "white", fontWeight: "bold" }} >Entrada </h2>
                        <CodeMirror
                            value={codigo}
                            height="580px"
                            theme={'dark'}
                            extensions={[cpp()]}
                            onChange={onchangecodigo}
                        />
                    </div>
                    {/* Editor de Texto para Salida */}
                    <div style={{ width: "49%", marginTop: "0%" }}>
                        <h2 style={{ color: "white", fontWeight: "bold" }} >Salida </h2>
                        <CodeMirror
                            value={salida}
                            height="580px"
                            theme={'dark'}
                            extensions={[cpp()]}
                            readOnly={true}
                            // onChange={(e)=>{setSalida(e.target.value)}}
                        />
                        {/* <Editor className="editorT"  write={true} value={salida}onChange={(e)=>{setSalida(e.target.value)}} /> */}
                        </div>
                </div>

            </div>
            <button className='enviar' onClick={ejecutar}>▷</button>
            
            {/*-----------------------------------------*/}
            <div id="grafoarbol">

        </div> 
        </div >
        
    );
}

export default Principal;