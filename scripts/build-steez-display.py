"""Build the original Steez Display outlines, fonts, logo, and specimen.

Setup: python3 -m venv .cache/steez-font-venv
       .cache/steez-font-venv/bin/pip install -r scripts/steez-font-requirements.txt
Run:   .cache/steez-font-venv/bin/python scripts/build-steez-display.py
All outlines are constructed here; no third-party font is used as a base.
"""

from pathlib import Path
import json
import string
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo

from fontTools.fontBuilder import FontBuilder
from fontTools.feaLib.builder import addOpenTypeFeaturesFromString
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from shapely.geometry import LineString, Polygon, box
from shapely.geometry.polygon import orient
from shapely.ops import unary_union

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public/brand/fonts"
OUT.mkdir(parents=True, exist_ok=True)
FAMILY = "Steez Display"
EXTRAS = "\u00a0£€¥©®°±×÷−–—‘’“”•…→←↑↓"
CHARS = string.ascii_letters + string.digits + string.punctuation + " " + EXTRAS
REFERENCE_GLYPHS = {}


def reference_outlines():
    """Extract the approved image's six distinct letters, removing raster noise."""
    import numpy as np
    from PIL import Image
    from scipy.ndimage import binary_closing, binary_opening
    from skimage.measure import find_contours
    from shapely.affinity import scale, translate

    pixels = np.asarray(Image.open(OUT.parent / "steezui-label-concept.png").convert("RGBA"))
    ink = (pixels[:, :, 0] > 180) & (pixels[:, :, 1] > 170) & (pixels[:, :, 3] > 160)
    # Coordinates measured from the approved 2172 × 724 concept. The two e's
    # share the first e outline, so the font has a consistent repeat character.
    bounds = {"s": (238, 515), "t": (515, 704), "e": (715, 993),
              "z": (1292, 1545), "u": (1557, 1826), "i": (1838, 1937)}
    factor = 510 / 265
    for char, (left, right) in bounds.items():
        mask = np.pad(ink[175:525, left:right], 5)
        mask = binary_closing(binary_opening(mask, iterations=2), iterations=2)
        shape = Polygon()
        for contour in find_contours(mask, .5):
            polygon = Polygon([(x - 5, 519 - (y - 5 + 175)) for y, x in contour])
            if polygon.area > 30:
                shape = shape.symmetric_difference(polygon)
        # Preserve the silhouette and counters, but smooth pixel-scale artifacts.
        shape = shape.simplify(1.1, preserve_topology=True).buffer(1.3).buffer(-1.3)
        shape = scale(shape, factor, factor, origin=(0, 0))
        shape = translate(shape, -shape.bounds[0], -shape.bounds[1])
        REFERENCE_GLYPHS[char] = (shape, shape.bounds[2])


def rounded(x0, y0, x1, y1, radius=32):
    radius = min(radius, (x1 - x0) / 2, (y1 - y0) / 2)
    return box(x0 + radius, y0 + radius, x1 - radius, y1 - radius).buffer(
        radius, quad_segs=8
    )


