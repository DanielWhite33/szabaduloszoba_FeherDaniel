document.addEventListener("DOMContentLoaded", function() {
    const foglalasokTabla = document.getElementById("foglalasokTabla");
  
    fetch("http://localhost:3000/foglalasok")
      .then(response => {
        if (!response.ok) {
          throw new Error("Hiba történt a foglalások lekérdezésekor.");
        }
        return response.json();
      })
      .then(data => {
        // Rendezzük a foglalásokat időrendben csökkenő sorrendbe a dátum alapján
        data.sort((a, b) => new Date(b.datum) - new Date(a.datum));
  
        // Létrehozzuk a táblázat fejlécét
        let tableHtml = "<table class='table'><thead><tr><th>Dátum</th><th>Név</th><th>Fő</th><th>Helyszín</th><th>Irányítószám</th></tr></thead><tbody>";
  
        // Adatok hozzáfűzése a táblázathoz
        data.forEach(foglalas => {
          tableHtml += `<tr><td>${foglalas.datum}</td><td>${foglalas.nev}</td><td>${foglalas.fo}</td><td>${foglalas.cim}</td><td>${foglalas.iranyitoszam}</td></tr>`;
        });
  
        tableHtml += "</tbody></table>";
        foglalasokTabla.innerHTML = tableHtml;
      })
      .catch(error => {
        console.error("Hiba történt a foglalások lekérdezésekor:", error);
        foglalasokTabla.innerHTML = "<div class='alert alert-danger'>Hiba történt a foglalások lekérdezésekor. Kérjük, próbálja újra később.</div>";
      });
  });
  