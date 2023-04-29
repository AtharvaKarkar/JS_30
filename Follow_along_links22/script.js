const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span'); // created a new element 'span' element using the 'document.createElement' method and assigns it to a constant called 'highkight'.
highlight.classList.add('highlight'); // It then adds a Css class to the 'highlight' element using the 'classList.add' method. Finally, it appends the 'highlight' element to the 'body' of the document using the 'appendChild' method.
document.body.appendChild(highlight);
function highlightLink() {
    const linkCoords = this.getBoundingClientRect();  //When called, this function calculates the position and size of the link that triggered the function by using the getBoundingClientRect method.
    console.log(linkCoords);
    const coords = {
        width:linkCoords.width,
        height:linkCoords.height,
        top:linkCoords.top + window.scrollY,
        left:linkCoords.left + window.scrollY
        //The top and left properties are adjusted to account for the current scroll position of the window
    };
    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left + 10}px, ${coords.top + 10}px)`;

}
triggers.forEach(a => a.addEventListener('mouseenter',highlightLink));

// overall the code creates a simple mouseover effect for the links in the document, where a highlight element follows the mouse and expands to cover the link being hovered over
