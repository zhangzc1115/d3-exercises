$(document).ready(function(){
////
//// Exercise 1
////

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

////
//// Exercise 2
////

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

	var svg2 = d3.select("#ex2")
				.append("svg")
				.attr("width", w2)
				.attr("height", h2);

	//Create bars
	svg2.selectAll("rect")
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

	svg2.selectAll("text")
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
			svg2.selectAll("rect")
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
				svg2.selectAll("text")
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
				svg2.selectAll("text")
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
		svg2.selectAll("rect")
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
		svg2.selectAll("text")
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

		d3.select("#update").html("This is currently being sorted by the " + order[sortOrder] + " variable.")
	};

////
//// Exercise 3
////

	var w3 = 960;
	var h3 = 500;
	var count = 0;
	var swapOrder=["Total Student Membership","Total Staff","Student/Teacher Ratio"];


	//Define map projection
	var projection = d3.geo.albersUsa();

	//Define path generator
	var path = d3.geo.path()
				.projection(projection);

   	//Create the SVG graph.
   	var svg3 = d3.select("#map")
   				.append("svg")
   				.attr("width", w3)
   				.attr("height", h3);

	//Load data
	d3.csv("states.csv", function(data) {
	    
	//Load in GeoJSON data
	d3.json("us-states.json", function (json) {
			//Merge data and GeoJSON
			//Loop through for student variable
			for (var i = 0; i < data.length; i++) {

				//Grab state name
				var dataState = data[i].state;

				//Grab data value, and convert from string to float
				var students = parseFloat(data[i].students);
				var staff = parseFloat(data[i].staff);						
				var ratio = parseFloat(data[i].ratio);

				//Find the corresponding state inside the GeoJSON
				for (var j = 0; j < json.features.length; j++) {

					var jsonState = json.features[j].properties.name;

					if (dataState == jsonState) {

						//Copy the data value into the JSON
						json.features[j].properties.students = students;
						json.features[j].properties.staff = staff;
						json.features[j].properties.ratio = ratio;


						//Stop looking through the JSON
						break;

					}
				}	
			}

			//Bind data and create one path per GeoJSON feature
			svg3.selectAll("path")
			   .data(json.features)
			   .enter()
			   .append("path")
			   .attr("class", "states")
			   .attr("d", path)
			   .style("fill", "#393b79")
			   .attr("opacity", function(d) {
					//Get data value
			   		var value = d.properties.students;

			   		if (value) {
			   			//If value exists…
				   		return (value* .00000075) + .25;
			   		} else {
			   			//If value is undefined…
				   		return "0";
			   		}
			  	})
			    .attr("title", function(d) { 
            		return d.properties.name;
            	});

            	$("path").tipsy({
            		className: "left",                    		
            		gravity:'s'
            	});

				svg3.selectAll("circle")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) {
					return projection([d.lon, d.lat])[0];
				})
				.attr("cy", function(d) {
					return projection([d.lon, d.lat])[1];
				})
				.attr("r", function(d) {
					return Math.sqrt(d.staff * .002);
				})
				.style("fill", "yellow")
				.style("opacity", function(d) {
					return d.ratio*.05;
				});

		}); // JSON load end

	//when swap button is clicked
	d3.select('button') 
		.on("click", function() {
				count += 1;
				swapVal();
		});

	//check for circle clicks
	var swapVal = function() {

		if (count == 1) {
			svg3.selectAll("path")
				.transition()
				.delay(function(d, i) {
					return i / data.length * 1000;
				})
				.duration(750)
				.ease("linear")
				.style("fill", "#393b79")
				.attr("opacity", function(d) {	
					var staff = d.properties.staff;				
				   	return staff * .000005 + .25;
				});

			svg3.selectAll("circle")
				.transition()
				.delay(function(d, i) {
					return i / data.length * 1000;
				})
				.duration(750)
				.ease("linear")
				.attr("r", function(d) {
					//3rd variable
					return d.ratio;
				})						
				.style("opacity", function(d) {
					//1st variable
					return (d.students*.00000075) + .25;
				});

				// update key
				$(".block").fadeOut("400", function() {
					d3.select("#color").selectAll("p").html(swapOrder[1]);
					d3.select("#size").selectAll("p").html(swapOrder[2]);
					d3.select("#opacity").selectAll("p").html(swapOrder[0]);
				    $(this).fadeIn(400);
				});
		}

		else if (count == 2) {
			svg3.selectAll("path")
				.transition()
				.delay(function(d, i) {
					return i / data.length * 1000;
				})
				.duration(750)
				.ease("linear")
				.attr("opacity", function(d) {
					var ratio = d.properties.ratio;				

					return ratio *.04 + .25;
				});

			svg3.selectAll("circle")
				.transition()
				.delay(function(d, i) {
					return i / data.length * 1000;
				})
				.duration(750)
				.ease("linear")
				.attr("r", function(d) {
					//1st variable
					return (d.students*.0000075) + .25;
				})
				.style("opacity", function(d) {
					//2nd variable
					return d.staff * .000005 + .25;
				});

				$(".block").fadeOut("400", function() {
					// update key
					d3.select("#color").selectAll("p").html(swapOrder[2]);
					d3.select("#size").selectAll("p").html(swapOrder[0]);
					d3.select("#opacity").selectAll("p").html(swapOrder[1]);
				    $(this).fadeIn(400);
				});
		}

		// return back to first state
		else if (count == 3) {
			svg3.selectAll("path")
				.transition()
				.delay(function(d, i) {
					return i / data.length * 1000;
				})
				.duration(750)
				.ease("linear")
				.attr("opacity", function(d) {
					//1st variable
			   		var students = d.properties.students;

			   		if (students) {
			   			//If value exists…
				   		return (students* .00000075) + .25;
			   		} else {
			   			//If value is undefined…
				   		return "0";
			   		}
				});

			svg3.selectAll("circle")
				.transition()
				.delay(function(d, i) {
					return i / data.length * 1000;
				})
				.duration(750)
				.ease("linear")
				.attr("r", function(d) {
					//2nd variable
					return Math.sqrt(d.staff * .002);
				})
				.style("opacity", function(d) {
					//3rd variable
					return d.ratio*.05;
				});

				$(".block").fadeOut("400", function() {
					//update key
					d3.select("#color").selectAll("p").html(swapOrder[0]);
					d3.select("#size").selectAll("p").html(swapOrder[1]);
					d3.select("#opacity").selectAll("p").html(swapOrder[2]);
				    $(this).fadeIn(400);
				});

			//reset count
			count = 0;
		}
	}; // swapVal ends
});	// states csv ends

});