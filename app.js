/**
 * Created by huangpeisong on 2017/4/29.
 */
const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const request = require('request-promise');

app.use(bodyParser());

const appID = 'wx7ab9c176b8ee8e40';
const appsecret = '2e4b4fd612d995f13dbfd52ba4d13c8e';


router.get('/', function (ctx) {
  ctx.body = 'a'
});

router.get('/wx_login', function (ctx) {
  var router = 'get_wx_access_token';
  // var return_uri = 'http%3A%2F%2F127.0.0.1%3a3000%2Foauth%2F' + router;
  var return_uri = 'http%3A%2F%2Fwww.bringtree.cn%2Foauth%2F' + router;
  var scope = 'snsapi_userinfo';
  ctx.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appID + '&redirect_uri=' + return_uri + '&response_type=code&scope=' + scope + '&state=STATE#wechat_redirect')

});

router.get('/oauth/get_wx_access_token', async function (ctx) {
  var code = ctx.query.code;

  var res = await request({
    method: 'GET',
    uri: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appID + '&secret=' + appsecret + '&code=' + code + '&grant_type=authorization_code',
    resolveWithFullResponse: true
  });
  if (res.statusCode === 200) {
    var data = JSON.parse(res.body);
    // console.log(JSON.parse(res.body));
    var access_token = data.access_token;
    var openid = data.openid;
  }


  var res2 = await request({
    method: 'GET',
    uri: 'https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN',
    resolveWithFullResponse: true
  });
  var userinfo = JSON.parse(res2.body);
  ctx.body = "\
                              <h1>" + userinfo.nickname + " 的个人信息</h1>\
                              <p><img src='" + userinfo.headimgurl + "' /></p>\
                              <p>" + userinfo.city + "，" + userinfo.province + "，" + userinfo.country + "</p>\
                          ";


});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);