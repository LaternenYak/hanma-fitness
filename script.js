document.addEventListener("DOMContentLoaded",() => {

    let start_input = document.getElementById("start_input");
    let finish_input = document.getElementById("finish_input");
    let today_input = document.getElementById("today_input");
    let start_btn = document.getElementById("start_btn");
    let finish_btn = document.getElementById("finish_btn");
    let today_btn = document.getElementById("today_btn");
    let progress_output = document.getElementById("progress_output");
    let toGo_output = document.getElementById("toGo_output");

    let start_weight = null;
    let finish_weight = null;
    let today_weight = null;

    start_btn.addEventListener("click", () => {
        start_weight = parseFloat(start_input.value);
        console.log("Startgewicht: " + start_weight);
        checkProgress();
    });

    finish_btn.addEventListener("click", () => {
        finish_weight = parseFloat(finish_input.value);
        console.log("Zielgewicht: " + finish_weight);
        checkProgress();
    });

    today_btn.addEventListener("click", () => {
        today_weight = parseFloat(today_input.value);
        console.log("Heutiges Gewicht: " + today_weight);
        checkProgress();
    });

    function checkProgress() {
        if (start_weight !== null && today_weight !== null) {
            let progress = start_weight - today_weight;
            progress_output.textContent ="Du hast bisher " + progress.toFixed(2) + " Kg abgenommen";
        }
        if (finish_weight !== null && today_weight !== null){
            let toGo = finish_weight - today_weight;
            toGo_output.textContent = "Du wirst bis zu deinem Ziel noch " + toGo.toFixed(2) + " Kg abnehmen";
        } 
    }

    
});