
/*************************************************
* Background
* Background processing when popup is closed
*************************************************/
App.backgnd = (function () {
	"use strict";

	var priv = {
		},
		pub = {
		}

	pub.doConnect = function (profile) {
		debug.log("doConnect")
		websocket = new WebSocket(profile.url);
		websocket.onopen = function(evt) { pub.onOpen(evt) };
		websocket.onclose = function(evt) { pub.onClose(evt) };
		websocket.onmessage = function(evt) { pub.onMessage(evt) };
		websocket.onerror = function(evt) { pub.onError(evt) };
	};

	pub.onOpen = function (evt) {
		debug.log("onOpen")
		var msg = {
			text: "Connected\n",
			status: "connected"
		}
		pub.writeToScreen(msg);
		pub.ping()
	};

	pub.ping = function () {
		var i = 0;
		window.setInterval(function() {

			pub.sendText({text: "Ping: " + i})
			i += 1
			}, 1000);
	}

	pub.onClose = function (evt) {
		debug.log("onClose")
		var msg = {
			text: "Disconnected\n",
			status: "disconnected"
		}
		pub.writeToScreen(msg);
	};

	pub.onMessage = function (evt) {
		debug.log("onMessage")
		var msg = {
			text: "response: " + evt.data + '\n'
		}
		pub.writeToScreen(msg);
	};

	pub.onError = function (evt) {
		debug.log("onError")
		var msg = {
			text: 'error: ' + evt.data + '\n',
			status: "error"
		}
		pub.writeToScreen(msg);
		websocket.close();
	};

	pub.doSend = function (message) {
		debug.log("doSend")
		var msg = {
			text: "sent: " + message.text + '\n'
		}

		pub.writeToScreen(msg); 
		websocket.send(message.text);
	};

	pub.writeToScreen = function (message) {
		debug.log("writeToScreen")
		var popupWindow = chrome.extension.getViews({type:'popup'})[0];

        if(popupWindow){
            popupWindow.App.popup.updateInterface({
                message : message
            });
        }
	};

	pub.sendText = function (text) {
		debug.log("sendText")
		pub.doSend( text );
	};

	pub.doDisconnect = function () {
		debug.log("doDisconnect")
		websocket.close();
	};	


	return pub;
})();