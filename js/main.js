/* === DOM Zugriff & Variablen 1/2 === */
const form1 = document.getElementById("form1");
const Breite = document.getElementById("Breite");
const Laenge = document.getElementById("Laenge");
const Staerke = document.getElementById("Staerke");
const tischForm = document.getElementById("tischForm");
const displayQM = document.getElementById("displayQM");
const resetButton = document.getElementById("resetBtn");
const displayPreis = document.getElementById("displayPreis");
const vorschauList = document.getElementById("vorschau");
const balkenCheckbox = document.getElementById("Balken");
const risseCheckbox = document.getElementById("Risse");
const tableContainer = document.getElementById("tableContainer");

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

const preisListe = [
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

addEventListener("DOMContentLoaded", () => {
  /* === Rechnen geklickt werden === */
  form1.addEventListener("submit", function (event) {
    // Verhindern, dass die Seite aktualisiert wird
    event.preventDefault();

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
    const qmDE = qm.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const rissePreisDE = rissePreis.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const balkenPreisDE = balkenPreis.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2 });

    let preisBerechnung;
    if (qm < 1) { preisBerechnung = qm * sPreis.value * 1.05; } 
    else { preisBerechnung = qm * sPreis.value; }
    const preisBerechnungDE = (parseFloat(preisBerechnung.toFixed(2))).toLocaleString('de-DE')

    displayPreis.innerText = preisBerechnungDE + " €";
    displayQM.innerText = qmDE;

    function addListItem(text, eingabe, einheit) {
      const newListItem = document.createElement("li");
      newListItem.textContent = text + eingabe + einheit;
      vorschauList.appendChild(newListItem);
    }

    /* === zurücksetzen === */
    function zurueckSetzen() {
      form1.reset();
      vorschauList.innerHTML = "";
      tableContainer.innerHTML = "";
      displayPreis.innerHTML = "";
      displayQM.innerHTML = "";
    }

    /* === Preistabelle erzeugen === */
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

      for (let j = 0; j < headers.length; j++) {
        const header = headers[j];
        const td = document.createElement("td");
        //td.textContent = jedePreis;
        //row.appendChild(td);
        switch (j) {
          case 0:
            td.textContent = staerkeKey;
            row.appendChild(td);
            break;
          case 1:
            td.textContent = staerkeValue;
            row.appendChild(td);
            break;
          case 2:
            td.textContent = jedePreis.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2 });
            row.appendChild(td);
            break;
          case 3:
            td.textContent = (jedePreis + rissePreis).toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2 });
            row.appendChild(td);
            break;
          case 4:
            td.textContent = (jedePreis + balkenPreis).toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2 });
            row.appendChild(td);
            break;
          case 5:
            td.textContent = (jedePreis + rissePreis + balkenPreis).toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2 });
            row.appendChild(td);
            break;
          default:
            console.log(`Kein Zugriff`);
        }
      }
      tbody.appendChild(row);
    }
    preisTable.appendChild(tbody);
    tableContainer.appendChild(preisTable);

    /* === Vorschau sektion === */
    addListItem("Breite : ", inputBreite, " cm.");
    addListItem("Länge : ", inputLaenge, " cm.");
    addListItem("Stärke : ", selectedStaerke, " mm.");
    addListItem("Tischform : ", tischItem.value, "");
    addListItem("Rissanteil : ", selectedRissanteil, "");
    if (balkenCheckbox.checked) {
      addListItem("mit Reine Balken Außenseiten **", "", "");
      displayPreis.innerHTML += "<br> + " + balkenPreisDE + " € zzgl. Balken";
    }
    addListItem("Finish : ", selectedFinish, "");
    if (risseCheckbox.checked) {
      displayPreis.innerHTML += "<br> + " + rissePreisDE + " € zzgl. Risse";
    }
  });
});
