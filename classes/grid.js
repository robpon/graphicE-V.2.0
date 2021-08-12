//Variables
let gridON = false;

//Grid class
export class grid1 {
    constructor() {
    }

    openGridSettings() {
        console.log("dd");
        document.getElementById("title-options").className = "hidden";
        document.getElementById("photo-options").className = "hidden";
        document.getElementById("drawing-options").className = "hidden";
        document.getElementById("grid-options").className = "options";
    }

    frequency(ctx4, canvas4) {
        ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
        ctx4.stroke();
        let vertical = (canvas4.width / (parseInt($("#verticalGrid").val()) + 1));
        for (let i = 1; i < parseInt($("#verticalGrid").val()) + 1; i++) {
            ctx4.beginPath();
            ctx4.moveTo(vertical * i, 0);
            ctx4.strokeWidth = 1;
            ctx4.strokeStyle = "#00ffcc";
            ctx4.lineTo(vertical * i, canvas4.height);
            ctx4.stroke();
            ctx4.closePath();
        }
        $("#verQuan").html("Ilość lini siatki : "+$("#verticalGrid").val());
        let horizontal = (canvas4.height / (parseInt($("#horizontalGrid").val()) + 1));
        for (let i = 1; i < parseInt($("#horizontalGrid").val()) + 1; i++) {
            ctx4.beginPath();
            ctx4.moveTo(0, horizontal * i);
            ctx4.strokeWidth = 1;
            ctx4.strokeStyle = "#00ffcc";
            ctx4.lineTo(canvas4.width, horizontal * i);
            ctx4.stroke();
            ctx4.closePath();
        }
        $("#horQuan").html("Ilość lini siatki : "+$("#horizontalGrid").val());
    }

    turnOf(ctx4, canvas4) {
        gridON = false;
        ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
        $("#grid-options").removeClass("options").addClass("hidden");
    }

    turnOn(ctx4, canvas4) {
        gridON = true;
        let grid = new grid();
        grid.frequency(ctx4, canvas4);
    }
}