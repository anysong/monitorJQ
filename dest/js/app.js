(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(rootNode){
    var core = require('./js/core/core.js');
    var flex = require('./js/component/flex.js');
    // var api = require('./js/config/api.js');
    // var chartMap = require('./js/config/chartMap.js');
    // var json = require('./js/json/chart.json');
    var chartLoadMap = {};

    var initPlugins = function(){
        var $rootNode = $(rootNode);
        var arr = window.location.search.replace('?','').split('&');
        var urlParams = {};
        var cName = window.localStorage.getItem('Global.companyName');
        var pid = urlParams.pid;

        arr.map(function(item){
            urlParams[item.split('=')[0]] = item.split('=')[1];
        });
        // 待加载的chart type chart类型 dataType 数据来源类型
        // 两个图 一个饼图一个柱状
        var flexList = [
            {
                'name': 'mock1',
                'type': 'pie',
                'dataType': 'adminStatus',
            },
            {
                'name': 'mock2',
                'type': 'line',
                'dataType': 'api1',
                'param': {
                  'indicatorId': 1
                }
            }
        ];
        var loadAllChart = function(){
            console.log('刷新一次222');
            flexList.map(function(item, index){
                //生成图表对象
                // var _flex = flex($rootNode, index, core, item, chartMap, window, api, json);
                var _flex = flex($rootNode, item, index);
                
                //图表文件初始化
                // _flex.initChart();

                // if(chartLoadMap[index]){
                //     //更新
                //     _flex.updateChart();
                // }else {
                //     //初始化
                //     _flex.initChart();
                //     chartLoadMap[index] = true;
                // };

            });
        };

        loadAllChart();
        //每分钟刷新
        var timer = window.setInterval(function(){
            // loadAllChart();
        }, 60000);
    };
    var init = function(){
        initPlugins();
    };

    init();

})(document.body)

},{"./js/component/flex.js":3,"./js/core/core.js":5}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
/*
* 只负责处理图表对象，及初始化，和更新
*/

function Flex($rootNode, item, index){
	var api = require('../config/api.js')();
	var core = require('../core/core.js')();
	var loadTpl = require('../util/load.js');
	var chart = require('./chart.js');
	//获取dom
	var flexDom = $rootNode.find('.zc-main-flex-chart').eq(index);
	
	var renderChart = function(result){
		loadTpl(api.TPL[item.type], function(tpl){
			console.log('tpl',tpl);
			console.log(Mustache);
			var json = {};
			var rendered = Mustache.render(tpl, json);
			
			var chartDomMap = {
                'pie': '.zc-c-chart-pie',
                'line': '.zc-c-chart-line',
            };
            flexDom.append(rendered);
            console.log(item.type);
			var chartDom = flexDom.find(chartDomMap[item.type])[0];
			console.log(chartDom);
			//渲染生成chart
			chart(chartDom, index, item);
		});
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

},{"../config/api.js":4,"../core/core.js":5,"../util/load.js":7,"./chart.js":2}],4:[function(require,module,exports){
function Api(){
	var baseUrl = '';
	var apiMap = {
		HTTP: {
			'mock1': '/mock/mock.json',
			'mock2': '/mock/mock.json',
			'userInfo': baseUrl + '/basic/getMonitorServiceDataInfo',
			'bar1': baseUrl + '/chat/data/getUserStatus.action',
			'bar2': baseUrl + '/chat/data/getUserStatus.action',
			'bar3': baseUrl + '/chat/data/getUserStatus.action',
			'bar4': baseUrl + '/chat/data/getUserStatus.action',
		},
		TPL: {
	      'pie': 'view/pie.html',
	      'miniPie': 'view/miniPie.html',
	      'miniPieText': 'view/miniPieText.html',
	      'bar': 'view/bar.html',
	      'line': 'view/line.html'
	    }
	}
	return apiMap;
};

module.exports = Api;

},{}],5:[function(require,module,exports){
function Core(){
    // 用户身份相关
    var login = require('./login.js')();
    
    var http = function(url, callback, method){

    	token = login.token ||  window.localStorage.getItem('Global.token');
    	
    	$.ajax({
    		headers: {
    			'temp-id': token
    		},
    		url: url,
    		type: method || 'GET',
    		dataType: 'json',
    		success: function(result){
    			callback && callback(result);
    		}
    	})
    };
    return {
    	http: http
    }
};

module.exports = Core;

},{"./login.js":6}],6:[function(require,module,exports){
function Login(){
	var data = {

	};
	return {
		token: 'xxxxxxxx'
	}
}

module.exports = Login;
},{}],7:[function(require,module,exports){
function Load(url, callback){
	var tpls = {};

	if(tpls[url]){
		callback && callback(tpls[url]);
	}else {
		$.get(url, function(result){
			tpls[url] = result;
			callback && callback(result);
		}, 'text');
	};
};

module.exports = Load;

},{}]},{},[1])