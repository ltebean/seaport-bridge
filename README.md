Seaport UIWebView javascript bridge

## Usage

```js

var seaport = require('seaport-bridge');

seaport.connect(function dataHandler(data) {

  console.log('receive data:' + data);

}, function connected(bridge) {

  var userDefaults = bridge.userDefaults;

  userDefaults.set('username', 'ltebean');

  userDefaults.get('username', function(val) {
    console.log(val);
  })

  var http = bridge.http;
  http.get({
    domain: 'ltebean.apiary.io',
    path: '/notes/1',
    cookies: {},
  }, function(data) {
    console.log(JSON.stringify(data));
  });

  http.post({
    domain: 'ltebean.apiary.io',
    path: '/updates',
    body: {
      content: 'haha'
    },
    cookies: {},
  }, function(data) {
    console.log(JSON.stringify(data));
  })


  bridge.param.get('city', function(data) {
    console.log(JSON.stringify(data))
  })

  bridge.data.send({
    segue: 'detail',
    param: {
      name: 'ltebean'
    }
  });

})
```