// Exercise 1
$(document).ready(function(){
	var w = 500;
	var h = 120;

	//Matrix
	var dataset = [ [5, 23, 75], [10, 14, 34], [13, 67, 23], [19, 10, 65], [21, 42, 29], [25, 25, 25], [22, 90, 30], [18, 57, 17], [15, 25, 35], [13, 26, 39], [11, 17, 85], [12, 36, 24], [15, 60, 45], [20, 41, 11], [18, 77, 33], [17, 85, 55], [16, 23, 44], [18, 35, 23], [23, 55, 15], [25, 45, 100] ];

	//Create SVG element
	var svg = d3.select("#ex1")
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


	// Exercise 2

	var w2 = 500;
	var h2 = 250;
	var pCount = 0;
	var sortCount = 0;
	var sortOrder = 0;
	var sorted = false;

	var padding = 10;

	var dataset2 = [ [5, 23, 75], [10, 14, 34], [13, 67, 23], [19, 10, 65], [21, 42, 29], [25, 25, 25], [22, 90, 30], [18, 57, 17], [15, 25, 35], [13, 26, 39], [11, 17, 85], [12, 36, 24], [15, 60, 45], [20, 41, 11], [18, 77, 33], [17, 85, 55], [16, 23, 44], [18, 35, 23], [23, 55, 15], [25, 45, 100] ];

	var order=["1st","2nd","3rd"];

	var xScale = d3.scale.ordinal()
					.domain(d3.range(dataset2.length))
					.rangeRoundBands([padding, w2 - padding], 0.05);

	var yScale = d3.scale.linear()
					.domain([0, d3.max(dataset2, function(d) { return d[0]; })])
					.range([padding, h2 - padding]);

	var svg = d3.select("#ex2")
				.append("svg")
				.attr("width", w2)
				.attr("height", h2);

	//Create bars
	svg.selectAll("rect")
	   .data(dataset2)
	   .enter()
	   .append("rect")
	   .attr("x", function(d, i) {
	   		return xScale(i);
	   })
	   .attr("y", function(d) {
	   		return h2 - yScale(d[0]);
	   })

	   // second variable = scale width of bar
	   .attr("width", function(d) {
	   		return xScale.rangeBand() * (d[1] / 100);			   
	   })

	   // first variable = height of bar
	   .attr("height", function(d) {
	   		return yScale(d[0]);
	   })

	   //set color to (0, 0, 200)
	   .attr("fill", function(d) {
			return "rgb(0, 0, " + 200 + ")";
	   })

	   // third variable = scales with fill-opacity
	   .attr("fill-opacity", function(d) {
			return (d[2] * .75) / 100 + .25;
	   })

	   .on("click", function() {
	   		sortCount += 1;
	   		sortBars();
	});

	svg.selectAll("text")
	   .data(dataset2)
	   .enter()
	   .append("text")
	   .text(function(d) {
	   		return d[0];
	   })
	   .attr("text-anchor", "left")
	   .attr("x", function(d, i) {
			return xScale(i);
	   })
	   .attr("y", function(d) {
	   		return h2 - yScale(d[0])-2;
	   })
	   .attr("font-family", "sans-serif")
	   .attr("font-size", "11px")
	   .attr("fill", "red");

	//when p tag is clicked
	d3.select("#scale")
		.on("click", function() {
			pCount = pCount + 1;

			if (pCount == 1) {
				yScale.domain([0, d3.max(dataset2, function(d) { return d[0] * 3; })])
			}

			else if (pCount == 2) {
				yScale.domain([0, d3.max(dataset2, function(d) { return d[0] * 3/2; })])
			}

			else if (pCount == 3) {
				yScale.domain([0, d3.max(dataset2, function(d) { return d[0]; })])
				pCount = 0;
			}

			//Update all rects
			svg.selectAll("rect")
				.transition()
				.delay(function(d, i) {
					return i / dataset2.length * 1000;
				})
				.duration(500)
				.ease("linear")
				.attr("y", function(d) {
					return h2 - yScale(d[0]);
				})

				.attr("height", function(d) {
					return yScale(d[0]);
				})

			//check if sorted
			if (sorted) {
				svg.selectAll("text")
					.sort(function(a, b) {
						return d3.ascending(a[sortOrder], b[sortOrder]);
					})
					.transition()
					.delay(function(d, i) {
						return i / dataset2.length * 1000;
					})
					.duration(500)
					.ease("linear")
					.text(function(d) {
						return d[sortOrder];
					})
					.attr("x", function(d, i) {
						return xScale(i);
					})
					.attr("y", function(d) {
						return h2 - yScale(d[0])-2;
					});
			}


			else {
				//Update all labels
				svg.selectAll("text")
					.transition()
					.delay(function(d, i) {
						return i / dataset2.length * 1000;
					})
					.duration(500)
					.ease("linear")
					.text(function(d) {
						return d[sortOrder];
					})					
					.attr("x", function(d, i) {
						return xScale(i);
					})
					.attr("y", function(d) {
						return h2 - yScale(d[0])-2;
					});
				}
		});

	//when bar is clicked, sort bars
	var sortBars = function() {
		sorted = true;

		//check state of scale
		if (pCount == 1) {
			yScale.domain([0, d3.max(dataset2, function(d) { return d[0] * 3; })])				
		}

		else if (pCount == 2) {
			yScale.domain([0, d3.max(dataset2, function(d) { return d[0] * 3/2; })])
		}

		else if (pCount == 3) {
			yScale.domain([0, d3.max(dataset2, function(d) { return d[0]; })])
			pCount = 0;
		}

		if (sortCount == 1) {
			sortOrder = 0;
		}

		if (sortCount > 1) {
			sortOrder += 1;
			if (sortOrder == 3) {
				sortOrder = 0;
			}
		}

		//Update all rects
		svg.selectAll("rect")
			.sort(function(a, b) {
				return d3.ascending(a[sortOrder], b[sortOrder]);
			})
			.transition()
			.delay(function(d, i) {
				return i / dataset2.length * 1000;
			})
			.duration(500)
			.ease("linear")
			.attr("x", function(d, i) {
				return xScale(i);
			})
			.attr("y", function(d) {
				return h2 - yScale(d[0]);
			})

			.attr("height", function(d) {
				return yScale(d[0]);
			})

		//Update all labels
		svg.selectAll("text")
			.sort(function(a, b) {
				return d3.ascending(a[sortOrder], b[sortOrder]);
			})
			.transition()
			.delay(function(d, i) {
				return i / dataset2.length * 1000;
			})
			.duration(500)
			.ease("linear")
			.text(function(d) {
				return d[sortOrder];
			})
			.attr("x", function(d, i) {
				return xScale(i);
			})
			.attr("y", function(d) {
				return h2 - yScale(d[0])-2;
			});

		d3.select("#update").html("This is being sorted by the " + order[sortOrder] + " variable.")
	};

});