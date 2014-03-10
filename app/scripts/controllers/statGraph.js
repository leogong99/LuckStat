/*global $:false, paintChart, d3 */

'use strict';
var paintChart = function(data) {
	var margin = {
		top: 10,
		right: 10,
		bottom: 100,
		left: 40
	},
		margin2 = {
			top: 430,
			right: 10,
			bottom: 20,
			left: 40
		};

	var width = $(document).width();
	width = width > 700 ? 700 : width;
	width = width - margin.left - margin.right;
	var height = $(document).height();
	height = height > 500 ? 500 : height;
	var height2 = height - margin2.top - margin2.bottom;
	height = height - margin.top - margin.bottom;

	var x = d3.time.scale().range([0, width]),
		x2 = d3.time.scale().range([0, width]),
		y = d3.scale.linear().range([height, 0]),
		y2 = d3.scale.linear().range([height2, 0]);

	var xAxis = d3.svg.axis().scale(x).orient('bottom'),
		xAxis2 = d3.svg.axis().scale(x2).orient('bottom'),
		yAxis = d3.svg.axis().scale(y).orient('left');

	var brush = d3.svg.brush()
		.x(x2)
		.on('brush', brushed);

	var area = d3.svg.area()
		.interpolate('monotone')
		.x(function(d) {
			return x(d.date);
		})
		.y0(height)
		.y1(function(d) {
			return y(d.isWinningNumber);
		});

	var area2 = d3.svg.area()
		.interpolate('monotone')
		.x(function(d) {
			return x2(d.date);
		})
		.y0(height2)
		.y1(function(d) {
			return y2(d.isWinningNumber);
		});
	d3.select('svg').remove();
	var svg = d3.select('#chartContent').append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom);

	svg.append('defs').append('clipPath')
		.attr('id', 'clip')
		.append('rect')
		.attr('width', width)
		.attr('height', height);

	var focus = svg.append('g')
		.attr('class', 'focus')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	var context = svg.append('g')
		.attr('class', 'context')
		.attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')');

	x.domain(d3.extent(data.map(function(d) {
		return d.date;
	})));
	y.domain([0, d3.max(data.map(function(d) {
		return d.isWinningNumber;
	}))]);
	x2.domain(x.domain());
	y2.domain(y.domain());

	focus.append('path')
		.datum(data)
		.attr('class', 'area')
		.attr('d', area);

	focus.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + height + ')')
		.call(xAxis);

	focus.append('g')
		.attr('class', 'y axis')
		.call(yAxis);

	context.append('path')
		.datum(data)
		.attr('class', 'area')
		.attr('d', area2);

	context.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + height2 + ')')
		.call(xAxis2);

	context.append('g')
		.attr('class', 'x brush')
		.call(brush)
		.selectAll('rect')
		.attr('y', -6)
		.attr('height', height2 + 7);


	function brushed() {
		x.domain(brush.empty() ? x2.domain() : brush.extent());
		focus.select('.area').attr('d', area);
		focus.select('.x.axis').call(xAxis);
	}
};