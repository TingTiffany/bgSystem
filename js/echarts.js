$(document).ready(function(){
	/*柱形图*/
	var myChart = echarts.init(document.getElementById('barCharts')),
			option = {
				tooltip: {
					show: true
				},
				legend: {
					data: ['数量1', '数量2']
				},
				xAxis: [{
					type: 'category',
					data: ["A", "B", "C", "D", "E", "F"]
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
					"name": "数量1",
					"type": "bar",
					"data": [5, 25, 40, 15, 10, 20]
				}, {
					"name": "数量2",
					"type": "bar",
					"data": [15, 20, 30, 5, 35, 10]
				}]
			};
	myChart.setOption(option);	
	
	/*折线图*/
	var myChart = echarts.init(document.getElementById('lineCharts')),
			option = {
				toolbox: {
					show: true,
					feature: {
						dataView: {
							show: true
						},
						magicType: {
							show: true,
							option: {
								'pie': {
									legend: null,
									xAxis: null,
									yAxis: null,
									series: [{
										"type": 'pie',
										"data": [{
											value: 5,
											name: 'A'
										}, {
											value: 25,
											name: 'B'
										}, {
											value: 40, 
											name: 'C'
										}, {
											value: 15, 
											name: 'D'
										}, {
											value: 10, 
											name: 'E'
										}, {
											value: 20, 
											name: 'F'
										}]
									}]
								}
							},
							type: ['line', 'bar', 'pie']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				tooltip: {
					trigger: 'axis', 
					axisPointer: {
						lineStyle: {
			        color: '#aaa',
			        type: 'dashed',
			        width: 1
				    }
					}
				},
				legend: {
					data: ['数量1', '数量2']
				},
				xAxis: [{
					type: 'category',
					data: ["A", "B", "C", "D", "E", "F"]
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
					"name": "数量1",
					"type": "line",
					"data": [5, 25, 40, 15, 10, 20]
				}, {
					"name": "数量2",
					"type": "line",
					"data": [15, 10, 35, 20, 5, 25]
				}]
			};
	myChart.setOption(option);	
	
	/*饼图*/
	var myChart = echarts.init(document.getElementById('pieCharts')),
			option = {
				tooltip: {
					show: 'true'
				},
				series: [{
					"type": "pie",
					"data": [{
						value: 5,
						name: 'A'
					}, {
						value: 25,
						name: 'B'
					}, {
						value: 40, 
						name: 'C'
					}, {
						value: 15, 
						name: 'D'
					}, {
						value: 10, 
						name: 'E'
					}, {
						value: 20, 
						name: 'F'
					}]
				}]
			};
	myChart.setOption(option);	
});
