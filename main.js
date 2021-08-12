import {canvas} from "../classes/canvas.js";
import {image1, cutBrush} from "../classes/image.js";
import {create} from "./create.js";
import {grid1} from "../classes/grid.js";
import {chooseColour} from "./colorPicker.js";
import {text1} from "../classes/text.js";
import {exportPhoto} from "./export.js";
//Export Variables
export const height = 1080, width = 1920;
//get_cookies("height")
//get_cookies("width")
export let press = false;
export let type = "";
export let editType = "";
export let object = document.getElementById("canvas");
export const helpCanvas = document.getElementById("canvas2");
export let objects = ['background'];
export let types = ['background'];
export let filtersArray = ["null"];
export let chosenFunction = ["null"];
export let orderIDs = [];

//Local Variables
let borderPoints = [];
let gridCanvas = document.getElementById("canvas1");
let firstData = init();
let length = 1, oldLength = 1;
let minBorderPoint = 0;
let cutting = false;
let firstPhotoOffSetX = 0;
let firstPhotoOffSetY = 0;
let start = false;
let pickColourClick = false;

//Const Export Variables
export const finalWidth = firstData[0];
export const finalHeight = firstData[1];
export const proportion = firstData[2];

//Class def
const drawing = new canvas(finalWidth, finalHeight, proportion);
const image = new image1(finalWidth, finalHeight, proportion);
const grid = new grid1();
const text = new text1();

//Functions

//Init type
function init() {
    $("#frequencyExport").html(width+"x"+height);
    mouseMoveInitInEffects();
    fontInitEvents();
    let innerHeight = window.innerHeight;
    let innerWidth = window.innerWidth;
    let finalWidth1 = 0;
    let finalHeight1 = 0;
    let proportion1 = 0;
    $("#functions-div").width(innerWidth * 0.25);
    let height1 = innerHeight * 0.7;
    let width1 = innerWidth * 0.7;

    if(height<width) {
        proportion1 = (width / width1);
        finalWidth1 = ((width) / proportion1);
        finalHeight1 = ((height) / proportion1);
    }else{
        proportion1 = (height / height1);
        finalWidth1 = ((width) / proportion1);
        finalHeight1 = ((height) / proportion1);
    }


    $("#contents").width(finalWidth1);
    $("#contents").height(finalHeight1);
    document.getElementById("contents").style.top = (innerHeight/2)-(finalHeight1/2)+"px";
    document.getElementById("left-div").style.width = innerWidth*0.75+"px";
    helpCanvas.height = finalHeight1;
    helpCanvas.width = finalWidth1;
    helpCanvas.style.height = finalHeight1 + "px";
    helpCanvas.style.width = finalWidth1 + "px";
    gridCanvas.height = finalHeight1;
    gridCanvas.width = finalWidth1;
    gridCanvas.style.height = finalHeight1 + "px";
    gridCanvas.style.width = finalWidth1 + "px";

    return [finalWidth1, finalHeight1, proportion1];
}

function get_cookies(name) {
    let cookie;
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return cookie = c.substring(name.length + 1, c.length);
        }
    }
    return null;
}

export function pushID(ID){
    orderIDs.push(ID);
}
//Create and choose type

function newObject(object) {
    switch (object) {
        case 'sketch':
            create("canvas");
            break;
        case 'photo':
            create('img');
            break;
        case 'title':
            create('p');
            break;
        case 'grid':
            grid.openGridSettings();
            break;
    }
}


function chooseTypeOfEditObject() {
    $(".edit-type-options").removeClass("edit-type-options").addClass("hidden");
    drawing.clear(helpCanvas);
    let id = "";
    switch (type) {
        case "canvas":
            switch (parseInt(editType)) {
                case 1:
                    id = "#drawingSettings"
                    break;
                case 2:
                    id = "#lineDrawingSettings";
                    break;
                case 3:
                    id = "#squareDrawingSettings";
                    break;
                case 4:
                    id = "#triangleDrawingSettings";
                    break;
                case 5:
                    id = "#rotationSettings";
                    break;

            }
            break;
        case "img":
            switch (parseInt(editType)) {
                case 1:
                    id = "#filtersSettings";
                    break;
                case 2:
                    id = "#positionSettings"
                    break;
                case 3:
                    image.clear(helpCanvas);
                    id = "#sizeSettings";
                    image.drawGridOfImage(object, helpCanvas, type)
                    break;
                case 4:
                    id = "#cutSettings"
                    break;
                case 5:
                    id = "#rotationSettings";
                    break;

            }
            break;
        case "p":
            break;

    }
    console.log(id);
    $(id).removeClass("hidden")
    $(id).addClass("edit-type-options");

}

