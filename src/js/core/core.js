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
