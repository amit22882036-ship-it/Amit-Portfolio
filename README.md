# Amit Gertner · Portfolio v2

An illustrated, interactive portfolio. The hero is Amit's desk: every object on it opens part of the portfolio, and the sun/moon switch turns the whole scene from day to night.

## Run locally

It's a static site with no build step. Serve the folder and open the page:

```bash
python -m http.server 5174
```

Then open http://localhost:5174.

## Where things live

| Path | What it holds |
| --- | --- |
| `js/data.js` | All content: quick facts, projects, journey, timeline cards, hobbies |
| `js/main.js` | Rendering, desk hotspots, day/night theme, dialogs, timeline layout |
| `css/style.css` | Design tokens for day and night, layout and animation |
| `assets/img/hero/` | Day and night illustrations (same canvas, so objects line up) |
| `assets/img/projects/` | Project screenshots, logos and the walkthrough video |

## Desk hotspots

Hotspot positions are percentages of the 1090 × 441 illustration and are defined in the `hotspots` array in `js/main.js`. When the illustration changes, update those boxes.
