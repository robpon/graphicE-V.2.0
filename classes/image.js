import {drawWidth, drawShape} from "./canvas.js";

//Export variables
export let cutBrush = false;

//Local variables
let oldXP, oldYP = 0;
let firstTimeDraw, point, onNet = false;
let cutType = 1;
let cutting = false;
let editType = "";
let deg = 0;
let finalWidth = 0;
let finalHeight = 0;
let proportion = 0;
let press = false;
//Class image
export class image1 {

    constructor(finalW, finalH, prop) {
        finalWidth = finalW;
        finalHeight = finalH;
        proportion = prop;
    }

    setFiltersForChosenObject(objectID, filtersArray) {
        var filter = filtersArray[objectID];
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
        editType = parseInt(chosenFunction[objectID]);
    }

    newStyleSetter(filter, object) {
        var style = "blur(" + filter.blur + "px) ";
        style += "brightness(" + filter.brightness + "%) ";
        style += "contrast(" + filter.contrast + "%) ";
        //style += "dropshadow("+filter.dropshadow+"%) ";
        style += "grayscale(" + filter.gray + "%) ";
        style += "hue-rotate(" + filter.rotate + "deg) ";
        style += "invert(" + filter.invert + "%) ";
        style += "opacity(" + filter.opacity + "%) ";
        style += "saturate(" + filter.saturate + "%) ";
        style += "sepia(" + filter.sepia + "%) ";
        object.style.filter = style;
    }

    getStyleOfObject(filter) {
        var style = "blur(" + filter.blur + "px) ";
        style += "brightness(" + filter.brightness + "%) ";
        style += "contrast(" + filter.contrast + "%) ";
        //style += "dropshadow("+filter.dropshadow+"%) ";
        style += "grayscale(" + filter.gray + "%) ";
        style += "hue-rotate(" + filter.rotate + "deg) ";
        style += "invert(" + filter.invert + "%) ";
        style += "opacity(" + filter.opacity + "%) ";
        style += "saturate(" + filter.saturate + "%) ";
        style += "sepia(" + filter.sepia + "%) ";
        return style;
    }

    positioning(x1, y1, firstPhotoOffSetX, firstPhotoOffSetY, type, object) {
        if (type != "canvas") {
            object.style.left = x1 - firstPhotoOffSetX + 'px';
            object.style.top = y1 - firstPhotoOffSetY + 'px';
        }
    }

    cursorChanger(offsetX, offsetY, object, press, type) {
        var x = offsetX;
        var y = offsetY;
        if (offsetY > object.offsetLeft + 5 && offsetY < object.offsetLeft + object.offsetWidth - 5 && offsetX > object.offsetTop + 5
            && offsetX < object.offsetTop + object.offsetHeight - 5) {
            object.style.cursor = "default";
        }
        if (point === true && type === "img") {

            if (offsetY <= object.offsetTop - 20 &&
                offsetX <= object.offsetLeft + 20
            ) {
                cutType = 1;
            } else if (offsetX >= object.offsetLeft + object.offsetWidth - 10
                && offsetY <= object.offsetTop - 10) {
                cutType = 2;
            } else if (offsetY >= object.offsetTop + object.offsetHeight - 20
                && offsetX >= object.offsetLeft + object.offsetWidth - 20) {
                cutType = 3;

            } else if (offsetX <= object.offsetLeft + 20
                && offsetY >= object.offsetTop + object.offsetHeight - 20) {
                cutType = 4;
            }
        }
        if (press === false && type === "img") {
            if (offsetY >= object.offsetTop - 20 && offsetY <= object.offsetTop + 2 &&
                offsetX >= object.offsetLeft
                && offsetX <= object.offsetLeft + object.offsetWidth
            ) {
                object.style.cursor = "n-resize";
                cutType = 1;
                $(object).mousedown(function (ev1) {
                    press = true;
                });

            } else if (offsetX >= object.offsetLeft +
                object.offsetWidth - 2 && offsetX <= object.offsetLeft + object.offsetWidth + 20
                && offsetY <= object.offsetHeight + object.offsetTop &&
                offsetY >= object.offsetTop) {
                object.style.cursor = "e-resize";
                cutType = 2;
                $(object).mousedown(function (ev1) {
                    press = true;
                });
            } else if (offsetY >= object.offsetTop + object.offsetHeight - 20
                && offsetY <= object.offsetTop + object.offsetHeight + 2 &&
                offsetX >= object.offsetLeft && offsetX <= object.offsetLeft + object.offsetWidth) {
                object.style.cursor = "s-resize";
                cutType = 3;
                $(object).mousedown(function (ev1) {
                    press = true;
                });
            } else if (offsetX >= object.offsetLeft - 20 && offsetX <= object.offsetLeft + 5
                && offsetY <= object.offsetHeight + object.offsetTop+5 &&
                offsetY >= object.offsetHeight + object.offsetTop-20) {
                object.style.cursor = "w-resize";
                cutType = 4;
                $(object).mousedown(function (ev1) {
                    press = true;
                });
            } else {
                object.style.cursor = "default";
            }
        }
        return cutType;
    }

