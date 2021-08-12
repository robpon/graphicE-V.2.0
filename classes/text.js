
//Variables
let fontDialogOpen = false;

//Class text
export class text1{
    textSize(object){
        var doc = document.getElementById("textRang");
        object.style.fontSize = doc.value+"px";
        $("#textRangePrint").html("Rozmiar tekstu to : " + doc.value);
    }
    changeColourOfText(object, r, g, b, a){
        object.style.color = 'rgba('+r+',' + g +','+ b+ ','+a+')';
    }
    fontFamilyDialog(){
        if(fontDialogOpen===false){
            showDialogBackground();
            $("#fontsDialog").removeClass("hidden").addClass("picker");
            fontDialogOpen = true;
        }else{
            hideDialogBackground();
            fontDialogOpen = false;
            $("#fontsDialog").removeClass("picker").addClass("hidden");
        }

    }

}

function showDialogBackground() {
    $("#backgroundOfDialog").removeClass("hidden hideDialog").addClass("showDialog");
}

function hideDialogBackground() {
    $("#backgroundOfDialog").removeClass("showDialog").addClass("hideDialog");
}


