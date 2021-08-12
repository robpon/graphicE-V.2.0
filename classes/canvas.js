import {cutBrush} from "./image.js";
//import {helpCanvas} from "../all/main";
//Export variables
export let drawWidth = 1;
export let drawShape = "round";

//Local variables
let startX = 0;
let startY = 0;
let endY = 0;
let endX = 0;
let r = 0;
let g = 0;
let b = 0;
let drawColour = "rgb(0, 0 ,0)";
let pickColorClick = false;
let rubberClick = false;
let x, y = 0;
let press = 0;
let start = false;
let proportion;
let drawLine = false;
let pickColourClick = false;
let finalWidth = 0;
let finalHeight = 0;
let editType = "";
let helpCanvas = document.getElementById("canvas1");

//Canvas class
export class canvas {
    constructor(finalW, finalH, prop) {
        finalWidth = finalW;
        finalHeight = finalH;
        proportion = prop;
    }

    draw(x1, y1, object) {
            let ctx = object.getContext("2d");
            ctx.beginPath();
            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = drawColour;
            ctx.lineWidth = (drawWidth);
            ctx.moveTo(x * proportion, y * proportion);
            ctx.lineCap = drawShape;
            ctx.lineTo(x1 * proportion, y1 * proportion);
            x = x1;
            y = y1;
            ctx.stroke();
            ctx.closePath();
    }

    rubber(x1, y1, object) {
        let ctx = object.getContext("2d");
        ctx.beginPath();
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = (drawWidth);
        ctx.moveTo(x * proportion, y * proportion);
        ctx.lineCap = drawShape;
        ctx.lineTo(x1 * proportion, y1 * proportion);
        x = x1;
        y = y1;
        ctx.stroke();
        ctx.closePath();
    }

    drawFinalLine(object) {
        let ctx = object.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineCap = drawShape;
        ctx.strokeStyle = drawColour;
        ctx.lineWidth = parseInt(drawWidth / proportion);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
        startX = 0;
        startY = 0;
        endY = 0;
        endX = 0;
        document.getElementById("sPL").innerHTML = "Punkt początkowy";
        document.getElementById("ePL").innerHTML = "Punkt końcowy";
    }

    drawFinalSquare(object) {
        let ctx = object.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineCap = drawShape;
        ctx.strokeStyle = drawColour;
        ctx.lineWidth = parseInt(drawWidth / proportion);
        ctx.lineTo(endX, startY);
        ctx.moveTo(endX, startY);
        ctx.lineTo(endX, endY);
        ctx.moveTo(endX, endY);
        ctx.lineTo(startX, endY);
        ctx.moveTo(startX, endY);
        ctx.lineTo(startX, startY);
        ctx.moveTo(startX, startY);
        ctx.stroke();
        ctx.closePath();
    }

    drawFinalTriangle(object) {
        let ctx = object.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineCap = drawShape;
        ctx.strokeStyle = drawColour;
        ctx.lineWidth = parseInt(drawWidth / proportion);
        ctx.lineTo(endX, endY);
        ctx.moveTo(endX, endY);
        ctx.lineTo(startX + (startX - endX), endY);
        ctx.moveTo(startX + (startX - endX), endY);
        ctx.lineTo(startX, startY);
        ctx.stroke();
        ctx.closePath();
    }

    drawNoAcceptedLine(x, y, proportion, helpCanvas) {
        let ctx1 = helpCanvas.getContext("2d");
        ctx1.clearRect(0, 0, finalWidth, finalHeight);
        ctx1.beginPath();
        ctx1.moveTo(startX / proportion, startY / proportion);
        ctx1.strokeStyle = "#2fff00";
        ctx1.strokeWidth = 3;
        ctx1.lineTo(x, y);
        ctx1.stroke();
        ctx1.closePath();
        document.getElementById("sPL").innerHTML = "Punkt początkowy : \n x:" + parseInt(startX) + "\n y:" +
            parseInt(startY);
        document.getElementById("ePL").innerHTML = "Punkt końcowy : \n x:" +
            parseInt(x) + "\n y:" + parseInt(y);
    }

    drawNoAcceptedSquare(x, y, proportion, helpCanvas) {
        let ctx1 = helpCanvas.getContext("2d");
        ctx1.clearRect(0, 0, finalWidth, finalHeight);
        ctx1.beginPath();
        ctx1.lineCap = "square";
        ctx1.moveTo(startX / proportion, startY / proportion);
        ctx1.strokeStyle = "#2fff00";
        ctx1.strokeWidth = 3;
        ctx1.lineTo(x, startY / proportion);
        ctx1.lineTo(x, y);
        ctx1.lineTo(startX / proportion, y);
        ctx1.lineTo(startX / proportion, startY / proportion);
        ctx1.stroke();
        ctx1.closePath();
        document.getElementById("sPS").innerHTML = "Punkt początkowy: x: " + parseInt(startX) + " y: " + parseInt(startY);
        document.getElementById("ePS").innerHTML = "Punkt końcowy: x: " + parseInt(x) + " y: " + parseInt(y);
    }

    drawNoAcceptedTriangle(x, y, proportion, helpCanvas) {
        let ctx1 = helpCanvas.getContext("2d");
        ctx1.clearRect(0, 0, finalWidth, finalHeight);
        ctx1.beginPath();
        ctx1.lineCap = "square";
        ctx1.moveTo(startX / proportion, startY / proportion);
        ctx1.strokeStyle = "#2fff00";
        ctx1.strokeWidth = 3;
        ctx1.lineTo(x, y);
        ctx1.lineTo(startX / proportion + (startX / proportion - x), y);
        ctx1.lineTo(startX / proportion, startY / proportion);
        ctx1.stroke();
        ctx1.closePath();
        document.getElementById("sPT").innerHTML = "Punkt początkowy: x: " + parseInt(startX) + " y: " + parseInt(startY);
        document.getElementById("ePT").innerHTML = "Punkt końcowy: x: " + parseInt(x) + " y: " + parseInt(y);
    }