    mouseStalker(x, y) {
        let trueX = parseInt(parseInt(x) * proportion);
        let trueY = parseInt(parseInt(y) * proportion);
        $("#mousePosition").html("Pozycja myszki: " + trueX + ", " + trueY);
    }

    imagePosition(object) {
        let trueX = parseInt(parseInt(object.offsetLeft) * proportion);
        let trueY = parseInt(parseInt(object.offsetTop) * proportion);
        $("#imagePosition").html("Pozycja obazu: " + trueX + ", " + trueY);
    }

    rotation(object) {
        object.style.transform = "rotate(" + $("#rotationRange").val() + "deg)";
        $("#rotation").html("Odchylnie od poziomu to: " + $("#rotationRange").val() + " *");
    }

    rotationClear() {
        $("#rotationInput").val(0);
    }

    getDegFromObject(object) {
        let str = object.style.transform;
        let index = str.search("rotate");
        let index1 = str.search(("deg"));
        let deg = "";
        if(index1===-1){
            deg= 0;
        }else {
            deg = str.substring(index + 7, index1);
        }

        return deg;
    }

    applyRotation(object) {
        $("#rotationRange").val($("#rotationInput").val());
        let image = new image1(finalWidth, finalHeight, proportion);
        image.rotation(object);
        image.rotationClear();
    }

    sizeChanger(offsetY, offsetX, type, object, helpCanvas, cutType) {
        if (type != "canvas") {
            var x = object.offsetLeft;
            var y = object.offsetTop;
            console.log(cutType);
            console.log(onNet);
            console.log(point);
            console.log(cutType);
            if (onNet === true) {
                switch (cutType) {
                    case 1:
                        var y2 = y - offsetY;
                        object.style.top = offsetY + 'px';
                        object.style.height = object.offsetHeight + y2 + 'px';
                        y = object.offsetTop;
                        break;
                    case 2:
                        var x2 = x + object.offsetWidth - offsetX;
                        object.style.width = object.offsetWidth - x2 + 'px';
                        x = object.offsetLeft;
                        break;
                    case 3:
                        var y3 = y + object.offsetHeight - offsetY;
                        object.style.height = object.offsetHeight - y3 + 'px';
                        y = object.offsetHeight;
                        break;
                    case 4:
                        var x3 = x - offsetX;
                        object.style.left = offsetX + 'px';
                        object.style.width = object.offsetWidth + x3 + 'px';
                        x = object.offsetLeft;
                        break;
                }

            } else if (point === true) {
                switch (cutType) {
                    case 1:
                        var y2 = y - offsetY;
                        object.style.top = offsetY + 'px';
                        object.style.height = object.offsetHeight + y2 + 'px';
                        y = object.offsetTop;
                        var x3 = x - offsetX;
                        object.style.left = offsetX + 'px';
                        object.style.width = object.offsetWidth + x3 + 'px';
                        x = object.offsetLeft;
                        break;
                    case 2:
                        var x2 = x + object.offsetWidth - offsetX;
                        object.style.width = object.offsetWidth - x2 + 'px';
                        x = object.offsetLeft;
                        var y2 = y - offsetY;
                        object.style.top = offsetY + 'px';
                        object.style.height = object.offsetHeight + y2 + 'px';
                        y = object.offsetTop;
                        break;
                    case 3:
                        var y3 = y + object.offsetHeight - offsetY;
                        object.style.height = object.offsetHeight - y3 + 'px';
                        y = object.offsetHeight;
                        var x2 = x + object.offsetWidth - offsetX;
                        object.style.width = object.offsetWidth - x2 + 'px';
                        x = object.offsetLeft;
                        break;
                    case 4:
                        var x3 = x - offsetX;
                        object.style.left = offsetX + 'px';
                        object.style.width = object.offsetWidth + x3 + 'px';
                        x = object.offsetLeft;
                        var y3 = y + object.offsetHeight - offsetY;
                        object.style.height = object.offsetHeight - y3 + 'px';
                        y = object.offsetHeight;
                        break;
                }
            }
            let image = new image1(finalWidth, finalHeight, proportion);
            image.drawGridOfImage(object, helpCanvas, type);
        }
    }

