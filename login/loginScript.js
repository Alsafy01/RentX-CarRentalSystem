// loginScript.js
var globalVariable = false;

function setGlobalVariableTrue() {
    globalVariable = true;
}

function getGlobalVariable() {
    return globalVariable;
}

export { setGlobalVariableTrue, getGlobalVariable };
