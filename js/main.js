/* === DOM Zugriff & Variablen 1/2 === */
const form1 = document.getElementById("form1");
const Breite = document.getElementById("Breite");
const Laenge = document.getElementById("Laenge");
const Staerke = document.getElementById("Staerke");
const ergTitel = document.getElementById("ergTitel");
const cardBody = document.getElementById("cardBody");
const displayQM = document.getElementById("displayQM");
const tischForm = document.getElementById("tischForm");
const tischFarbe = document.getElementById("tischFarbe");
const resetButton = document.getElementById("resetBtn");
const displayPreis = document.getElementById("displayPreis");
const vorschauList = document.getElementById("vorschau");
const tabelleTitel = document.getElementById("tabelleTitel");
const risseCheckbox = document.getElementById("Risse");
const balkenCheckbox = document.getElementById("Balken");
const tableContainer = document.getElementById("tableContainer");
const displayGesamtpreis = document.getElementById("displayGesamtpreis");
const vorschauListOhneBild = document.getElementById("vorschauOhneBild");

const tischFormList = [
  { key: "F1", value: "Gerade Kannte" },
  { key: "F2", value: "Facettenkante" },
  { key: "F3", value: "Mit Baumkane" },
  { key: "F4", value: "Durchgängige Bohlen" },
  { key: "F5", value: "Mit Querfrieß" },
  { key: "F6", value: "Rund" },
  { key: "F7", value: "Oval" },
  { key: "F8", value: "Schiffsbodenmuster" },
  { key: "F9", value: "Flechmuster" },
  { key: "F10", value: "Rautenmuster" },
];

const preisListeVollmassiv = [
  { key: 25, value: 300 },
  { key: 30, value: 360 },
  { key: 40, value: 420 },
  { key: 50, value: 480 },
  { key: 60, value: 560 },
  { key: 70, value: 640 },
  { key: 80, value: 720 },
  { key: 90, value: 800 },
  { key: 100, value: 880 },
  { key: 110, value: 960 },
  { key: 120, value: 1040 },
];

const preisListeGedoppelt = [
  { key: 40, value: 315 },
  { key: 50, value: 360 },
  { key: 60, value: 420 },
  { key: 70, value: 480 },
  { key: 80, value: 540 },
  { key: 90, value: 600 },
  { key: 100, value: 660 },
  { key: 110, value: 720 },
  { key: 120, value: 780 },
];

let preisListe;

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
);
// Whenever the user explicitly chooses light mode
localStorage.theme = "light";
// Whenever the user explicitly chooses dark mode
localStorage.theme = "dark";
// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem("theme");

