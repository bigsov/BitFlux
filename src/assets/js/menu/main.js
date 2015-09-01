(function(d3, fc, sc) {
    'use strict';

    sc.menu.main = function() {

        var dispatch = d3.dispatch('primaryChartSeriesChange',
            'primaryChartIndicatorChange',
            'secondaryChartChange',
            'dataTypeChange',
            'periodChange');

        var primaryChartSeriesOptions = sc.menu.primaryChart.series()
            .on('primaryChartSeriesChange', function(series) {
                dispatch.primaryChartSeriesChange(series);
            });

        var primaryChartIndicatorOptions = sc.menu.primaryChart.indicators()
            .on('primaryChartIndicatorChange', function(indicator) {
                dispatch.primaryChartIndicatorChange(indicator);
            });

        var secondaryChartOptions = sc.menu.secondaryChart.chart()
            .on('secondaryChartChange', function(chart) {
                dispatch.secondaryChartChange(chart);
            });

        var dataTypeChangeOptions = function(selection) {
            selection.on('change', function() {
                var type = d3.select(this).property('value');
                dispatch.dataTypeChange(type);
            });
        };

        var periodChangeOptions = function(selection) {
            selection.on('change', function() {
                var period = d3.select(this).property('value');
                dispatch.periodChange(period);
            });
        };

        var main = function(selection) {
            selection.each(function() {
                var selection = d3.select(this);
                selection.select('#type-selection')
                    .call(dataTypeChangeOptions);
                selection.select('#period-selection')
                    .call(periodChangeOptions);
                selection.select('#series-buttons')
                    .call(primaryChartSeriesOptions);
                selection.select('#indicator-buttons')
                    .call(primaryChartIndicatorOptions);
                selection.select('#secondary-chart-buttons')
                    .call(secondaryChartOptions);
            });
        };

        return d3.rebind(main, dispatch, 'on');
    };
})(d3, fc, sc);