#!/usr/bin/env python3
"""Resolve and download public-domain old-master images from Wikimedia Commons.

Each 'slot' maps to a fixed filename used by the site; we try candidate Commons
titles in order and keep the first that resolves. All works below are in the
public domain (pre-1900 paintings / antique sculpture).
"""
import json
import os
import ssl
import urllib.parse
import urllib.request

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "img")
os.makedirs(OUT, exist_ok=True)

UA = "LioraLandingBuild/1.0 (https://lioralabs.io; info@lioralabs.io)"
API = "https://commons.wikimedia.org/w/api.php"
CTX = ssl.create_default_context()

SLOTS = {
    "hero-craft": [
        "Sandro Botticelli - Idealized Portrait of a Lady (Portrait of Simonetta Vespucci as Nymph) - Google Art Project.jpg",
        "Sandro Botticelli - La nascita di Venere - Google Art Project - edited.jpg",
    ],
    "hero-ai": [
        "1665 Girl with a Pearl Earring.jpg",
        "Johannes Vermeer - Girl with a Red Hat - Google Art Project.jpg",
    ],
    "venus": [
        "Sandro Botticelli - La nascita di Venere - Google Art Project - edited.jpg",
    ],
    "ginevra": [
        "Leonardo da Vinci - Ginevra de' Benci - Google Art Project.jpg",
    ],
    "bust": [
        "Venus de Milo Louvre Ma399 n4.jpg",
        "0 Aphrodite - Musei Capitolini (1).JPG",
    ],
    "velata": [
        "Raffael 055.jpg",
        "La Velata.jpg",
    ],
    "riviere": [
        "Jean Auguste Dominique Ingres - Mademoiselle Caroline Rivière - Google Art Project.jpg",
        "Ingres, Jean-Auguste-Dominique - Madame Rivière - Google Art Project.jpg",
    ],
    "redhat": [
        "Johannes Vermeer - Girl with a Red Hat - Google Art Project.jpg",
    ],
    "study": [
        "Johannes Vermeer - Study of a Young Woman - MET DT9410.jpg",
        "Johannes Vermeer - Portrait of a Young Woman - Google Art Project.jpg",
    ],
}


def resolve(title: str, width: int = 1600):
    params = {
        "action": "query",
        "titles": "File:" + title,
        "prop": "imageinfo",
        "iiprop": "url",
        "iiurlwidth": str(width),
        "format": "json",
    }
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, context=CTX, timeout=30) as r:
        data = json.load(r)
    pages = data.get("query", {}).get("pages", {})
    for _, page in pages.items():
        if "missing" in page:
            return None
        info = page.get("imageinfo")
        if info:
            return info[0].get("thumburl") or info[0].get("url")
    return None


def download(src: str, dest: str):
    req = urllib.request.Request(src, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, context=CTX, timeout=60) as r:
        data = r.read()
    with open(dest, "wb") as f:
        f.write(data)
    return len(data)


for slot, candidates in SLOTS.items():
    dest = os.path.join(OUT, slot + ".jpg")
    ok = False
    for title in candidates:
        try:
            src = resolve(title)
            if not src:
                print(f"  miss   {slot}: {title}")
                continue
            n = download(src, dest)
            print(f"  OK     {slot}: {n//1024}KB  <- {title}")
            ok = True
            break
        except Exception as e:  # noqa
            print(f"  error  {slot}: {title} -> {e}")
    if not ok:
        print(f"  FAILED {slot}: no candidate resolved")
