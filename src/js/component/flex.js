/*
* 只负责处理图表对象，及初始化，和更新
*/

function Flex($rootNode, item, index){
	var api = require('../config/api.js')();
	var core = require('../core/core.js')();
	var loadTpl = require('../util/load.js');
	//获取dom
	var flexDom = $rootNode.find('.zc-main-flex-chart').eq(index);
	
	var renderChart = function(result){
		console.log('获取数据',result);
		loadTpl(api.TPL[item.type], function(tpl){
			console.log('tpl',tpl);
		});
		//渲染生成chart
		if(item.type == 'pie'){

		};
		if(item.type == 'line'){

		};
	};
	//初始化图表
   	var initChart = function(){

   		/*
   		* 选择dom $rootNode index
   		* 确定图表类型 item
   		* 获取数据
   		* 渲染图表
   		*/
   		core.http(api.HTTP[item.name], function(result){
   			renderChart(result);
   		})

   	};
   	initChart();

    return {
    	'initChart': initChart
    }
};

module.exports = Flex;
