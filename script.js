document.addEventListener("DOMContentLoaded", async () => {
    const client = supabase.createClient(
        "https://rycwrceugcjtltylppou.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    );

    const start_input = document.getElementById("start_input");
    const finish_input = document.getElementById("finish_input");
    const today_input = document.getElementById("today_input");
    const today_btn = document.getElementById("today_btn");
    const progress_output = document.getElementById("progress_output");
    const toGo_output = document.getElementById("toGo_output");

    const loginBtn = document.getElementById("login_btn");
    const logoutBtn = document.getElementById("logout_btn");
    const userInfo = document.getElementById("user_info");

    function updateUI(user) {
        if (user) {
            userInfo.textContent = `Willkommen, ${user.email}`;
            loginBtn.style.display = "none";
            logoutBtn.style.display = "inline-block";
        } else {
            userInfo.textContent = "";
            loginBtn.style.display = "inline-block";
            logoutBtn.style.display = "none";
        }
    }

    // Session bei Start prüfen
    client.auth.getSession().then(({ data: { session } }) => {
    updateUI(session?.user);
});

    // Session-Veränderung beobachten
    client.auth.onAuthStateChange((event, session) => {
        console.log("Auth state changed:", event);
        updateUI(session?.user);
    });

    // Login
    loginBtn.addEventListener("click", async () => {
        const { error } = await client.auth.signInWithOAuth({ provider: 'google' });
        if (error) console.error("Login-Fehler:", error.message);
    });

    // Logout
    logoutBtn.addEventListener("click", async () => {
        const { error } = await client.auth.signOut();
        if (error) console.error("Logout-Fehler:", error.message);
        else updateUI(null);
    });

    // Gewicht checken
    today_btn.addEventListener("click", () => {
        const start = parseFloat(start_input.value);
        const finish = parseFloat(finish_input.value);
        const today = parseFloat(today_input.value);

        if (!isNaN(start) && !isNaN(today)) {
            const progress = start - today;
            progress_output.textContent = `Du hast bisher ${progress.toFixed(2)} Kg abgenommen`;
        }

        if (!isNaN(finish) && !isNaN(today)) {
            const toGo = finish - today;
            toGo_output.textContent = `Du wirst bis zu deinem Ziel noch ${toGo.toFixed(2)} Kg abnehmen`;
        }
    });
});