def glyph_shape(char, weight):
    t = 112 if weight == 400 else 188
    r = 85 if weight == 400 else 112
    w, h = 535, 510
    parts = []

    if char in REFERENCE_GLYPHS:
        from shapely.affinity import scale, translate
        shape, width = REFERENCE_GLYPHS[char]
        if weight == 400:
            original_height = shape.bounds[3]
            shape = shape.buffer(-34, join_style=1)
            x0, y0, x1, y1 = shape.bounds
            shape = translate(shape, -x0, -y0)
            shape = scale(shape, width / (x1 - x0), original_height / (y1 - y0), origin=(0, 0))
        return shape, width

    def rect(x0, y0, x1, y1, radius=8):
        return rounded(x0, y0, x1, y1, radius)

    def line(points, thick=None):
        return LineString(points).buffer(
            (thick or t) / 2, cap_style=2, join_style=3
        )

    def ring(width=w, height=h, bottom=0):
        stroke = min(t, width * .42, (height - bottom) * .42)
        return rounded(0, bottom, width, height, r).difference(
            rounded(stroke, bottom + stroke, width - stroke, height - stroke, max(10, r / 3))
        )

    def dot(x, y, size=None):
        size = size or t
        return rect(x, y, x + size, y + size, 12)

    if char == " ":
        return Polygon(), 250
    if char == "\u00a0":
        return Polygon(), 250
    if char in "oeacdgqpb":
        if char == "e":
            shape = rounded(0, 0, w, h, r)
            shape = shape.difference(rect(t, 302, w - t, h - t, 12))
            shape = shape.difference(rect(t, t, w + 20, 240, 12))
            return shape, w
        if char == "a":
            return ring().union(rect(w - t, 0, w, h)), w
        if char == "c":
            return ring().difference(box(w - t - 6, t, w + 1, h - t)), w
        if char in "o":
            return ring(), w
        if char in "bpdq":
            parts.append(ring())
            if char in "bp":
                parts.append(rect(0, -180 if char == "p" else 0, t, h if char == "p" else 700))
            else:
                parts.append(rect(w - t, -180 if char == "q" else 0, w, h if char == "q" else 700))
        if char == "g":
            parts = [ring(), rect(w - t, -180, w, h), rect(65, -180, w, -180 + t)]
    elif char == "s":
        shape = rounded(0, 0, w, h, r)
        shape = shape.difference(rect(t, 310, w + 25, h - t, 12))
        shape = shape.difference(rect(-25, t, w - t, 210, 12))
        return shape, w
    elif char == "z":
        parts = [rect(0, h - t, w, h), rect(0, 0, w, t),
                 Polygon([(0, t), (w - t, h - t), (w, h - t), (t, t)])]
    elif char == "t":
        w = 310
        parts = [rect(55, 0, 55 + t, 700), rect(0, h - t, w, h), rect(55, 0, w - 8, t)]
    elif char in "il":
        w = t + 20
        parts = [rect(10, 0, 10 + t, h if char == "i" else 700)]
        if char == "i":
            parts.append(dot(10, 600))
    elif char == "j":
        w = 215
        parts = [rect(w - t, -180, w, h), rect(0, -180, w, -180 + t), dot(w - t, 600)]
    elif char in "nuhrm":
        if char == "m":
            w = 820
            parts = [rounded(0, 0, w, h, r).difference(box(t, -10, 365, h - t)).difference(box(365 + t, -10, w - t, h - t))]
        elif char == "u":
            parts = [rounded(0, 0, w, h, r).difference(box(t, t, w - t, h + 10))]
        elif char == "r":
            w = 395
            parts = [rect(0, 0, t, h), rect(0, h - t, w, h), rect(w - t, 310, w, h)]
        else:
            parts = [rounded(0, 0, w, h, r).difference(box(t, -10, w - t, h - t))]
            if char == "h":
                parts.append(rect(0, 0, t, 700))
    elif char == "f":
        w = 310
        parts = [rect(65, 0, 65 + t, 700), rect(65, 700 - t, w, 700), rect(0, h - t, w - 10, h)]
    elif char == "k":
        parts = [rect(0, 0, t, 700), line([(t, 250), (w - t / 3, h)]), line([(t, 250), (w - t / 3, 0)])]
    elif char in "vwyx":
        if char == "v":
            parts = [line([(t / 2, h), (w / 2, t / 2), (w - t / 2, h)])]
        elif char == "w":
            w = 640
            parts = [line([(t / 2, h), (155, t / 2), (320, 380), (485, t / 2), (w - t / 2, h)])]
        elif char == "x":
            parts = [line([(t / 2, 0), (w - t / 2, h)]), line([(t / 2, h), (w - t / 2, 0)])]
        else:
            parts = [line([(t / 2, h), (w / 2, 180), (w - t / 2, h)]), line([(w / 2, 180), (130, -180)])]
    elif char.isupper():
        h, w = 700, 580
        x0, x1, top, bot, mid = t / 2, w - t / 2, h - t / 2, t / 2, 350
        skeletons = {
            "A": [[(x0, 0), (w / 2, top), (x1, 0)], [(100, 250), (380, 250)]],
            "E": [[(w, top), (x0, top), (x0, bot), (w, bot)], [(x0, mid), (w - 35, mid)]],
            "F": [[(x0, 0), (x0, top), (w, top)], [(x0, mid), (w - 35, mid)]],
            "H": [[(x0, 0), (x0, h)], [(x1, 0), (x1, h)], [(x0, mid), (x1, mid)]],
            "I": [[(0, top), (w, top)], [(w / 2, top), (w / 2, bot)], [(0, bot), (w, bot)]],
            "J": [[(0, top), (x1, top), (x1, bot), (x0, bot), (x0, 180)]],
            "K": [[(x0, 0), (x0, h)], [(x1, top), (x0, mid), (x1, bot)]],
            "L": [[(x0, h), (x0, bot), (w, bot)]],
            "M": [[(x0, 0), (x0, top), (w / 2, 310), (x1, top), (x1, 0)]],
            "N": [[(x0, 0), (x0, top), (x1, bot), (x1, h)]],
            "T": [[(0, top), (w, top)], [(w / 2, top), (w / 2, 0)]],
            "V": [[(x0, h), (w / 2, bot), (x1, h)]],
            "W": [[(x0, h), (125, bot), (240, 400), (355, bot), (x1, h)]],
            "X": [[(x0, bot), (x1, top)], [(x0, top), (x1, bot)]],
            "Y": [[(x0, h), (w / 2, mid), (x1, h)], [(w / 2, mid), (w / 2, 0)]],
            "Z": [[(0, top), (x1, top), (x0, bot), (w, bot)]],
        }
        if char in skeletons:
            parts = [line(p) for p in skeletons[char]]
        elif char in "OCGQ":
            parts = [ring(w, h)]
            if char in "CG":
                parts[0] = parts[0].difference(box(w - t - 10, 200, w + 10, h - t))
            if char == "G":
                parts.extend([rect(w - t, 0, w, 350), rect(w / 2, 350 - t, w, 350)])
            if char == "Q":
                parts.append(line([(280, 160), (500, -40)]))
        elif char in "BDPR":
            parts = [rect(0, 0, t, h)]
            if char == "D":
                parts.append(ring(w, h))
            elif char == "B":
                parts.extend([ring(w, 700, 310), ring(w, 390)])
            else:
                parts.append(ring(w, h, 280))
                if char == "R":
                    parts.append(line([(230, 310), (x1, 0)]))
        elif char == "S":
            shape = rounded(0, 0, w, h, r)
            parts = [shape.difference(rect(t, 420, w + 10, h - t, 12)).difference(rect(-10, t, w - t, 280, 12))]
        elif char == "U":
            parts = [rounded(0, 0, w, h, r).difference(box(t, t, w - t, h + 10))]
    elif char.isdigit():
        w, h = 440, 700
        x0, x1, top, bot, mid = t / 2, w - t / 2, h - t / 2, t / 2, 350
        if char == "0":
            parts = [ring(w, h)]
        elif char == "1":
            w = 300
            parts = [line([(30, 560), (175, top), (175, bot)]), rect(35, 0, w, t)]
        elif char == "2":
            parts = [line([(x0, 530), (x0, top), (x1, top), (x1, 430), (x0, 160), (x0, bot), (w, bot)])]
        elif char == "3":
            parts = [line([(0, top), (x1, top), (x1, bot), (0, bot)]), line([(125, mid), (x1, mid)])]
        elif char == "4":
            parts = [line([(x1, 0), (x1, h)]), line([(x0, h), (x0, 270), (w, 270)])]
        elif char == "5":
            parts = [line([(w, top), (x0, top), (x0, mid), (x1, mid), (x1, bot), (0, bot)])]
        elif char == "6":
            parts = [ring(w, 420), line([(x0, 300), (x0, top), (w - 20, top)])]
        elif char == "7":
            parts = [line([(0, top), (x1, top), (140, 0)])]
        elif char == "8":
            parts = [ring(w, h, 310), ring(w, 390)]
        elif char == "9":
            parts = [ring(w, h, 280), line([(x1, 360), (x1, bot), (20, bot)])]
    else:
        w = 260
        thin = max(65, t * .72)
        if char in ".,:;!":
            parts = [dot(55, 0)]
            if char in ",;":
                parts.append(line([(55 + t * .7, 20), (40, -115)], thin))
            if char in ":;":
                parts.append(dot(55, 320))
            if char == "!":
                parts.append(rect(55, 230, 55 + t, 700))
        elif char == "?":
            w = 390
            parts = [line([(t / 2, 530), (t / 2, 650), (w - t / 2, 650), (w - t / 2, 420), (w / 2, 300), (w / 2, 220)]), dot(w / 2 - t / 2, 0)]
        elif char in "'\"‘’“”":
            parts = [rect(45, 500, 45 + thin, 700)]
            if char in '\"“”':
                parts.append(rect(165, 500, 165 + thin, 700))
                w = 310
        elif char in "-−–—_=+±":
            w = 400 if char != "—" else 650
            parts = [rect(0, 270, w, 270 + thin)]
            if char in "=±":
                parts.append(rect(0, 110, w, 110 + thin))
            if char in "+±":
                parts.append(rect(w / 2 - thin / 2, 170, w / 2 + thin / 2, 550))
            if char == "_":
                parts = [rect(0, -60, w, -60 + thin)]
        elif char in "/\\|":
            w = 320
            parts = [line([(40, -80), (w - 40, 720)], thin)] if char == "/" else [line([(40, 720), (w - 40, -80)], thin)]
            if char == "|":
                w, parts = 180, [rect(55, -100, 55 + thin, 740)]
        elif char in "()[]{}":
            pts = [(210, 740), (80, 600), (80, 100), (210, -60)]
            if char in "[]":
                pts = [(210, 740), (80, 740), (80, -60), (210, -60)]
            if char in "{}":
                pts = [(210, 740), (130, 740), (130, 420), (50, 340), (130, 260), (130, -60), (210, -60)]
            if char in ")]}":
                pts = [(260 - x, y) for x, y in pts]
            parts = [line(pts, thin)]
        elif char in "<>^":
            w = 400
            pts = [(340, 560), (60, 320), (340, 80)]
            if char == ">":
                pts = [(400 - x, y) for x, y in pts]
            if char == "^":
                pts = [(30, 400), (200, 650), (370, 400)]
            parts = [line(pts, thin)]
        elif char in "*×":
            w = 440
            parts = [line([(70, 100), (370, 550)], thin), line([(70, 550), (370, 100)], thin)]
            if char == "*":
                parts.append(line([(0, 320), (440, 320)], thin))
        elif char in "#%":
            w = 500
            if char == "#":
                parts = [line([(120, 0), (200, 700)], thin), line([(300, 0), (380, 700)], thin), rect(0, 190, w, 190 + thin), rect(0, 430, w, 430 + thin)]
            else:
                parts = [line([(50, 0), (450, 700)], thin), ring(200, 700, 470), ring(200, 230)]
                from shapely.affinity import translate
                parts[2] = translate(parts[2], 300, 0)
        elif char in "$£€¥":
            w = 480
            if char == "$":
                base, _ = glyph_shape("S", weight)
                parts = [base, rect(220 - thin / 2, -80, 220 + thin / 2, 780)]
            elif char == "£":
                parts = [line([(420, 650), (130, 650), (130, 40), (450, 40)], thin), rect(20, 310, 350, 310 + thin)]
            elif char == "€":
                base, _ = glyph_shape("C", weight)
                parts = [base, rect(-20, 240, 320, 240 + thin), rect(-20, 400, 320, 400 + thin)]
            else:
                base, _ = glyph_shape("Y", weight)
                parts = [base, rect(40, 200, 440, 200 + thin), rect(40, 350, 440, 350 + thin)]
        elif char == "&":
            w = 520
            parts = [line([(450, 0), (100, 550), (100, 660), (330, 660), (330, 470), (70, 220), (70, 50), (310, 50), (470, 340)], thin)]
        elif char == "@":
            w = 700
            parts = [rounded(0, 0, 700, 700, 100).difference(rounded(thin, thin, 700 - thin, 700 - thin, 40)).difference(box(400, -10, 710, 180)), rounded(200, 220, 490, 520, 50).difference(rounded(200 + thin, 220 + thin, 490 - thin, 520 - thin, 12)), rect(490 - thin, 220, 600, 220 + thin)]
        elif char in "~`":
            w = 400
            parts = [line([(20, 310), (120, 400), (260, 270), (380, 360)], thin)] if char == "~" else [line([(60, 700), (190, 550)], thin)]
        elif char in "•°÷":
            if char == "•":
                parts = [dot(55, 260, t * 1.2)]
            elif char == "°":
                w = 230
                parts = [ring(230, 700, 440)]
            else:
                w = 440
                parts = [rect(0, 300, w, 300 + thin), dot(175, 100, thin), dot(175, 530, thin)]
        elif char == "…":
            w = 570
            parts = [dot(x, 0) for x in (0, 220, 440)]
        elif char in "→←↑↓":
            w = 650
            pts = [[(20, 340), (610, 340)], [(400, 560), (620, 340), (400, 120)]]
            if char == "←":
                pts = [[(650 - x, y) for x, y in p] for p in pts]
            if char in "↑↓":
                pts = [[(y, x if char == "↑" else 650 - x) for x, y in p] for p in pts]
            parts = [line(p, thin) for p in pts]
        elif char in "©®":
            w = 750
            from shapely.affinity import scale, translate
            base, _ = glyph_shape("C" if char == "©" else "R", 400)
            parts = [rounded(0, 0, 750, 750, 370).difference(rounded(55, 55, 695, 695, 315)), translate(scale(base, .58, .58, origin=(0, 0)), 230, 170)]
        else:
            raise ValueError(f"Missing outline: {char!r}")
    if not parts:
        raise ValueError(f"Empty outline: {char!r}")
    return unary_union(parts).buffer(0), w


