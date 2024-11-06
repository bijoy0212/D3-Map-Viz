function loadData(svg, projection, town = 50) {
    d3.json(`http://34.147.162.172/Circles/Towns/${town}`).then(function(circleData) {

        const tooltip = d3.select("#tooltip");

        svg.selectAll("circle").remove();

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
            .attr("fill", "red")
            .attr("opacity", 0.7);
            
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
                .attr('fill', 'red')
                .attr('r', function(d) { return Math.sqrt(d.Population * 0.0005); });
            tooltip.style('display', 'none');
        });

        updateCirclePositions(svg, projection, currentTransform);

    }).catch(function(error) {
        console.error("Error loading circle data:", error);
    });
}