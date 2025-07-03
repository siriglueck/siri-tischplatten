const form = document.getElementById("form1");
const Breite = document.getElementById("Breite");
const Laenge = document.getElementById("Laenge");
const Staerke = document.getElementById("Staerke");
const tischForm = document.getElementById("tischForm");
const displayQM = document.getElementById("displayQM");
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

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the page from refreshing
  const inputBreite = Breite.value;
  const inputLaenge = Laenge.value;
  const selectedStaerke = Staerke.value;
  const tischItem = tischFormList.find((item) => item.key === tischForm.value);
  
  const Rissanteil = document.querySelector('input[name="Rissanteil"]:checked');
  const selectedRissanteil = Rissanteil.value;
  
  const Farbe = document.querySelector('input[name="Farbe"]:checked');
  const selectedFarbe = Farbe.value;

  const qm = (inputBreite / 100) * (inputLaenge / 100);


  addListItem("Breite : ", inputBreite, " cm.");
  addListItem("Länge : ", inputLaenge, " cm.");
  addListItem("Stärke : ", selectedStaerke, " mm.");
  addListItem("Tischform : ", tischItem.value, "");
  addListItem("Rissanteil : ", selectedRissanteil, "");
  addListItem("Farbe : ", selectedFarbe, "");

  if (rbaCheckbox.checked) {
  addListItem("* mit Reine Balken Außenseiten","", "");
  }

  if (svCheckbox.checked) {
  addListItem("* Äste/Risse schwarz verfüllt","", "");
  }

  function addListItem(text, input, einheit) {
    const newListItem = document.createElement("li");
    newListItem.textContent = text + input + einheit;
    vorschauList.appendChild(newListItem);
  }

  displayQM.innerText = qm;
});
