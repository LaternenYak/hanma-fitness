document.addEventListener("DOMContentLoaded", async () => {
    const client = supabase.createClient(
        "https://rycwrceugcjtltylppou.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Y3dyY2V1Z2NqdGx0eWxwcG91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MjEyNDUsImV4cCI6MjA2NTM5NzI0NX0.I4m3NIE8v3j1dWSOtrNSlnfteEVqAPVkOJMTJtNXxW4"
    );

    const sessionCheck = await client.auth.getSession();
    console.log("Aktive Session:", sessionCheck);

    const start_input = document.getElementById("start_input");
    const finish_input = document.getElementById("finish_input");
    const today_input = document.getElementById("today_input");
    const today_btn = document.getElementById("today_btn");
    const progress_output = document.getElementById("progress_output");
    const toGo_output = document.getElementById("toGo_output");

    const loginBtn = document.getElementById("login_btn");
    const logoutBtn = document.getElementById("logout_btn");
    const userInfo = document.getElementById("user_info");

    let start_weight = null;
    let finish_weight = null;
    let today_weight = null;

    loginBtn.addEventListener("click", async () => {
        const { error } = await client.auth.signInWithOAuth({ provider: 'google' });
        if (error) console.error("Login-Fehler:", error.message);
    });

    logoutBtn.addEventListener("click", async () => {
        const { error } = await client.auth.signOut();
        if (error) {
            console.error("Logout-Fehler:", error.message);
        } else {
            location.reload();
        }
    });

    today_btn.addEventListener("click", () => {
        start_weight = parseFloat(start_input.value);
        finish_weight = parseFloat(finish_input.value);
        today_weight = parseFloat(today_input.value);
        checkProgress();
    });

    function checkProgress() {
        if (!isNaN(start_weight) && !isNaN(today_weight)) {
            const progress = start_weight - today_weight;
            progress_output.textContent = `Du hast bisher ${progress.toFixed(2)} Kg abgenommen`;
        }
        if (!isNaN(finish_weight) && !isNaN(today_weight)) {
            const toGo = finish_weight - today_weight;
            toGo_output.textContent = `Du wirst bis zu deinem Ziel noch ${toGo.toFixed(2)} Kg abnehmen`;
        }
    }

    const { data: { user } } = await client.auth.getUser();
    if (user) {
        userInfo.textContent = `Willkommen, ${user.email}`;
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
    } else {
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
    }

    client.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_IN') location.reload();
    });
});
