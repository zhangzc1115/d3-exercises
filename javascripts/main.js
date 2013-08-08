// Exercise 1

var w = 500;
var h = 120;

//Matrix
var dataset = [ [5, 23, 75], [10, 14, 34], [13, 67, 23], [19, 10, 65], [21, 42, 29], [25, 25, 25], [22, 90, 30], [18, 57, 17], [15, 25, 35], [13, 26, 39], [11, 17, 85], [12, 36, 24], [15, 60, 45], [20, 41, 11], [18, 77, 33], [17, 85, 55], [16, 23, 44], [18, 35, 23], [23, 55, 15], [25, 45, 100] ];

//Create SVG element
var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
   		return i * (w / dataset.length);
   })
   .attr("y", function(d) {
   		return h - (d[0] * 4);
   })

   // second variable = scale width of bar
   .attr("width", function(d) {
   		return w / dataset.length * (d[1] / 100);			   
   })

   // first variable = height of bar
   .attr("height", function(d) {			   		
   		return d[0] * 4;
   })

   //set color to (0, 0, 200)
   .attr("fill", function(d) {
		return "rgb(0, 0, " + 200 + ")";
   })

   // third variable = scales with fill-opacity
   .attr("fill-opacity", function(d) {
		return (d[2] * .75) / 100 + .25;
   });

svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
   		return d[0];
   })
   .attr("text-anchor", "left")
   .attr("x", function(d, i) {
   		return i * (w / dataset.length);
   })
   .attr("y", function(d) {
   		return h - (d[0] * 4) -2;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "red");