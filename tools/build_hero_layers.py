"""Build the layered hero illustration used by the day/night switch.

Inputs (assets/img/hero/):
  source-day-night.webp   the original illustration: day on top, night below
  source-empty-chair.webp the same illustration with Amit removed (empty chair)

Outputs (assets/img/hero/), one set per theme, all on the same 1090x441 canvas:
  room-<theme>.webp   the empty room (from the empty-chair image)
  amit-<theme>.webp   Amit above the back edge of the desk; drops behind it
  hands-<theme>.webp  his forearms and hands resting on the desk; fades
  front-<theme>.webp  laptop lid and mug, drawn in front of Amit

How Amit is cut out: pixels that differ between the original and the empty
chair image, minus the chair that peeks out beside his arm (everything left of
the light highlight along his sleeve) and, in daylight, the smudged wall above
his shoulders. Coordinates below are on the 1090x441 canvas.

Run from the repository root:  python tools/build_hero_layers.py [--debug DIR]
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage as nd

HERO = Path(__file__).resolve().parent.parent / "assets" / "img" / "hero"
CROP_X0, CROP_X1, H = 340, 1430, 441
THEMES = {"day": 0, "night": 446}       # top of each scene in the source images
CLIP_Y = 353                             # back edge of the desk (canvas y)
PERSON_X = (300, 720)                    # columns Amit can occupy
HANDS_X = (480, 660)                     # columns of his hands on the keyboard
NOTEBOOK_TOP = 364                       # his sleeve rests on the desk down to here
WALL_STRIP = (432, 672, 230)             # night: wall between board and window
HEAD_BOTTOM = 205                        # day: above this, behind Amit is only wall
NIGHT_WALL = (40, 46, 78)                # matches --bg at night
DAY_BG = (246, 241, 231)                 # matches --bg in daylight

# Light highlight along the sleeve: chair is to the left of it.
STRIPE = {
    "day":   {"rows": (214, 312), "x": (355, 450), "lum": 105},
    "night": {"rows": (212, 322), "x": (330, 440), "lum": 105},
}
# Seeds for the objects that stand in front of Amit.
FRONT_SEEDS = {"lid": (700, 300), "mug": (335, 372)}


def crop(img, y0):
    return np.asarray(img.crop((CROP_X0, y0, CROP_X1, y0 + H))).astype(np.int16)


def largest(mask):
    lab, n = nd.label(mask)
    if n == 0:
        return mask
    sizes = nd.sum(mask, lab, range(1, n + 1))
    return lab == (int(np.argmax(sizes)) + 1)


def fill_small_holes(mask, max_size):
    holes = nd.binary_fill_holes(mask) & ~mask
    lab, n = nd.label(holes)
    if n:
        sizes = nd.sum(holes, lab, range(1, n + 1))
        small = np.isin(lab, [i + 1 for i, s in enumerate(sizes) if s <= max_size])
        mask = mask | small
    return mask


def stripe_edge(O, theme):
    """Leftmost highlight pixel per row along the sleeve, smoothed and monotonic."""
    cfg = STRIPE[theme]
    lum = O[..., :3].mean(-1)
    (y0, y1), (x0, x1) = cfg["rows"], cfg["x"]
    edge = {}
    for y in range(y0, y1):
        xs = np.nonzero(lum[y, x0:x1] > cfg["lum"])[0]
        if len(xs):
            edge[y] = x0 + int(xs[0])
    ys = np.array(sorted(edge))
    xs = np.array([edge[y] for y in ys], float)
    # robust fit: the highlight is a gentle curve, so a quadratic is plenty
    for _ in range(3):
        coef = np.polyfit(ys, xs, 2)
        resid = np.abs(np.polyval(coef, ys) - xs)
        keep = resid < max(3.0, np.percentile(resid, 80))
        ys, xs = ys[keep], xs[keep]
    return coef, (y0, y1)


def person_mask(O, N, theme, objects):
    diff = np.abs(O[..., :3] - N[..., :3]).max(-1)
    raw = nd.binary_opening((diff > 40) & (O[..., 3] > 200), iterations=1)
    # his ink outline against the night wall differs by less than that
    lum_o, lum_n = O[..., :3].mean(-1), N[..., :3].mean(-1)
    outline = (lum_o < 32) & (lum_n - lum_o > 14) & (O[..., 3] > 200)
    for m in (raw, outline):
        m[:, : PERSON_X[0]] = False
        m[:, PERSON_X[1]:] = False
    # The dark shirt/hoodie barely differs from the dark chair behind it, so
    # close the shape against the laptop, the mug and the desk edge, then fill.
    walls = nd.binary_closing(raw | outline, iterations=4) | objects
    walls[CLIP_Y, PERSON_X[0]:PERSON_X[1]] = True
    filled = nd.binary_fill_holes(walls) & ~objects
    filled[CLIP_Y:] = nd.binary_closing(raw | outline, iterations=2)[CLIP_Y:]
    blob = largest(filled)

    rgb = O[..., :3]
    lum = rgb.mean(-1)
    sat = rgb.max(-1) - rgb.min(-1)

    # chair left of the sleeve highlight (and left of the forearm below it)
    coef, (y0, y1) = stripe_edge(O, theme)
    chair = np.zeros_like(blob)
    for y in range(y0 - 12, y1):
        x = int(np.floor(np.polyval(coef, max(y, y0)))) - 1
        chair[y, : max(x, 0)] = True
    skin = (rgb[..., 0] > 170) & (rgb[..., 0] - rgb[..., 2] > 45)
    for y in range(y1, CLIP_Y):
        xs = np.nonzero(skin[y, 340:420])[0]
        x = 340 + int(xs[0]) if len(xs) else int(np.polyval(coef, y1))
        chair[y, :x] = True
    mask = blob & ~chair

    if theme == "day":
        # smudged wall above the shoulders: pale, unsaturated pixels
        wall = (sat < 50) & (lum > 85)
        wall[215:] = False
        mask &= ~wall

    # lower down only his hands on the keyboard belong to him (the notebook
    # below his sleeve differs between the two images too)
    mask[NOTEBOOK_TOP:, :HANDS_X[0]] = False
    mask[NOTEBOOK_TOP:, HANDS_X[1]:] = False

    mask = fill_small_holes(largest(nd.binary_opening(mask, iterations=1)), 2500)
    return mask | forearm_below_edge(O, mask)


def forearm_below_edge(O, mask, reach=22):
    """His forearm rests on the desk, and skin is nearly the desk's colour, so
    the colour difference misses it. Wherever he crosses the desk edge, follow
    the same colour down to his ink outline (and include the outline)."""
    ext = np.zeros_like(mask)
    rgb = O[..., :3]
    for x in np.nonzero(mask[CLIP_Y - 1])[0]:
        ref, dark = rgb[CLIP_Y - 2, x], 0
        for y in range(CLIP_Y, min(H, CLIP_Y + reach)):
            px = rgb[y, x]
            if px.mean() < 70:
                ext[y, x] = True
                dark += 1
                if dark >= 3:
                    break
                continue
            if dark or np.abs(px - ref).max() > 45:
                break
            ext[y, x] = True
    return ext


def flood(N, seed, tol):
    rgb = N[..., :3]
    ref = rgb[seed[1], seed[0]]
    similar = np.abs(rgb - ref).max(-1) < tol
    lab, _ = nd.label(similar)
    region = lab == lab[seed[1], seed[0]]
    return nd.binary_fill_holes(region)


def object_mask(N):
    """Laptop lid and mug in the empty-chair image, outline included."""
    region = np.zeros(N.shape[:2], bool)
    for name, seed in FRONT_SEEDS.items():
        r = flood(N, seed, 38)
        r = nd.binary_fill_holes(nd.binary_closing(r, iterations=3))
        region |= nd.binary_dilation(r, iterations=4)
    return region


def front_mask(objects, person):
    region = objects.copy()
    region[CLIP_Y + 2:] = False                          # nothing to hide below the desk edge
    return region & ~nd.binary_dilation(person, iterations=1)


def clean_edges(O, theme):
    """The original's soft edges: drop near-invisible haze, tint night haze to the wall."""
    out = O.copy()
    a = out[..., 3]
    if theme == "night":
        out[a < 245, :3] = NIGHT_WALL
        out[a < 6] = 0
    else:
        out[a < 10] = 0
    return out


