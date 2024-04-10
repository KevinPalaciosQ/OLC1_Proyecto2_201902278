import React, { useRef, useState  } from 'react';
import './Estilo.css'
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from "@codemirror/lang-cpp";
import { saveAs } from 'file-saver';
import Services from '../Services/Service';
function Principal() {
    //         id,   funcion
    //const [error, setError] = useState(''); // Estado para almacenar Errores
    const inputFileRef = useRef(null);
    const [codigo, setCodigo] = useState('');
    const [nombreArchivo, setNombreArchivo] = useState('');
    const [salida, setSalida] = useState(''); // Estado para almacenar la salida del analizador
    const ejecutar  = async() => {
        const response = await Services.parse(codigo);
        console.log("xd"+response.consola);    
        setSalida(response.consola);
        
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
                    <button  className="tab_botones_inicio_diseno" style={{ background: "rgba(255, 0, 0, 0.5)", color: "black",fontWeight: "bold", width: "180px"}}>
                        <i className="fa fa-bookmark" aria-hidden="true"></i> Reporte Errores
                    </button>
                </div>
                <div style={{ marginLeft: "650px" }}>
                    <button className="tab_botones_inicio_diseno" style={{ background: "rgba(113, 113, 113, 0.5)", color: "black",fontWeight: "bold", width: "180px"}}>
                        <i className="fa fa-bookmark" aria-hidden="true"></i> Reporte Simbolos
                    </button>
                </div>
                <div style={{ marginLeft: "800px" }}>
                    <button  className="tab_botones_inicio_diseno" style={{ background: "rgba(119, 199, 165, 0.6)", color: "black",fontWeight: "bold", width: "180px"}}>
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
        </div >
    );
}

export default Principal;