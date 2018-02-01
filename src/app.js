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
