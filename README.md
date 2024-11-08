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

## References

1. **[D3 Graph Gallery - Background Maps](https://d3-graph-gallery.com/backgroundmap.html)**  
   A comprehensive guide to creating various background maps with D3, including tutorials on different projections, geoJSON data usage, and interactive features.

2. **[D3.js Official Documentation](https://d3js.org/)**  
   The official documentation for D3.js, detailing the API and providing examples for data-driven document manipulation and visualization.

3. **[GitHub - D3 Map Tutorial by Woojin Kim](https://github.com/woojink/d3-map-tutorial)**  
   A GitHub tutorial by Woojin Kim with code examples on building interactive maps using D3, covering basic setup, projection, and data integration.

4. **[Soshace - Mapping the World with D3](https://soshace.com/2020/01/21/mapping-the-world-creating-beautiful-maps-and-populating-them-with-data-using-d3-js/)**  
   A detailed tutorial from Soshace on creating maps using D3.js, focusing on projection setups and basic data plotting.

5. **[Soshace - Advanced Mapmaking with D3](https://soshace.com/2020/03/11/advanced-mapmaking-using-d3-d3-scale-and-d3-zoom-with-changing-data-to-create-sophisticated-maps/)**  
   A continuation of the Soshace mapmaking tutorial, focusing on advanced features like D3 scaling, zoom, and dynamic data integration.

6. **[Observable - D3 Zoom Collection](https://observablehq.com/collection/@d3/d3-zoom)**  
   A collection of D3 examples on ObservableHQ that demonstrate various zoom techniques and interactions, suitable for maps and other visualizations.

7. **[CodePen - Interactive D3 Map Example](https://codepen.io/bwiacek/pen/pXZEvK)**  
   A CodePen example by Barbara Wiacek demonstrating an interactive map built with D3, showcasing a basic approach to map interactions and data integration.

