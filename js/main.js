/* === DOM Zugriff & Variablen 1/2 === */
const ausgabeSpalte = document.getElementById("ausgabe");
const form1 = document.getElementById("form1");
const breite = document.getElementById("breite");
const laenge = document.getElementById("laenge");
const staerke = document.getElementById("staerke");
const ergTitel = document.getElementById("ergTitel");
const tischForm = document.getElementById("tischForm");
const tischFarbe = document.getElementById("tischFarbe");
const displayQM = document.getElementById("displayQM");
const risseCheckbox = document.getElementById("risse");
const resetButton = document.getElementById("resetBtn");
const vorschauList = document.getElementById("vorschau");
const balkenCheckbox = document.getElementById("Balken");
const displayPreis = document.getElementById("displayPreis");
const tabelleTitel = document.getElementById("tabelleTitel");
const tableContainer = document.getElementById("tableContainer");
const vorschauListOhneBild = document.getElementById("vorschauOhneBild");
const displayGesamtpreis = document.getElementById("displayGesamtpreis");

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

addEventListener("DOMContentLoaded", () => {
  // Add event listeners to radio buttons
  document.querySelectorAll('input[name="Tischplatte"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      // Clear previous options
      staerke.innerHTML =
        '<option value="" disabled selected> - bitte auswählen - </option>';

      // Add new options based on selected value
      const selected = this.value;
      preisListe =
        selected == "vollmassiv" ? preisListeVollmassiv : preisListeGedoppelt;
      for (let i = 0; i < preisListe.length; i++) {
        const value = preisListe[i].key;
        const option = document.createElement("option"); // สร้าง <option>
        option.value = value; // กำหนด value
        option.textContent = value; // กำหนดข้อความที่แสดง
        staerke.appendChild(option); // เพิ่มลงใน <select>
      }
    });
  });

  /* === Rechnen geklickt werden === */
  form1.addEventListener("submit", function (event) {
    // Verhindern, dass die Seite aktualisiert wird
    event.preventDefault();
    vorschauListOhneBild.innerHTML = "";
    vorschauList.innerHTML = "";
    tableContainer.innerHTML = "";
    displayPreis.innerHTML = "";
    displayQM.innerHTML = "";
    ausgabeSpalte.classList.remove("disabled");

    /* === DOM Zugriff & Variablen 2/2 === */
    const inputBreite = breite.value;
    const inputLaenge = laenge.value;
    const selectedStaerke = staerke.value;
    const tischItem = tischFormList.find(
      (item) => item.key === tischForm.value
    );
    const sPreis = preisListe.find(
      (item) => item.key === parseInt(selectedStaerke)
    );

    const rissAnteil = document.querySelector(
      'input[name="Rissanteil"]:checked'
    );
    const selectedRissanteil = rissAnteil.value;

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
        newListItem.innerHTML = text + "<br>" + eingabe + einheit;
        vorschauListOhneBild.appendChild(newListItem);
      } else {
        newListItem.innerHTML = text + "<br>" + eingabe + einheit;
        vorschauList.appendChild(newListItem);
      }
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
            break;
          case 1:
            td.textContent = staerkeValue;
            row.appendChild(td);
            break;
          case 2:
            td.textContent = jedePreis.toLocaleString("de-DE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            row.appendChild(td);
            break;
          case 3:
            td.textContent = (jedePreis + rissePreis).toLocaleString("de-DE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            row.appendChild(td);
            break;
          case 4:
            td.textContent = (jedePreis + balkenPreis).toLocaleString("de-DE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            row.appendChild(td);
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
    addListItem("Stäske : ", selectedStaerke, " mm.");

    // Tischform
    addListItem("Tischform : ", tischItem.value, "");

    //Tischfarbe
    addListItem("Tischfarbe : ", tischFarbe.value, "");

    addListItem("Rissanteil : ", selectedRissanteil, "");
    const img = document.createElement("img");
    const vorschauBildPlatz = document.querySelectorAll("li");
    img.src = "images" + "/Rissanteil/" + selectedRissanteil + ".jpg";
    img.alt = selectedRissanteil;
    vorschauBildPlatz[4].appendChild(img);

    if (balkenCheckbox.checked) {
      addListItem("**", "mit Reine Balken Außenseiten", "");
      gesamtPreis += balkenPreis;
      displayPreis.innerHTML += "<br> + " + balkenPreisDE + " € zzgl. Balken";

      const img = document.createElement("img");
      const vorschauBildPlatz = document.querySelectorAll("li");
      img.src = "images" + "/Rissanteil/" + balkenCheckbox.value + ".jpg";
      img.alt = balkenCheckbox.value;
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

  /* === Toggle Theme === */
  const toggleBtn = document.getElementById("toggleBtn");
  const icon = document.getElementById("icon");
  const label = document.getElementById("label");
  const html = document.documentElement;

  // ฟังก์ชันอัปเดต icon และข้อความ
  function updateIcon() {
    if (html.classList.contains("dark")) {
      icon.textContent = "☀️";
      label.textContent = "Light Mode";
    } else {
      icon.textContent = "🌙";
      label.textContent = "Dark Mode";
    }
  }

  // โหลดสถานะจาก localStorage
  if (localStorage.getItem("theme") === "dark") {
    html.classList.add("dark");
  }
  updateIcon();

  // สลับโหมดเมื่อกดปุ่ม
  toggleBtn.addEventListener("click", () => {
    html.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      html.classList.contains("dark") ? "dark" : "light"
    );
    updateIcon();
  });
});
