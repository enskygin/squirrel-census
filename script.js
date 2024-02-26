


//Bar Chart

// Define the dimensions of your SVG container
const width = 800;
const height = 400;

// Define margins
const margin = { top: 70, right: 50, bottom: 50, left: 50 };


const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Load the CSV data
d3.csv("bargraph.csv").then(function(data) {
 
    data.forEach(function(d) {
        d.Number = +d.Number;
    });

    // Define scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d["Fur Color"]))
        .range([0, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Number)])
        .range([innerHeight, 0]);

    
    const svg = d3.select("#bar-chart")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d["Fur Color"]))
        .attr("y", d => yScale(d.Number))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.Number))
        .attr("fill", (d, i) => {
            
            if (i === 0) return "#000000"; 
            else if (i === 1) return "#892A15"; 
            else if (i === 2) return "#959595"; 
            else if (i === 3) return "#7D6055"; 
            else return "steelblue"; 
        });

        
svg.selectAll(".bar-label")
.data(data)
.enter()
.append("text")
.attr("class", "bar-label")
.attr("x", d => xScale(d["Fur Color"]) + xScale.bandwidth() / 2)
.attr("y", d => yScale(d.Number) - 5) 
.attr("dy", "-0.7em")
.style("text-anchor", "middle")
.text(d => d.Number);

   
    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 40)
        .style("text-anchor", "middle")
        .text("Fur Color");

   

  
svg.selectAll(".y-axis-tick-value")
.data(yScale.ticks())
.enter()
.append("text")
.attr("class", "y-axis-tick-value")
.attr("x", -margin.left * .00001) 
.attr("y", d => yScale(d))
.attr("dy", "0.35em")
.style("text-anchor", "end")
.text(d => d);



   // Append title
svg.append("text")
.attr("class", "title")
.attr("x", innerWidth / 2)
.attr("y", -40)
.style("text-anchor", "middle")
.style("font-weight", "bold") 
.text("Number of Squirrels Counted by Fur Color");

    
});





// Scatterplot

const scatterWidth = 800;
const scatterHeight = 600;


const scatterMargin = { top: 50, right: 30, bottom: 120, left: 50 };


const scatterInnerWidth = scatterWidth - scatterMargin.left - scatterMargin.right;
const scatterInnerHeight = scatterHeight - scatterMargin.top - scatterMargin.bottom;


const scatterSvg = d3.select("body")
    .append("svg")
    .attr("width", scatterWidth)
    .attr("height", scatterHeight)
    .append("g")
    .attr("transform", "translate(" + scatterMargin.left + "," + scatterMargin.top + ")");


d3.csv("scatterplot.csv").then(function(data) {
   
    data.forEach(function(d) {
        d["Hectare.Squirrel.Number"] = +d["Hectare.Squirrel.Number"];
        d["Above.Ground.Sighter.Measurement"] = +d["Above.Ground.Sighter.Measurement"];
    });

    
    const xScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(data, d => d["Hectare.Squirrel.Number"])])
        .range([scatterMargin.left, scatterInnerWidth]);

        const yScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(data, d => d["Above.Ground.Sighter.Measurement"])])
        .range([scatterInnerHeight, 0]); 
       
const xAxisScatter = d3.axisBottom(xScaleScatter).tickSize(0);
scatterSvg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (scatterHeight - scatterMargin.bottom) + ")")
    .call(xAxisScatter);

const yAxisScatter = d3.axisLeft(yScaleScatter).ticks(5).tickSize(0);
scatterSvg.append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + scatterMargin.left + ",0)")
    .call(yAxisScatter);

    
    scatterSvg.selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", d => xScaleScatter(d["Hectare.Squirrel.Number"]))
    .attr("cy", d => yScaleScatter(d["Above.Ground.Sighter.Measurement"]))
    .attr("r", 5) 
    .attr("fill", d => {
       
        if (d["Primary.Fur.Color"] === "Black") return "#000000";
        else if (d["Primary.Fur.Color"] === "Cinnamon") return "#892A15";
        else if (d["Primary.Fur.Color"] === "Gray") return "#959595";
        else if (d["Primary.Fur.Color"] === "Unknown") return "#7D6055";
        else return "steelblue"; 
    })
    .attr("opacity", 0.5); 


    
    scatterSvg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", scatterInnerWidth / 2)
        .attr("y", scatterHeight - scatterMargin.bottom / 2)
        .style("text-anchor", "middle")
        .text("Squirrel Number Recorded in Sequence in Singular Squirrel Sighting Session");

  
    scatterSvg.append("text")
        .attr("class", "y-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -scatterInnerHeight / 2)
        .attr("y", -scatterMargin.left / 2)
        .style("text-anchor", "middle")
        .text("Height in Ft.");

   
    scatterSvg.append("text")
        .attr("class", "title")
        .attr("x", scatterInnerWidth / 2)
        .attr("y", -scatterMargin.top / 2)
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Squirrels Recorded Above Ground");

        
});



