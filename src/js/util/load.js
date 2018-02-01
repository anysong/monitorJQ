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
