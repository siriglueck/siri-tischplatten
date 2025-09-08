/* === DOM Zugriff & Variablen 1/2 === */
const form1 = document.getElementById('form1');
const breite = document.getElementById('breite');
const laenge = document.getElementById('laenge');
const staerke = document.getElementById('staerke');
const wrapper = document.getElementById('wrapper');
const ausgabe = document.getElementById('output');
const clearBtn = document.getElementById('clearBtn');
const tischForm = document.getElementById('tischForm');
const container = document.getElementById('container');
const displayQM = document.getElementById('displayQM');
const rissAnteil = document.getElementById('rissAnteil');
const tischFarbe = document.getElementById('tischFarbe');
const resetButton = document.getElementById('resetBtn');
const tabelleTitel = document.getElementById('tabelleTitel');
const tableContainer = document.getElementById('tableContainer');
const balkenCheckbox = document.getElementById('balken');
const displayGrundPreis = document.getElementById('displayGrundPreis');
const displayGesamtPreis = document.getElementById('displayGesamtPreis');
const displayRissePreis = document.getElementById('displayRissePreis');
const displayBalkenPreis = document.getElementById('displayBalkenPreis');
const selectedForm = document.getElementById('selectedForm');
const selectedFarbe = document.getElementById('selectedFarbe');
const selectedFinish = document.getElementById('selectedFinish');
const selectedRissanteil = document.getElementById('selectedRissanteil');
const plattenDropDown = document.getElementById('plattenDropDown');

const tischFormList = [
  { key: '1', value: 'Gerade Kannte' },
  { key: '2', value: 'Facettenkante' },
  { key: '3', value: 'Mit Baumkane' },
  { key: '4', value: 'Durchgängige Bohlen' },
  { key: '5', value: 'Mit Querfrieß' },
  { key: '6', value: 'Rund' },
  { key: '7', value: 'Oval' },
  { key: '8', value: 'Schiffsbodenmuster' },
  { key: '9', value: 'Flechmuster' },
  { key: '10', value: 'Rautenmuster' },
];

