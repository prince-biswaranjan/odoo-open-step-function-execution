// ==UserScript==
// @name        <Script Name>
// @namespace   https://github.com/pbvirus
// @description <Script Description>
// @author      Prince Biswaranjan
// @homepage    <Homepage URL>
// @version     1.0.0
// @grant       none
// @include     *
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
        top: '6%', 
        right:'1%', 
        'z-index': 10,
        'background-color': 'red'
    };
    addButton('Remove Future Tasks', dummy, cssProp);
});

function dummy(){

}
