# Tischplatten-Konfigurator
Ein interaktiver Konfigurator für maßgefertigte Tischplatten, entwickelt, um die Preisberechnung basierend auf Dimensionen, Stil, Stärke, Form, Rissanteil und Oberfläche zu automatisieren.

## Features
- Responsive Eingabeformulare: Breite, Länge, Stil, Plattenstärke, Form, Rissanteil, Farbe
- Dynamische Preisberechnung: Berücksichtigt Grundpreis, Zuschläge für kleine Flächen (<1 m²), Risse, Äste und Balken-Außenseiten
- Übersichtliche Ausgabe: Preisübersichtstabelle für alle gewählten Optionen
- Technologien: HTML, TailwindCSS, JavaScript (DOM-Manipulation)

---

## Eingaben

1. Maße
   - Breite: bis maximal 180 cm
   - Länge: bis maximal 450 cm

2. Stil & Plattenstärke
   - Vollmassiver Stil: 25–120 mm
   - Optisch gedoppelter Stil: 40–120 mm
    > Beide Stile haben eigene Preistabellen für die Berechnung des Grundpreises.

3. Form (nur eine Option wählbar)
   - 10 Optionen : Gerade Kante, Facettenkante, Mit Baumkante, Durchgängige Bohlen, Mit Querfries, Rund, Oval, Schiffsbodenmuster, Flechtmuster, Rautenmuster

5. Rissanteil (nur eine Option wählbar)
   - Ohne, Leicht, Normal
   > Kann mit „Reine Balken Außenseiten“ kombiniert werden (Aufpreis: 71,40 €/m²)

6. Farbe (nur eine Option wählbar)
   - Mattlack, Hartöl, Äste/Risse schwarz verfüllt (Aufpreis: 47,60 €/m²)

---

## Die Berechnung des Programms

1. Fläche in Quadratmetern:
   > Breite \* Länge = Quadradmeter (m<sup>2</sup>)

2. Zuschlag für kleine Flächen:
   > Fläche < 1 m² → 5 % Aufpreis

3. Preis laut Plattenstärke:
   - Basispreis aus der entsprechenden Preistabelle
   - Zuschläge für Risse, Äste oder Balken-Außenseiten werden addiert



## Ausgaben

Die berechneten Preise werden in einer Tabelle zusammen mit den anderen möglichen Eigenschaften

> |  #  | Plattensträke | Grundpreis/m<sup>2</sup> | Preis | zzgl.Reise verfüllen | zzgl.Reine Balken Aussenseiten | zzgl.Reise verfüllen und Reine Balken Aussenseiten |
> | :-: | :-----------: | :----------------------: | :---: | :------------------: | :----------------------------: | :------------------------------------------------: |
> |  1  |     25 mm     |          300 €           |       |                      |                                |                                                    |
> |  2  |     30 mm     |          360 €           |       |                      |                                |                                                    |
> | ... |      ...      |           ...            |  ...  |          ...         |               ...              |                       ...                          |
 
---

#### Technische Hinweise vom Projekt

- Cascading Dropdowns: Dynamische Auswahl basierend auf vorherigen Eingaben
- Zahlenformatierung: toLocaleString() für europäisches Format oder .toFixed() für feste Dezimalstellen (liefert Strings)
- Attributnamen: Case-sensitive
- Hosting: GitHub Pages nur für statische Seiten, kein serverseitiges Rendering

  
