/*************************************************
* Messenger
* message processing between extension
*************************************************/
(function () {
	"use strict"
	var priv = {
	},
	pub = {};

/* priv*/
	priv.message = function(method, data, callback){
		data = data || {};

		if($.isFunction(data)){
			callback = data;
			data = {};
		}

		data.method = method;
		// lets not leak some info into logs
		var skipList = [ '' ]
		if (skipList.indexOf(data.method) < 0 ) {
			debug.info("Messenger Calling" + JSON.stringify(data))
		}
		
		chrome.runtime.sendMessage(data, callback);
	};

/*pub*/

	pub.doConnect = function (profile){
		priv.message("doConnect", profile)
	};
	pub.sendText = function (msg){
		priv.message("sendText", msg)
	};
	pub.doDisconnect = function (){
		priv.message("doDisconnect" )
	};

	exports.messenger = pub;

})(exports);