Student Expense Calculator
==========================

What this is
------------
A small offline-friendly static web app to help students living away from home estimate monthly and semester expenses and visualize category breakdown.

Files
-----
- index.html — main HTML page (includes Tailwind via CDN)
- app.js — calculator logic + simple pie-drawing on canvas
- styles.css — tiny custom stylesheet
- README.md — this file

Usage
-----
1. Unzip the folder (if zipped).
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox).
3. Enter monthly costs; click Calculate. One-time costs are prorated across a 6-month semester.

Customisation ideas
-------------------
- Change semester length in app.js (variable `semesterMonths`).
- Replace canvas drawing with Chart.js for fancier charts (requires adding Chart.js).
- Add currency selector if you want multi-currency support.

License
-------
Open-source — use and adapt freely.
