let colorScaleMode = false;
let populationCircleExtent = {};
let populationChoroExtent = {};
let colorScale = {};
function loadData(svg, projection, town = 50) {
    d3.json(`http://34.147.162.172/Circles/Towns/${town}`).then(function(circleData) {
        const tooltip = d3.select("#tooltip");

        const countyPopulation = d3.rollup(
            circleData,
            v => d3.sum(v, d => d.Population),
            d => d.County
        ); 

        svg.selectAll("circle").remove();
        svg.selectAll("path").attr("fill", "#edf8e9");

        if (!colorScaleMode) {
            populationCircleExtent = d3.extent(circleData, d => d.Population);
            colorScale = d3.scaleSequential(d3.interpolateCool).domain(populationCircleExtent);
            createLegend(svg, colorScale, populationCircleExtent);
            const circles = svg.selectAll("circle")
            .data(circleData)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return currentTransform.applyX(projection([d.lng, d.lat])[0]);
            })
            .attr("cy", function(d) {
                return currentTransform.applyY(projection([d.lng, d.lat])[1]);
            })
            .attr("r", function(d) {
                return Math.sqrt(d.Population * 0.0005);
            })
            .attr("fill", function(d) {
                return colorScale(d.Population);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "black")
            .attr("stroke-width", 0.5);
            
            circles.data(circleData)
            .transition()
            .duration(500)  
            .attr("cx", function(d) {
                
                return currentTransform.applyX(projection([d.lng, d.lat])[0]) + 6;
            })
            .attr("cy", function(d) {
                return currentTransform.applyY(projection([d.lng, d.lat])[1]) - 6;
            })
            .transition()
            .duration(500)  
            .attr("cx", function(d) {
                
                return currentTransform.applyX(projection([d.lng, d.lat])[0]) - 6;
            })
            .attr("cy", function(d) {
                
                return currentTransform.applyY(projection([d.lng, d.lat])[1]) + 6;
            })
            .transition()
            .duration(500) 
            .ease(d3.easeElastic) 
            .attr("cx", function(d) { return currentTransform.applyX(projection([d.lng, d.lat])[0]); })
            .attr("cy", function(d) { return currentTransform.applyY(projection([d.lng, d.lat])[1]); })
            .attr("r", function(d) { 
                return Math.sqrt(d.Population * 0.0005); 
            });

            circles.on('mouseover', function(event, d) {
            d3.select(this)
                .attr('fill', '#120078')
                .attr('r', function(d) { return Math.sqrt(d.Population * 0.001); });

            tooltip.style('display', 'block')
                .style('top', (event.pageY - 55) + "px")
                .style('left', (event.pageX + 15) + "px");

            tooltip.select('.county span').text(d.County);
            tooltip.select('.town span').text(d.Town);
            tooltip.select('.population span').text(d.Population);
        })
        .on('mouseout', function(event) {
            d3.select(this)
                .attr('fill', function(d) {
                    return colorScale(d.Population);
                })
                .attr('r', function(d) { return Math.sqrt(d.Population * 0.0005); });
            tooltip.style('display', 'none');
        });

        } else {
            populationChoroExtent = d3.extent(Array.from(countyPopulation.values()));
            colorScale = d3.scaleSequential(d3.interpolateCool).domain(populationChoroExtent);
            createLegend(svg, colorScale, populationChoroExtent);
            svg.selectAll("path")
                .transition()
                .duration(500)
                .attr("fill", d => {
                    const countyPop = getCountyPopulation(d, countyPopulation);
                    return colorScale(countyPop);
                })
                .transition()
                .duration(500) 
                .ease(d3.easeElastic);

            svg.selectAll("path")
                .on("mouseover", function(event, d) {

                    const countyName = d.properties.NAME_2 || d.properties.NAME_3;
                    const population = getCountyPopulation(d, countyPopulation);
                    tooltip.style("display", "block")
                        .style("top", (event.pageY - 55) + "px")
                        .style("left", (event.pageX + 15) + "px");
                    tooltip.select(".county span").text(countyName);
                    tooltip.select(".town span").text("");
                    tooltip.select(".population span").text(population);
                })
                .on("mouseout", function() {
                    tooltip.style("display", "none");
                });
        }

    }).catch(function(error) {
        console.error("Error loading circle data:", error);
    });
}

function getCountyPopulation(d, countyPopulation) {
    const name2 = d.properties.NAME_2;
    const name3 = d.properties.NAME_3;

    let population = (name2 && name2 !== "NA") ? countyPopulation.get(name2) : 0;

    if (!population && name3 && name3 !== "NA") {
        population = Array.from(countyPopulation.entries()).find(([key]) =>
            key.toLowerCase().includes(name3.toLowerCase())
        )?.[1] || 0;
    }
    return population;
}

function createLegend(svg, colorScale, populationExtent) {
    const legendWidth = 300;
    const legendHeight = 15;
    const margin = 20;

    svg.selectAll(".legend-group").remove();

    const defs = svg.append("defs");
    const linearGradient = defs.append("linearGradient").attr("id", "legend-gradient");

    linearGradient.selectAll("stop")
        .data(colorScale.ticks().map((t, i, nodes) => ({
            offset: `${100 * i / (nodes.length - 1)}%`,
            color: colorScale(t)
        })))
        .enter().append("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);

    const legend = svg.append("g")
        .attr("transform", `translate(${svgWidth - legendWidth - margin},${svgHeight - 700})`)
        .attr("class", "legend-group");

    legend.append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#legend-gradient)");

    legend.append("text")
        .attr("class", "legend-label")
        .attr("x", 0)
        .attr("y", legendHeight + margin)
        .style("text-anchor", "start")
        .text(`Min: ${Math.round(populationExtent[0])}`);

    legend.append("text")
        .attr("class", "legend-label")
        .attr("x", legendWidth)
        .attr("y", legendHeight + margin)
        .style("text-anchor", "end")
        .text(`Max: ${Math.round(populationExtent[1])}`);
}

function updateMapLabel() {
    const mapLabel = document.getElementById("choroplethLabel");
    if (colorScaleMode) {
        mapLabel.textContent = "Circle Town Map:";
    } else {
        mapLabel.textContent = "Choropleth County Map:";
    }
}