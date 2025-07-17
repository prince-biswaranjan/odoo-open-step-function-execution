// ==UserScript==
// @name        odoo-open-step-function-execution
// @namespace   https://github.com/prince-biswaranjan
// @description Add a button to open step function execution from odoo helpdesk description.
// @author      Prince Biswaranjan
// @homepage    https://github.com/prince-biswaranjan/odoo-open-step-function-execution
// @version     1.0.4
// @grant       none
// @updateURL   https://raw.githubusercontent.com/prince-biswaranjan/odoo-open-step-function-execution/refs/heads/main/script.user.js
// @downloadURL https://raw.githubusercontent.com/prince-biswaranjan/odoo-open-step-function-execution/refs/heads/main/script.user.js
// @run-at      document-end
// ==/UserScript==


"use strict";

function addButton(text, onclick, cssObj) {
    cssObj = cssObj || {position: 'absolute', top: '7%', left:'4%', 'z-index': 3};
    let button = document.createElement('button'), btnStyle = button.style;
    document.body.appendChild(button);
    
    button.innerHTML = text;
    button.onclick = onclick;
    btnStyle.position = 'absolute';
    
    Object.keys(cssObj).forEach(key => {
        btnStyle[key] = cssObj[key];
    });
    
    return button;
}

window.addEventListener('load', () => {
    let cssProp = {
        position: 'fixed', 
        top: '1%', 
        right:'20%', 
        'z-index': 10,
        'background-color': 'red'
    };
    
    addButton('Open in AWS Console', openStepFunctionExecution, cssProp);
});

function openStepFunctionExecution(){
    var description = document.getElementById("description");
    var descriptionText = description.innerText;

    var failedEvent = JSON.parse(descriptionText);
    var executionId = failedEvent.Execution.Id;

    var stepFunctionExecutionUrl = `https://eu-west-2.console.aws.amazon.com/states/home?region=eu-west-2#/v2/executions/details/${executionId}`;

    window.open(stepFunctionExecutionUrl, '_blank');
}
