/*************************************************
* Initialization
* Setup initial state and extension settings
*************************************************/

exports = {};
App = exports;

setDebug(true);

function setDebug(isDebug) {
  if (isDebug) {
    window.debug = {
      //log: window.console.log.bind(window.console, '%s: %s'),
      log: window.console.log.bind(window.console, 'log: %s'),
      error: window.console.error.bind(window.console, 'error: %s'),
      info: window.console.info.bind(window.console, 'info: %s'),
      warn: window.console.warn.bind(window.console, 'warn: %s')
    };
  } else {
    var __no_op = function() {};

    window.debug = {
      log: __no_op,
      error: __no_op,
      warn: __no_op,
      info: __no_op
    }
  }
}

