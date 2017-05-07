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
    type: Array, default: []
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

// // 测试数据
// var me = new voterModel({
//   uid: 'omCQ-01vEQ8F4IJTdZzbRHm1kTew'
// })
// me.save()
//
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



router.post('/oauth/poll', async function (ctx) {
  var cdkey = ctx.request.body.cdkey;
  var selecter = ctx.request.body.selecter;

  // 对投票表记录操作
  var voter = await voterModel.findOne({'uid': cdkey});
  if (voter.state == '0') {
    let voter_action = await voterModel.update({'uid': cdkey}, {$set: {'selecter': selecter, 'state': '1'}}).exec();
    if (voter_action.nModified == '1') {
      // 对统计表操作
      for (x in selecter) {
        if (selecter[x].type == '1')
          await selecterModel.update({'uid': selecter[x].uid}, {$inc: {'good': 1}}).exec();
        if (selecter[x].type == '2')
          await selecterModel.update({'uid': selecter[x].uid}, {$inc: {'bad': 1}}).exec();
        if (selecter[x].type == '3')
          await selecterModel.update({'uid': selecter[x].uid}, {$inc: {'neutrality': 1}}).exec();
      }
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