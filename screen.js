var page = require('webpage').create();
var fs = require("fs");
var system = require('system');
var args = system.args;

page.viewportSize = {
  width: args[2],
  height: args[3]
};
page.zoomFactor = 0.25;

page.onLoadFinished = function(status) {

  var base64 = page.renderBase64('JPEG');
    if (status !== 'success') {
    console.log('无法加载地址');
  } else {
  console.log(base64);
  }
  phantom.exit();
};
page.open(args[1]);

