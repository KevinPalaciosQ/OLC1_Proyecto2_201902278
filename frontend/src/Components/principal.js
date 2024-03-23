import React, { useRef, useState } from 'react';
import Editor from "./editorTexto";
import './Estilo.css'
function Principal() {
    //Editor auxiliar (no se usa, solo se usa para hacer referencia al editor)
    const editor2 = useRef();
    //Referencia Para pasar codigo
    const codigoRef = useRef();
    //Referencia Para limpiar despues el contenido del input file
    const inputFileRef = useRef(null);
    //Nombre por defecto de texto a guardar
    const [fileName] = useState('texto.sc');
    //Codigo procesado que se muestra en la interfaz
    const [salidaCodigo, setSalidaCodigo] = useState("");

    //Input file, para cargar archivos y obtener su contenido
    const Abrir = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            //Establecemos el codigo en el otro componente (Tabs)
            codigoRef.current.establecerCodigoEntradaEnCarga(reader.result)

        };
        reader.readAsText(selectedFile);
        inputFileRef.current.value = null;
    };

    //Guardar Contenido del Editor
    const Guardar = async () => {
        //Obtenemos el contenido del otro componente (Tabs)
        const contenidoEditot = codigoRef.current.EnviarCodigoActual()
        const file = new File([contenidoEditot], fileName, { type: 'text/plain' });
        const options = {
            suggestedName: fileName,
            types: [
                {
                    description: 'Archivos de texto',
                    accept: {
                        'text/plain': ['.sc'],
                    },
                },
            ],
        };
        try {
            const handle = await window.showSaveFilePicker(options);
            const writable = await handle.createWritable();
            await writable.write(file);
            await writable.close();
        } catch (error) {
            console.error(error);
        }
    };
    //---------------------------------------
    function CrearArchivo() {
        console.log("Crear Archivo")}
    function LimpiarEditores() {
        codigoRef.current.establecerCodigoEntradaEnCarga("")
    }
    function ReporteSimbolos(){
        console.log("Reporte Simbolos")
    }
    function ReporteErrores(){
        console.log("Reporte Errores")
    }
    function GenerarAST(){
        console.log("Generar AST")
    }
    function enviarDatos() {
        
        const JSON_SEND = { codigo:  codigoRef.current.EnviarCodigoActual()};
        fetch("http://localhost:4000/analizar", {
            method: "POST",
            body: JSON.stringify(JSON_SEND),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setSalidaCodigo(data.salidaCodigo)
                
            })
            .catch((error) => console.error(error));
    }
    return (
        <div>
            {/*Lista de Botones de opciones*/}
            <div>
                <div style={{ marginLeft: "40px" }}>
                    <label htmlFor="file-upload" className="tab_botones_inicio_diseno" style={{ background: "rgba(0, 128, 128, 0.2)",color:"white", textAlignLast: "center",fontWeight: "bold"}}>
                        <i className="fa fa-folder-open" aria-hidden="true"></i> Abrir
                    </label>
                    <input ref={inputFileRef} onChange={Abrir} id="file-upload" type="file" accept=".sc"></input>
                </div>
                <div style={{ marginLeft: "210px" }}>
                    <button onClick={Guardar} className="tab_botones_inicio_diseno" style={{ background: "rgba(0, 128, 128, 0.2)", color: "white",fontWeight: "bold"}}>
                        <i className="fa fa-bookmark" aria-hidden="true"></i> Guardar
                    </button>
                </div>
                <div style={{ marginLeft: "350px" }}>
                    <button onClick={CrearArchivo} className="tab_botones_inicio_diseno" style={{ background: "rgba(0, 128, 128, 0.2)", color: "white",fontWeight: "bold", width: "150px"}}>
                        <i className="fa fa-bookmark" aria-hidden="true"></i> Crear Archivo
                    </button>
                </div>
                <div style={{ marginLeft: "500px" }}>
                    <button onClick={ReporteErrores} className="tab_botones_inicio_diseno" style={{ background: "rgba(255, 0, 0, 0.5)", color: "black",fontWeight: "bold", width: "180px"}}>
                        <i className="fa fa-bookmark" aria-hidden="true"></i> Reporte Errores
                    </button>
                </div>
                <div style={{ marginLeft: "650px" }}>
                    <button onClick={ReporteSimbolos} className="tab_botones_inicio_diseno" style={{ background: "rgba(113, 113, 113, 0.5)", color: "black",fontWeight: "bold", width: "180px"}}>
                        <i className="fa fa-bookmark" aria-hidden="true"></i> Reporte Simbolos
                    </button>
                </div>
                <div style={{ marginLeft: "800px" }}>
                    <button onClick={GenerarAST} className="tab_botones_inicio_diseno" style={{ background: "rgba(119, 199, 165, 0.6)", color: "black",fontWeight: "bold", width: "180px"}}>
                        <i className="fa fa-bookmark" aria-hidden="true"></i> Generar AST
                    </button>
 
                </div>
            </div>

            {/*---------------------------------------------*/}

            {/*Editores de Texto*/}
            <div className="pagina">
                <div className="container1">
                    {/*Editor de Texto para entrada*/}
                    <div style={{ width: "50%" }}>
                    <h2 style={{ color: "white", fontWeight: "bold" }} >Entrada </h2>

                        <Editor />
                    </div>
                    {/*Editor de Texto para Salida*/}
                    <div style={{ width: "49%", marginTop: "0%" }}>
                    <h2 style={{ color: "white", fontWeight: "bold" }} >Salida </h2>
                 <Editor className="editorT" ref={editor2} cod={salidaCodigo} readOnly />
                </div>
                </div>

            </div>
            <button className='enviar' onClick={enviarDatos}>▷</button>
            <button className='clean' style={{fontWeight: "bold"}} onClick={LimpiarEditores}>Limpiar</button>
            {/*-----------------------------------------*/}
        </div >

    );
}

export default Principal;