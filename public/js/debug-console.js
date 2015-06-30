(function() {

  window.postMessage('connection madeaasdsadsada', window.location.origin);

  var original = window.console;
  window.console = {};

  ["log", "warn", "error"].forEach(function(func){
    window.console[func] = function(msg) {
      var style = null;
      if (arguments[2] && arguments[0].indexOf('%c') > -1) {
        style = arguments[1];
      }

      // socket.emit('console', { msg: msg, style: style, type: func });
      var data = {msg: msg, style: style, type: func };
      parent.postMessage(JSON.stringify(data), 'http://localhost:5000');
      original[func].apply(original, arguments)
    };
  });


  window.onerror = function (msg, url, num, column, errorObj) {
    // socket.emit('err', { num: num, msg: msg, type: 'error' });
    var data = { num: num, msg: msg, type: 'error' };
    parent.postMessage( JSON.stringify(data), window.location.origin);
    return false;
  };

  function trace() {
    var stack = Error().stack;
    var line = stack.split('\n')[3];
    line = (line.indexOf(' (') >= 0 ? line.split(' (')[1].substring(0, line.length - 1) : line.split('at ')[1]);
    return line;
  }

})();
