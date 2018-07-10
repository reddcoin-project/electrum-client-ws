
/*************************************************
* Background
* Background processing when popup is closed
*************************************************/
App.backgnd = (function () {

	var priv = {
		},
		pub = {
		},
		websocket

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
		//pub.ping()
	};

	pub.ping = function () {
		var i = 0;
		window.setInterval(function() {

			pub.sendText({text: "Ping: " + i})
			i += 1
			}, 1000);
	}

	pub.onClose = function (evt) {
		console.log(evt)
		debug.log("onClose")
		var msg = {
			text: "Disconnected\n",
			status: "disconnected"
		}
		pub.writeToScreen(msg);
	};

	pub.onMessage = function (evt) {
	debug.log("onMessage")
	console.log(evt)
	const blob = evt.data;
	console.log(evt)

	var reader = new FileReader();
	reader.addEventListener("loadend", function () {
		// reader.result contains the contents of blob as a typed array
		console.log(reader.result)
		var msg = {
			text: "response: " + reader.result + '\n'
		}
		pub.writeToScreen(msg);
		});
		reader.readAsText(blob);
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
			text: "sent: " + JSON.stringify(message.text) + '\n'
		}

    	console.log(msg)
 
		pub.writeToScreen(msg);
    	const jsonMsg = JSON.stringify(message.text);
	    const blob = new Blob([jsonMsg, "\n"], {type: 'text/plain'});
		websocket.send(blob);
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
		console.log(text)
		pub.doSend( text );
	};

	pub.doDisconnect = function () {
		debug.log("doDisconnect")
		websocket.close();
	};	


	return pub;
})();