def to_glyph(shape):
    pen = TTGlyphPen(None)
    if shape.is_empty:
        return pen.glyph()
    polygons = [shape] if shape.geom_type == "Polygon" else list(shape.geoms)
    for polygon in polygons:
        polygon = orient(polygon, sign=-1)
        for contour in [polygon.exterior, *polygon.interiors]:
            points = list(contour.coords)[:-1]
            pen.moveTo(tuple(round(v) for v in points[0]))
            for point in points[1:]:
                pen.lineTo(tuple(round(v) for v in point))
            pen.closePath()
    return pen.glyph()


def name(char):
    return "space" if char == " " else f"uni{ord(char):04X}"


def build(weight, style):
    fb = FontBuilder(1000, isTTF=True)
    cmap = {ord(char): name(char) for char in CHARS}
    order = [".notdef", *[name(char) for char in CHARS]]
    fb.setupGlyphOrder(order)
    fb.setupCharacterMap(cmap)
    glyphs = {".notdef": to_glyph(box(0, 0, 420, 700).difference(box(70, 70, 350, 630)))}
    metrics = {".notdef": (520, 50)}
    for char in CHARS:
        shape, width = glyph_shape(char, weight)
        # Tight bearings match the approved label's almost-touching wordmark.
        from shapely.affinity import translate
        if not shape.is_empty:
            min_x, _, max_x, _ = shape.bounds
            shape = translate(shape, 12 - min_x, 0)
            width = max(width, max_x - min_x)
        glyphs[name(char)] = to_glyph(shape)
        metrics[name(char)] = (round(width + 24), 12 if not shape.is_empty else 0)
    fb.setupGlyf(glyphs)
    fb.setupHorizontalMetrics(metrics)
    fb.setupHorizontalHeader(ascent=850, descent=-250)
    fb.setupNameTable({
        "familyName": FAMILY, "styleName": style,
        "uniqueFontIdentifier": f"SteezUI:SteezDisplay-{style}:1.100",
        "fullName": f"{FAMILY} {style}", "psName": f"SteezDisplay-{style}",
        "version": "Version 1.100", "typographicFamily": FAMILY,
        "typographicSubfamily": style,
        "copyright": "Original outlines © 2026 Steez UI contributors.",
        "licenseDescription": "Licensed under the SIL Open Font License, Version 1.1.",
        "licenseInfoURL": "https://openfontlicense.org/",
    })
    fb.setupOS2(version=4, sTypoAscender=850, sTypoDescender=-250, sTypoLineGap=0,
                usWinAscent=850, usWinDescent=250, sxHeight=510, sCapHeight=700,
                usWeightClass=weight, fsSelection=(0x40 if weight == 400 else 0x20) | 0x80)
    fb.setupPost()
    fb.setupMaxp()
    fb.font["head"].macStyle = 1 if weight == 700 else 0
    # Fix timestamps for reproducible binaries (2026-01-01, OpenType epoch).
    fb.font["head"].created = fb.font["head"].modified = 3850070400
    fb.font.recalcTimestamp = False
    pairs = {"AV": -45, "AW": -30, "AY": -40, "AT": -30, "VA": -45,
             "WA": -30, "YA": -40, "To": -35, "Ta": -35, "Te": -35,
             "Yo": -35, "Wa": -20, "st": -24, "te": -3, "ee": -3,
             "ez": -5, "zu": -1, "ui": -1}
    kern = "\n".join(f"pos {name(p[0])} {name(p[1])} {v};" for p, v in pairs.items())
    addOpenTypeFeaturesFromString(fb.font, f"languagesystem DFLT dflt; languagesystem latn dflt; feature kern {{ {kern} }} kern;")
    fb.font.save(OUT / f"SteezDisplay-{style}.ttf")
    fb.font.flavor = "woff2"
    fb.font.save(OUT / f"SteezDisplay-{style}.woff2")
    return pairs