addEventListener("DOMContentLoaded", () => {
  // Add event listeners to radio buttons
  document.querySelectorAll('input[name="Tischplatte"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      // Clear previous options
      Staerke.innerHTML = '<option value="" disabled selected> -- </option>';

      // Add new options based on selected value
      const selected = this.value;
      preisListe =
        selected == "vollmassiv" ? preisListeVollmassiv : preisListeGedoppelt;
      for (let i = 0; i < preisListe.length; i++) {
        const value = preisListe[i].key;
        const option = document.createElement("option"); // สร้าง <option>
        option.value = value; // กำหนด value
        option.textContent = value; // กำหนดข้อความที่แสดง
        Staerke.appendChild(option); // เพิ่มลงใน <select>
      }
    });
  });

  /* === Rechnen geklickt werden === */
  form1.addEventListener("submit", function (event) {
    cardBody.classList.remove("w-6/12");
    cardBody.classList.add("w-full");
    // Verhindern, dass die Seite aktualisiert wird
    event.preventDefault();
    vorschauListOhneBild.innerHTML = "";
    vorschauList.innerHTML = "";
    tableContainer.innerHTML = "";
    displayPreis.innerHTML = "";
    displayQM.innerHTML = "";

    /* === DOM Zugriff & Variablen 2/2 === */
    const inputBreite = Breite.value;
    const inputLaenge = Laenge.value;
    const selectedStaerke = Staerke.value;
    const tischItem = tischFormList.find(
      (item) => item.key === tischForm.value
    );
    const sPreis = preisListe.find(
      (item) => item.key === parseInt(selectedStaerke)
    );

    const Rissanteil = document.querySelector(
      'input[name="Rissanteil"]:checked'
    );
    const selectedRissanteil = Rissanteil.value;

    const Finish = document.querySelector('input[name="Finish"]:checked');
    const selectedFinish = Finish.value;

    /* === Rechnungen === */
    const qm = (inputBreite / 100) * (inputLaenge / 100);
    const rissePreis = qm * 47.6;
    const balkenPreis = qm * 71.4;
    const qmDE = qm.toLocaleString("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const rissePreisDE = rissePreis.toLocaleString("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const balkenPreisDE = balkenPreis.toLocaleString("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    let preisBerechnung;
    if (qm < 1) {
      preisBerechnung = qm * sPreis.value * 1.05;
    } else {
      preisBerechnung = qm * sPreis.value;
    }
    const preisBerechnungDE = parseFloat(
      preisBerechnung.toFixed(2)
    ).toLocaleString("de-DE");
    let gesamtPreis = preisBerechnung;

    ergTitel.innerText = "Ihr Wunsch";
    displayPreis.innerHTML =
      "----------------------<br>" + "Preis :" + preisBerechnungDE + " €";
    displayQM.innerHTML =
      "für " + qmDE + " m<sup>2</sup>" + "<br>----------------------<br>";

    function addListItem(text, eingabe, einheit) {
      const newListItem = document.createElement("li");
      if (
        eingabe == inputBreite ||
        eingabe == inputLaenge ||
        eingabe == selectedStaerke
      ) {
        newListItem.innerHTML = text + eingabe + einheit;
        vorschauListOhneBild.appendChild(newListItem);
      } else {
        newListItem.innerHTML = text + eingabe + einheit;
        vorschauList.appendChild(newListItem);
        newListItem.classList.add("overflow-hidden", "border");
      }
    }

    /* === Preistabelle erzeugen === */
    /*
    const preisTable = document.createElement("table");
    preisTable.border = "1";
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = [
      "Plattenstärke (mm)",
      "Grundpreis/m² (€)",
      "Preis (€)",
      "+ zzgl. Risse verfüllen (€)",
      "+ zzgl. Reine Balken Aussenseiten (€)",
      "+ zzgl. Risse verfüllen und Reine Balken Aussenseiten (€)",
    ];
    // Platzhalter für Tabellekörper
    headers.forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
      th.classList.add("border", "border-gray-300");
    });

    thead.appendChild(headerRow);
    preisTable.appendChild(thead);
    // Tabellekörper erzeugen
    const tbody = document.createElement("tbody");
    // Preis * QM
    for (let i = 0; i < preisListe.length; i++) {
      let staerkeKey = preisListe[i].key;
      let staerkeValue = preisListe[i].value;
      let jedePreis = qm * staerkeValue;
      //console.log(jedePreis);
      const row = document.createElement("tr");

      if (preisListe == preisListeVollmassiv) {
        tabelleTitel.innerText = "Brutto-QM-Preis Tischplatte vollmassiv";
      } else {
        tabelleTitel.innerText =
          "Brutto-QM-Preis Tischplatte optisch gedoppelt (-25%)";
      }

      for (let j = 0; j < headers.length; j++) {
        const header = headers[j];
        const td = document.createElement("td");
        //td.textContent = jedePreis;
        //row.appendChild(td);
        switch (j) {
          case 0:
            td.textContent = staerkeKey;
            row.appendChild(td);
            td.classList.add("border", "border-gray-300");
            break;
          case 1:
            td.textContent = staerkeValue;
            row.appendChild(td);
            td.classList.add("border", "border-gray-300");
            break;
          case 2:
            td.textContent = jedePreis.toLocaleString("de-DE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            row.appendChild(td);
            td.classList.add("border", "border-gray-300");
            break;
          case 3:
            td.textContent = (jedePreis + rissePreis).toLocaleString("de-DE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            row.appendChild(td);
            td.classList.add("border", "border-gray-300");
            break;
          case 4:
            td.textContent = (jedePreis + balkenPreis).toLocaleString("de-DE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            row.appendChild(td);
            td.classList.add("border", "border-gray-300");
            break;
          case 5:
            td.textContent = (
              jedePreis +
              rissePreis +
              balkenPreis
            ).toLocaleString("de-DE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            row.appendChild(td);
            td.classList.add("border", "border-gray-300");
            break;
          default:
            console.log(`Kein Zugriff`);
        }
      }
      tbody.appendChild(row);
    }
    preisTable.appendChild(tbody);
    preisTable.classList.add(
      "border",
      "border-gray-300",
      "border-collapse",
      "text-center",
      "inset-shadow-indigo-500"
    );
    tableContainer.appendChild(preisTable); 
    */

    /* === Vorschau sektion === */
    addListItem("Breite : ", inputBreite, " cm.");
    addListItem("Länge : ", inputLaenge, " cm.");
    addListItem("Stärke : ", selectedStaerke, " mm.");

    // Tischform
    addListItem("Tischform : ", tischItem.value, "");

    //Tischfarbe
    addListItem("Tischfarbe : ", tischFarbe.value, "");

    addListItem("Rissanteil : ", selectedRissanteil, "");
    const img = document.createElement("img");
    const vorschauBildPlatz = document.querySelectorAll("li");
    img.src = "images" + "/Rissanteil/" + selectedRissanteil + ".jpg";
    img.alt = selectedRissanteil;
    img.classList.add("w-52", "h-52", "object-cover");
    vorschauBildPlatz[4].appendChild(img);

    if (balkenCheckbox.checked) {
      addListItem("**", "mit Reine Balken Außenseiten", "");
      gesamtPreis += balkenPreis;
      displayPreis.innerHTML += "<br> + " + balkenPreisDE + " € zzgl. Balken";

      const img = document.createElement("img");
      const vorschauBildPlatz = document.querySelectorAll("li");
      img.src = "images" + "/Rissanteil/" + balkenCheckbox.value + ".jpg";
      img.alt = balkenCheckbox.value;
      img.classList.add("w-52", "h-52", "object-cover");
      vorschauBildPlatz[5].appendChild(img);
    }
    if (risseCheckbox.checked) {
      addListItem("Finish : ", selectedFinish, "");
      gesamtPreis += rissePreis;
      displayPreis.innerHTML += "<br> + " + rissePreisDE + " € zzgl. Risse";
    }
    console.log(gesamtPreis);
    displayGesamtpreis.innerHTML =
      "Gesamtpreis:" +
      gesamtPreis.toLocaleString("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  });
});
