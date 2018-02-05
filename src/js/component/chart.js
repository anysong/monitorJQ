function Chart(flexDom, index, item){
	console.log(index);
	var flexChart = echarts.init(flexDom);
	var option = {};

	if(item.type == 'line'){
		option = {
			title: {
				text: '大饼'
			},
		    legend: {
		    	data: ['一组','二组','三组']
		    },
			xAxis: {
				type: 'category',
				data: ['一季度','二季度','三季度','四季度']
			},
			yAxis: {
				type: 'value',
				data: [100,500,1000]
			},
			series: [
				{
					name: 'one',
					type: 'line',
					data: [120,130,0,150,160]
				},
				{
					name: 'one2',
					type: 'line',
					data: [120,130,0,120,130,0,150,160,150,160]
				},
				{
					name: 'one3',
					type: 'line',
					data: [5,120,130,0,120,130,0,150,160,150,160]
				}

			]
		};
		 
	}else {
		option = {
	        title: {
	            text: '112'
	        },
	        tooltip: {},
	        legend: {
	            data: ['访问来源']
	        },
	        series : [
	        	{
	        		name: '饼',
	        		type: 'pie',
	        		data: [
	        			{'name':'ama','value':10},
	        			{'name':'aba','value':10},
	        			{'name':'aca','value':10},
	        			{'name':'ada','value':10},
	        			{'name':'aea','value':10}]
	        	}
	        ]
    	};
	}
	console.log(option);
	flexChart.setOption(option);
};

module.exports = Chart;