    checkingLine(x, y, object, proportion, helpCanvas) {
        if (start === false) {
            console.log(proportion);
            console.log(x);
            console.log(y);
            startX = x * proportion;
            startY = y * proportion;
            start = true;
        } else {
            let ctx1 = helpCanvas.getContext("2d");
            ctx1.clearRect(0, 0, finalWidth, finalHeight);
            endX = x * proportion;
            endY = y * proportion;
            let drawing = new canvas(finalWidth, finalHeight, proportion);
            drawing.drawFinalLine(object);
            start = false;
            drawLine = false;
        }
    }

    checkingSquare(x, y, object, proportion, helpCanvas) {
        if (start === false) {
            startX = x * proportion;
            startY = y * proportion;
            start = true;
        } else {
            let ctx1 = helpCanvas.getContext("2d");
            ctx1.clearRect(0, 0, finalWidth + 10, finalHeight + 10);
            endX = x * proportion;
            endY = y * proportion;
            let drawing = new canvas(finalWidth, finalHeight, proportion);
            drawing.drawFinalSquare(object);
            start = false;
            drawLine = false;
        }
    }

    checkingTriangle(x, y, object, proportion, helpCanvas) {
        if (start === false) {
            startX = x * proportion;
            startY = y * proportion;
            start = true;
        } else {
            let ctx1 = helpCanvas.getContext("2d");
            ctx1.clearRect(0, 0, finalWidth + 10, finalHeight + 10);
            endX = x * proportion;
            endY = y * proportion;
            let drawing = new canvas(finalWidth, finalHeight, proportion);
            drawing.drawFinalTriangle(object);
            start = false;
            drawLine = false;
        }
    }

    clear(canvas) {
        let ctx1 = canvas.getContext("2d");
        ctx1.clearRect(0, 0, finalWidth + 10, finalHeight + 10);
        start = false;
        drawLine = false;
    }

    pickColor(object, proportion, offsetX, offsetY) {
        let obCtx = object.getContext("2d");
        let data = obCtx.getImageData(offsetX * proportion, offsetY * proportion, 1, 1).data;
        let r = data[0];
        let g = data[1];
        let b = data[2];
        let a = data[3];
        drawColour = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
        return false;
    }

    setPickerClick(bol) {
        pickColorClick = bol;
    }

    getPickerClick() {
        return pickColorClick;
    }

    setRubberClick(bol) {
        rubberClick = bol;
    }

    gerRubberClick() {
        return rubberClick;
    }

    setDrawShape(str) {
        drawShape = str;
    }

    getDrawShape() {
        return drawShape;
    }

    setX(cont) {
        x = cont;
    }

    setY(cont) {
        y = cont;
    }

    setEditType(cont) {
        editType = cont;
    }

    setDrawWidth(cont) {
        drawWidth = cont;
    }

}

//Brush canvas
export class brush {
    setColour(col) {
        drawColour = col;
    }
}

//jQuery functions
$(".drawSizeSlider").mousemove(function () {
    if (cutBrush === false) {
        switch (editType) {
            case 1:
                drawWidth = document.getElementById("drawSize").value;
                document.getElementById("drawSize4").value = drawWidth;

                break;
            case 2:
                drawWidth = document.getElementById("drawSize1").value;
                document.getElementById("drawSize4").value = drawWidth;


                break;
            case 3:
                drawWidth = document.getElementById("drawSize2").value;
                document.getElementById("drawSize4").value = drawWidth;


                break;
            case 4:
                drawWidth = document.getElementById("drawSize3").value;
                document.getElementById("drawSize4").value = drawWidth;

                break;


        }
    }

    document.getElementById("drawSize").value = drawWidth;
    document.getElementById("drawSize1").value = drawWidth;
    document.getElementById("drawSize2").value = drawWidth;
    document.getElementById("drawSize3").value = drawWidth;
    $(".width").html("Grubość pędzla to : " + parseInt(drawWidth * proportion) + " px");
});

$(".square").click(function () {
    drawShape = "square";
    $(".square").removeClass("new_obj").addClass("chosen-new-obj");
    $(".round").removeClass("chosen-new-obj").addClass("new_obj");
});

$(".round").click(function () {
    drawShape = "round";
    $(".round").removeClass("new_obj").addClass("chosen-new-obj");
    $(".square").removeClass("chosen-new-obj").addClass("new_obj");
});

$(window).keyup(function (e) {
    if (e.key === "Escape") {
        let drawing = new canvas(finalWidth, finalHeight, proportion);
        drawing.clear(document.getElementById("canvas1"));
    }
});

$("#pickColour").click(ev => {
    if (pickColourClick === false) {
        pickColourClick = true;
    } else {
        pickColourClick = false;
    }
    rubberClick = false;
    $("#rubber").removeClass("chosen-new-obj").addClass("new_obj");

});

$("#rubber").click(ev => {
    if (rubberClick === true) {
        rubberClick = false;
        $("#rubber").removeClass("chosen-new-obj").addClass("new_obj");
    } else {
        $("#rubber").removeClass("new_obj").addClass("chosen-new-obj");
        rubberClick = true;
    }
});

$(window).mouseup(ev => {
    press = false;
});

$("#contents").mousedown(ev => {
    press = true;
});