export function chooseObject(length) {
    object = document.getElementById("ob" + length.toString());
    editType = parseInt(chosenFunction[oldLength]);
    drawing.setEditType(editType);
    chooseTypeOfEditObject();
    switch (type) {
        case "canvas":
            document.getElementById("drawing-options").className = "hidden";
            break;
        case "img":
            document.getElementById("photo-options").className = "hidden";
            break;
        case "p":
            document.getElementById("title-options").className = "hidden";
            break;
    }
    type = types[parseInt(length)];
    switch (type) {
        case "canvas":
            document.getElementById("drawing-options").className = "options";
            break;
        case "img":
            document.getElementById("photo-options").className = "options";
            setRang(length);
            break;
        case "p":
            document.getElementById("title-options").className = "options";
            break;

    }

    document.getElementById("objects" + oldLength.toString()).className = "option centered-white";
    document.getElementById("objects" + length.toString()).className = "highlight centered-white";
    $("#grid-options").removeClass("options").addClass("hidden");
    oldLength = length;
}

function editTypeSet(type) {
    editType = parseInt(type);
    drawing.setEditType(editType);
    chooseTypeOfEditObject();
    chosenFunction[oldLength] = editType.toString();
    switch (type) {
        case "1":
            break;
        case "2":
            break;
        case "3":
            break;

    }
}


//Image type

function setRang(length) {

    let filter = filtersArray[length];
    document.getElementById("1P").value = parseInt(filter.blur, 10).toString();
    document.getElementById("2P").value = parseInt(filter.brightness, 10).toString();
    document.getElementById("3P").value = parseInt(filter.contrast, 10).toString();
    document.getElementById("4P").value = parseInt(filter.dropshadow, 10).toString();
    document.getElementById("5P").value = parseInt(filter.gray, 10).toString();
    document.getElementById("6P").value = parseInt(filter.rotate, 10).toString();
    document.getElementById("7P").value = parseInt(filter.invert, 10).toString();
    document.getElementById("8P").value = parseInt(filter.opacity, 10).toString();
    document.getElementById("9P").value = parseInt(filter.saturate, 10).toString();
    document.getElementById("10P").value = parseInt(filter.sepia, 10).toString();
    editType = parseInt(chosenFunction[length]);
    drawing.setEditType(editType);

}

export function filters(blur, brightness, contrast, dropshadow,
                        gray, rotate, invert, opacity, saturate,
                        sepia) {
    this.blur = blur;
    this.brightness = brightness;
    this.contrast = contrast;
    this.dropshadow = dropshadow;
    this.gray = gray;
    this.rotate = rotate;
    this.invert = invert;
    this.opacity = opacity;
    this.saturate = saturate;
    this.sepia = sepia;

}

function filter(type) {
    switch (type.toString()) {
        case "1":
            filtersArray[oldLength].blur = document.getElementById("1P").value;
            image.newStyleSetter(filtersArray[oldLength], object);
            break;
        case "2":
            filtersArray[oldLength].brightness = document.getElementById("2P").value;
            image.newStyleSetter(filtersArray[oldLength], object);
            break;
        case "3":
            filtersArray[oldLength].contrast = document.getElementById("3P").value;
            image.newStyleSetter(filtersArray[oldLength], object);
            break;
        case "4":
            filtersArray[oldLength].dropshadow = document.getElementById("4P").value;
            image.newStyleSetter(filtersArray[oldLength], object);
            break;
        case "5":
            filtersArray[oldLength].gray = document.getElementById("5P").value;
            image.newStyleSetter(filtersArray[oldLength], object);
            break;
        case "6":
            filtersArray[oldLength].rotate = document.getElementById("6P").value;
            image.newStyleSetter(filtersArray[oldLength], object);
            break;
        case "7":
            filtersArray[oldLength].invert = document.getElementById("7P").value;
            image.newStyleSetter(filtersArray[oldLength], object);
            break;
        case "8":
            filtersArray[oldLength].opacity = document.getElementById("8P").value;
            image.newStyleSetter(filtersArray[oldLength], object);
            break;
        case "9":
            filtersArray[oldLength].saturate = document.getElementById("9P").value;
            image.newStyleSetter(filtersArray[oldLength], object);
            break;
        case "10":
            filtersArray[oldLength].sepia = document.getElementById("10P").value;
            image.newStyleSetter(filtersArray[oldLength], object);
            break;


    }
}


//jQuery Methods