def inpaint(img, region, valid, bg, iters=300, reach=260):
    """Fill `region` smoothly from the `valid` wall pixels around it.

    Works on the colour as seen over the page background (plus alpha as its
    own channel), so faint smudges count only as much as they show. Each row
    starts as a blend between the nearest valid pixels to its left and right;
    a weighted smoothing pass then evens it out vertically. Invalid neighbours
    (outlines, chair, laptop) never feed in.
    """
    bg = np.array(bg, float)
    a = img[..., 3].astype(float) / 255
    seen = img[..., :3] * a[..., None] + bg * (1 - a[..., None])
    pm = np.dstack([seen, a * 255])
    W = region.shape[1]
    for y in np.nonzero(region.any(1))[0]:
        xs = np.nonzero(region[y])[0]
        for run in np.split(xs, np.nonzero(np.diff(xs) > 1)[0] + 1):
            l = next((x for x in range(run[0] - 1, max(-1, run[0] - reach), -1) if valid[y, x]), None)
            r = next((x for x in range(run[-1] + 1, min(W, run[-1] + reach)) if valid[y, x]), None)
            if l is None and r is None:
                continue
            l, r = (r, r) if l is None else (l, l) if r is None else (l, r)
            t = ((run - l) / max(r - l, 1))[:, None] if r != l else np.zeros((len(run), 1))
            pm[y, run] = pm[y, l] * (1 - t) + pm[y, r] * t
    w = (region | valid).astype(float)
    shifts = ((1, 0), (-1, 0), (1, 1), (-1, 1))
    for _ in range(iters):
        num = sum(np.roll(pm * w[..., None], s, ax) for s, ax in shifts)
        den = sum(np.roll(w, s, ax) for s, ax in shifts)
        avg = num / np.maximum(den, 1e-6)[..., None]
        pm[region] = avg[region]
    out = img.copy()
    alpha = np.clip(pm[..., 3], 0, 255)
    af = alpha[..., None] / 255
    rgb = (pm[..., :3] - bg * (1 - af)) / np.maximum(af, 0.05)
    out[region, :3] = np.clip(rgb[region], 0, 255)
    out[region, 3] = alpha[region]
    return out