    drawGridOfImage(object, helpCanvas, type) {
        if (type != "canvas") {
            let startX1 = object.offsetLeft;
            let startY1 = object.offsetTop;
            let endX1 = object.offsetWidth;
            let endY1 = object.offsetHeight;
            let ctx1 = helpCanvas.getContext("2d");
            let image = new image1(finalWidth, finalHeight, proportion);
            console.log(finalWidth + "o");
            console.log(finalHeight);
            ctx1.clearRect(0, 0, finalWidth, finalHeight);
            image.clear(helpCanvas);
            ctx1.strokeStyle = "rgba(108,108,108,0.06)";
            ctx1.lineWidth = 4;
            ctx1.strokeRect(startX1, startY1, endX1, endY1);
            ctx1.strokeStyle = "#BBBBBB9E";
            ctx1.lineWidth = 2;
            ctx1.strokeRect(startX1, startY1, endX1, endY1);
            ctx1.stroke();
            ctx1.fillStyle = "#ce063c";
            ctx1.beginPath();
            ctx1.arc(startX1, startY1, 3, 0, 6.28);
            ctx1.fill();
            ctx1.beginPath();
            ctx1.arc(startX1 + endX1, startY1, 3, 0, 6.28);
            ctx1.fill();
            ctx1.beginPath();
            ctx1.arc(startX1 + endX1, startY1 + endY1, 3, 0, 6.28);
            ctx1.fill();
            ctx1.beginPath();
            ctx1.arc(startX1, startY1 + endY1, 3, 0, 6.28);
            ctx1.fill();

        }
    }

    resizingPhotoFromInput(object, proportion, helpCanvas, type) {
        let height = parseInt($("#newHeightOfPhoto").val()) / proportion;
        let width = parseInt($("#newWidthOfPhoto").val()) / proportion;
        object.style.height = height + 'px';
        object.style.width = width + 'px';
        let image = new image1(finalWidth, finalHeight, proportion);
        image.drawGridOfImage(object, helpCanvas, type);
    }

    clearUserSizeData() {
        $("#newWidthOfPhoto").val(0);
        $("#newHeightOfPhoto").val(0);
    }

    clear(canvas) {
        var ctx1 = canvas.getContext("2d");
        ctx1.clearRect(0, 0, finalWidth + 10, finalHeight + 10);

    }
    startCutting(deg){
        this.deg = deg;
    }
    endCutting(object){
        object.style.transform="rotate("+this.deg+"deg)";
    }
    cutPhotoByLineMode(object, minBorderPoint, borderPoints) {
        let img = document.createElement("img");
        let fakeCanvas = document.createElement("canvas");
        let fakeCtx = fakeCanvas.getContext("2d");
        let link = document.createElement('a');
        let oldHeight = object.style.height;
        let oldWidth = object.style.width;
        img.src = object.src;
        fakeCanvas.style.height = img.height + "px";
        fakeCanvas.style.width = img.width + "px";
        fakeCanvas.height = img.height;
        fakeCanvas.width = img.width;
        fakeCtx.drawImage(object, 0, 0);
        fakeCtx.globalCompositeOperation = "destination-out";
        fakeCtx.lineWidth = 1;
        if (cutType === 1) {
            fakeCtx.moveTo((borderPoints[0][0] / object.offsetWidth) * fakeCanvas.width, (borderPoints[0][1] / object.offsetHeight) * fakeCanvas.height);
            for (let i = 1; i < borderPoints.length; i++) {
                fakeCtx.lineTo((borderPoints[i][0] / object.offsetWidth) * fakeCanvas.width, (borderPoints[i][1] / object.offsetHeight) * fakeCanvas.height);
            }
            fakeCtx.fill();
        } else {
            fakeCtx.moveTo(0, 0);
            fakeCtx.lineTo(fakeCanvas.width, 0);
            fakeCtx.lineTo(fakeCanvas.width, fakeCanvas.height);
            fakeCtx.lineTo((borderPoints[minBorderPoint][0] / object.offsetWidth) * fakeCanvas.width, fakeCanvas.height);
            for (let i = minBorderPoint; i < borderPoints.length; i++) {
                fakeCtx.lineTo((borderPoints[i][0] / object.offsetWidth) * fakeCanvas.width, (borderPoints[i][1] / object.offsetHeight) * fakeCanvas.height);
            }
            fakeCtx.lineTo((borderPoints[0][0] / object.offsetWidth) * fakeCanvas.width, (borderPoints[0][1] / object.offsetHeight) * fakeCanvas.height);
            for (let i = 0; i < minBorderPoint; i++) {
                fakeCtx.lineTo((borderPoints[i][0] / object.offsetWidth) * fakeCanvas.width, (borderPoints[i][1] / object.offsetHeight) * fakeCanvas.height);
            }
            fakeCtx.lineTo((borderPoints[minBorderPoint][0] / object.offsetWidth) * fakeCanvas.width, fakeCanvas.height);
            fakeCtx.lineTo(0, fakeCanvas.height);
            fakeCtx.lineTo(0, 0);
            fakeCtx.fill();
        }
        link.download = 'filename.png';
        link.href = fakeCanvas.toDataURL("image/png");
        object.src = link;
        object.style.height = oldHeight;
        object.style.width = oldWidth;
        object.style.transform = "rotate(" + deg + "deg)";
    }

