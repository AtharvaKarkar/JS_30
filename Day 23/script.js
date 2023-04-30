const msg = new SpeechSynthesisUtterance();
let voices = [];
const voiceDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"],[name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHtml = voices
    .filter(voices => voice.lang.includes('en'))   // this function populates the dropdown element with the avaliable voices. It first gets the avaliable voices using the getVoice() method. then filters out the only english voices and creates an option element for each voice, displaying the name & language. Finally,it joins all the option elements into a single and sets the dropdown's innerHtml to that string.
    .map(voice=>'<option value="${voice.name}">${voice.name} (${voice.lang})</option>')
    .join('');
}

function setVoice() {
    msg.voice = voices.find(voice =>voice.name === this.value);
    toggle();

}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if(startOver) {
        speechSynthesis.speak(msg);
    }
    /*this function starts or stops the text to-speech request. If the 'startOver'  argument is true (which is the default), it cancels any existing speech requests and starts a new one using the speak() method of the speechSynthesis object. If startOver is false, it only cancels the current speech request and doesn't start a new one.*/
}

function setOption() {
    console.log(this.name,this.value);
    msg[this.name] = this.value;
    toggle();
}
speechSynthesis.addEventListener('voicechanged',populateVoices);
voicesDropdown.addEventListener('change',setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));