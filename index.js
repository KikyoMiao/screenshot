/*
* @Author: C
* @Date:   2016-08-08 18:27:28
* @Last Modified 2016-08-19
* @Last Modified time: 2016-08-19 14:55:45
*/

const Koa = require('koa'),
      exec = require('child_process').exec
      app = new Koa(),
      koa = require('koa'),
      routing = require('koa-routing'),
      serve = require("koa-static");

app.use(serve(__dirname + "/preview"));

app.use(routing(app));

function screenshot(callback){
    if(!this.query)callback("三个条件一个都没有，服务器拒绝了你的截图请求", null);
    if(!this.query.url)callback("由于你没有输入url服务器拒绝了你的截图请求", null);
    //if(!this.query.width)callback("于你没有输入width服务器拒绝了你的截图请求", null);
    //if(!this.query.height)callback("由于你没有输入高度服务器拒绝了你的请求", null);
    var options = {
    encoding: 'utf8',
    timeout: 300000,
    maxBuffer: 20000*1024,
    killSignal: 'SIGTERM',
    cwd: null,
    env: null
  }
  console.log(callback)
    exec("phantomjs screen.js " + this.query.url + " " + this.query.width + " " + this.query.width,options,function (error, stdout, stderr) {
        if(error) console.log("Error:", error);
        callback(null, "data:image/png;base64," + stdout);
        console.log(stdout,stderr)
    });

}
// response
app.route('/query')
  .get(function * (next) {
    console.log("query", this.query);
    this.body = yield screenshot;

  });

app.listen(process.env.PORT || 3003);

process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log(err)
})
