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
