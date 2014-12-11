var lineSize = 400;
var svg = d3.select("svg");
var drag = d3.behavior.drag();
var transformVelocityCoeff = 0.2;

var v1 = {
  x: 0,
  y: 0
};

var v2 = {
  x: 400,
  y: 0,
};

var v3 = {
  x: 200,
  y: Math.sqrt(3) * 200,
};

var centroid = {
  x: function () { return (1/3) * (v1.x + v2.x + v3.x); },
  y: function () { return (1/3) * (v1.y + v2.y + v3.y) }
};

function translateSystem (dx, dy) {
  v1.x += dx;
  v1.y += dy;
  v2.x += dx;
  v2.y += dy;
  v3.x += dx;
  v3.y += dy;
};

translateSystem(100, 150);

svg.select("#line1")
  .attr("x1", v1.x)
  .attr("y1", v1.y)
  .attr("x2", v2.x)
  .attr("y2", v2.y);

svg.select("#line2")
  .attr("x1", v2.x)
  .attr("y1", v2.y)
  .attr("x2", v3.x)
  .attr("y2", v3.y);

svg.select("#line3")
  .attr("x1", v1.x)
  .attr("y1", v1.y)
  .attr("x2", v3.x)
  .attr("y2", v3.y);

svg.call(drag);

var deg = 0;

function update() {
  //deg += 0.5;
  //deg = deg % 360;
  svg.select("g.axes")
    .transition()
    .duration(5)
    .attr("transform", "rotate(" + deg + "," + centroid.x() + "," + centroid.y() + ")" );
};

//setInterval(update, 40);
/*
svg.selectAll("circle")
.data([{x:10, y:10}])
  .enter().append("circle")
    .style("color", "steelblue")
.attr("cy", function(d,i) {return d.y;})
    .attr("cx", function(d,i) { return d.x; })
    .attr("r", 10)
    .call(drag);

svg.selectAll("circle").remove();
*/

drag.on("dragstart", function (d) {
  d3.select(this).select("g.axes").classed("dragging", true);
});

drag.on("drag", function (d) {
  var dx = d3.event.dx;
  var dy = d3.event.dy;
  var dThetaMag = transformVelocityCoeff * Math.sqrt(dx*dx + dy*dy);
  var dThetaSign = 1;
  deg = deg + (dThetaMag * dThetaSign) % 360;
  update();
  console.log(dx + "," + dy);
//  d3.select(this).attr("cx", d.x += d3.event.dx).attr("cy", d.y += d3.event.dy);
});

drag.on("dragend", function (d) {
  d3.select(this).select("g.axes").classed("dragging", false);
});