//Contents methods
$("#contents").mousedown(ev => {
    drawing.setX(firstPhotoOffSetX = ev.offsetX - object.offsetLeft);
    drawing.setY(firstPhotoOffSetY = ev.offsetY - object.offsetTop);
    press = true;
    image.setPress(press)
});

$("#contents").click(ev => {

    switch (type) {
        case "canvas":

            if (editType === 1) {
                if (pickColourClick === true) {
                    drawing.pickColor(object, proportion, ev.offsetX, ev.offsetY);
                    pickColourClick = false;
                }
            } else if (editType === 2) {
                if (start === false) {
                    start = true;
                } else {
                    start = false;
                }
                drawing.checkingLine(ev.offsetX, ev.offsetY, object, proportion, helpCanvas);
            } else if (editType === 3) {
                if (start === false) {
                    start = true;
                } else {
                    start = false;
                }
                drawing.checkingSquare(ev.offsetX, ev.offsetY, object, proportion, helpCanvas)
            } else if (editType === 4) {
                if (start === false) {
                    start = true;
                } else {
                    start = false;
                }
                drawing.checkingTriangle(ev.offsetX, ev.offsetY, object, proportion, helpCanvas)
            }
            break;
        case "img":
            if (editType === 4) {
                let points = [(ev.offsetX - object.offsetLeft), (ev.offsetY - object.offsetTop)];
                borderPoints.push(points);
                image.drawNoAcceptedArea(ev.offsetX, ev.offsetY, helpCanvas);
                if (borderPoints[minBorderPoint][1] >= (ev.offsetY - object.offsetTop)) {
                    minBorderPoint = borderPoints.length - 1;
                }
            }
            break;
        case "p":
            break;
    }
});

$("#contents").mousemove(ev => {
    switch (type) {
        case "canvas":
            if (press === true && editType === 1 && drawing.getPickerClick() === false) {
                if (drawing.gerRubberClick() === false) {
                    drawing.draw(ev.offsetX, ev.offsetY, object);
                } else {
                    drawing.rubber(ev.offsetX, ev.offsetY, object);
                }
            } else if (editType === 2) {
                if (start === true) {
                    drawing.drawNoAcceptedLine(ev.offsetX, ev.offsetY, proportion, helpCanvas);
                }
            } else if (editType === 3) {
                if (start === true) {
                    drawing.drawNoAcceptedSquare(ev.offsetX, ev.offsetY, proportion, helpCanvas);
                }
            } else if (editType === 4) {
                if (start === true) {
                    drawing.drawNoAcceptedTriangle(ev.offsetX, ev.offsetY, proportion, helpCanvas);
                }
            }
            break;
        case "img":
            if (press === true && editType === 2) {
                image.imagePosition(object);
                image.positioning(ev.offsetX, ev.offsetY, firstPhotoOffSetX, firstPhotoOffSetY, type, object);
            } else if (editType === 2) {
                image.mouseStalker(ev.offsetX, ev.offsetY)
            } else if (editType === 3) {
                let cutType = image.cursorChanger(ev.offsetX, ev.offsetY, object, press, type);

                if (press === true) {
                    image.sizeChanger(ev.offsetY, ev.offsetX, type, object, helpCanvas, cutType);
                }
            } else if (editType === 4) {
                if (press === true) {
                    borderPoints.push([(ev.offsetX - object.offsetLeft), (ev.offsetY - object.offsetTop)]);
                    image.drawNoAcceptedArea(ev.offsetX, ev.offsetY, helpCanvas);
                    if (borderPoints[minBorderPoint][1] >= (ev.offsetY - object.offsetTop)) {
                        minBorderPoint = borderPoints.length - 1;
                    }
                }
            }
            break;
        case "p":
            if (press === true && editType === 2) {
                image.positioning(ev.offsetX, ev.offsetY, firstPhotoOffSetX, firstPhotoOffSetY, type, object);
            }
            break;
    }
});

//Help canvas

$("#canvas1").mousedown(ev => {
    if (type === "img" && editType === 3) {
        let ctx1 = helpCanvas.getContext("2d");
        let data = ctx1.getImageData(ev.offsetX, ev.offsetY, 1, 1).data;
        let r = data[0];
        let g = data[1];
        let b = data[2];
        let a = data[3];
        image.setVariable("point", false);
        if (parseInt(r) > 170 && parseInt(g) > 170 && parseInt(b) > 170 && a > 1) {
            image.setVariable("onNet", true);
        } else if (parseInt(r) > 190 && parseInt(g) > 2 && parseInt(b) > 50 && a > 1) {
            image.setVariable("onNet", false);
            image.setVariable("point", true);
        } else {
            image.setVariable("onNet", false);
        }
    }
});

