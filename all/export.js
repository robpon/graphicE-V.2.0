import {height, width, objects, types, proportion, filtersArray, finalWidth, finalHeight, orderIDs} from "./main.js";
import {image1} from "../classes/image.js";

//Export final version of photo
let link = document.createElement('a');
let doc = document.createElement("canvas");
let enlargement = ".png";

export function exportPhoto() {
    doc = document.createElement("canvas");
    doc.style.height = height + "px";
    doc.style.width = width + "px";
    doc.height = height;
    doc.width = width;
    let canvas = "";
    let ctx = doc.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(0, 0, width, height);
    ctx.fill();
    for (let i1 = 0; i1 < objects.length-1; i1++) {
        let i = orderIDs[i1];
        let type = types[i];
        switch (type) {
            case "canvas":
                ctx.drawImage(document.getElementById(objects[i]), 0, 0);
                break;
            case "img":
                console.log("HEre")
                const image = new image1(finalWidth, finalHeight, proportion);
                let img1 = document.getElementById(objects[i]);
                let x = img1.offsetLeft;
                let y = img1.offsetTop;
                canvas = document.createElement("canvas");
                let cont;
                canvas.height = parseFloat(img1.style.height) * proportion;
                canvas.width = parseFloat(img1.style.width) * proportion;
                canvas.style.height = parseFloat(img1.style.height) * proportion + "px";
                canvas.style.width = parseFloat(img1.style.width) * proportion + "px";

                cont = canvas.getContext("2d");
                cont.filter = image.getStyleOfObject(filtersArray[i]);
                cont.drawImage(img1, 0, 0, parseFloat(img1.style.width) * proportion, parseFloat(img1.style.height) * proportion,);
                ctx.translate((x * proportion)+(parseFloat(img1.style.width) * proportion/2), (y * proportion)+(parseFloat(img1.style.height) * proportion/2));
                ctx.rotate(getDegFromObject(img1)*Math.PI/180);
                ctx.translate(-((x * proportion)+(parseFloat(img1.style.width) * proportion/2)), -((y * proportion)+(parseFloat(img1.style.height) * proportion/2)));
                ctx.drawImage(canvas, x * proportion, y * proportion);
                ctx.translate((x * proportion)+(parseFloat(img1.style.width) * proportion/2), (y * proportion)+(parseFloat(img1.style.height) * proportion/2));
                ctx.rotate(-getDegFromObject(img1)*Math.PI/180);
                ctx.translate(-((x * proportion)+(parseFloat(img1.style.width) * proportion/2)), -((y * proportion)+(parseFloat(img1.style.height) * proportion/2)));
                break;
            case "p":
                let p = document.getElementById(objects[i]);
                ctx.font = p.style.fontWeight+" "+parseInt(p.style.fontSize, 10) * proportion + "px " + p.style.fontFamily;
                ctx.fillStyle = p.style.color.toString();
                ctx.fillText(p.innerHTML, p.offsetLeft * proportion, p.offsetTop * proportion + parseInt(p.style.fontSize, 10) * proportion);
                break;


        }

    }
    document.getElementById("exportImage").style.width="40%";
    document.getElementById("exportImage").style.height="fit-content";
    link.download = $("#exportName").val()+enlargement;
    link.href = doc.toDataURL("image/png");
    document.getElementById("exportImage").src = link;

}
$("#download").click(ev => {
    link.download = $("#exportName").val()+enlargement;
    if(enlargement===".png"){
        link.href = doc.toDataURL("image/png");

    }else{
        link.href = doc.toDataURL("image/jpg");


    }
    link.click();
    $("#exportDialog").removeClass("exportDialog").addClass("hidden");
    $("#backgroundOfDialog").removeClass("showDialog1").addClass("hideDialog");
    document.getElementById("exportImage").style.width=0;
    document.getElementById("exportImage").style.height=0;
});
$("#enlargementPng").click(ev => {
    changeEnlargementOfPhoto();
});
$("#enlargementJpg").click(ev => {
    changeEnlargementOfPhoto();
});
$("#exportName").keyup(ev =>{
   $("#fileExportName").html($("#exportName").val());
});
/*$("#enlargementPng").click(changeEnlargementOfPhoto());
$("#enlargementJpg").click(changeEnlargementOfPhoto());*/
function getDegFromObject(object) {
    let str = object.style.transform;
    let index = str.search("rotate");
    let index1 = str.search(("deg"));
    let deg = str.substring(index + 7, index1);
    return deg;
}
function changeEnlargementOfPhoto(){
    if(enlargement===".png"){
        enlargement = ".jpg";
        $("#enlargementJpg").removeClass("button3").addClass("button1");
        $("#enlargementPng").removeClass("button1").addClass("button3");

    }else{
        enlargement = ".png";
        $("#enlargementJpg").removeClass("button1").addClass("button3");
        $("#enlargementPng").removeClass("button3").addClass("button1");

    }
    $("#fileEnlargementExport").html(enlargement);
}
$("#backgroundOfDialog").click(ev =>{
    $("#exportDialog").removeClass("exportDialog").addClass("hidden");
    $("#backgroundOfDialog").removeClass("showDialog1").addClass("hideDialog");
    document.getElementById("exportImage").style.width=0;
    document.getElementById("exportImage").style.height=0;


});