// Linegraph


const lineWidth = 800;
const lineHeight = 400; 


const lineMargin = { top: 30, right: 30, bottom: 500, left: 50 }; 


const lineInnerWidth = lineWidth - lineMargin.left - lineMargin.right;
const lineInnerHeight = lineHeight - lineMargin.top - lineMargin.bottom;


d3.csv("linegraph.csv").then(function(data) {
    
    const parseDate = d3.timeParse("%Y-%m-%d");
    data.forEach(function(d) {
        d.Date = parseDate(d.Date);
        d.Number = +d.Number;
    });

   
    const dataGrouped = d3.group(data, d => d["Primary.Fur.Color"]);

  
    const lineSvg = d3.select("body")
    .append("svg")
    .attr("width", lineWidth)  
    .attr("height", lineHeight + lineMargin.bottom)  
    .append("g");

   
    const xScaleLine = d3.scaleTime()
    .domain(d3.extent(data, d => d.Date))
    .range([scatterMargin.left, scatterWidth - scatterMargin.right]); 


    const yScaleLine = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Number)])
    .range([scatterHeight + scatterMargin.bottom - 100, scatterMargin.top + 150]);



  
    const xAxisLine = d3.axisBottom(xScaleLine);
    lineSvg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + (scatterHeight + scatterMargin.bottom) + ")")
        .call(xAxisLine);

   
    const yAxisLine = d3.axisLeft(yScaleLine)
        .ticks(5)
        .tickFormat(d=> d)
        .tickSize(0);
        
    lineSvg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + scatterMargin.left + "," + scatterMargin.top + ")")
        .call(yAxisLine);



   
    lineSvg.append("text")
    .attr("class", "y-axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -lineHeight )  
    .attr("y", lineMargin.left / 2)  
    .style("text-anchor", "middle")
    .text("Number of Squirrels Recorded");

    
dataGrouped.forEach((groupData, color) => {
    
    const line = d3.line()
        .x(d => xScaleLine(d.Date))
        .y(d => yScaleLine(d.Number));

    lineSvg.append("path")
        .datum(groupData)
        .attr("class", "line")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", getColor(color))
        .attr("stroke-width", 4);

   
lineSvg.append("text")
.attr("class", "title")
.attr("x", lineInnerWidth / 2)  
.attr("y", lineMargin.top + 100 )  
.style("text-anchor", "middle")
.style("font-weight", "bold")
.text("Squirrels Recorded per Day of Census Counts");
});


});


function getColor(color) {
    switch (color) {
        case "Black":
            return "#000000";
        case "Cinnamon":
            return "#892A15";
        case "Gray":
            return "#959595";
        case "Unknown":
            return "#7D6055";
        default:
            return "steelblue";
    }
}



d3.csv("bargraph.csv").then(function(data) {
const colorScale = d3.scaleOrdinal()
    .domain(data.map(d => d["Fur Color"]))
    .range(["#000000", "#892A15", "#959595", "#7D6055"]);

    const legendContainer = d3.select("#legend-container")
    .style("position", "absolute")
    .style("right", "100px") 
    .style("top", "100px"); 
    

const legend = legendContainer.selectAll(".legend")
    .data(colorScale.domain())
    .enter()
    .append("div")
    .attr("class", "legend");

legend.append("div")
    .attr("class", "legend-box")
    .style("background-color", d => colorScale(d));

legend.append("span")
    .text(d => d);

});