/**
 * Created by huangpeisong on 2017/4/29.
 */
const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const request = require('request-promise');
const mongoose = require("mongoose");
const uuid = require('node-uuid')


mongoose.connect("mongodb://bringtree:bringtree@119.29.59.163:27017/admin");
let voterSchema = mongoose.Schema({
  cdkey: {type: String, unique: true},
  candidate: {type: Array, default: []},
  state: {type: Number, default: 0}
});

let candidateSchema = mongoose.Schema({
  name: String,
  grade: String,
  faculty: String,
  political: String,
  work: String,
  honor: String,
  evaluate: String,
  motto: String,
  uid: String,
  src: String,
  good: {type: Number, default: 0},
  bad: {type: Number, default: 0},
  neutrality: {type: Number, default: 0}
});
let supermanSchema = mongoose.Schema({
  name: String,
});

let voterModel = mongoose.model('voterSchema', voterSchema);
let candidateModel = mongoose.model('candidateSchema', candidateSchema);

// 测试数据


// var i = 1;
// var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'y', 'x']
// for (x in abc) {
//   console.log(x)
//   var me = new candidateModel({
//     name: abc[x],
//     uid: (i++),
//   })
//   me.save();
// }

app.use(bodyParser());

router.post('/oauth/cdkey', async function (ctx) {
  var cdkey = ctx.request.body.cdkey
  try {
    var voter = await voterModel.findOne({cdkey: cdkey})
    if (voter.state === 0) {
      ctx.body = {
        type: 'successfully',
        msg: '"还未投票"'
      }
    }
    else if (voter.state === 1) {
      ctx.body = {
        type: 'error',
        msg: "已经投票过了"
      }
    }
  }
  catch (e) {
    ctx.body = {
      type: 'error',
      msg: "输入的cdkey有误"
    }
  }
})


router.post('/api/detail', async function (ctx) {
  var uid = ctx.request.body.uid;
  try {
    var candidate = await candidateModel.findOne({uid: uid})
    ctx.body = {
      name: candidate.name,
      grade: candidate.grade,
      faculty: candidate.faculty,
      political: candidate.political,
      work: candidate.work,
      honor: candidate.honor,
      evaluate: candidate.evaluate,
      motto: candidate.motto,
      src: candidate.src,
    }
  } catch (e) {
    console.log(e)
  }
})


// 这段代码风险很高,需要完善.
router.post('/oauth/poll', async function (ctx) {
  var cdkey = ctx.request.body.cdkey;
  var candidate = ctx.request.body.candidate;

  // 对投票表记录操作
  var voter = await voterModel.findOne({'cdkey': cdkey});
  if (voter.state == '0') {
    let voter_action = await voterModel.update({'cdkey': cdkey}, {$set: {'candidate': candidate, 'state': '1'}}).exec();
    if (voter_action.nModified == '1') {
      // 对统计表操作
      for (x in candidate) {
        if (candidate[x].type == '1')
          await candidateModel.update({'uid': candidate[x].uid}, {$inc: {'good': 1}}).exec();
        if (candidate[x].type == '2')
          await candidateModel.update({'uid': candidate[x].uid}, {$inc: {'bad': 1}}).exec();
        if (candidate[x].type == '3')
          await candidateModel.update({'uid': candidate[x].uid}, {$inc: {'neutrality': 1}}).exec();
      }
      ctx.body = {
        type: 'successfully',
        msg: '操作成功'
      }
    }
    else {
      ctx.body = {
        type: 'error',
        msg: '操作失败'
      }
    }
  }
  else {
    ctx.body = {
      type: 'error',
      msg: '你已经投票过了'
    }
  }
});

router.get('/search/:bid', async function (ctx) {
  const bid = String(ctx.params.bid);
  var result = await candidateModel.findOne({uid: bid});
  ctx.body = {
    uid: result.uid,
    good: result.good,
    bad: result.bad,
    neutrality: result.neutrality
  }
});

router.get('/api/getkey', async function (ctx) {

  var flag = 1;
  while (flag) {
    var cdkey = uuid.v4().slice(0, 8);
    var me = new voterModel({
      cdkey: cdkey
    });
    await me.save(function (e) {
      if (e == null) {
        flag = 0;
        ctx.body = cdkey;
      }
      else {
        flag = 1;
      }
    })
  }

});


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);