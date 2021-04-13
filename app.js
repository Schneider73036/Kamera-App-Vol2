/*fügt alles zusammen*/
var constraints = { video: { facingMode: "user" }, audio: false }; /*facingMode"environment"*/

const cameraView = document.querySelector("#camera--view"),
      cameraOutput = document.querySelector("#camera--output"),
      cameraSensor = document.querySelector("#camera--sensor"),
      cameraTrigger = document.querySelector("#camera--trigger") //*Konstanten die wir brauchen*/
	  
function cameraStart() {    /*startet Kamerafunktion*/
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {   /*wirft error wenn die Kamera nicht funktioniert*/
        console.error("Oops. Something is broken.", error);
    });
}

cameraTrigger.onclick = function() {     /*hier hohelen wir uns ein Frame aus dem Video herraus über den Button*/
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};


window.addEventListener("load", cameraStart, false); /*initialisieren der Funktion wenn die Seite fertig geladen hat*/