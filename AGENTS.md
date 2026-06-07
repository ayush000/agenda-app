# TRMNL Daily Agenda App

This project is a private plugin for the TRMNL X device, designed to serve as a daily agenda. It follows the TRMNL plugin architecture, using Liquid templates for the UI and optional serverless transforms for data processing.

## Project Context
- **Goal**: Build a functional and visually appealing daily agenda for the TRMNL X e-ink display.
- **Hardware**: TRMNL X device.
- **Platform**: TRMNL Private Plugin.

## Tech Stack
- **Templating**: [Liquid](https://shopify.github.io/liquid/)
- **Data Transformation**: Python (via `src/transform.py`, if enabled)
- **Configuration**: YAML (`.trmnlp.yml`, `src/settings.yml`)
- **CLI Tooling**: `trmnlp` (used for local development, pulling/pushing configurations, and previewing).

## Project Structure
- `src/`: Contains all source files for the plugin.
    - `full.liquid`: Template for the full-screen layout.
    - `half_horizontal.liquid`: Template for the half-horizontal layout.
    - `half_vertical.liquid`: Template for the half-vertical layout.
    - `quadrant.liquid`: Template for the quadrant layout.
    - `shared.liquid`: Shared Liquid components or partials.
    - `settings.yml`: Plugin metadata and custom field definitions.
    - `transform.py`: (Optional) Python script for transforming polled data before it reaches the templates.
- `.trmnlp.yml`: Local configuration for the `trmnlp` CLI tool.
- `bin/trmnlp`: Local copy of the `trmnlp` CLI.

## Development Workflow
- **Local Preview**: Use `trmnlp` to preview changes locally.
- **Configuration Management**: `src/settings.yml` is the source of truth for plugin settings on the TRMNL platform. Use `trmnlp pull` and `trmnlp push` to sync with the TRMNL servers.
- **Styles**: TRMNL provides a set of utility CSS classes (e.g., `layout`, `title`, `title--large`). Refer to TRMNL documentation for available styles.

## Conventions
- **Naming**: Use descriptive names for variables in Liquid and Python.
- **Liquid**: Keep logic in Liquid templates minimal; prefer doing complex data manipulation in `transform.py`.
- **Styling**: Use TRMNL native framework classes (e.g. `layout`, `layout--col`, `value--large`, `label--inverted`, `divider--h`, `flex--row`, `flex--between`) instead of custom CSS. Keep `<style>` blocks minimal — the linter (`trmnlp lint`) flags more than 6 total uses of `justify-content`, `padding`, `margin`, `background-color`, `border-radius`, `text-align`, `object-fit`, or `font-size` across all templates. Non-banned properties (e.g. `text-transform`, `letter-spacing`, `color`) are fine in small `<style>` blocks when no framework class covers them.
