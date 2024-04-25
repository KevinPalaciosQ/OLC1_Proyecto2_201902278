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
    const [error, setError] = useState([]);
    //  const[astgraph, setAstgraph] = useState(`digraph G { "AST"->"INICIO";}`);
    const inputFileRef = useRef(null);
    const [codigo, setCodigo] = useState('');
    const [nombreArchivo, setNombreArchivo] = useState('');
    const [salida, setSalida] = useState(''); // Estado para almacenar la salida del analizador
    const [showCrearPopup, setShowCrearPopup] = useState(false);
    const [showCrearPopup1, setShowCrearPopup1] = useState(false);
    const [showCrearPopup2, setShowCrearPopup2] = useState(false);
    const[simbolos, setsimbolos] = useState([]);
    const[body,setbody]=useState('');
    let URL="https://quickchart.io/graphviz?graph=";
    const toggleCrearPopup = () => {
        setShowCrearPopup(!showCrearPopup);
    };
    const toggleCrearPopup1 = () => {
        
        setShowCrearPopup1(!showCrearPopup1);
    };
    const toggleCrearPopup2 = () => {
        setShowCrearPopup2(!showCrearPopup2);
    };    
    const closePopup = (popup) => {
        switch (popup) {
            case 'crear':
                setShowCrearPopup(false);
                break;
            case 'AST':
                setShowCrearPopup1(false);
                break;
            case 'errores':
                setShowCrearPopup2(false);
                break;                        
            default:
                break;
        }
    };    
    const ejecutar = async () => {
        const response = await Services.parse(codigo);

        console.log("xd" + response.consola);
        setSalida(response.consola);
        console.log("listaerrores" + response.errores)
        console.log("listasimbolos" + response.simbolos)
        //setAstgraph(response.astgraph);
        //console.log("contenido"+response.astgraph);
        // Recorriendo los símbolos si es un array
        console.log("Recorriendo");
        //console.log("soy un arbol"+response.ast);
        setsimbolos(response.simbolos);
        setbody(response.ast);

        response.errores.forEach(error => {
            console.log(error); // Aquí puedes hacer lo que necesites con cada error
        });
        setError(response.errores);
        response.simbolos.forEach(simbolo => {
            console.log(simbolo); // Aquí puedes hacer lo que necesites con cada símbolo
        
        });
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
                    <button  className="tab_botones_inicio_diseno" style={{ background: "rgba(255, 0, 0, 0.5)", color: "black",fontWeight: "bold", width: "180px"}}onClick={toggleCrearPopup2}>
                        <i className="fa fa-bookmark" aria-hidden="true"></i> Reporte Errores
                    </button>
                </div>
                <div style={{ marginLeft: "650px" }}>
                    <button className="tab_botones_inicio_diseno" style={{ background: "rgba(113, 113, 113, 0.5)", color: "black",fontWeight: "bold", width: "180px"}}onClick={toggleCrearPopup}>
                        <i className="fa fa-bookmark" aria-hidden="true"></i> Reporte Simbolos
                    </button>
                </div>
                <div style={{ marginLeft: "800px" }}>
                <button className="tab_botones_inicio_diseno" style={{ background: "rgba(119, 199, 165, 0.6)", color: "black", fontWeight: "bold", width: "180px" }}onClick={toggleCrearPopup1}>
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
        {showCrearPopup && (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
            }}>
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    width: '60%'
                }}>
                    <button style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        color: 'gray',
                        cursor: 'pointer'
                    }} onClick={() => closePopup('crear')}>
                        X
                    </button>
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem'
                    }}> </h2>
<table style={{ borderCollapse: "collapse", width: "100%", border: "1px solid #ddd" }}>
  <thead>
    <tr style={{ backgroundColor: "#f2f2f2" }}>
      <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>#</th>
      <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>id</th>
      <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>valor</th>
      <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>TipoDato</th>
    </tr>
  </thead>
  <tbody>
    {simbolos.map((item, index) => (
      <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#C2B5FF" : "white" }}>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.id}</td>
        {/* Dividir el campo valorsito en valor y TipoDato */}
        {item.valorsito.split(',').map((parte, index) => (
          <td key={index} style={{ border: "1px solid #ddd", padding: "8px" }}>{parte}</td>
        ))}
      </tr>
    ))}
  </tbody>
</table>


                </div>
            </div>

        )}
        {showCrearPopup1 && (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
            }}>
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    width: '60%'
                }}>
                    <button style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        color: 'gray',
                        cursor: 'pointer'
                    }} onClick={() => closePopup('AST')}>
                        X
                    </button>
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem'
                    }}> </h2>
                    <img src={URL+body} alt="Imagen" id='astimg'style={{ width: '900px', height: '900px' }}></img>
                </div>
            </div>

        )}
                {showCrearPopup2 && (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
            }}>
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    width: '60%'
                }}>
                    <button style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        color: 'gray',
                        cursor: 'pointer'
                    }} onClick={() => closePopup('errores')}>
                        X
                    </button>
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem'
                    }}> </h2>
<table style={{ borderCollapse: "collapse", width: "100%", border: "1px solid #ddd" }}>
  <thead>
    <tr style={{ backgroundColor: "#f2f2f2" }}>
      <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Tipo de Error</th>
      <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Descripción</th>
      <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Fila</th>
      <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Columna</th>
    </tr>
  </thead>
  <tbody>
    {error.map((error, index) => (
      <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#C2B5FF" : "white" }}>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{error.tipoError}</td>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{error.desc}</td>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{error.fila}</td>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{error.columna}</td>
      </tr>
    ))}
  </tbody>
</table>


                </div>
            </div>

        )}
        </div >
        
    );
}

export default Principal;