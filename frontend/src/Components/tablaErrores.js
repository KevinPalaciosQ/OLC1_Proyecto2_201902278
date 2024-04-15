import React, { useState } from 'react';

function TablaErrores() {
    const [dataTable, setDataTable] = useState([]);
    function fetchData() {
        fetch('http://localhost:4000/errores')
            .then(response => response.json())
            .then(data => {
                
                setDataTable(data.salidaErrores.map((item, index) => (
                    <tr key={index+1}>
                        <td>{index+1}</td>
                        <td>{item.tipo}</td>
                        <td>{item.descrip}</td>
                        <td>{item.linea}</td>
                        <td>{item.columna}</td>
                    </tr>
                )))

            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <button style={{ marginTop: "1%" }} className='clean' onClick={fetchData}>
                Ver Tabla de Errores
            </button>

            <div style={{ margin: "2%" }}>
                <table className="table table-bordred table-striped" id="tablexd" style={{textAlign:"center", fontSize:"115%"}}>
                    <thead align="center">
                        <tr className="table-dark">
                            <th> No. </th>
                            <th> Tipo Error</th>
                            <th> Descripción </th>
                            <th> Línea </th>
                            <th> Columna </th>
                        </tr>
                    </thead>    
                    
                    <tbody id="detalles_FAKE" style={{background:"rgb(254, 251, 5 , 0.7)" , fontSize:"100%", border: "10px"}} >
                        {dataTable}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default TablaErrores;
