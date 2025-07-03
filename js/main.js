const form = document.getElementById("form1");
const Breite = document.getElementById("Breite");
const Laenge = document.getElementById("Laenge");
const Staerke = document.getElementById("Staerke");
const tischForm = document.getElementById("tischForm");
const displayQM = document.getElementById("displayQM");
const displayPreis = document.getElementById("displayPreis");
const vorschauList = document.getElementById("vorschau");
const rbaCheckbox = document.getElementById("RBA");
const svCheckbox = document.getElementById("SV");

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

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the page from refreshing
  const inputBreite = Breite.value;
  const inputLaenge = Laenge.value;
  const selectedStaerke = Staerke.value;
  const tischItem = tischFormList.find((item) => item.key === tischForm.value);
  const sPreis = preisListe.find(
    (item) => item.key === parseInt(selectedStaerke)
  );

  const Rissanteil = document.querySelector('input[name="Rissanteil"]:checked');
  const selectedRissanteil = Rissanteil.value;

  const Farbe = document.querySelector('input[name="Farbe"]:checked');
  const selectedFarbe = Farbe.value;

  const qm = (inputBreite / 100) * (inputLaenge / 100);
  console.log(sPreis.value);
  let preisBerechnung;

  if (qm < 1) {
    preisBerechnung = qm * sPreis.value * 1.05;
  } else {
    preisBerechnung = qm * sPreis.value;
  }
  displayPreis.innerText = preisBerechnung.toFixed(2);

  addListItem("Breite : ", inputBreite, " cm.");
  addListItem("Länge : ", inputLaenge, " cm.");
  addListItem("Stärke : ", selectedStaerke, " mm.");
  addListItem("Tischform : ", tischItem.value, "");
  addListItem("Rissanteil : ", selectedRissanteil, "");
  addListItem("Farbe : ", selectedFarbe, "");

  if (rbaCheckbox.checked) {
    addListItem("* mit Reine Balken Außenseiten", "", "");
  }

  if (svCheckbox.checked) {
    addListItem("** Äste/Risse schwarz verfüllt", "", "");
  }

  function addListItem(text, input, einheit) {
    const newListItem = document.createElement("li");
    newListItem.textContent = text + input + einheit;
    vorschauList.appendChild(newListItem);
  }

  displayQM.innerText = qm.toFixed(2);
});
