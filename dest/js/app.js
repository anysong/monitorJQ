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

},{"./js/component/flex.js":2,"./js/core/core.js":4}],2:[function(require,module,exports){
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

},{"../config/api.js":3,"../core/core.js":4,"../util/load.js":6}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./login.js":5}],5:[function(require,module,exports){
function Login(){
	var data = {

	};
	return {
		token: 'xxxxxxxx'
	}
}

module.exports = Login;
},{}],6:[function(require,module,exports){
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