    cutPhotoByBrushMode(object, minBorderPoint, borderPoints) {
        let img = document.createElement("img");
        let fakeCanvas = document.createElement("canvas");
        let fakeCtx = fakeCanvas.getContext("2d");
        let link = document.createElement('a');
        let oldHeight = object.style.height;
        let oldWidth = object.style.width;
        img.src = object.src;
        fakeCanvas.style.height = img.height + "px";
        fakeCanvas.style.width = img.width + "px";
        fakeCanvas.height = img.height;
        fakeCanvas.width = img.width;
        fakeCtx.drawImage(object, 0, 0);
        fakeCtx.lineCap = drawShape;
        fakeCtx.globalCompositeOperation = "destination-out";
        fakeCtx.lineWidth = drawWidth;
        if (cutType === 1) {
            fakeCtx.moveTo((borderPoints[0][0] / object.offsetWidth) * fakeCanvas.width, (borderPoints[0][1] / object.offsetHeight) * fakeCanvas.height);
            for (let i = 1; i < borderPoints.length; i++) {
                fakeCtx.lineTo((borderPoints[i][0] / object.offsetWidth) * fakeCanvas.width, (borderPoints[i][1] / object.offsetHeight) * fakeCanvas.height);
                fakeCtx.moveTo((borderPoints[i][0] / object.offsetWidth) * fakeCanvas.width, (borderPoints[i][1] / object.offsetHeight) * fakeCanvas.height);
            }
            fakeCtx.stroke();
        } else {
            for (let i = 0; i < borderPoints.length; i++) {
                fakeCtx.lineTo((borderPoints[i][0] / object.offsetWidth) * fakeCanvas.width, (borderPoints[i][1] / object.offsetHeight) * fakeCanvas.height);
                fakeCtx.moveTo((borderPoints[i][0] / object.offsetWidth) * fakeCanvas.width, (borderPoints[i][1] / object.offsetHeight) * fakeCanvas.height);
            }
            fakeCtx.moveTo(0, 0);
            fakeCtx.lineTo(fakeCanvas.width, 0);
            fakeCtx.lineTo(fakeCanvas.width, fakeCanvas.height);
            fakeCtx.lineTo(0, fakeCanvas.height);
            fakeCtx.lineTo(0, 0);
            fakeCtx.fill();
        }
        link.download = 'filename.png';
        link.href = fakeCanvas.toDataURL("image/png");
        object.src = link;
        object.style.height = oldHeight;
        object.style.width = oldWidth;
        object.style.transform = "rotate(" + deg + "deg)";
    }

    changeModeOfFillCut() {
        if (cutType === 1 && cutBrush === false) {
            cutType = 2;
            $("#insideCut").removeClass("chosen-new-obj").addClass("new_obj");
            $("#outCut").removeClass("new_obj").addClass("chosen-new-obj");
        } else {
            cutType = 1;
            $("#outCut").removeClass("chosen-new-obj").addClass("new_obj");
            $("#insideCut").removeClass("new_obj").addClass("chosen-new-obj");
        }
        return cutType;
    }

    drawNoAcceptedArea(x, y, helpCanvas) {
        var ctx5 = helpCanvas.getContext("2d");
        if (firstTimeDraw === false) {
            firstTimeDraw = true;
            oldXP = x;
            oldYP = y;
        } else {
            ctx5.beginPath();
            ctx5.strokeStyle = "#00ffe3";
            ctx5.moveTo(oldXP, oldYP);
            if (cutBrush === true) {
                ctx5.strokeWidth = drawWidth;
            } else
                ctx5.strokeWidth = 1;
            ctx5.lineTo(x, y);
            oldXP = x;
            oldYP = y;
            ctx5.stroke();
            ctx5.closePath();

        }

    }

    setFirstTimeDraw(bol) {
        firstTimeDraw = bol;
    }

    setVariable(name, content) {
        switch (name) {
            case "point":
                point = content;
                break;
            case "onNet":
                onNet = content;
                break;
            case "cutBrush":
                cutBrush = content;
                break;

        }
    }

    getVariable(name) {
        switch (name) {
            case "point":
                return point;
            case "onNet":
                return onNet;
            case "cutBrush":
                return cutBrush;
        }
    }

    setPress(bol) {
        press = bol;
    }

}

//Functions
function filters(blur, brightness, contrast, dropshadow,
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

//jQuery functions
$(window).mouseup(ev => {
    press = false;
    onNet = false;
});
$("#contents").mousedown(ev => {
    press = true;
});







