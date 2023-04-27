// this line sets the window.SpeechRecognition object to the 'window.webkitSpeechRecognition' object if the former is not avaliable.
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();  // creating a new instance for speech recognition.
recognition.interimResults = true;
recognition.lang = 'en-US';  // sets the lang of the recognition engine to US english.
// these 3 line is where the recognized speech will be displayed.
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);                                 


// set an evetlistener for the result event, which is fired when the recognition engine returns a result.
recognition.addEventListener('result',e => {
    const transceript = Array.from(e.result)
    .map(result => result[0])
    .map(result => result.transceript)
    .join('');  // these 3 lines extract the transcript from the results returned by the recongition engine.


    // These two lines replace any occurrence of the words "poop", "poo", "shit", or "dump" with the poop emoji (💩), and set the content of the <p> element to the modified transcript.
    const poopScript = transceript.replace(/poop|poo|shit|dump/gi, '💩');
    p.textContent = poopScript;

    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }

});
recognition.addEventListener('end',recognition.start);
recognition.start();

// no need for external libraries or tool for speech recognition ! (However this native api is currently only supported in Chrome and it doesn't work offline)