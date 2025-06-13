document.addEventListener("DOMContentLoaded",() => {

    const { createClient } = supabase;
    const client = createClient("https://rycwrceugcjtltylppou.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Y3dyY2V1Z2NqdGx0eWxwcG91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MjEyNDUsImV4cCI6MjA2NTM5NzI0NX0.I4m3NIE8v3j1dWSOtrNSlnfteEVqAPVkOJMTJtNXxW4");

    let start_input = document.getElementById("start_input");
    let finish_input = document.getElementById("finish_input");
    let today_input = document.getElementById("today_input");
    let today_btn = document.getElementById("today_btn");
    let progress_output = document.getElementById("progress_output");
    let toGo_output = document.getElementById("toGo_output");

    let start_weight = null;
    let finish_weight = null;
    let today_weight = null;

    document.getElementById("login_btn").addEventListener("click", async () => {
    const { error } = await client.auth.signInWithOAuth({
        provider: 'google'
    });

    if (error) {
        console.error("Fehler beim Login:", error.message);
    }
});


    today_btn.addEventListener("click", () => {
        start_weight = parseFloat(start_input.value);
        finish_weight = parseFloat(finish_input.value);
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