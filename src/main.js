'use strict';

// Fetch the items from the JSON file
function loadItems() {
    return fetch("data/data.json")
        // body(response의 body)의 내용을 json api를 이용해서 json 형태로 변환
        .then(response => response.json()) 
        .then(json => json.items);
}

// Update the list with the given items
// 받아온 아이템으로 리스트를 업데이트 하는 함수
function displayItems(items) {
    const container = document.querySelector('.items');
    const html = items.map(item => createHTMLString(item)).join('');

    // 받아온 items 오브젝트를 li의 문자열로 변환한 다음 그것들을 하나의 문자열로 만드는 작업
    console.log(html);

    // join()은 배열의 원소들을 연결하여 하나의 값으로 만든다.
    // ('') 싱글 쿼터 안에는 문자를 넣어 구분할 수 있다.
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// Create HTML list item from the given data item
// 받아온 아이템으로 html의 언어로 리턴하는 함수
function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail">
        <span class="item_discription">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function setEventListener(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}

function onButtonClick(event, items) {
    // console.log(event.target.dataset.key);
    // console.log(event.target.dataset.value);

    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    // key 값과 value 값이 null 이면 함수를 바로 종료
    if (key == null || value == null) {
        return;
    }
    
    // filter: 배열에서 조건에 맞는 값 추출
    // 참고: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    // displayItems(items.filter(item => item[key] === value))
    // displayItems(items.filter(item => type === tshirt))

    const filtered = items.filter(item => item[key] === value);

    console.log(filtered);
    displayItems(filtered);

    // 즉, JSON에 맞는 타입과 벨류를 가져온다. 하지만 이런식으로 업데이트를 자꾸 하게 되면
    // 효율적이지 못하다.

    // "items": [
    //     {
    //         "type": "tshirt",
    //         "gender": "female",
    //         "size": "large",
    //         "color": "pink",
    //         "image": "./img/pink_t.png"
    //     }, {
    //         "type": "pants",
    //         "gender": "male",
    //         "size": "small",
    //         "color": "blue",
    //         "image": "./img/blue_p.png"
    //     }, {
    //         "type": "pants",
    //         "gender": "male",
    //         "size": "large",
    //         "color": "yellow",
    //         "image": "./img/yellow_p.png"
    //     }
    // ]

    // 그러므로 css를 통해 invisible로 보여주거나 안보여주는 형식으로 만들어 주는게 좋다.
    // updateItems(items, key, value);
}

// Make the items matching {key: value} invisible.
// function updateItems(items, key, value) {
//     items.forEach(item => {
//         if (item[key] === value) {
//             item.classList.remove('invisible');
//         } else {
//             item.classList.add('invisible');
//         }
//     });
// }

// main
loadItems() 
    .then(items => {
        console.log(items);

        displayItems(items);
        setEventListener(items); // 필터링을 위한 이벤트 리스너
    })
    .catch(console.log());