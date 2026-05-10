# Eldoria — GitHub Pages Setup

## Folder Structure

Everything goes in **ONE folder** (flat — no subfolders).
Upload every file listed below into the root of your GitHub repository.

---

## ✅ Code Files (already ready — extracted & paths fixed)

| File | Description |
|------|-------------|
| `index.html` | Main homepage |
| `story.html` | The Lore page |
| `guide.html` | How to Join page |
| `updates.html` | Dev Scrolls / Updates page |
| `press.html` | Press / Video page |
| `eldoria_campfire_massges.html` | Campfire messages page |
| `_nav.html` | Shared nav snippet |
| `style.css` | All styles |
| `script.js` | All JavaScript |

---

## 🖼️ Images — Place these manually (rename exactly as shown)

Take the image from its original location in your project and rename/place it in the root folder with these exact names:

| New flat filename | Original path in your project |
|-------------------|-------------------------------|
| `eldoria-icon.jpg` | `eldoria-icon.jpg` (no change) |
| `eldoria-icon2.png` | `eldoria-icon2.png` (no change) |
| `tmap.jpg` | `tmap.jpg` (no change) |
| `img-tag-flame2.gif` | `Images/Tag Images/flame2.gif` |
| `img-tag-flame.gif` | `Images/Tag Images/flame.gif` |
| `img-tag-start.png` | `Images/Tag Images/start.png` |
| `img-tag-again.png` | `Images/Tag Images/Again.png` |
| `img-tag-discord.png` | `Images/Tag Images/Discord.png` |
| `img-tag-youtube.png` | `Images/Tag Images/Youtube.png` |
| `img-tag-instagram.png` | `Images/Tag Images/Instagram.png` |
| `img-tag-facebook.png` | `Images/Tag Images/Facebook.png` |
| `img-tag-whatsapp.png` | `Images/Tag Images/Whatsapp.png` |
| `img-welcome.png` | `Images/Welcome/Welcome.png` |
| `cursor-cursore.png` | `Cursor/cursore.png` |
| `cursor-press-realm.png` | `Cursor/cursore_press_realm.png` |
| `cursor-press-up-btn.png` | `Cursor/cursore_press_up_btn.png` |
| `cursor-default.png` | `Cursor/.png` |

---

## 🎵 Audio Files — Place these manually (no rename needed)

| Filename | Original path |
|----------|---------------|
| `eldoria.mp3` | `eldoria.mp3` (no change) |
| `Audio_Voice_1.mp3` | `Audio_Voice_1.mp3` (no change) |
| `TheWolfAndTheMoon.mp3` | `TheWolfAndTheMoon.mp3` (no change) |
| `buttonhover.mp3` | `buttonhover.mp3` (no change) |
| `pagehover.mp3` | `pagehover.mp3` (no change) |
| `pagehover2.mp3` | `pagehover2.mp3` (no change) |
| `empty_key.mp3` | `empty_key.mp3` (no change) |
| `got_key.mp3` | `got_key.mp3` (no change) |

---

## 🎬 Video Files — Place these manually (no rename needed)

| Filename | Notes |
|----------|-------|
| `eldoria-video.mp4` | Used on index.html and press.html. This was `eldoria-video.mp4` and also `Eldoria-Web.mp4` — use ONE file, name it `eldoria-video.mp4` |

> **Note:** The large video `Eldoria-Web.mp4` (~180MB) is too big for GitHub. Use the smaller `eldoria-video.mp4` (~9MB) instead — it's already the correct name. GitHub has a 100MB file limit; if your video is over that, host it on YouTube and embed it instead.

---

## 🎞️ GIF Files — Place these manually (no rename needed)

| Filename | Original path |
|----------|---------------|
| `loop.gif` | `loop.gif` (no change) |
| `knight1.gif` | `knight1.gif` (no change) |
| `click.gif` | `click.gif` (no change) |

---

## 📁 Final GitHub Repo Structure

Your repo root should look exactly like this (all flat, no subfolders):

```
your-repo/
├── index.html
├── story.html
├── guide.html
├── updates.html
├── press.html
├── eldoria_campfire_massges.html
├── _nav.html
├── style.css
├── script.js
├── eldoria-icon.jpg
├── eldoria-icon2.png
├── tmap.jpg
├── img-tag-flame2.gif
├── img-tag-flame.gif
├── img-tag-start.png
├── img-tag-again.png
├── img-tag-discord.png
├── img-tag-youtube.png
├── img-tag-instagram.png
├── img-tag-facebook.png
├── img-tag-whatsapp.png
├── img-welcome.png
├── cursor-cursore.png
├── cursor-press-realm.png
├── cursor-press-up-btn.png
├── cursor-default.png
├── eldoria.mp3
├── Audio_Voice_1.mp3
├── TheWolfAndTheMoon.mp3
├── buttonhover.mp3
├── pagehover.mp3
├── pagehover2.mp3
├── empty_key.mp3
├── got_key.mp3
├── eldoria-video.mp4
├── loop.gif
├── knight1.gif
└── click.gif
```

---

## 🚀 GitHub Pages Setup

1. Push all files to a GitHub repo (e.g. `eldoria-website`)
2. Go to **Settings → Pages**
3. Set Source to **Deploy from a branch → main → / (root)**
4. Your site will be live at: `https://yourusername.github.io/eldoria-website/`

---

## ⚠️ Notes

- `Hello.html` and `Hello2.html` are referenced in the nav dropdown — create those pages if you want them, or remove those links from the nav in `index.html`.
- `voice.mp3` is referenced in `eldoria_campfire_massges.html` — add that file if you have it.
- All internal links between pages work as-is (flat folder, same directory).
