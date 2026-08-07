# Portfolio

Moje osobiste portfolio. Strona zbiera informacje o moich kompetencjach, doświadczeniu i rozwoju.

🌐 **Wersja online:** [ixroy13.github.io/portfolio](https://ixroy13.github.io/portfolio)

## Co znajduje się na stronie

- strona główna z krótkim przedstawieniem i danymi kontaktowymi;
- lista kompetencji, m.in. Microsoft Excel, PowerPoint, Word, Jira, praca zespołowa oraz Agile i Scrum;
- ścieżka kariery obejmująca edukację, doświadczenie zawodowe, wolontariat i samorozwój;
- opis projektu SFERA realizowanego w ramach Koła Naukowego Falcon;
- informacje o kursie Google Agile Project Management;
- CV dostępne do pobrania w formacie PDF;
- archiwum portfolio z 2023 roku oraz sekcja prac naukowych;
- obsługa języka polskiego i angielskiego oraz trybu jasnego i ciemnego.

## Technologie

- React 18;
- React Router;
- i18next i react-i18next;
- Font Awesome;
- CSS;
- Create React App.

## Uruchomienie projektu

Wymagany jest Node.js oraz npm.

```bash
npm install
npm start
```

Aplikacja będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000).

## Przydatne skrypty

```bash
npm start       # uruchamia środowisko developerskie
npm test        # uruchamia testy
npm run build   # tworzy wersję produkcyjną w katalogu build
npm run deploy  # publikuje aplikację na GitHub Pages
```

## Struktura projektu

```text
src/
├── components/       # współdzielone komponenty interfejsu
├── pages/            # widoki: główna, kariera, CV i pozostałe sekcje
├── images/           # grafiki wykorzystywane w aplikacji
├── styles/           # globalne style
├── App.js            # routing i główny układ aplikacji
└── i18n.js           # tłumaczenia polskie i angielskie
public/
└── reasume.pdf       # CV do pobrania
```

Projekt jest rozwijany jako praktyczna wizytówka i miejsce do dokumentowania kolejnych doświadczeń.
