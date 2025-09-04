/* === DOM Zugriff & Variablen 1/2 === */
const form1 = document.getElementById('form1');
const wrapper = document.getElementById('wrapper');
const ausgabe = document.getElementById('output');
const clearBtn = document.getElementById('clearBtn');
const breite = document.getElementById('breite');
const laenge = document.getElementById('laenge');
const staerke = document.getElementById('staerke');
const tischForm = document.getElementById('tischForm');
const tischFarbe = document.getElementById('tischFarbe');
const displayQM = document.getElementById('displayQM');
const rissAnteil = document.getElementById('rissAnteil');
const resetButton = document.getElementById('resetBtn');
const balkenCheckbox = document.getElementById('balken');
const tabelleTitel = document.getElementById('tabelleTitel');
const tableContainer = document.getElementById('tableContainer');
const displayGrundPreis = document.getElementById('displayGrundPreis');
const displayGesamtPreis = document.getElementById('displayGesamtPreis');
const selectedForm = document.getElementById('selectedForm');
const selectedFarbe = document.getElementById('selectedFarbe');
const selectedRissanteil = document.getElementById('selectedRissanteil');
const selectedFinish = document.getElementById('selectedFinish');

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

addEventListener('DOMContentLoaded', () => {
  const tischplatteList = document.getElementById('tischplatte');
  // Event listener เมื่อ dropdown 1 มีการเปลี่ยนค่า
  tischplatteList.addEventListener('change', function () {
    // ล้าง option เก่าและตั้ง placeholder ใหม่
    staerke.innerHTML =
      '<option value="" disabled selected> - bitte auswählen - </option>';

    // เลือกชุดข้อมูลตามค่า
    preisListe =
      this.value === 'vollmassiv' ? preisListeVollmassiv : preisListeGedoppelt;

    console.log(preisListe);

    // เติม option
    preisListe.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.key; // value ที่จะส่งในฟอร์ม
      option.textContent = `${item.key} mm`; // ข้อความที่แสดง
      staerke.appendChild(option);
    });
  });

  /* === function clearScreen === */
  function clearScreen() {
    form1.reset();
    tabelleTitel.innerText = '';
    tableContainer.innerHTML = '';
  }

  /* === X geklickt werden === */
  clearBtn.addEventListener('click', () => {
    ausgabe.classList.add('hidden');
    clearScreen();
  });

  /* === Rechnen geklickt werden === */
  form1.addEventListener('submit', function (event) {
    // Verhindern, dass die Seite aktualisiert wird
    event.preventDefault();
    //ausgabe.classList.remove('hidden');
    tabelleTitel.innerText = '';
    tableContainer.innerHTML = '';
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
    //const selectedRissanteil = rissAnteil.value;

    const finish = document.querySelector('input[name="finish"]:checked');

    /* === Rechnungen === */
    const qm = (inputBreite / 100) * (inputLaenge / 100);
    const rissePreis = qm * 47.6;
    const balkenPreis = qm * 71.4;
    const qmDE = qm.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const rissePreisDE = rissePreis.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const balkenPreisDE = balkenPreis.toLocaleString('de-DE', {
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
    ).toLocaleString('de-DE');
    let gesamtPreis = preisBerechnungDE;

    displayGesamtPreis.innerHTML = ' € ' + gesamtPreis;
    displayGrundPreis.innerHTML = ' € ' + preisBerechnungDE;
    displayQM.innerHTML = qmDE + ' m<sup>2</sup>';

    /* === Preistabelle erzeugen === */
    const preisTable = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = [
      'Plattenstärke',
      'Grundpreis/m²',
      'Preis',
      '+ zzgl. Risse',
      '+ zzgl. Reine Balken',
      '+ zzgl. Risse & Balken',
    ];
    // Platzhalter für Tabellekörper
    headers.forEach((text) => {
      const th = document.createElement('th');
      th.textContent = text;
      th.setAttribute('scope', 'col');
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    thead.classList.add(
      'text-xs',
      'text-gray-700',
      'uppercase',
      'bg-gray-50',
      'dark:bg-gray-700',
      'dark:text-gray-400'
    );

    preisTable.appendChild(thead);

    // Tabellekörper erzeugen
    const tbody = document.createElement('tbody');
    // Preis * QM
    for (let i = 0; i < preisListe.length; i++) {
      let staerkeKey = preisListe[i].key;
      let staerkeValue = preisListe[i].value;
      let jedePreis = qm * staerkeValue;
      //console.log(jedePreis);
      const row = document.createElement('tr');

      if (preisListe == preisListeVollmassiv) {
        tabelleTitel.innerText =
          'Vollmassive Tischplatte - Brutto-Preis pro Quadratmeter';
      } else {
        tabelleTitel.innerText =
          'Optisch gedoppelte Tischplatte - Brutto-Preis pro Quadratmeter';
      }

      for (let j = 0; j < headers.length; j++) {
        const header = headers[j];
        const td = document.createElement('td');
        //td.textContent = jedePreis;
        //row.appendChild(td);
        td.classList.add('px-6', 'py-1');
        switch (j) {
          case 0:
            td.textContent = staerkeKey + ' mm';
            row.appendChild(td);
            break;
          case 1:
            td.textContent = staerkeValue + ' €/m²';
            row.appendChild(td);
            break;
          case 2:
            td.textContent =
              '€ ' +
              jedePreis.toLocaleString('de-DE', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
            row.appendChild(td);
            break;
          case 3:
            td.textContent =
              '€ ' +
              (jedePreis + rissePreis).toLocaleString('de-DE', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
            row.appendChild(td);
            break;
          case 4:
            td.textContent =
              '€ ' +
              (jedePreis + balkenPreis).toLocaleString('de-DE', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
            row.appendChild(td);
            break;
          case 5:
            td.textContent =
              '€ ' +
              (jedePreis + rissePreis + balkenPreis).toLocaleString('de-DE', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
            row.appendChild(td);
            break;
          default:
            console.log(`Kein Zugriff`);
        }
      }
      row.classList.add(
        'px-6',
        'bg-white',
        'border-b',
        'dark:bg-gray-800',
        'dark:border-gray-700',
        'border-gray-200',
        'hover:bg-gray-100',
        'dark:hover:bg-gray-600'
      );
      tbody.appendChild(row);
    }

    preisTable.appendChild(tbody);
    tableContainer.appendChild(preisTable);

    // Tabellendesign hinzufügen

    headerRow.classList.add(
      'bg-white',
      'border-b',
      'dark:bg-gray-800',
      'dark:border-gray-700',
      'border-gray-200',
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

    console.log(finish.value);

    /*
    if (balkenCheckbox.checked) {
      addListItem('**', 'mit Reine Balken Außenseiten', '');
      gesamtPreis += balkenPreis;

      const img = document.createElement('img');
      const vorschauBildPlatz = document.querySelectorAll('li');
      img.src = 'images' + '/Rissanteil/' + balkenCheckbox.value + '.jpg';
      img.alt = balkenCheckbox.value;
      vorschauBildPlatz[5].appendChild(img);
    }
    if (risseCheckbox.checked) {
      addListItem('Finish : ', selectedFinish, '');
      gesamtPreis += rissePreis;
    }
    */
  });

  /* === Toggle Theme === */
  const toggleBtn = document.getElementById('toggleBtn');
  const label = document.getElementById('label');
  const html = document.documentElement;

  // ฟังก์ชันอัปเดต icon และข้อความ
  function updateIcon() {
    if (html.classList.contains('dark')) {
      label.textContent = 'Light Mode';
    } else {
      label.textContent = 'Dark Mode';
    }
  }

  // โหลดสถานะจาก localStorage
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
  }
  updateIcon();

  // สลับโหมดเมื่อกดปุ่ม
  toggleBtn.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem(
      'theme',
      html.classList.contains('dark') ? 'dark' : 'light'
    );
    updateIcon();
  });
});
