'use strict';

function loadItems() {
    return fetch("data/data.json")
        .then(response => response.json())
        .then(json => json.items);
}

function createElement(items) {
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-type', items.type);
    li.setAttribute('data-color', items.color)
    
    const img = document.createElement('img');
    img.setAttribute('class', 'item_thumbnail');
    img.setAttribute('src', items.image);

    const span = document.createElement('span');
    span.setAttribute('class', 'item_discription');
    span.innerHTML = `${items.gender}, ${items.size} size`;

    li.appendChild(img);
    li.appendChild(span);

    return li;
}

function onButtonClick(event, elements) {
    const key = event.target.dataset.key;
    const value = event.target.dataset.value;

    // console.log(`${key}, ${value}`);

    if (key == null || value == null) {
        return;
    }

    updateDisplay(key, value, elements);
}

function updateDisplay(key, value, elements) {
    elements.forEach(item => {
    if (item.dataset[key] === value) {
      item.classList.remove('invisible');
    } else {
      item.classList.add('invisible');
    }
  });
}

loadItems()
    .then(items => {
        const elements = items.map(createElement);
        const container = document.querySelector('.items');
        const buttons = document.querySelector('.buttons');

        container.append(...elements);
        buttons.addEventListener('click', event => onButtonClick(event, elements));
})