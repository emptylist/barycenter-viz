var lineSize = 400;
var svg = d3.select("svg");
var drag = d3.behavior.drag();

svg.select("#line1")
  .attr("x1", 0)
  .attr("y1", 0)
  .attr("x2", lineSize)
  .attr("y2", 0);

svg.select("#line2")
  .attr("x1", 0)
  .attr("y1", 0)
  .attr("x2", lineSize / 2)
  .attr("y2", Math.sqrt(3) * lineSize / 2);

svg.select("#line3")
  .attr("x1", lineSize)
  .attr("y1", 0)
  .attr("x2", lineSize / 2)
  .attr("y2", Math.sqrt(3)*lineSize / 2);

var deg = 0;

function update() {
  deg += 0.5;
  deg = deg % 360;
  svg.select("g.axes")
    .attr("transform", "rotate(" + deg + "," + lineSize/2 + "," + (1/3) * (Math.sqrt(3)*lineSize/2) + ")" +
         "translate(100,100)");
};

setInterval(update, 20);
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
  d3.select(this).classed("dragging", true);
});

drag.on("drag", function (d) {
  d3.select(this).attr("cx", d.x += d3.event.dx).attr("cy", d.y += d3.event.dy);
});

drag.on("dragend", function (d) {
  d3.select(this).classed("dragging", false);
});