def logo(pairs):
    font = TTFont(OUT / "SteezDisplay-Bold.ttf")
    glyphs = font.getGlyphSet()
    x, paths, previous = 0, [], None
    for char in "steezui.":
        x += pairs.get((previous or "") + char, 0)
        pen = SVGPathPen(glyphs)
        glyphs[name(char)].draw(pen)
        paths.append(f'<path transform="translate({x} 0)" d="{pen.getCommands()}"/>')
        x += font["hmtx"][name(char)][0]
        previous = char
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {x} 740" role="img" aria-label="Steez UI"><g fill="currentColor" transform="translate(0 720) scale(1 -1)">{"".join(paths)}</g></svg>\n'
    (OUT.parent / "steezui-logo.svg").write_text(svg)


def specimen():
    from PIL import Image, ImageDraw, ImageFont
    image = Image.new("RGB", (1800, 1540), "#171717")
    draw = ImageDraw.Draw(image)
    y = 40
    for style in ("Bold", "Regular"):
        path = str(OUT / f"SteezDisplay-{style}.ttf")
        draw.text((60, y), f"Steez Display / {style}", font=ImageFont.truetype(path, 28), fill="#aaa")
        y += 50
        samples = [("steezui.", 180), (string.ascii_uppercase, 64),
                   (string.ascii_lowercase, 74), ("0123456789  !? & @ # $ %", 64),
                   ("Stay in the pocket. Make it move.", 70)]
        for text, size in samples:
            draw.text((60, y), text, font=ImageFont.truetype(path, size), fill="#fff5df")
            y += size + 20
        y += 30
    image.save(OUT.parent / "steez-display-specimen.png")