const tischFarbeList = [
  { key: '1', value: 'Natura' },
  { key: '2', value: 'Alte Eiche' },
  { key: '3', value: 'Eiche dunkel' },
  { key: '4', value: 'Hellgrau geölt' },
  { key: '5', value: 'Dunkelgrau geölt' },
  { key: '6', value: 'Weiss geölt' },
  { key: '7', value: 'Weiss gekälkt' },
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
let checkExpand = false;

addEventListener('DOMContentLoaded', () => {
  // Event listener - Dynamic Dropdown
  plattenDropDown.addEventListener('change', function () {
    // zurücksetzen
    staerke.innerHTML =
      '<option value="" disabled selected> - bitte auswählen - </option>';
    // toggle preisListe
    preisListe =
      this.value === 'vollmassiv' ? preisListeVollmassiv : preisListeGedoppelt;
    // Items von preisListe in Dropdown einfügen
    preisListe.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.key; // this value is used in calculation
      option.textContent = `${item.key} mm`; // this shown to user
      staerke.appendChild(option);
    });
  });

  /* === functions === */
  function clearScreen() {
    tabelleTitel.innerText = '';
    tableContainer.innerHTML = '';
    displayQM.innerHTML = '';
    displayGrundPreis.innerHTML = '';
    displayGesamtPreis.innerHTML = '';
    displayRissePreis.innerHTML = '';
    displayBalkenPreis.innerHTML = '';
    selectedForm.innerHTML = '';
    selectedFarbe.innerHTML = '';
    selectedRissanteil.innerHTML = '';
    selectedFinish.innerHTML = '';
  }

  function expandContainer() {
    if (!checkExpand && container.classList.contains('w-fit')) {
      container.classList.remove('w-fit');
      container.classList.add('w-10/12');
      checkExpand = true;
    }
  }

  /* === clear button (X) === */
  clearBtn.addEventListener('click', () => {
    clearScreen();
    form1.reset();
    ausgabe.classList.add('hidden');
    container.classList.remove('w-10/12');
    container.classList.add('w-fit');
    checkExpand = false;
  });

  /* === Rechnen geklickt werden === */
  form1.addEventListener('submit', function (event) {
    // Verhindern, dass die Seite aktualisiert wird
    event.preventDefault();
    clearScreen();
    expandContainer();
    ausgabe.classList.remove('hidden');

    /* === DOM Zugriff & Variablen 2/2 === */
    const inputBreite = breite.value;
    const inputLaenge = laenge.value;
    const selectedStaerke = staerke.value;
    const tischItem = tischFormList.find(
      (item) => item.key === tischForm.value
    );

    const farbeItem = tischFarbeList.find(
      (item) => item.key === tischFarbe.value
    );

    const sPreis = preisListe.find(
      (item) => item.key === parseInt(selectedStaerke)
    );

    const rissAnteil = document.querySelector(
      'input[name="rissAnteil"]:checked'
    );

    const finish = document.querySelector('input[name="finish"]:checked');

    /* === Rechnungen === */
    const qm = (inputBreite / 100) * (inputLaenge / 100); // m²
    const qmDE = qm.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }); // m² DE Format für Vorschau
    const rissePreisAufschlag = qm * 47.6;
    const balkenPreisAufschlag = qm * 71.4;
    const rissePreisAufschlagDE = rissePreisAufschlag.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const balkenPreisAufschlagDE = balkenPreisAufschlag.toLocaleString(
      'de-DE',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

    let preisBerechnung;

    // Aufschlag für Platten < 1qm
    if (qm < 1) {
      preisBerechnung = qm * sPreis.value * 1.05;
    } else {
      preisBerechnung = qm * sPreis.value;
    }

    const grundPreis = preisBerechnung;
    // Grundpreis in DE Format
    grundPreisDE = parseFloat(preisBerechnung.toFixed(2)).toLocaleString(
      'de-DE'
    );

    // Ausgabe
    displayQM.innerHTML = qmDE + ' m<sup>2</sup>';
    displayGrundPreis.innerHTML = ' € ' + grundPreisDE;

    // Checkboxen
    const risseCheckbox = document.getElementById('risse');
    const balkenCheckbox = document.getElementById('balken');
    let gesamtPreis = grundPreis;
    // Checkboxen prüfen
    if (balkenCheckbox.checked) {
      gesamtPreis += balkenPreisAufschlag;
      displayBalkenPreis.innerHTML =
        'zzgl.Balken </br>+ € ' + balkenPreisAufschlagDE;
    }
    if (risseCheckbox.checked) {
      gesamtPreis += rissePreisAufschlag;
      displayRissePreis.innerHTML =
        'zzgl.Risse </br>+ € ' + rissePreisAufschlagDE;
    }
    // Ausgabe Gesamtpreis
    displayGesamtPreis.innerHTML =
      '€ ' +
      gesamtPreis.toLocaleString('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    /* === Ende Rechnungen === */

    /* === Preistabelle erzeugen === */
    const preisTable = document.createElement('table');
    const preisTableTHead = document.createElement('thead');
    const preisTableTR = document.createElement('tr');
    const preisTableTH = [
      'Plattenstärke (mm)',
      'Grundpreis (€/m²)',
      'Preis (€)',
      '+zzgl. Risse (€)',
      '+zzgl. Balken (€)',
      '+zzgl. Risse & Balken (€)',
    ];
    // Platzhalter für Tabellekörper
    preisTableTH.forEach((text) => {
      const th = document.createElement('th');
      th.textContent = text;
      th.setAttribute('scope', 'col');
      preisTableTR.appendChild(th);
      th.classList.add('py-1');
    });
    preisTableTHead.appendChild(preisTableTR);
    preisTableTHead.classList.add(
      'text-xs',
      'text-gray-700',
      'text-center',
      'bg-gray-50',
      'dark:bg-gray-700',
      'dark:text-gray-400'
    );

    preisTable.appendChild(preisTableTHead);

    // Tabellekörper erzeugen
    const tbody = document.createElement('tbody');
    // Preis * QM
    for (let i = 0; i < preisListe.length; i++) {
      let staerkeKey = preisListe[i].key;
      let staerkeValue = preisListe[i].value;
      let jedePreis = qm * staerkeValue;
      //console.log(jedePreis);
      const tr = document.createElement('tr');

      if (preisListe == preisListeVollmassiv) {
        tabelleTitel.innerText =
          'Vollmassive Tischplatte - Brutto-Preis pro Quadratmeter';
      } else {
        tabelleTitel.innerText =
          'Optisch gedoppelte Tischplatte - Brutto-Preis pro Quadratmeter';
      }

      for (let j = 0; j < preisTableTH.length; j++) {
        const header = preisTableTH[j];
        const td = document.createElement('td');
        //td.textContent = jedePreis;
        //row.appendChild(td);
        td.classList.add('px-6', 'py-1');
        switch (j) {
          case 0:
            td.textContent = staerkeKey;
            tr.appendChild(td);
            break;
          case 1:
            td.textContent = staerkeValue;
            tr.appendChild(td);
            break;
          case 2:
            td.textContent = jedePreis.toLocaleString('de-DE', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            tr.appendChild(td);
            break;
          case 3:
            td.textContent = (jedePreis + rissePreisAufschlag).toLocaleString(
              'de-DE',
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            );
            tr.appendChild(td);
            break;
          case 4:
            td.textContent = (jedePreis + balkenPreisAufschlag).toLocaleString(
              'de-DE',
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            );
            tr.appendChild(td);
            break;
          case 5:
            td.textContent = (
              jedePreis +
              rissePreisAufschlag +
              balkenPreisAufschlag
            ).toLocaleString('de-DE', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            tr.appendChild(td);
            break;
          default:
            console.log(`Kein Zugriff`);
        }
      }
      tr.classList.add(
        'px-6',
        'text-center',
        'bg-white',
        'border-b',
        'dark:bg-gray-800',
        'dark:border-gray-700',
        'border-gray-200',
        'hover:bg-gray-100',
        'dark:hover:bg-gray-600'
      );
      tbody.appendChild(tr);
    }

    preisTable.appendChild(tbody);
    tableContainer.appendChild(preisTable);

    /* === Table Design === */

    preisTableTR.classList.add(
      'bg-gray-100',
      'border-b',
      'dark:bg-gray-700',
      'dark:border-gray-400',
      'border-gray-400',
      'hover:bg-gray-50',
      'dark:hover:bg-gray-600'
    );

    preisTable.classList.add(
      'w-full',
      'text-sm',
      'text-left',
      'rtl:text-right',
      'text-gray-500',
      'dark:text-gray-400'
    );

    tableContainer.classList.add(
      'col-span-4',
      'text-center',
      'border',
      'border-gray-300',
      'dark:border-gray-400',
      'border-solid',
      'sm:rounded-lg',
      'relative',
      'overflow-x-auto'
    );

    // Form Card
    const formPic = document.getElementById('formPic');
    formPic.src = './images/Form/' + tischForm.value + '.webp';
    selectedForm.innerHTML = '' + tischItem.value;

    // Farbe Card
    const farbePic = document.getElementById('farbePic');
    farbePic.src = './images/Farbe/' + tischFarbe.value + '.webp';
    selectedFarbe.innerHTML = '' + farbeItem.value;

    // Rissanteil Card
    const rissPic = document.getElementById('rissPic');
    rissPic.src = './images/Rissanteil/' + rissAnteil.value + '.webp';
    selectedRissanteil.innerHTML = '' + rissAnteil.value;

    // Finish Card
    const finishPic = document.getElementById('finishPic');
    finishPic.src = './images/Finish/' + finish.value + '.webp';
    selectedFinish.innerHTML = '' + finish.value;
  });

  /* === Toggle Theme === */
  const toggleBtn = document.getElementById('toggleBtn');
  const label = document.getElementById('label');
  const html = document.documentElement;

  function updateIcon() {
    if (html.classList.contains('dark')) {
      label.textContent = 'Light Mode';
    } else {
      label.textContent = 'Dark Mode';
    }
  }

  // download theme from localStorage
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
  }
  updateIcon();

  // click to toggle
  toggleBtn.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem(
      'theme',
      html.classList.contains('dark') ? 'dark' : 'light'
    );
    updateIcon();
  });
});
