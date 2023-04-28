const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');


/*In this example solution, we are using watchPosition() method which call a function each time the position of the device changes. Inside the callback, he retrieves the speed data from the geolocation object and updates the text accordingly. We also use the heading data to update the arrow's rotate angle everytime the user's position changes.*/
navigator.geolocation.watchPosition((data) => {
    console.log(data);
    speed.textContent = data.coords.speed;
    arrow.getElementsByClassName.transform = `rotate(${data.coords.heading}deg)`;

}, (err)=>{
    console.error(err);
});