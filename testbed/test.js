var timeDelta = 0.01
var G = 1000
var width = 800;
var height = 800;

var stars = [
]

var randPosition = function() {
	stars = [
		{ "x": Math.random() * width / 4 + width / 2, "y": Math.random() * height / 4 + height / 2, "mass": 5, "radius": 10, 'vx':Math.random() - 0.5, 'vy':Math.random() - 0.5 },
		{ "x": Math.random() * width / 4 + width / 2, "y": Math.random() * height / 4 + height / 2, "mass": 5, "radius": 10, 'vx':Math.random() - 0.5, 'vy':Math.random() - 0.5 },
		{ "x": Math.random() * width / 4 + width / 2, "y": Math.random() * height / 4 + height / 2, "mass": 5, "radius": 10, 'vx':Math.random() - 0.5, 'vy':Math.random() - 0.5 },
		{ "x": Math.random() * width / 4 + width / 2, "y": Math.random() * height / 4 + height / 2, "mass": 0, "radius": 1, 'vx':Math.random() - 0.5, 'vy':Math.random() - 0.5 },
		{ "x": Math.random() * width / 4 + width / 2, "y": Math.random() * height / 4 + height / 2, "mass": 0, "radius": 1, 'vx':Math.random() - 0.5, 'vy':Math.random() - 0.5 },
		{ "x": Math.random() * width / 4 + width / 2, "y": Math.random() * height / 4 + height / 2, "mass": 0, "radius": 1, 'vx':Math.random() - 0.5, 'vy':Math.random() - 0.5 },
		{ "x": Math.random() * width / 4 + width / 2, "y": Math.random() * height / 4 + height / 2, "mass": 0, "radius": 1, 'vx':Math.random() - 0.5, 'vy':Math.random() - 0.5 },
		{ "x": Math.random() * width / 4 + width / 2, "y": Math.random() * height / 4 + height / 2, "mass": 0, "radius": 1, 'vx':Math.random() - 0.5, 'vy':Math.random() - 0.5 },
		{ "x": Math.random() * width / 4 + width / 2, "y": Math.random() * height / 4 + height / 2, "mass": 0, "radius": 1, 'vx':Math.random() - 0.5, 'vy':Math.random() - 0.5 },
	]
}
randPosition();

var svgContainer = d3.select("body")
					 .append("svg")
					 .attr("width", width)
                     .attr("height", height);
	 
var circles = svgContainer.selectAll("circle")
                          .data(stars)
                          .enter()
                          .append("circle");

var circleAttributes = circles
                       .attr("cx", function (d) { return d.x; })
                       .attr("cy", function (d) { return d.y; })
                       .attr("r", function (d) { return d.radius; })   

d3.select("body").append("button")
                .text("randPosition")
                .on("click",randPosition);

var update = function() {
	// Physic
	for (var i = 0; i < stars.length; i++) {
		for (var j = 0; j < stars.length; j++)
			if (i != j) {
				dist = Math.sqrt(Math.pow(stars[i].x - stars[j].x, 2) + Math.pow(stars[i].y - stars[j].y, 2));
				delta = {
					'x': (stars[j].x - stars[i].x) / dist,
					'y': (stars[j].y - stars[i].y) / dist
				}
				a = {
					'x': G * stars[j].mass / Math.max(dist, 2) * delta.x,
					'y': G * stars[j].mass / Math.max(dist, 2) * delta.y
				}
				stars[i].vx += a.x * timeDelta;
				stars[i].vy += a.y * timeDelta;
			}
		vl = Math.sqrt(Math.pow(stars[i].vx, 2) + Math.pow(stars[i].vy, 2));
		/*
		if (vl > 100) {
			stars[i].vx *= (100 / vl);
			stars[i].vy *= (100 / vl);
		}*/
	}
	for (var i = 0; i < stars.length; i++) {
		stars[i].x += stars[i].vx * timeDelta;
		stars[i].y += stars[i].vy * timeDelta;
	}

	// Graphic
	var circles = svgContainer.selectAll("circle")
	                          .data(stars);
	//console.log(circles)

                    //update all circles to new positions
                    circles.transition()
                        .duration(timeDelta)
                        .attr("cx", function(d){
                            return d.x;
                        })
                        .attr("cy", function(d) {
                        	return d.y;
                        });


}

setInterval(update, 20);