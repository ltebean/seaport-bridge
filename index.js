! function(name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof define == 'function') define(definition);
  else this[name] = definition();
}('seaport-bridge', function() {

  return {
    connect: function(dataHandler, cb) {

      function connectWebViewJavascriptBridge(cb) {
        if (window.WebViewJavascriptBridge) {
          cb(WebViewJavascriptBridge)
        } else {
          document.addEventListener('WebViewJavascriptBridgeReady', function() {
            cb(WebViewJavascriptBridge)
          }, false)
        }
      }
      connectWebViewJavascriptBridge(function(bridge) {
        bridge.init(function(message, responseCallback) {
          dataHandler(message);
        });
        cb(seaportBridge(bridge));
      })
    }
  }

  function seaportBridge(bridge) {
    return {
      userDefaults: userDefaults(bridge),
      http: http(bridge),
      param: param(bridge),
      data: data(bridge)
    }
  }

  function userDefaults(bridge) {
    return {
      get: function(key, cb) {
        bridge.callHandler('userdefaults:get', key, cb);
      },
      set: function(key, value, cb) {
        bridge.callHandler('userdefaults:set', {
          key: key,
          value: value
        }, cb);
      }

    }
  }

  function param(bridge) {
    return {
      get: function(key, cb) {
        bridge.callHandler('param:get', key, cb);
      },
      getAll: function(cb) {
        bridge.callHandler('param:getAll', '', cb);
      }
    }
  }

  function data(bridge) {
    return {
      send: function(data) {
        bridge.send(data);
      }
    }
  }

  function http(bridge) {
    return {
      get: function(request, cb) {
        bridge.callHandler('http:get', request, cb);
      },
      post: function(request, cb) {
        bridge.callHandler('http:post', request, cb);
      }
    }
  }

});