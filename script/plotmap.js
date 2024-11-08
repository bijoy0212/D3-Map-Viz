
// Initialise SVG settings, map projection, and zoom variables
var svg;
var projection;
var currentTransform = d3.zoomIdentity;
var town = 50;
const svgWidth = 950;
const svgHeight = 800;
const mapWidth = 950;
const mapHeight = 800;
const margin = 50;

// Function to load and display the map with data
function plotMap() {
    projection = d3.geoMercator()
        .center([-2.7, 55.4])
        .translate([mapWidth / 2, mapHeight / 2])
        .scale(1900);

    var pathGenerator = d3.geoPath().projection(projection);

    svg = d3.select("#map")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    d3.json("uk-map.geojson").then(function(ukData) {
        svg.selectAll("path")
            .data(ukData.features)
            .enter()
            .append("path")
            .attr("d", pathGenerator)
            .attr("fill", "#edf8e9")
            .attr("stroke", "black")
            .attr("stroke-width", 0.5);

        loadData(svg, projection, town);

        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .translateExtent([[0, 0], [mapWidth, mapHeight]])
            .on("zoom", (event) => {
                currentTransform = event.transform;
                svg.selectAll("path").attr("transform", event.transform);
                updateCirclePositions(svg, projection, currentTransform);
            });
        
        // Disabled the zoom using the mouse scrolls and doubleclick to map to look stable
        svg.call(zoom).on("dblclick.zoom", null).on("wheel.zoom", null);
        
        // Different event handlers for different buttons on the page

        d3.select("#zoomInButton").on("click", function() {
            svg.transition().call(zoom.scaleBy, 1.2);
        });

        d3.select("#zoomOutButton").on("click", function() {
            svg.transition().call(zoom.scaleBy, 0.8);
        });

        d3.select("#updateDataButton").on("click", function() {
            town = document.getElementById('townInput').value;
            loadData(svg, projection, town);
        });

        d3.select("#choroplethButton").on("click", function() {
            colorScaleMode = !colorScaleMode;
            svg.selectAll("path").on("mouseover", null).on("mouseout", null);
            svg.selectAll("circle").on("mouseover", null).on("mouseout", null);
            loadData(svg, projection, town);
            updateMapLabel()
        });

        function updateCirclePositions(svg, projection, transform) {
            svg.selectAll("circle")
                .attr("cx", d => transform.applyX(projection([d.lng, d.lat])[0]))
                .attr("cy", d => transform.applyY(projection([d.lng, d.lat])[1]));
        }

    }).catch(function(error) {
        console.error("Error loading GeoJSON data:", error);
    });
}