def validate():
    for style in ("Regular", "Bold"):
        for extension in ("ttf", "woff2"):
            font = TTFont(OUT / f"SteezDisplay-{style}.{extension}")
            assert set(font.getBestCmap()) == {ord(char) for char in CHARS}
            assert font["name"].getDebugName(1) == FAMILY
            assert font["name"].getDebugName(2) == style
            assert font["OS/2"].usWeightClass == (400 if style == "Regular" else 700)
            for char in CHARS:
                glyph = font["glyf"][name(char)]
                if char not in " \u00a0":
                    assert glyph.numberOfContours > 0, char
                    assert glyph.yMin >= -250 and glyph.yMax <= 850, (char, glyph.yMin, glyph.yMax)
                    assert glyph.xMin >= 0 and glyph.xMax <= font["hmtx"][name(char)][0], char
            assert "GPOS" in font
            font.close()
    print(f"Validated both formats and weights: {len(CHARS)} characters each.")


def bundle():
    files = [*sorted(OUT.glob("*")), OUT.parent / "steezui-logo.svg", OUT.parent / "specimen.html"]
    with ZipFile(OUT.parent / "steez-display-family.zip", "w", ZIP_DEFLATED) as archive:
        for path in files:
            info = ZipInfo(str(path.relative_to(OUT.parent)), date_time=(2026, 1, 1, 0, 0, 0))
            info.compress_type = ZIP_DEFLATED
            archive.writestr(info, path.read_bytes())


if __name__ == "__main__":
    reference_outlines()
    build(400, "Regular")
    pairs = build(700, "Bold")
    logo(pairs)
    manifest = {"family": FAMILY, "version": "1.100", "weights": [400, 700],
                "characters": CHARS, "unitsPerEm": 1000,
                "design": "Cleaned outlines from the approved record-label logo for s, t, e, z, u, i; matching original extended alphabet."}
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
    validate()
    specimen()
    bundle()
    for path in sorted(OUT.glob("*.*tf")):
        print(path.relative_to(ROOT))
