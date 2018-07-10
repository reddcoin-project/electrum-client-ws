/*************************************************
* Message Pump
* message processing between extension
*************************************************/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	params = {};

	$.each(request, function(key, value){

		if(key !== 'method'){
			params += key + ' = `' + value + '`';
			return;
		}
	});

	if (App.backgnd != undefined || App.backgnd != {}){
			sendResponse(App.backgnd[request.method](request));
	};
});