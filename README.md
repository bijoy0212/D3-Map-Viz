# UK Population Map Visualization

This project provides a dynamic and interactive population visualization of the United Kingdom, displaying population data by town and county in various styles using D3.js and GeoJSON data.

## Features

- **Town Size Adjustment**: Users can adjust the visualization to display population circles with different sizes.
- **Zoom Controls**: Users can zoom in and out to inspect population data at different levels.
- **Map Style Toggle**: Users can switch between two map visualization modes:
  - **Town Circle Map**: Displays circles sized by town populations.
  - **County Choropleth Map**: Uses color intensity to represent population density by county.
- **Interactive Tooltip**: Shows details of each county or town, including population information.
- **Smooth Animations**: Circle animations enhance the visual appeal and readability of the map data.

## Files Overview

- **`index.html`**: HTML file for the UK Population Map webpage layout and structure. Includes:
  - Map components (buttons, sliders, SVG container).
  - Scripts for loading data, plotting the map, and interactive elements.

- **`map.css`**: Stylesheet to manage the appearance of the webpage, including buttons, tooltips, map container, and general layout.

- **JavaScript Files**:
  - **`plotmap.js`**: Main map-plotting logic. Handles map rendering, zooming, and reloading data based on user input.
  - **`loaddata.js`**: Loads population data and updates the map with either circles or choropleth colors based on population. Also manages tooltips and animations.
  - **`onload.js`**: Initializes the map on page load.

## Getting Started

### Prerequisites

- A local server (or host the files on a web server).
- A local or remote copy of `uk-map.geojson` for the UK map structure.
- D3.js library (already included in the HTML from the CDN).

### Setup Instructions

1. Clone this repository.
   ```bash
   git clone https://github.com/bijoy0212/D3-Map-Viz.git

