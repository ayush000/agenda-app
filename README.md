# 📅 TRMNL Daily Agenda App

[![TRMNL](https://github.com/ayush000/agenda-app/actions/workflows/trmnl.yml/badge.svg)](https://github.com/ayush000/agenda-app/actions/workflows/trmnl.yml)

A custom, private plugin for the [TRMNL X](https://usetrmnl.com) e-ink display designed to showcase your daily schedule beautifully in multiple layouts.

It renders event lists, times, locations, and status indicators using Liquid templates, with optional Python data pre-processing.

---

## ✨ Features

- **Multi-Layout Support**: Offline-compatible layouts aligned to a clean, premium design system:
  - **Full Screen (`full.liquid`)**: High-contrast timeline showing up to 6 events with right-aligned time badges, dynamically prioritized to fill Today's slots first.
  - **Half Horizontal (`half_horizontal.liquid`)**: Two-column layout presenting Today and Tomorrow side-by-side. Dynamically splits into a two-column continuation (Today + Today Continued, up to 6 events) when one of the days has no events.
  - **Half Vertical (`half_vertical.liquid`)**: Stacked vertical list displaying up to 6 events with prioritized allocation for Today's schedule.
  - **Quadrant (`quadrant.liquid`)**: Ultra-compact 2-event daily view.
- **Premium Aesthetics**: Built on TRMNL's native framework classes for layout, typography, and time badges — lint-clean with no custom CSS for properties the framework already handles.
- **Today-First Prioritization**: Automatically allocates empty Tomorrow slots to Today's events across vertical layouts, maximizing visibility.
- **Zero Configuration Fallbacks**: Graceful empty states displaying a minimal "Clear Schedule" layout when there are no events.

---

## 🛠️ Tech Stack

- **Templating**: [Liquid](https://shopify.github.io/liquid/)
- **Data Pre-processing**: Python (via optional serverless `src/transform.py`)
- **Settings & Config**: YAML (`src/settings.yml`, `.trmnlp.yml`)
- **Preview & Deployment Tooling**: TRMNL CLI (`trmnlp`)

---

## 📁 Project Structure

```text
├── .gitignore
├── .trmnlp.yml             # Local configuration for the trmnlp CLI tool
├── README.md               # You are here!
├── AGENTS.md               # Developer conventions & context for AI assistants
├── bin/
│   └── trmnlp              # Local wrapper script for trmnlp CLI (Docker-compatible)
└── src/
    ├── settings.yml        # Plugin metadata & default payload settings
    ├── full.liquid         # Template for full-screen layout
    ├── half_horizontal.liquid
    ├── half_vertical.liquid
    ├── quadrant.liquid
    ├── shared.liquid       # Shared components/partials
    └── transform.py.example # Boilerplate for data transformations
```

---

## ⚙️ Data Schema

The plugin expects a JSON payload matching the following structure. You can push this data via Webhook (configured as the default strategy in `settings.yml`).

```json
{
  "date": "Monday, June 7",
  "events": [
    {
      "title": "Morning Standup",
      "time": "09:00 AM - 09:30 AM",
      "location": "Zoom"
    },
    {
      "title": "Design Review",
      "time": "11:00 AM - 12:00 PM",
      "location": "Conference Room A"
    },
    {
      "title": "Lunch with Team",
      "time": "12:30 PM - 01:30 PM",
      "location": "The Bistro"
    },
    {
      "title": "Focus Time",
      "time": "02:00 PM - 04:00 PM"
    }
  ]
}
```

---

## 🚀 Local Development

### 1. Prerequisites
You need either **Docker** (recommended) or the **`trmnl_preview`** Ruby gem to run the local preview server.

### 2. Previewing Changes
To spin up the local preview environment, run:
```bash
./bin/trmnlp serve
```
Then, open [http://127.0.0.1:4567](http://127.0.0.1:4567) in your browser to view your templates rendered with the static data.

### 3. Building Templates
To pre-render/compile the templates to standard HTML files:
```bash
./bin/trmnlp build
```
The compiled HTML outputs will be written to the `_build/` directory.

---

## ☁️ Deployment & Syncing

The configuration of your plugin is managed via `src/settings.yml`, which is the source of truth for custom fields and polling setup on the TRMNL platform.

### Pull settings from the TRMNL server
```bash
./bin/trmnlp pull
```

### Push local updates to the TRMNL server
```bash
./bin/trmnlp push
```

---

## 🐍 Serverless Transforms (Optional)

If your external data API does not match the schema expected by the Liquid templates, you can clean, filter, and format it before it reaches the templates:

1. Rename `src/transform.py.example` to `src/transform.py`:
   ```bash
   mv src/transform.py.example src/transform.py
   ```
2. Implement your transformation logic inside the `run(input)` function:
   ```python
   def run(input):
       # Reshape input here...
       return {
           "date": input.get("custom_date_field"),
           "events": [
               {
                   "title": e.get("summary"),
                   "time": f"{e.get('start')} - {e.get('end')}",
                   "location": e.get("loc")
               } for e in input.get("items", [])
           ]
       }
   ```
3. To disable transforms entirely, set `transform_runtime: disabled` in your `.trmnlp.yml`.
