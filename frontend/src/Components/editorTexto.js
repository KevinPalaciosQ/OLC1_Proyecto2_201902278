import React, { useImperativeHandle, useEffect,useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from "@codemirror/lang-cpp";
//hola

const Editor = React.forwardRef((props, referencia) => {
    const [code, setCode] = useState(props.cod);

    useImperativeHandle(referencia, () => ({
        getCode() {
            return code;
        },
        establecerCodigo(codigo) {
            setCode(codigo);
        },
        setEditorCode: (newCode) => {
            setCode(newCode);
        }
    }));

    useEffect(() => {
        setCode(props.cod);
        console.log(props.cod)
    }, [props.cod]);

    return (
        <CodeMirror
            value={code}
            height="580px"
            theme={'dark'}
            extensions={[cpp()]}
            readOnly={props.write}
            onChange={(value, viewUpdate) => {
                setCode(value);
            }}
        />
    );
});

export default Editor;
