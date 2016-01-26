function drawChart() {
	var chartType = viewModel.selectedChartType();
	var dimension = viewModel.selectedDimension().toLowerCase();// "p_name";
	var metric = viewModel.selectedMetric().toLowerCase();// "p_price"

	var widthAuto = viewModel.widthAuto();
	var width = 500;
	if (widthAuto == 'no') {
		width = viewModel.width();
	}

	var heightAuto = viewModel.heightAuto();
	var height = 500;
	if (heightAuto == 'no') {
		height = viewModel.height();
	}

	d3.select("div#chart svg").remove();
	if (chartType == 'Pie') {
		drawPie(dimension, metric, width, height);
	} else if (chartType == 'Bar') {
		drawBar(dimension, metric, width, height);
	}
}

function drawPie(dimension, metric, width, height) {
	// var color = d3.scale.ordinal().range([ "red", "orange", "blue" ]);
	var color = d3.scale.linear().domain([ 0, 100 ]).range([ "red", "blue" ]);

	var canvas = d3.select("div#chart").append("svg").attr("width", width)
			.attr("height", height);

	var min = Math.min(width, height);

	var r = (min - 300) / 2;

	var group = canvas.append("g").attr("transform",
			"translate(" + r + "," + r + ")");

	var arc = d3.svg.arc().innerRadius(0).outerRadius(r);

	var pie = d3.layout.pie().value(function(d) {
		return d.values.avg;
	});

	d3.csv("data/data.csv", function(data) {
		/*
		 * console.log(data); // group by p_name var dataByName =
		 * d3.nest().key(function(d) { return d.p_name; }).entries(data);
		 * 
		 * console.log(dataByName);
		 */

		var dimension = viewModel.selectedDimension().toLowerCase();// "p_name";
		var metric = viewModel.selectedMetric().toLowerCase();// "p_price"

		// group by p_name -> count(p_name), sum(p_price), avg(p_price)
		var dataMetrics = d3.nest().key(function(d) {
			return d[dimension];
			// return d.p_year;
			// return d.p_name;
		}).rollup(function(v) {
			return {
				count : v.length,
				total : d3.sum(v, function(d) {
					return d[metric];
					// return d.p_price;
				}),
				avg : d3.mean(v, function(d) {
					return d[metric];
				})
			};
		}).entries(data);
		console.log(dataMetrics);
		console.log("key: " + dataMetrics[0].key)
		console.log("avg: " + dataMetrics[0].values.avg)

		// Just for test: because some range are big
		// dataMetrics = dataMetrics.slice(0, 10);
		// ===================
		var arcs = group.selectAll(".arc").data(pie(dataMetrics)).enter()
				.append("g").attr("class", "arc");

		arcs.append("path").attr("d", arc).attr("fill", function(d) {
			return color(d.data.values.avg);
		});

		arcs.append("text").attr("transform", function(d) {
			return "translate(" + arc.centroid(d) + ")";
		}).attr("text-anchor", "middle").attr("font-size", "0.5em").text(
				function(d) {
					return d.data.key + ": " + d.data.values.avg;
				});
	})
}

function drawBar(dimension, metric, width, height) {
	console.log("draw bar...");
	var margin = {
		top : 40,
		right : 20,
		bottom : 30,
		left : 40
	};

	width = width - margin.left - margin.right;
	height = height - margin.top - margin.bottom;

	// var formatPercent = d3.format(".0%");

	var x = d3.scale.ordinal().rangeRoundBands([ 0, width ], .1);

	var y = d3.scale.linear().range([ height, 0 ]);

	var xAxis = d3.svg.axis().scale(x).orient("bottom");

	var yAxis = d3.svg.axis().scale(y).orient("left"); // .tickFormat(formatPercent);

	var tip = d3.tip().attr('class', 'd3-tip').offset([ -10, 0 ]).html(
			function(d) {
				return "<strong>" + metric
						+ "</strong> <span style='color:red'>" + d.values.avg
						+ "</span>";
			})

	var svg = d3.select("div#chart").append("svg").attr("width",
			width + margin.left + margin.right).attr("height",
			height + margin.top + margin.bottom).append("g").attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");
	svg.call(tip);

	d3.csv("data/data.csv", function(data) {

		// group by p_name -> count(p_name), sum(p_price), avg(p_price)
		var dataMetrics = d3.nest().key(function(d) {
			// return d.p_year;
			return d[dimension];
		}).rollup(function(v) {
			return {
				count : v.length,
				total : d3.sum(v, function(d) {
					return d[metric];
				}),
				avg : d3.mean(v, function(d) {
					return d[metric];
				})
			};
		}).entries(data);
		console.log(dataMetrics);
		console.log("key: " + dataMetrics[0].key)
		console.log("avg: " + dataMetrics[0].values.avg)

		// Just for test: because some range are big
		dataMetrics = dataMetrics.slice(0, 20);
		// ===================
		x.domain(dataMetrics.map(function(d) {
			return d.key;
		}));
		y.domain([ 0, d3.max(dataMetrics, function(d) {
			return d.values.avg;
		}) ]);

		svg.append("g").attr("class", "x axis").attr("transform",
				"translate(0," + height + ")").call(xAxis);

		svg.append("g").attr("class", "y axis").call(yAxis).append("text")
				.attr("transform", "rotate(-90)").attr("y", 6).attr("dy",
						".71em").style("text-anchor", "end").text(
						"Avg(" + metric + ")");

		svg.selectAll(".bar").data(dataMetrics).enter().append("rect").attr(
				"class", "bar").attr("x", function(d) {
			return x(d.key);
		}).attr("width", x.rangeBand()).attr("y", function(d) {
			return y(d.values.avg);
		}).attr("height", function(d) {
			return height - y(d.values.avg);
		}).on('mouseover', tip.show).on('mouseout', tip.hide)

	});
}