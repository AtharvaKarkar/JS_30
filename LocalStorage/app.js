/* TAKEAWAYS
--> WHAT IS LOCALSTORAGE??
it is a part of web storage Api which maintains a seprate storage area of each given origin, data in localStorage has no expiration data,and gets cleared only through js or clearing the browser cache/locally stored data.

-->Session Storage?
- session storage does the exact same thing as localstorage,the only different thing is that data in sessoin storage is only avaliable for a session, meaning that the data is stored until the borwser(or tab) is closed.
for both localstorage & sessionstorage ,any item stored in them will be stored as a string. This means that we need to convert them into string before storing them in the storage.










*/

// adding check all and clear all buttons to toggle done states of all items at once.
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    };

    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
            <label for="item${i}">${plate.text}</label>
        </li>
        `;
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input')) return; 
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);