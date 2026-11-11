# Bryan G. Ablao — Personal Portfolio

A single-page personal portfolio website for **Bryan G. Ablao** (Davao City, Philippines), built and maintained under **Accxs Creations**. It presents his profile, work experience, projects, achievements, gallery, social links, free apps, and donation options, with a Day/Night theme, animated sky backgrounds, and a fully responsive layout.

**Current version:** v0.1.0 (November 2026)
**Live site:** https://bryangablao.github.io/Accxs-Creations/

---

## Features

### Design & Experience
- **Day / Night mode** with a toggle in the header. The choice is saved in the browser and follows the visitor's system preference on first visit.
- **Animated sky:**
  - *Day:* a glowing sun with rotating rays and sunbeams, drifting clouds and fog.
  - *Night:* a twinkling starfield with larger glowing stars and shooting stars.
- **Mouse ripple effect** on desktop.
- **Sticky header** that stays visible while scrolling, with a **sliding underline** that moves to the active menu item.
- **Responsive layout** for desktop, tablet, and mobile (no zooming needed), with a slide-out menu on small screens.
- **Theme-matched scrollbars** across the page, pop-ups, and panels.
- Reduced-motion support: animations are disabled for visitors who prefer less motion.

### Pages (hash-based navigation, no page reloads)
| Page | Description |
|------|-------------|
| **About Me** | Profile card with typing role text, animated code feeds, stats (years of experience, projects, commitment), contact info, core skills, and a scrolling tech "treadmill" |
| **Work Experience** | Career timeline and job cards that open detail pop-ups |
| **Projects** | Searchable, filterable project showcase |
| **Achievements** | Certificates and recognitions with a viewer |
| **Gallery** | Image gallery with captions and a full-size viewer |
| **Social Medias** | Social profiles with details and quick copy |
| **Donate** | GCash, Maya, AUB, and Cebuana options with zoomable QR codes and copy buttons |
| **Free Apps** | Free apps and downloads |
| **Terms & Privacy** | Terms of Use, Privacy Policy, Cookies & Local Storage, Copyright, Third-Party Services, Security, Contact, and FAQ |
| **Version History** | Release notes from the first text-only page to the current version |

### Interactive Elements
- Pop-up windows for family profiles, work history, the contact shortcut, and the **Website Creation Service** offer.
- Full-size photo viewer for profile photos, QR codes, achievements, and gallery items.
- Project search by title or technology, plus category filter tabs.
- Animated counters and skill bars.
- FAQ accordion with a rotating plus icon.
- Background music player (play/pause, next/previous, volume) that remembers its state.
- Live **Philippine Standard Time** clock in the footer.

---

## Tech Stack
- **HTML5, CSS3, and vanilla JavaScript** in a single `index.html` file (no framework, no build step).
- **Canvas** for the sky, stars, and ripple effects.
- **Fonts and icons loaded from CDNs:**
  - [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
  - [Font Awesome 6.5.2](https://fontawesome.com/) via cdnjs
  - [Devicon](https://devicon.dev/) logos via jsDelivr (tech treadmill)

---

## Project Structure

```
/
├── index.html            # The entire website (HTML, CSS, JS)
├── README.md             # This file
├── images/
│   ├── blogo.png         # Site logo and favicon
│   ├── Bryan.jpg, Kenneth.jpg, RizEvan.jpg, father.png, mother.png ...   # Profile photos
│   ├── chowking.png, gaisano.png, kcarc.jpg, roi.png, sixeleven.jpg ...  # Work history logos
│   ├── GCASH QR.jpg, MAYA QR.jpg, AUB QR.jpg, Cebuana.png                # Donation QR codes
│   └── Gallery/
│       ├── Achievement/  # Certificates and achievement images
│       └── project/      # Project screenshots and logos
└── mp4/                  # Background music files (mp3, mp4, m4a, aac, ogg, wav, webm)
```

> The image paths above are the ones referenced in `index.html`. If you rename or move a file, update the matching path in the code.

---

## Running Locally
No installation is needed.

1. Download or clone the repository.
2. Open `index.html` in any modern browser.

For the most accurate behavior (such as the music list), serve it with a simple local server instead:

```bash
# Python
python -m http.server 8000
# then open http://localhost:8000
```

## Deployment (GitHub Pages)
1. Push the files to a GitHub repository.
2. Open **Settings → Pages**.
3. Choose the main branch and the root folder, then save.
4. The site is published at `https://<username>.github.io/<repository>/`.

---

## Customization

| What to change | Where |
|----------------|-------|
| Name, bio, contact details | The About section near the top of `<body>` |
| Colors and theme | CSS variables at the top of `<style>` (`--bg`, `--pu`, `--bl`, `--pl` for dark; `html[data-theme=light]` for day) |
| Tech treadmill logos | The `.mq` block in the About page (Devicon icon names) |
| Work experience, projects, achievements | Their matching `<section>` blocks and pop-up (`.mo`) windows |
| Social links | The `S` array in the script |
| Donation options | The Donate section and `images/` QR files |
| Terms & Privacy text | The `#p-terms` section |
| Music folder or file types | `FOLDER` and `EXT` constants in the music script |
| Release notes | The `#p-version` section (add a new entry at the top) |

---

## Browser Storage & Privacy
The site sets **no cookies** and uses **no analytics or tracking**. It keeps two small items in the browser's local storage, only on the visitor's device:

| Key | Purpose |
|-----|---------|
| `accxs-theme` | Saves the Day/Night choice |
| `accxs-music-state` | Saves the music on/off state, track, and volume |

Resources loaded from other providers (Google Fonts, cdnjs, jsDelivr, GitHub) receive standard request data such as IP address, as with any website. See the **Terms & Privacy** page for the full policy.

---

## Browser Support
Works in current versions of Chrome, Edge, Firefox, Safari, and mobile browsers. Some features (such as `mask-image`, `backdrop-filter`, and thin scrollbars) degrade gracefully in older browsers.

---

## Contact
- **Email:** ablaobryan4400@gmail.com
- **Phone:** +63 992 876 0990 (Dito)
- **Location:** Davao City, Philippines

## Website Creation Service
Need your own customized website? Sites are built to your needs and typically go live within 1–2 weeks. Get in touch using the details above to discuss scope and fees.

---

## License & Copyright
© Bryan G. Ablao. All rights reserved. The design, layout, code, logo, photos, and written content are the intellectual property of the creator. Brand names and logos shown belong to their respective owners. Do not copy, redistribute, or use the content for commercial purposes without written permission.