//Cut Brush Size
$("#drawSize4").mousemove(function () {
    if (cutBrush === true && type === "img") {
        let drawWidth = document.getElementById("drawSize4").value;
        document.getElementById("drawSize").value = drawWidth;
        document.getElementById("drawSize1").value = drawWidth;
        document.getElementById("drawSize2").value = drawWidth;
        document.getElementById("drawSize3").value = drawWidth;
        document.getElementById("drawSize4").value = drawWidth;
        drawing.setDrawWidth(drawWidth);
        $(".width").html("Grubość pędzla to : " + parseInt(drawWidth * proportion) + " px");
    }

});

//jQuery image methods

$("#startCutting").click(ev => {
    cutting = true;
    let deg = 0;
    deg = image.getDegFromObject(object);
    if (deg <= 0) {
        deg = 0;
    }
    object.style.transform = "rotate(0)";
    image.startCutting(deg);
});

$("#endCutting").click(ev => {
    let ctx5 = helpCanvas.getContext("2d");
    if(cutting===true) {
        image.setFirstTimeDraw(false);
        ctx5.clearRect(0, 0, helpCanvas.offsetWidth, helpCanvas.offsetHeight);
        if (cutBrush === false) {
            image.cutPhotoByLineMode(object, minBorderPoint, borderPoints);
        } else {
            image.cutPhotoByBrushMode(object, minBorderPoint, borderPoints);
        }
        minBorderPoint = 0;
        borderPoints = [];
        image.endCutting( object);
        cutting = false;
    }
});

$("#deleteNoAcceptedCut").click(ev => {
    cutting = false;
    minBorderPoint = 0;
    borderPoints = [];
    image.clear(helpCanvas);
});

$("#insideCut").click(ev => {
    image.changeModeOfFillCut()
});

$("#outCut").click(ev => {
    image.changeModeOfFillCut();
});

$("#lineCut").click(ev => {
    image.setVariable("cutBrush", false)
    $("#brushCut").removeClass("chosen-new-obj").addClass("new_obj");
    $("#lineCut").removeClass("new_obj").addClass("chosen-new-obj");
    $("#extraCutOptions").removeClass("extraOptions").addClass("hidden hiddenExtraOptions");
});

$("#brushCut").click(ev => {
    image.setVariable("cutBrush", true)
    $("#lineCut").removeClass("chosen-new-obj").addClass("new_obj");
    $("#brushCut").removeClass("new_obj").addClass("chosen-new-obj");
    $("#outCut").removeClass("chosen-new-obj").addClass("new_obj");
    $("#insideCut").removeClass("new_obj").addClass("chosen-new-obj");
    $("#extraCutOptions").removeClass("hidden hiddenExtraOptions").addClass("extraOptions");
    image.changeModeOfFillCut();
});

$("#xPosition").on("input", function () {
    let ctx1 = helpCanvas.getContext("2d");
    ctx1.clearRect(0, 0, finalWidth, finalHeight);
    ctx1.beginPath();
    ctx1.moveTo(0, parseInt($("#yPosition").val()) / proportion);
    ctx1.strokeStyle = "#2fff00";
    ctx1.strokeWidth = 2;
    ctx1.lineTo(finalWidth, parseInt($("#yPosition").val()) / proportion);
    ctx1.stroke();
    ctx1.closePath();
    ctx1.beginPath();
    ctx1.moveTo(parseInt($("#xPosition").val()) / proportion, 0);
    ctx1.strokeStyle = "#2fff00";
    ctx1.strokeWidth = 2;
    ctx1.lineTo(parseInt($("#xPosition").val()) / proportion, finalHeight);
    ctx1.stroke();
    ctx1.closePath();
});

$("#yPosition").on("input", function () {
    let ctx1 = helpCanvas.getContext("2d");
    ctx1.clearRect(0, 0, finalWidth, finalHeight);
    ctx1.beginPath();
    ctx1.moveTo(0, parseInt($("#yPosition").val()) / proportion);
    ctx1.strokeStyle = "#2fff00";
    ctx1.strokeWidth = 2;
    ctx1.lineTo(finalWidth, parseInt($("#yPosition").val()) / proportion);
    ctx1.stroke();
    ctx1.closePath();
    ctx1.beginPath();
    ctx1.moveTo(parseInt($("#xPosition").val()) / proportion, 0);
    ctx1.strokeStyle = "#2fff00";
    ctx1.strokeWidth = 2;
    ctx1.lineTo(parseInt($("#xPosition").val()) / proportion, finalHeight);
    ctx1.stroke();
    ctx1.closePath();
});

