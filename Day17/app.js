const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

function strip(bandName) {
    return bandName.replace(/^(a |the |an )/i, '').trim();

    // the function uses the 'replace' method with a regular expression pattern to remove teh articles "a","an" and "the" form the beginning of the string.It then trims any remaining whitespace before returning the modfieed string.
// trim function is used to remove the whitespace .
    // The pipe symbol ( || ) means 'or'
    // ^ matches the start of the line and anchors a literal at the beginning of the line. (in simple words it examines the beginning of the string).

}

const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);

document.querySelector('#bands').innerHTML =
    sortedBands
        .map(band => `<li>${band}</li>`)
        .join('');

console.log(sortedBands);
