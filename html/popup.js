/*************************************************
* Popup
* message processing when popup is open
*************************************************/
App.popup = (function () {
	"use strict"

	var priv = {
		},
		pub = {
		}

	pub.init = function () {
		document.myform.url.value = "ws://localhost:8000/"
		document.myform.inputtext.value = "Hello World!"
		document.myform.disconnectButton.disabled = true;
	};

	pub.updateInterface = function(message) {
		document.myform.outputtext.value += message.message.text
		document.myform.outputtext.scrollTop = document.myform.outputtext.scrollHeight;

		switch (message.message.status) {
			case 'connected':
				document.myform.connectButton.disabled = true;
				document.myform.disconnectButton.disabled = false;
			break;
			case 'disconnected':
				document.myform.connectButton.disabled = false;
				document.myform.disconnectButton.disabled = true;
			break;
			case 'error':
				document.myform.connectButton.disabled = false;
				document.myform.disconnectButton.disabled = true;
			break;
		}
	};

	pub.clearText = function () {
		document.myform.outputtext.value = "";
	};


	return pub;
})();

function startListener () {

    document.getElementById("Popup").onclick = function (e) {
	var clickName = e.target.id;
	console.log("Gui Element Clicked " + clickName);
	
	switch (clickName) {
	  // Menu Items
	    case 'sendButton':
	    	var text = {
		    	text: document.myform.inputtext.value
		    };
			App.messenger.sendText(text);
			break;
	    case 'clearButton':
			App.popup.clearText();
			break;
	    case 'disconnectButton':
			App.messenger.doDisconnect();
			break;
	    case 'connectButton':
		    var profile = {
		    	url: document.myform.url.value
		    };
			App.messenger.doConnect(profile);
			break;
		case 'versionButton':
			var text = {
		    	text: '{version:"",id:""}'
		    };
		    App.messenger.sendText(text);
		    break;
		case 'historyButton':
			var text = {
		    	text: document.myform.inputtext.value
		    };

		}
    }
};

window.onload = function() {
	startListener()
	App.popup.init();
}