def build_room(O, N, theme, person):
    """The room with Amit gone.

    Daylight: the original has a soft light glow around Amit's head, so outside
    his silhouette the original stays as it is; under his body the empty-chair
    image supplies the chair, and behind his head the gap is filled smoothly
    from the surroundings. Night: the wall is one flat navy, so the empty-chair
    image fills the whole scene. The empty-chair image is opaque (black outside
    the scene), so the scene's soft edges always come from the original.
    """
    out = clean_edges(O, theme)
    dark = N[..., :3].max(-1) < 30
    lab, _ = nd.label(dark)
    border = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    outside = np.isin(lab, border[border > 0])

    if theme == "day":
        a = out[..., 3:4] / 255
        seen = out[..., :3] * a + np.array(DAY_BG) * (1 - a)
        seen_lum, seen_sat = seen.mean(-1), seen.max(-1) - seen.min(-1)
        n_rgb = N[..., :3]
        n_wall = (n_rgb.mean(-1) > 150) & (n_rgb.max(-1) - n_rgb.min(-1) < 60)
        snug = nd.binary_dilation(person, iterations=1) & ~outside
        below = np.zeros_like(person)
        below[HEAD_BOTTOM:] = True

        # under his body: the chair and keyboard from the empty-chair image
        body = snug & below & ~n_wall
        out[body, :3] = N[body, :3]
        out[body, 3] = 255

        # behind his head (plus the faint grey fringe around his hair, only
        # over pale pixels so chair and board edges stay) and any bare wall
        # beside him: fill smoothly from the wall around it
        fringe = nd.binary_dilation(person, iterations=8) & (seen_lum > 110) & (seen_sat < 60)
        hair_edge = nd.binary_dilation(person, iterations=3)
        hair_edge[HEAD_BOTTOM - 10:] = False      # clear of the chair's top edge
        fringe |= hair_edge
        fill = ((person | fringe) & ~below) | (snug & below & n_wall)
        fill &= ~outside & ~body
        valid = (seen_lum > 150) & (seen_sat < 60) & ~fill & ~person
        return inpaint(out, fill, valid, DAY_BG)

    solid = O[..., 3] >= 128
    padded = np.vstack([np.ones((1, solid.shape[1]), bool), solid])   # scene runs off the top
    interior = nd.binary_fill_holes(padded)[1:]
    use_new = interior & ~outside
    out[use_new, :3] = N[use_new, :3]
    out[use_new, 3] = 255

    # Between the cork board and the window the original is see-through from
    # the top edge down past Amit's head; paint that strip with the clean wall,
    # fading in at the top like the rest of the scene.
    x0, x1, y1 = WALL_STRIP
    fade = (np.clip((np.arange(H) - 10) / 20.0, 0, 1) * 255)[:, None]
    strip = np.zeros(O.shape[:2], bool)
    strip[:y1, x0:x1] = True
    strip &= ~outside
    alpha = np.maximum(out[..., 3], np.broadcast_to(fade, O.shape[:2]))
    out[strip, :3] = N[strip, :3]
    out[strip, 3] = alpha[strip]
    return out


