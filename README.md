# Tischplatten-Konfigurator

### Eingaben

**Auf der Website kann der Kunde..**

- [x] die Maße
  1. Breite (maximal 180cm)
  2. Länge (maximal 450cm)
  3. Strärke (2,5 - 12 cm) <small>- siehe die Tabelle unter\*</small>
- [x] der Form (nur 1 Option möglich)
  1. Gerade Kannte
  2. Facettenkante
  3. Mit Baumkane
  4. Durchgängige Bohlen
  5. Mit Querfrieß
  6. Rund
  7. Oval
  8. Schiffsbodenmuster
  9. Flechmuster
  10. Rautenmuster
- [x] Rissanteil (nur 1 Option möglich)
  1. Leichter Rissanteil
  2. Normaler Rissanteil
     > kann jeweils mit "Reine Balken Außenseiten" kombiniert werden (Preis-Aufschlag 71,40 €/m²)
- [x] Farbe (nur 1 Option möglich)
  1. Mattlack
  2. Hartöl
  3. Äste/Risse schwarz verfüllt (Preis-Aufschlag 47,60 €/m²)

**der anzufertigenden Tischplatte eingeben**

---

### Die Berechnung des Programms

#### Nachdem der Kunde seine Wünsche eingegeben hat, errechnet das Programm und gibt den Preis aus.

> ( Breite,max 450cm / 100 ) \* ( Länge,max 180cm / 100 ) = Quadradmeter (m<sup>2</sup>)

Wenn die Fläche kleiner als 1 m<sup>2</sup> ist, bekommt der Kunde 5% Zuschlag

> Zuschlag Kleinteil (<1m<sup>2</sup>) = 5%

Der Preis laut der Plattenstärke

> |  #  | Plattensträke | Preis / m<sup>2</sup> |
> | :-: | :-----------: | :-------------------: |
> |  1  |     25 mm     |         300 €         |
> |  2  |     30 mm     |         360 €         |
> |  3  |     40 mm     |         420 €         |
> |  4  |     50 mm     |         480 €         |
> |  5  |     60 mm     |         560 €         |
> |  6  |     70 mm     |         640 €         |
> |  7  |     80 mm     |         720 €         |
> |  8  |     90 mm     |         800 €         |
> |  9  |    100 mm     |         880 €         |
> | 10  |    110 mm     |         960 €         |
> | 11  |    120 mm     |        1,040 €        |

## Ausgaben

Die gerechten Preisen sollen in einer Tabelle mit allen anderen möglichen Eigenschaften darstellen

> |  #  | Plattensträke | Grundpreis/m<sup>2</sup> | Preis | zzgl.Reise verfüllen | zzgl.Reine Balken Aussenseiten | zzgl.Reise verfüllen und Reine Balken Aussenseiten |
> | :-: | :-----------: | :----------------------: | :---: | :------------------: | :----------------------------: | :------------------------------------------------: |
> |  1  |     25 mm     |          300 €           |       |                      |                                |                                                    |
> |  2  |     30 mm     |          360 €           |       |                      |                                |                                                    |
> |  3  |     40 mm     |          420 €           |       |                      |                                |                                                    |
> |  4  |     50 mm     |          480 €           |       |                      |                                |                                                    |
> |  5  |     60 mm     |          560 €           |       |                      |                                |                                                    |
> |  6  |     70 mm     |          640 €           |       |                      |                                |                                                    |
> |  7  |     80 mm     |          720 €           |       |                      |                                |                                                    |
> |  8  |     90 mm     |          800 €           |       |                      |                                |                                                    |
> |  9  |    100 mm     |          880 €           |       |                      |                                |                                                    |
> | 10  |    110 mm     |          960 €           |       |                      |                                |                                                    |
> | 11  |    120 mm     |         1,040 €          |       |                      |                                |                                                    |

## Notes to myself

- Cascading dropdown
- toLocalString() can be used to convert numbers to european numeric system (1.000,00) and determine the prefered decimal units
- alternatively .toFixed(decimal units)
- but both return String
- attribute names are case-sensitive
