import {
    chooseObject,
    object,
    finalHeight,
    finalWidth,
    filtersArray,
    objects,
    chosenFunction,
    height,
    width,
    helpCanvas,
    types,
    filters,
    proportion, pushID
} from "./main.js";
//Variables

let canvasSVG = '<svg class="svg1" height="30" width="30" viewBox="0 0 60 60">' +
    '                  <path d="M10 30 C10 30, 20 10 , 30 30 C30 30, 40 50, 50 30" stroke-width="4"' +
    '          stroke="#F0FFFFFF" fill="none" stroke-linecap="round"></path>' +
    '            </svg>';
let imgSVG = '<svg height="30" width="30" viewBox="0 0 60 60">' +
    '                     <path d="M10 40 L20 30 L30 40 L40 20 L50 35" stroke-width="4"' +
    '          stroke="#ccdbdb" fill="none"></path>' +
    '<path d="M10 10 L50 10 M50 10 L50 50 M50 50 L 10 50 M10 50 L10 10  " stroke-width="4"' +
    '          stroke="#F0FFFFFF" fill="none" stroke-linecap="round"></path>'+
    '                </svg>';
let pSVG = '<svg height="30" width="30" viewBox="0 0 60 60">'+
    '<path d="M10 50 L30 10 M30 10 L50 50 M41 32 L19 32"  stroke-width="6" stroke="#F0FFFFFF" fill="none" stroke-linecap="round"></path>'+
'</svg>';
let filter1 = new filters(0, 100, 100, 0, 0, 0, 0, 100, 100, 0);

//Functions

export function create(type) {
    let doc = document.createElement(type);
    switch (type) {
        case "canvas":
            doc.class = "all-canvas";
            doc.height = height;
            doc.width = width;
            doc.style.height = finalHeight + 1 + "px";
            doc.style.width = finalWidth + 1 + "px";
            doc.id = "ob" + objects.length.toString();
            document.getElementById("contents").insertBefore(doc, helpCanvas);
            types.push("canvas");
            break;
        case "img":
            let doc1 = document.querySelector("input[type=file]").files[0];
            let div = document.createElement("div");
            let div1 = document.createElement("div");
            let img = document.createElement('img');
            let reader = new FileReader();
            div.className = "img1";
            div1.className = "img2";

            reader.addEventListener("load", function () {
                img.src = reader.result;
                img.disabled = true;
                img.onload = function () {
                    if (img.height > img.width) {
                        let proportion1 = img.height / (finalHeight / 2);
                        img.style.width = (img.width / proportion1) + "px";
                        img.style.height = (finalHeight / 2) + "px";
                        img.width = img.width / proportion1;
                        img.height = finalHeight / 2;


                    } else {
                        let proportion1 = img.width / (finalWidth / 2);
                        img.style.height = (img.height / proportion1) + "px";
                        img.style.width = (finalWidth / 2) + "px";
                        img.height = img.height / proportion1;
                        img.width = finalWidth / 2;

                    }
                }
            }, false);
            reader.readAsDataURL(doc1);
            img.id = "ob" + objects.length.toString();
            document.getElementById("contents").insertBefore(img, helpCanvas);
            types.push("img");
            break;
        case "p":
            doc.id = "ob" + objects.length.toString();
            doc.style.fontSize = (15 / proportion) + "px";
            doc.style.color = "rgba(0, 0, 0, 1)";
            doc.style.fontFamily = "Arial";
            document.getElementById("contents").insertBefore(doc, helpCanvas);
            types.push("p");
            break;

    }
    filtersArray.push(filter1);
    chosenFunction.push("1");
    addObject(objects.length, type);
    pushID(objects.length);
    objects.push("ob" + objects.length.toString());
    $("#newPhoto").val('');
}



function addObject(length1, type) {
    let container = document.createElement("div");
    let p = document.createElement("p");
    container.id = "objects" + objects.length.toString();
    p.id = "hidden" + objects.length.toString();
    p.innerHTML = "Obiekt " + objects.length;
    p.className = "text1";
    container.className = "option centered-white";
    container.onclick = function () {
        chooseObject(length1);
    };

    container.appendChild(p);

    switch (type) {
        case "canvas":
            container.innerHTML = container.innerHTML + canvasSVG;
            break;
        case "img":
            container.innerHTML = container.innerHTML + imgSVG;
            break;
        case "p":
            container.innerHTML = container.innerHTML + pSVG;
            break;
    }


    document.getElementById("list").appendChild(container);
}