def soft_alpha(mask, src_alpha):
    """Feather the cut by ~1px so the edge stays smooth while moving."""
    a = nd.gaussian_filter(mask.astype(float), 0.6)
    a = np.clip((a - 0.15) / 0.7, 0, 1)
    return (a * src_alpha).astype(np.uint8)


def layer(rgb_src, alpha):
    out = np.zeros((H, CROP_X1 - CROP_X0, 4), np.uint8)
    out[..., :3] = np.clip(rgb_src[..., :3], 0, 255)
    out[..., 3] = alpha
    return Image.fromarray(out, "RGBA")


def extend_torso(img, mask, O):
    """Continue the shirt below the desk edge so the bounce never shows a gap."""
    arr = np.asarray(img).copy()
    row = CLIP_Y - 1
    rgb = O[row, :, :3]
    shirt = mask[row] & ~((rgb[:, 0] > 170) & (rgb[:, 0] - rgb[:, 2] > 45))
    for y in range(CLIP_Y, min(H, CLIP_Y + 40)):
        arr[y, shirt] = arr[row, shirt]
    return Image.fromarray(arr, "RGBA")


def save(img, name):
    img.save(HERO / name, "WEBP", quality=90, method=6)


def main(debug_dir=None):
    src = Image.open(HERO / "source-day-night.webp").convert("RGBA")
    emp = Image.open(HERO / "source-empty-chair.webp").convert("RGBA")
    if emp.size != src.size:
        emp = emp.resize(src.size, Image.LANCZOS)

    for theme, y0 in THEMES.items():
        O, N = crop(src, y0), crop(emp, y0)
        objects = object_mask(N)
        person = person_mask(O, N, theme, objects)
        room = build_room(O, N, theme, person)
        front = front_mask(objects, person)

        alpha = soft_alpha(person, O[..., 3])
        upper = alpha.copy(); upper[CLIP_Y:] = 0
        lower = alpha.copy(); lower[:CLIP_Y] = 0

        save(Image.fromarray(room.astype(np.uint8), "RGBA"), f"room-{theme}.webp")
        save(extend_torso(layer(O, upper), person, O), f"amit-{theme}.webp")
        save(layer(O, lower), f"hands-{theme}.webp")
        save(layer(room, (front * room[..., 3]).astype(np.uint8)), f"front-{theme}.webp")

        if debug_dir:
            d = Path(debug_dir)
            vis = O.copy().astype(np.uint8)
            vis[person] = (vis[person] * 0.45 + np.array([255, 0, 0, 255]) * 0.55).astype(np.uint8)
            vis[front] = (vis[front] * 0.45 + np.array([0, 120, 255, 255]) * 0.55).astype(np.uint8)
            vis[CLIP_Y, :, :3] = (0, 200, 0)
            Image.fromarray(vis).save(d / f"layers-{theme}.png")
        print(theme, "person px", int(person.sum()), "front px", int(front.sum()))


if __name__ == "__main__":
    dbg = sys.argv[sys.argv.index("--debug") + 1] if "--debug" in sys.argv else None
    main(dbg)
