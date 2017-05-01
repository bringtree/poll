/**
 * Created by huangpeisong on 2017/4/29.
 */
const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const request = require('request-promise');
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/poll_text");
let voterSchema = mongoose.Schema({
  uid: String,
  selecter: {
    type: Array, default: [
      {name: 'a', uid: '1', type: '0'},
      {name: 'b', uid: '2', type: '0'},
      {name: 'c', uid: '3', type: '0'},
      {name: 'd', uid: '4', type: '0'},
      {name: 'e', uid: '5', type: '0'},
      {name: 'f', uid: '6', type: '0'},
      {name: 'g', uid: '7', type: '0'},
      {name: 'h', uid: '8', type: '0'},
      {name: 'i', uid: '9', type: '0'},
      {name: 'j', uid: '10', type: '0'},
      {name: 'k', uid: '11', type: '0'},
      {name: 'l', uid: '12', type: '0'},
      {name: 'm', uid: '13', type: '0'},
      {name: 'n', uid: '14', type: '0'},
      {name: 'o', uid: '15', type: '0'},
      {name: 'p', uid: '16', type: '0'},
      {name: 'q', uid: '17', type: '0'},
      {name: 'r', uid: '18', type: '0'},
      {name: 's', uid: '19', type: '0'},
      {name: 't', uid: '20', type: '0'},
      {name: 'u', uid: '21', type: '0'},
      {name: 'v', uid: '22', type: '0'},
      {name: 'y', uid: '23', type: '0'},
      {name: 'x', uid: '24', type: '0'}
    ]
  },
  state: {type: Number, default: 0}
});

let selecterSchema = mongoose.Schema({
  name: String,
  uid: String,
  good: {type: Number, default: 0},
  bad: {type: Number, default: 0},
  neutrality: {type: Number, default: 0}
});

let voterModel = mongoose.model('voterSchema', voterSchema);
let selecterModel = mongoose.model('selecterSchema', selecterSchema);

// 测试数据
// var me = new voterModel({
//   uid: 'omCQ-01vEQ8F4IJTdZzbRHm1kTew'
// })
// me.save()

// var i = 1;
// var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'y', 'x']
// for (x in abc) {
//   console.log(x)
//   var me = new selecterModel({
//     name: abc[x],
//     uid: (i++),
//   })
//   me.save();
// }

app.use(bodyParser());

const appID = 'wx7ab9c176b8ee8e40';
const appsecret = '2e4b4fd612d995f13dbfd52ba4d13c8e';


router.get('/wx_login', function (ctx) {
  var router = 'get_wx_access_token';
  var return_uri = 'http%3A%2F%2F127.0.0.1%3a3000%2Foauth%2F' + router;
  // var return_uri = 'http%3A%2F%2Fwww.bringtree.cn%2Foauth%2F' + router;
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
    var access_token = data.access_token;
    var openid = data.openid;
    // var refresh_token = data.refresh_token
  }


  var res2 = await request({
    method: 'GET',
    uri: 'https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN',
    resolveWithFullResponse: true
  });
  var userinfo = JSON.parse(res2.body);
  ctx.redirect('http://localhost:8080/#/?openid=' + openid)
  // userinfo.nickname
});



router.post('/oauth/poll', async function (ctx) {
  var uid = ctx.request.body.uid;
  var selecter = ctx.request.body.selecter;

  // 对统计表操作
  for (x in selecter) {
    if (selecter[x].type == '1')
      await selecterModel.update({'uid': selecter[x].uid}, {$inc: {'good': 1}}).exec();
    if (selecter[x].type == '2')
      await selecterModel.update({'uid': selecter[x].uid}, {$inc: {'bad': 1}}).exec();
    if (selecter[x].type == '3')
      await selecterModel.update({'uid': selecter[x].uid}, {$inc: {'neutrality': 1}}).exec();
  }

  // 对投票表记录操作
  var voter = await voterModel.findOne({'uid': uid});
  if (voter.state == '0') {
    let voter_action = await voterModel.update({'uid': uid}, {$set: {'selecter': selecter, 'state': '1'}}).exec();
    if (voter_action.nModified == '1') {
      ctx.body = '操作成功'
    }
    else {
      ctx.body = '操作失败'
    }
  }
  else {
    ctx.body = '你已经投票过了'
  }
});

router.get('/search/:bid', async function (ctx) {
  const bid = String(ctx.params.bid);
  var result = await selecterModel.findOne({uid: bid});
  ctx.body = {
    uid: result.uid,
    good: result.good,
    bad: result.bad,
    neutrality: result.neutrality
  }
});


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);