$("#newImgPositionSetter").click(function (ev) {
    image.imagePosition(object);
    object.style.top = parseInt($("#yPosition").val()) / proportion + 'px';
    object.style.left = parseInt($("#xPosition").val()) / proportion + 'px';
    $("#yPosition").val(0);
    $("#xPosition").val(0);
    image.clear(helpCanvas);

});
$("#pickColour").click(ev => {
    if (pickColourClick === false) {
        pickColourClick = true;
    } else {
        pickColourClick = false;
    }
    $("#rubber").removeClass("chosen-new-obj").addClass("new_obj");

});

//init events jQuery

$("#newSketchB").click(ev => {
    create('canvas');
});
$("#newPhotoB").click(ev => {
    document.getElementById("newPhoto").click();
});
$("#newPhoto").change(ev => {
    newObject('photo');
});
$("#newTitleB").click(ev => {
    create('p');
});
$("#gridB").click(ev => {
    newObject("grid");
});
$("#rotationRange").mousemove(ev => {
    image.rotation(object);
});
$("#textRang").mousemove(ev => {
    text.textSize(object);
});
$("#export").click(ev => {
    $("#exportDialog").removeClass("hidden").addClass("exportDialog");
    $("#backgroundOfDialog").removeClass("hidden hideDialog").addClass("showDialog1");
    exportPhoto();
});
$(".chosen_colour").click(ev => {
    chooseColour();
});
$("#resizeImage").click(ev => {
    image.resizingPhotoFromInput(object, proportion, helpCanvas, type);
});
$("#clearUserResizeInput").click(ev => {
    $("#newWidthOfPhoto").val(0);
    $("#newHeightOfPhoto").val(0);
});
$("#clearUserRotationData").click(ev => {
    $("#rotationRange").val(0);
});
$("#applyUserRotationData").click(ev => {
    image.applyRotation(object);
});
$("#verticalGrid").mousemove(ev => {
    grid.frequency(gridCanvas.getContext("2d"), gridCanvas);
});
$("#horizontalGrid").mousemove(ev => {
    grid.frequency(gridCanvas.getContext("2d"), gridCanvas);
});
$("#gridONOF").click(ev => {
    grid.turnOf(gridCanvas.getContext("2d"), gridCanvas);
});
$("#textAdder").keyup(ev=>{
   object.innerHTML =  $("#textAdder").val();
});
$("#normalFont").click(ev => {
    object.style.fontWeight = "normal"
});
$("#boldFont").click(ev => {
    object.style.fontWeight = "bold"
});
$("#fontFamilyB").click(ev => {
    text.fontFamilyDialog();
});
$("#upLayer").click(ev => {
    let ID = parseInt(object.id.toString().split("ob")[1])-1;
    let fakeTab = orderIDs;
    if(ID+1<objects.length) {
        let doc1 = document.getElementById("ob"+(ID+2).toString()).cloneNode(true);
        document.getElementById("ob"+(ID+2).toString()).replaceWith( document.getElementById("ob"+(ID+1)));
        document.getElementById("contents").insertBefore(doc1, document.getElementById("ob"+(ID+1).toString()));

        let doc2 = document.getElementById("objects"+(ID+2).toString()).cloneNode(true);
        doc2.onclick = function () {
            chooseObject(ID+2);
        };
        document.getElementById("objects"+(ID+2).toString()).replaceWith( document.getElementById("objects"+(ID+1)));
        document.getElementById("list").insertBefore(doc2, document.getElementById("objects"+(ID+1).toString()));
        fakeTab[ID + 1] = orderIDs[ID];
        fakeTab[ID] = orderIDs[ID+1];


    }
    orderIDs = fakeTab;
});
for (let i = 1; i < 6; i++) {
    let tab = document.querySelectorAll((".edit_type_options" + i.toString()));
    tab.forEach(el => {

        el.addEventListener("click", function () {
            editTypeSet(i.toString());
        });
    });
}

function mouseMoveInitInEffects() {
    let tab = document.querySelectorAll(".effects_slider");
    let i1 = 0;
    tab.forEach(el => {
        i1++;
        let i = i1;
        el.addEventListener("mousemove", function () {
            filter(i);
        });
    });
}
function fontInitEvents() {
    let tab = document.querySelectorAll(".font_button");
    let i1 = 0;
    tab.forEach(el => {
        i1++;
        let i = i1;
        let el1 = el;
        el.addEventListener("click", function () {
            object.style.fontFamily = el1.style.fontFamily;
            $("#font").html(el1.style.fontFamily.toString());
        });
    });
}
//Window jQuery

$(window).mouseup(ev => {
    press = false;
});




