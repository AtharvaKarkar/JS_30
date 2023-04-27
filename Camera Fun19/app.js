const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    // getUserMedia() method will prompt a message to ask users for permission to use a media input.
    navigator.mediaDevices.getUserMedia({video : true,audio:false}).then(localMediaStream => {
        // note: that the parameter which is an object with 2 members: audio and video, has to be passed in.Here it requests both audio and video without any specific requirements.
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(err => {
        console.error('OH SHIT !!',err);
    });
}

function painttoCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    

   return setInterval(() =>{
    ctx.drawImage(video,0,0,width,height);
    // take the pixels at
    let pixels = ctx.getImageData(0,0,width,height);
    // create a mess with them
    // pixels = redEffect(pixels);

    pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.8;

    // pixels = greenScreen(pixels);
    // put them back
    ctx.putImageData(pixels,0,0);
   
   }, 16);
}

function takePhoto() {
    // played the sound
    snap.currentTime = 0;      // makes sure that the currentTime property is set to ) to ensure that the sound starts from the beginning.
    snap.play(); // this line will play the audio when the takePhoto function is called.

    // taking the data out of canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href=data;
    link.setAttribute('download','handsome');
    link.innerHtml = `<img src = "${data}" alt="Handsome Man"/>`;
    strip.insertBefore(link,strip,firstChild);   //This line inserts the new link containing the image into the HTML page. The strip variable likely refers to an HTML element where the images are being displayed, and firstChild is used to ensure that the new link is added to the beginning of the list of images. The insertBefore() method is used to insert the link into the correct position.
}


