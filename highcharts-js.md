

Example
-------
```javascript
<!-- Use jQuery 1.9.1 -->

<script src="http://code.highcharts.com/highcharts.js"></script>
<script src="http://code.highcharts.com/modules/exporting.js"></script>

<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>

<!-- javascript -->
$(function () {
    var chart = { 
            chart: {
                type: 'column'
            },
            title: {
                text: 'Title 1'
            },
            subtitle: {
                text: 'Subtitle 1'
            },
            xAxis: {
                categories: [
                ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'foo'
                }
            },
            
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Tokyo',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    
            }, ]
        };
        mydata = [50, 100, 75];
        chart.series[0].data = mydata;
        $('#container').highcharts(chart);
    });
```