var svg;
var projection;
var currentTransform = d3.zoomIdentity;
var town = 50;
const svgWidth = 950;
const svgHeight = 800;
const mapWidth = 950;
const mapHeight = 800;
const margin = 50;

function plotMap() {
    console.log("Start:", currentTransform);

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
            .attr("fill", "#999999")
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 0.5);


        loadData(svg, projection, town);

        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .translateExtent([[0, 0], [mapWidth, mapHeight]])
            .on("zoom", (event) => {
                currentTransform = event.transform;
                console.log("Start:", currentTransform);
                svg.selectAll("path").attr("transform", event.transform);
                updateCirclePositions(svg, projection, currentTransform);
            });

        svg.call(zoom).on("dblclick.zoom", null).on("wheel.zoom", null);

        d3.select("#zoomInButton").on("click", function() {
            console.log("Zoom in button clicked");
            svg.transition().call(zoom.scaleBy, 1.2);
        });

        d3.select("#zoomOutButton").on("click", function() {
            console.log("Zoom out button clicked");
            svg.transition().call(zoom.scaleBy, 0.8);
        });

        d3.select("#updateDataButton").on("click", function() {
            town = document.getElementById('townInput').value;
            loadData(svg, projection, town);
        });

        function updateCirclePositions(svg, projection, transform) {
            svg.selectAll("circle")
                .attr("cx", function(d) {
                    return transform.applyX(projection([d.lng, d.lat])[0]);
                })
                .attr("cy", function(d) {
                    return transform.applyY(projection([d.lng, d.lat])[1]);
                });
        }

    }).catch(function(error) {
        console.error("Error loading GeoJSON data:", error);
    });
}