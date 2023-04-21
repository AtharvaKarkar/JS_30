const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('plates');
const toggleAllBtns = document.querySelector('.buttons');
const items = JSON.parse(localStorage.getItem('items')) || [];


function addItem(e) {
    e.preventDefault();
    
}