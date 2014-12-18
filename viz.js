var svg = d3.select("svg");

var drag = d3.behavior.drag();

var transformVelocityCoeff = 0.01;
var zoomVelocity = 0.2;

var zoomLevel = 1000;
var x_theta = 0;
var z_theta = 0;

var camera = {
  x: 0,
  y: 0,
  z: 10
};

var Vertex = {
  create : function (base_x, base_y, base_z) {
    self = Object.create(this);
    self.base_x = base_x;
    self.base_y = base_y;
    self.base_z = base_z;

    return self;
  },

  // Transformed 3D coordinates
  x_transform : function () {
    return (this.base_x * Math.cos(z_theta)) -
      (this.base_y * Math.cos(x_theta) * Math.sin(z_theta)) +
      (this.base_z * Math.sin(x_theta) * Math.sin(z_theta));
  },

  y_transform : function () {
    return (this.base_x * Math.sin(z_theta)) +
      (this.base_y * Math.cos(x_theta) * Math.cos(z_theta)) -
      (this.base_z * Math.sin(x_theta) * Math.cos(z_theta));
  },

  z_transform : function () {
    return (this.base_y * Math.sin(x_theta)) + (this.base_z * Math.cos(x_theta));
  },

  // Camera Viewpoint
  cx : function () {
    return this.x_transform() - camera.x;
  },

  cy : function () {
    return this.y_transform() - camera.y;
  },

  cz : function () {
    return this.z_transform() - camera.z;
  },

  // 2D projected x and y
  x : function () {
    return ((zoomLevel / this.cz()) * this.cx());
  },

  y : function () {
    return ((zoomLevel / this.cz()) * this.cy());
  },
}

var v1 = Vertex.create(1, 0, -1 / Math.sqrt(2));
var v2 = Vertex.create(-1, 0, -1 / Math.sqrt(2));
var v3 = Vertex.create(0, 1, 1 / Math.sqrt(2));
var v4 = Vertex.create(0, -1, 1 / Math.sqrt(2));


/*
var centroid = {
  x: function () { return (1/3) * (v1.x() + v2.x() + v3.x()); },
  y: function () { return (1/3) * (v1.y() + v2.y() + v3.y()) }
};
*/

function translateSystem (dx, dy) {
  v1.x += dx;
  v1.y += dy;
  v2.x += dx;
  v2.y += dy;
  v3.x += dx;
  v3.y += dy;
};

//translateSystem(100, 150);

function update () {
svg.select("#line1")
  .attr("x1", v1.x())
  .attr("y1", v1.y())
  .attr("x2", v2.x())
  .attr("y2", v2.y());

svg.select("#line2")
  .attr("x1", v2.x())
  .attr("y1", v2.y())
  .attr("x2", v3.x())
  .attr("y2", v3.y());

svg.select("#line3")
  .attr("x1", v1.x())
  .attr("y1", v1.y())
  .attr("x2", v3.x())
  .attr("y2", v3.y());

svg.select("#line4")
  .attr("x1", v1.x())
  .attr("y1", v1.y())
  .attr("x2", v4.x())
  .attr("y2", v4.y());

svg.select("#line5")
  .attr("x1", v2.x())
  .attr("y1", v2.y())
  .attr("x2", v4.x())
  .attr("y2", v4.y());

svg.select("#line6")
  .attr("x1", v3.x())
  .attr("y1", v3.y())
  .attr("x2", v4.x())
  .attr("y2", v4.y());
};

svg.call(drag);

drag.on("dragstart", function (d) {
  d3.select(this).select("g.axes").classed("dragging", true);
});

drag.on("dragend", function (d) {
  d3.select(this).select("g.axes").classed("dragging", false);
});

drag.on("drag", function (d) {
  var dx = d3.event.dx;
  var dy = d3.event.dy;
  x_theta = (x_theta + transformVelocityCoeff * dy) % (2 * Math.PI);
  z_theta = (z_theta + transformVelocityCoeff * dx) % (2 * Math.PI);
  update();
});

document.getElementById("figure").addEventListener('mousewheel', function (evt) {
  zoomLevel += zoomVelocity * evt.wheelDelta;
  update();
}, false);

update();
