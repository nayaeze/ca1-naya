const showBtn = document.getElementById('ShowKtnBtn');
const KillBtn = document.getElementById('KillBtn')
const log = document.getElementById('Kittylog');

showBtn.addEventListener('click', async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/cats`); 
        const data = await response.json();

        if (data.body && data.body.length > 0) {
            log.innerHTML = "<strong>Kittens:</strong> " + data.body.join(', ');
        } else {
            log.textContent = "The database is empty!";
        }
    } catch (err) {
        console.error("Fetch error:", err);
        log.textContent = "Error: Could not connect to the server.";
    }
});