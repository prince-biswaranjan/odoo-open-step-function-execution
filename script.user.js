// ==UserScript==
// @name        odoo-open-step-function-execution
// @namespace   https://github.com/prince-biswaranjan
// @description Add a button to open step function execution from odoo helpdesk description.
// @author      Prince Biswaranjan
// @homepage    https://github.com/prince-biswaranjan/odoo-open-step-function-execution
// @version     2.0.1
// @grant       none
// @include     https://portal.linkfields.com/web*
// @updateURL   https://raw.githubusercontent.com/prince-biswaranjan/odoo-open-step-function-execution/refs/heads/main/script.user.js
// @downloadURL https://raw.githubusercontent.com/prince-biswaranjan/odoo-open-step-function-execution/refs/heads/main/script.user.js
// @run-at      document-end
// ==/UserScript==


"use strict";

const TARGET_TITLE = "OneClickApiFailure-prod";
const BUTTON_ID = "open-in-aws-console-btn";

function addButton(text, onclick) {
    if (document.getElementById(BUTTON_ID)) {
        return;
    }

    let button = document.createElement('button');

    button.id = BUTTON_ID
    button.innerHTML = text;
    button.onclick = onclick;
    button.style.backgroundColor = 'red';

    var description = document.getElementById("description");
    description.parentElement.insertBefore(button, description);
}

function removeButton() {
    const button = document.getElementById(BUTTON_ID);
    if(button) {
        button.remove();
    }
}

// Main observer logic
function observeTitleChanges() {
    const targetNode = document.body;

    const observer = new MutationObserver(() => {
        setTimeout(() => {
            const titleElem = document.getElementById("name");
            const titleText = titleElem?.value?.trim();

            if (titleText === TARGET_TITLE) {
                addButton("Open in AWS Console", openStepFunctionExecution);
            } else {
                removeButton();
            }
        }, 300);
    });

    observer.observe(targetNode, {
        childList: true,
        subtree: true
    });
}

window.addEventListener('load', () => {
    observeTitleChanges();
});

function openStepFunctionExecution(){
    var description = document.getElementById("description");
    var descriptionText = description.innerText;

    var failedEvent = JSON.parse(descriptionText);
    var executionId = failedEvent.Execution.Id;

    var stepFunctionExecutionUrl = `https://eu-west-2.console.aws.amazon.com/states/home?region=eu-west-2#/v2/executions/details/${executionId}`;

    window.open(stepFunctionExecutionUrl, '_blank');
}
