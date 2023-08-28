"use strict";

/*-------- Variabler --------*/
//Tailwind formulär
let tailwindNameEl = document.getElementById('tailwind-name');
let tailwindMessageEl = document.getElementById('tailwind-message');
let tailwindCheckboxEl = document.getElementById('tailwind-checkbox');
let tailwindSelectEl = document.getElementById('tailwind-selectLista');
let tailwindSubmitEl = document.getElementById('tailwind-submit');
let tailwindListContainer = document.getElementById('tailwind-listContainer');

window.onload = init;

function init() {
    loadListItems();
    tailwindSubmitEl.addEventListener('click', addToList);
}

function addToList(e) {
    e.preventDefault();
    let nameValue = tailwindNameEl.value;
    let messageValue = tailwindMessageEl.value;
    let checkboxValue = tailwindCheckboxEl.checked ? 'Ja' : 'Nej';
    let selectValue = tailwindSelectEl.value;

    let newRow = document.createElement('tr');

    [nameValue, messageValue, checkboxValue, selectValue].forEach(value => {
        let td = document.createElement('td');
        td.textContent = value;
        td.className = 'px-4 py-2 border';
        newRow.appendChild(td);
    });

    tailwindListContainer.appendChild(newRow);
    saveListitems();
}

function saveListitems() {
    let listItems = document.querySelectorAll('#tailwind-listContainer tr');
    let tempArr = [];

    listItems.forEach(row => {
        let itemData = Array.from(row.children).map(td => td.textContent);
        tempArr.push(itemData);
    });

    let jsonStr = JSON.stringify(tempArr);
    localStorage.setItem("tailwind-list", jsonStr);
}

function loadListItems() {
    let storedListItems = JSON.parse(localStorage.getItem("tailwind-list")) || [];

    storedListItems.forEach(itemData => {
        let newRow = document.createElement('tr');

        itemData.forEach(value => {
            let td = document.createElement('td');
            td.textContent = value;
            td.className = 'px-4 py-2 border';
            newRow.appendChild(td);
        });

        tailwindListContainer.appendChild(newRow);
    });
}
