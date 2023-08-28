"use strict";

/*-------- Variabler --------*/
//Bootstrap formulär
let bootstrapNameEl = document.getElementById('name');
let bootstrapMessageEl = document.getElementById('message');
let bootstrapCheckboxEl = document.getElementById('checkbox');
let bootstrapSelectEl = document.getElementById('selectLista');
let bootstrapSubmitEl = document.getElementById('submit');
let listContainer = document.getElementById('listContainer'); 

window.onload = init;

function init() {
    loadListItems();
    bootstrapSubmitEl.addEventListener('click', addToList);
}

function addToList(e) {
    e.preventDefault();
    let nameValue = bootstrapNameEl.value;
    let messageValue = bootstrapMessageEl.value;
    let checkboxValue = bootstrapCheckboxEl.checked ? 'Ja' : 'Nej';
    let selectValue = bootstrapSelectEl.value;

    let newRow = document.createElement('tr');
    newRow.className = 'listItem'; 

    [nameValue, messageValue, checkboxValue, selectValue].forEach(value => {
        let td = document.createElement('td');
        td.textContent = value;
        newRow.appendChild(td);
    });

    listContainer.appendChild(newRow);
    saveListitems();
}

function saveListitems() {
    let listItems = document.getElementsByClassName('listItem');
    let tempArr = [];

    for (let i = 0; i < listItems.length; i++) {
        let itemData = Array.from(listItems[i].children).map(td => td.textContent);
        tempArr.push(itemData);
    }

    let jsonStr = JSON.stringify(tempArr);
    localStorage.setItem("list", jsonStr);
}

function loadListItems() {
    let storedListItems = JSON.parse(localStorage.getItem("list")) || [];

    storedListItems.forEach(itemData => {
        let newRow = document.createElement('tr');
        newRow.className = 'listItem';  

        itemData.forEach(value => {
            let td = document.createElement('td');
            td.textContent = value;
            newRow.appendChild(td);
        });

        listContainer.appendChild(newRow);
    });
}
