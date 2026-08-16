<div align="center">
  
# 🌌 Aura Notes Pro
**The zenith of productivity, creativity, and aesthetics.**

[![PWA Ready](https://img.shields.io/badge/PWA-Installable-purple.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)]()
[![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=flat&logo=javascript&logoColor=black)]()

[Features](#sparkles-features) • [Mobile App & Web Launch](#iphone-mobile-app--web-launch) • [Shortcuts](#keyboard-shortcuts) • [Themes](#art-themes)

</div>

---

## 📖 Overview

**Aura Notes Pro** is an ultra-aesthetic, lightning-fast Progressive Web App (PWA) workspace crafted for thinkers, creators, engineers, and power users. Featuring modern glassmorphism, dynamic fluid aurora mesh lighting, tactile sound feedback, speech dictation, audio memo recording, an encrypted PIN vault, Pomodoro timer with procedural ambient soundscapes, and creative canvas sketchpads, Aura Notes delivers native desktop and mobile app ergonomics directly in the browser with 100% offline support.

---

## ✨ Features

### 🐰 Cute Interactive Mascot ("Aura Bot")
- **Eye-Tracking Pupil Animation**: Aura Bot's pupils follow your mouse and touch movements across the screen.
- **Natural Blinks & Blushing**: Cute personality with spontaneous blinks and blushing cheeks.
- **Speech Bubble Greetings**: Click Aura Bot anytime to get friendly tips, motivations, and greeting quotes.

### ⏱️ 🎧 Focus Suite: Pomodoro & Ambient Soundscapes (100% Offline)
- **25-Min Pomodoro Focus Timer**: Deep Focus (25m), Short Break (5m), and Long Break (15m) with progress rings and completion chimes.
- **Procedural Ambient Sounds**: Synthesized directly via browser Web Audio API:
  - 🌧️ *Gentle Rain* (Deep calming rainfall)
  - 🎵 *Lo-Fi Vinyl Chords* (Warm vintage chord pads)
  - 🌲 *Pine Forest Birds* (Breeze rustle and nature)
  - ☕ *Cozy Coffee Shop* (Subtle coffee house murmur)

### 🎙️ Voice Audio Memo Recorder (Embedded Player)
- Record voice notes directly from your microphone with live timer.
- Embeds a sleek custom audio player card into your note with Play/Pause button and animated frequency waveforms.

### 🎨 Ultra-Modern Aesthetics & UI/UX
- **Ambient Aurora Glow**: Dynamic multi-color ambient mesh background reacting smoothly.
- **6 Curated Theme Presets**: Cosmic Aura, Cyber Neon, Emerald Matrix, Sunset Horizon, OLED Obsidian, and Pristine Light.
- **Tactile Audio Feedback**: Subtle futuristic click sounds and keystroke feedback via Web Audio API (with instant mute toggle).
- **Fluid Micro-Animations**: Spring physics, glass sheen reflections, and smooth dialog pop-ins.

### 📱 Mobile App (PWA) & Web Launch Ready
- **Full PWA Support**: Installable on Android (Web APK / Play Store TWA ready) and iOS (Safari "Add to Home Screen").
- **Offline First**: Service Worker caches all assets, fonts, and scripts for zero-latency offline note taking.
- **Mobile Bottom Navigation**: Ergonomic bottom bar with dedicated FAB for rapid one-thumb note creation.
- **Safe Area Inset Aware**: Tailored for notched phones (iPhone, Pixel, Samsung Galaxy).

### ⚡ Power Productivity & Creative Suite
- **🔍 Quick Command Palette (`Ctrl+K` / `Cmd+K`)**: Instant Spotlight-style search, note switcher, and action runner.
- **🎙️ Voice Speech-to-Text Dictation**: Speak your mind naturally with continuous live speech transcription.
- **🎨 Canvas Sketchpad**: Handwrite notes, sketch architectural diagrams, formulas, or signatures and embed directly into notes.
- **🔒 Encrypted PIN Vault**: Lock sensitive notes with a 4-digit security PIN.
- **☑️ Interactive Checklists**: Live toggleable task items with strikethrough animations.
- **🏷️ Tagging & Category Filters**: Multi-tag grouping (`#work`, `#ideas`, `#personal`, `#todo`, `#archived`) with instant filter chips.
- **📋 Smart Templates Gallery**: Meeting Notes, Daily Planner, Product Brainstorming, Code Architecture specs.
- **🤖 AI Writing Assistant (Local Engine)**: One-click Executive Summary, Action Item Extractor, Grammar Polish, and Tone Shifter.
- **📤 Multi-Format Export**: Export to **PDF, PNG Image, Markdown, HTML, Plain Text**, or download a complete **JSON Backup**.

---

## 📱 Mobile App & Web Launch

### 1. Launch on the Web (GitHub Pages / Vercel / Netlify / Firebase)
Aura Notes requires **zero build steps**! You can host it on any static web host:

```bash
# Push to GitHub and enable GitHub Pages on main branch, OR deploy via Vercel:
npx vercel
```

### 2. Install on Android & iOS as a Mobile App
- **Android**: Open the URL in Google Chrome -> Click the **"Install Aura Notes App"** banner or tap `Menu (⋮)` -> `Install App`.
- **iOS (iPhone/iPad)**: Open the URL in Safari -> Tap the `Share` icon (box with arrow) -> Tap **"Add to Home Screen"**.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl + K` / `Cmd + K` | Open Quick Command Palette |
| `Ctrl + N` | Create New Note |
| `Ctrl + \` | Toggle Focus Mode |
| `/` | Open Slash Command Block Menu |
| `Ctrl + B` | **Bold** text |
| `Ctrl + I` | *Italic* text |
| `Ctrl + U` | <u>Underline</u> text |
| `[] + Space` | Insert Interactive Checklist |
| `# + Space` | Format Heading 1 |
| `## + Space` | Format Heading 2 |
| `> + Space` | Format Blockquote |

---

## 🏗️ Technical Stack

- **HTML5**: Accessible semantic markup with PWA manifest integration.
- **CSS3 / Vanilla CSS**: Custom property design tokens, glassmorphic filters, and responsive mobile flex/grid layouts.
- **Vanilla JavaScript (ES6+)**: Event-driven architecture, MediaRecorder API, Speech Recognition API, Web Audio API, Canvas 2D API, and Service Worker API.
- **Client Libraries**:
  - `html2pdf.js` & `html2canvas.js` for document and image rendering.

---

<div align="center">
  <p>Built with 💜 to elevate the way you write.</p>
</div>
