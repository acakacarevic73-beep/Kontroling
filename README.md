Interactive Controlling Dashboard (React + Recharts)
​Ovaj alat je dizajniran kao edukativni i operativni dashboard za kontrolore i finansijske analitičare koji žele da povežu operativne performanse sa finansijskim rezultatima.
​U fokusu nije samo P&L, već zdravlje biznisa kroz integraciju prodaje, zaliha i gotovinskog ciklusa.
​🚀 Glavne Funkcionalnosti
​4 Modula: Finansijski (P&L), Operacioni (NWC/Zalihe), Prodajni (Kupci/Ciklus) i Integrisani (Health Score).
​Health Score (0–16 poena): Automatska evaluacija biznisa na osnovu 8 kritičnih parametara (zeleno/žuto/crveno).
​Dynamic Waterfall: Vizuelni prikaz doprinosa EBITDA marži.
​CSV Data Engine: Mogućnost učitavanja sopstvenih podataka direktno iz Excel-a (izvezeno kao CSV).
​📂 Kako koristiti sopstvene podatke?
​Da bi dashboard ispravno očitao tvoje podatke, CSV fajl mora pratiti sledeću strukturu:
​1. Format kolona
​Prva četiri reda zaglavlja treba da izgledaju ovako:
Kategorija, Podkategorija, Jan_Plan, Jan_Ostvarenje, Feb_Plan, Feb_Ostvarenje...
​2. Dozvoljene kategorije
​Alat prepoznaje sledeće ključne reči u koloni Kategorija:
​Prihodi (npr. Prihodi od prodaje)
​COGS (Direktni troškovi, materijal)
​OpEx (Fiksni troškovi, plate, zakup)
​Zalihe (Unositi kao broj dana - DIO)
​Potraživanja (Unositi kao broj dana - DSO)
​Broj kupaca (Aktivni kupci)
​🛠 Tehnologije
​React (Frontend framework)
​Recharts (Vizualizacija podataka)
​Lucide React (Ikonice)
