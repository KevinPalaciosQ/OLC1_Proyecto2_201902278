let variableIdentificador: any[] = [];

function agregarVariable(identificador: any) {
    variableIdentificador.push(identificador);
}

function obtenerVariable(): any[] {
    return variableIdentificador;
}
function concatenacionl(listita: any[]) {
    variableIdentificador = variableIdentificador.concat(listita);
}
function limpieza() {
    variableIdentificador = [];
}
export { agregarVariable, obtenerVariable, concatenacionl, limpieza };
