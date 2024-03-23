import React, { useImperativeHandle, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from "@codemirror/lang-cpp";
//hola
const Editor = React.forwardRef((props, referencia) => {
    //Actualizamos el contenido del editor
    useEffect(() => {
        setCode(props.cod);
    }, [props.cod]);
    const [code, setCode] = React.useState(props.cod);
    //Envio de datos
    useImperativeHandle(referencia, () => ({
        getCode() {
            return code;
        },
        establecerCodigo(codigo) {
            setCode(codigo);
        }
    }),
    )

    return (
        <CodeMirror
            value={code}
            height="580px"
            theme={'dark'}
            extensions={[cpp()]}
            
            onChange={(value, viewUpdate) => {
                setCode(value);
                referencia.current.value = code;
            }}
        />
    );
})

export default Editor;
