const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  // getUserMedia() method will prompt a message to ask users for permission to use a media input.
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      // note: that the parameter which is an object with 2 members: audio and video, has to be passed in.Here it requests both audio and video without any specific requirements.
      console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      console.error("OH SHIT !!", err);
    });
}

function painttoCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take the pixels at
    let pixels = ctx.getImageData(0, 0, width, height);
    // create a mess with them
    // pixels = redEffect(pixels);

    pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.8;

    // pixels = greenScreen(pixels);
    // put them back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // played the sound
  snap.currentTime = 0; // makes sure that the currentTime property is set to ) to ensure that the sound starts from the beginning.
  snap.play(); // this line will play the audio when the takePhoto function is called.

  // taking the data out of canvas
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "handsome");
  link.innerHtml = `<img src = "${data}" alt="Handsome Man"/>`;
  strip.insertBefore(link, strip, firstChild); //This line inserts the new link containing the image into the HTML page. The strip variable likely refers to an HTML element where the images are being displayed, and firstChild is used to ensure that the new link is added to the beginning of the list of images. The insertBefore() method is used to insert the link into the correct position.
}
function redEffect(pixels) {
  // for loop will iterate through 4th element of the 'data' array of the 'pixels' object. This is bcz each pixel is represented by 4 array elements, one each for red,green,blue and alpha(transparency).
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // red  
    pixels.data[i + 0] = pixels.data[i + 1] - 50; // green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //blue
    // increasing the value of the integer representing the red value,so every pixel looks much red.
  }
  return pixels;
}


function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; //red
    pixels.data[i + 500] = pixels.data[i + 1]; // green
    pixels.data[i - 550] = pixels.data[i + 2]; // blue
  }
  return pixels;
}

function greenScreen(pixels) {
    const levels = {};
    document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
    });

    for (i=0;i<pixels.data.length; i = i+4) {
        red = pixels.data[i+0];
        green = pixels.data[i+1];
        blue = pixels.data[i+2];
        aplha = pixels.data[i+3];

        if(red >=levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax ) {
                pixels.data[i+3] = 0
            }
    }
    return pixels;
}
getVideo();

video.addEventListener('canplay',printToCanvas);
