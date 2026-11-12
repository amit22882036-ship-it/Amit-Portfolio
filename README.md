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
| `assets/img/hero/` | The desk illustration, split into layers for day and night (all on one 1090 × 441 canvas) |
| `assets/img/projects/` | Project screenshots, logos and the walkthrough video |
| `tools/build_hero_layers.py` | Rebuilds the hero layers from the two source illustrations |

## Desk hotspots

Hotspot positions are percentages of the 1090 × 441 illustration and are defined in the `hotspots` array in `js/main.js`. When the illustration changes, update those boxes.

## Day / night switch

When the theme changes, Amit ducks behind the desk and pops back up dressed for the other shift. For that the illustration is split into layers, one set per theme:

| Layer | What it holds |
| --- | --- |
| `room-*.webp` | The room with an empty chair |
| `amit-*.webp` | Amit above the back edge of the desk (the part that ducks) |
| `hands-*.webp` | His forearms and hands on the desk (they fade) |
| `front-*.webp` | The laptop lid and mug, drawn in front of him |

They are built from `source-day-night.webp` (the original, day on top and night below) and `source-empty-chair.webp` (the same picture with Amit removed). To rebuild them after changing either source:

```bash
pip install pillow numpy scipy
python tools/build_hero_layers.py
```

The desk edge Amit ducks behind sits at 80% of the canvas height; if a new illustration moves it, update `CLIP_Y` in the script and the `clip-path` on `.amit-clip` in `css/style.css`.
