var viewModel = {
	chartTypes : ko.observableArray([ 'Pie', 'Bar' ]),
	selectedChartType : ko.observable(),

	dimensions : ko.observableArray([ 'P_Name', 'P_Region', 'P_Year' ]),
	selectedDimension : ko.observable(),

	metrics : ko.observableArray([ 'P_Price', 'P_Score' ]),
	selectedMetric : ko.observable(),

	width : ko.observable(500),
	widthAuto : ko.observable("yes"),

	height : ko.observable(500),
	heightAuto : ko.observable("yes")
};
ko.applyBindings(viewModel);

// Change -> Notice
viewModel.selectedChartType.subscribe(function(chartType) {
	drawChart();
});
viewModel.selectedDimension.subscribe(function() {
	drawChart();
});
viewModel.selectedMetric.subscribe(function() {
	drawChart();
});
viewModel.width.subscribe(function() {
	drawChart();
});
viewModel.height.subscribe(function() {
	drawChart();
});
viewModel.widthAuto.subscribe(function(auto) {
	drawChart();
	// JQuery :)
	if (auto == 'yes') {
		$("#width_tf").attr("disabled", true);
	} else {
		$("#width_tf").attr("disabled", false);
	}
});
viewModel.heightAuto.subscribe(function(auto) {
	drawChart();
	// JQuery :)
	if (auto == 'yes') {
		$("#height_tf").attr("disabled", true);
	} else {
		$("#height_tf").attr("disabled", false);
	}
});
