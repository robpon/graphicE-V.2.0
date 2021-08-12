import {brush} from "../classes/canvas.js";
import {type, object} from "./main.js";
import {text1} from "../classes/text.js";

//Export variables
export let r = 0;
export let g = 0;
export let b = 0;
export let a = 1.0;

//Local variables
let text = new text1();
let press = false;
let showColourPicker = false;
let canvasColour = document.getElementById("color");
let canvasHue = document.getElementById("hue");
let ctx = canvasColour.getContext("2d");
let ctx1 = canvasHue.getContext("2d");
let canvasOpacity = document.getElementById("opacity");
let ctx2 = canvasOpacity.getContext("2d");
let canvasChosen = document.getElementById("chosen");
let ctx3 = canvasChosen.getContext("2d");
let startGradient = ctx.createLinearGradient(0, 0, 400, 0);
colourPickerInitColours();

function colourPickerInitColours(){
    startGradient.addColorStop(0, "#fc0303");
    startGradient.addColorStop(0.15, "#fcf003");
    startGradient.addColorStop(0.25, "#0bfc03");
    startGradient.addColorStop(0.45, "#03fcfc");
    startGradient.addColorStop(0.65, "#2403fc");
    startGradient.addColorStop(0.85, "#db03fc");
    startGradient.addColorStop(1, "#fc0303");

    ctx2.clearRect(0, 0, 400, 20);
    let grad9 = ctx2.createLinearGradient(0, 0, 380, 0);
    grad9.addColorStop(0, "transparent");
    grad9.addColorStop(1, "rgb(0, 0, 0)");
    ctx2.fillStyle = grad9;
    ctx2.fillRect(0, 0, 400, 10);
    ctx.fillStyle = startGradient;
    ctx.fillRect(0, 0, 400, 50);
    ctx3.fillStyle = "#000";
    ctx3.fillRect(0, 0, 400, 10);
}

function getColourFromHueCanvas(x, y) {
    let colourData = ctx1.getImageData(x, y, 1, 1).data;
    r = colourData[0];
    g = colourData[1];
    b = colourData[2];
    canvasOpacityColourSetter();
    chosenColourSetter();
}

function getColourFromBelt(x) {
    let colourData = ctx.getImageData(x, 0, 1, 1).data;
    r = colourData[0];
    g = colourData[1];
    b = colourData[2];

    let grad = ctx.createLinearGradient(0, 0, 400, 0);
    grad.addColorStop(0, "#FFFFFF");
    grad.addColorStop(1, "rgb(" + r + ", " + g + ", " + b + ")");
    ctx1.fillStyle = grad;
    ctx1.fillRect(0, 0, 400, 200);


    let grad1 = ctx.createLinearGradient(0, 200, 0, 0);
    grad1.addColorStop(0, "#000");
    grad1.addColorStop(1, "rgba(255,255,255,0)");
    ctx1.fillStyle = grad1;
    ctx1.fillRect(0, 0, 400, 200);
    canvasOpacityColourSetter();
    chosenColourSetter();

}

function canvasOpacityColourSetter() {
    ctx2.clearRect(0, 0, 400, 20);
    let grad2 = ctx2.createLinearGradient(0, 0, 380, 0);
    grad2.addColorStop(0, "transparent");
    grad2.addColorStop(1, "rgb(" + r + ", " + g + ", " + b + ")");
    ctx2.fillStyle = grad2;
    ctx2.fillRect(0, 0, 400, 10);
}

function chosenColourSetter() {
    ctx3.clearRect(0, 0, 400, 20);
    let brush1 = new brush();
    brush1.setColour('rgba(' + r + ',' + g + ',' + b + ',' + a + ')');
    $(".roundedChosenColour").css("background-color",'rgba(' + r + ',' + g + ',' + b + ',' + a + ')');
    ctx3.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    $("#R1").html("R: " + r);
    $("#G1").html("G: " + g);
    $("#B1").html("B: " + g);
    $("#A1").html("A: " + parseInt(a * 100) / 100);

    ctx3.fillRect(0, 0, 400, 20);
}

function getOpacityFromCanvas(x) {
    let colourData = ctx2.getImageData(x, 3, 1, 1).data;
    a = colourData[3] / 255;
    chosenColourSetter();
}

export function chooseColour() {

    if (showColourPicker === true) {
        hideDialogBackground();
        document.getElementById("picker").className = "hidden";
        if(type === "p"){
            text.changeColourOfText(object, r, g, b, a);
        }
        showColourPicker = false;
    } else {
        showDialogBackground();
        document.getElementById("picker").className = "picker";
        showColourPicker = true;
    }

}

function showDialogBackground() {
    $("#backgroundOfDialog").removeClass("hidden hideDialog").addClass("showDialog");
}

function hideDialogBackground() {
    $("#backgroundOfDialog").removeClass("showDialog").addClass("hidden");
}

//jQuery methods
$("#saveColour").click(ev => {
    chooseColour();
});

$(window).mouseup(ev => {
    press = false;
});
$("#contents").mousedown(ev => {
    press = true;
});

//EventListeners

window.addEventListener("mousedown", ev => {
    press = true;
});
window.addEventListener("mouseup", ev => {
    press = false;
});

canvasColour.addEventListener("mousemove", ev => {
    if (press === true) {
        getColourFromBelt(ev.offsetX);
    }
});

canvasHue.addEventListener("mousemove", ev => {
    if (press === true) {
        getColourFromHueCanvas(ev.offsetX, ev.offsetY);
    }
});

canvasOpacity.addEventListener("mousemove", ev => {
    if (press === true) {
        getOpacityFromCanvas(ev.offsetX);
    }
});
canvasColour.addEventListener("click", ev => {
    getColourFromBelt(ev.offsetX);
});

canvasHue.addEventListener("click", ev => {
    getColourFromHueCanvas(ev.offsetX, ev.offsetY);
});

canvasOpacity.addEventListener("click", ev => {
    getOpacityFromCanvas(ev.offsetX);
});




