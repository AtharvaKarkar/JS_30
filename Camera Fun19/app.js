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
