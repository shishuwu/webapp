var viewModel = {
	chartTypes : ko.observableArray([ 'Pie', 'Bar' ]),
	selectedChartType : ko.observable(),

	dimensions : ko.observableArray([ 'P_Name', 'P_Region', 'P_Year' ]),
	selectedDimension : ko.observable(),

	metrics : ko.observableArray([ 'P_Price', 'P_Score' ]),
	selectedMetric : ko.observable(),

	width : ko.observable(600),
	height : ko.observable(500)
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
