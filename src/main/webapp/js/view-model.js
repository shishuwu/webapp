var viewModel = {
	chartTypes : ko.observableArray([ 'Pie', 'Bar' ]),
	dimensions : ko.observableArray([ 'P_Name', 'P_Region', 'P_Year' ]),
	metrics : ko.observableArray([ 'P_Price', 'P_Score' ]),
	width : ko.observable(600),
	height : ko.observable(500)
};
ko.applyBindings(viewModel);