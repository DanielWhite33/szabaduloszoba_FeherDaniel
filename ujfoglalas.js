
document.addEventListener("DOMContentLoaded", function() {
  const ujFoglalasForm = document.getElementById("ujFoglalasForm");

  // Űrlap elküldése
  ujFoglalasForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const formData = new FormData(ujFoglalasForm);
    const ujFoglalas = {};
    formData.forEach((value, key) => {
      ujFoglalas[key] = value;
    });

    fetch("http://localhost:3000/foglalasok", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ujFoglalas)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("A foglalás felvétele sikertelen.");
      }
      window.location.href = "foglalasok.html"; // Sikeres küldés esetén navigáljon a foglalások oldalra
    })
    .catch(error => {
      console.error("Hiba történt a foglalás felvételekor:", error);
      const hibaUzenet = document.getElementById("hibaUzenet");
      hibaUzenet.style.display = "block";
      hibaUzenet.textContent = "Hiba történt a foglalás felvételekor. Kérjük, próbálja újra később.";
    });
  });

  // Aktuális dátum beállítása
  const d = new Date();
  const datumInput = document.getElementById("datum");
  const formattedDate = d.getFullYear() + "-" + (d.getMonth() + 1).toString().padStart(2, '0') + "-" + d.getDate().toString().padStart(2, '0');
  datumInput.value = formattedDate;
});