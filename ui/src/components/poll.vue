<template>
  <div>
    <div style="padding-top:43px">
      <grid :rows="2">
        <grid-item v-for="i in candidate" :key="candidate.uid">
          <div align="center"><img :src="i.src" width="80%" @click="goDeatil(i.uid)"></div>
          <span class="grid-center">{{i.name}}  {{i.grade}}</span>
          <span class="grid-center">{{i.faculty}}</span>
          <checker v-model="i.type" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
            <checker-item value="1">赞成</checker-item>
            <checker-item value="2">反对</checker-item>
            <checker-item value="3">弃权</checker-item>
          </checker>
        </grid-item>
      </grid>
    </div>
    <group :title="'反对票:'+oppose+'，触发非必答题'" v-if="oppose>=5">
      <x-input placeholder="(另选名单)你心目中理想的候选人是？" v-model="superman"></x-input>
    </group>
    <group :title="'赞成票:'+support+'反对票:'+oppose+'弃票:'+giveup">
      <x-button type="primary" @click.native="submit()" :disabled="!condition">{{submitMsg}}
      </x-button>
    </group>
    <toast v-model="success" type="text">{{msg}}</toast>
    <toast v-model="error" type="warn">{{msg}}</toast>
  </div>


</template>

<script type="text/ecmascript-6">
  import router from "../router/index.js"
  import {Checker, CheckerItem, Grid, Group, GridItem, Popup, XButton, ToastPlugin, Toast, XInput} from 'vux'
  export default {
    components: {
      Checker,
      CheckerItem,
      Grid,
      Popup,
      GridItem,
      XButton,
      Group,
      ToastPlugin,
      Toast,
      XInput
    },
    data () {
      return {
        error: false,
        success: false,
        msg: '',
        person: 24,
        support: 0,
        oppose: 0,
        giveup: 0,
        condition: false,
        candidate: [
          {
            uid: '1',
            name: '我的姓名',
            grade: '2016级',
            faculty: '数学与信息学院',
            src: require('../assets/photo.jpg'),
            type: '0'
          },
          {
            uid: '2',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '3',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '4',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '5',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '6',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '7',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '8',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '9',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '10',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '11',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '12',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '13',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '14',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '15',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '16',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '17',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '18',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '19',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '20',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '21',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '22',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '23',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
          {
            uid: '24',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: require('../assets/photo.png'),
            type: '0'
          },
        ],
        showMenus: false,
        submitMsg: '',
        superman: ''
      }
    },
    methods: {
      submit () {
        var candidate = this.candidate
        var candidate_fix = [];
        for (var i = 0; i < candidate.length; i++) {
          candidate_fix[i] = {
            uid: candidate[i].uid,
            name: candidate[i].name,
            grade: candidate[i].grade,
            faculty: candidate[i].faculty,
            type: candidate[i].type,
          }
        }
        this.$http.post('/oauth/poll', {
          cdkey: sessionStorage.getItem('cdkey'),
          candidate: candidate_fix,
          superman: this.superman

        })
          .then((res) => {
            var data = res.data
            if (data.type == 'successfully') {
              this.success = true
              this.error = false
              this.msg = data.msg
            }
            else {
              this.success = false
              this.error = true
              this.msg = data.msg
            }
          })
          .catch((err) => {
            this.success = false
            this.error = true
            this.msg = '发生未知错误'
          })
      },
      goDeatil (i) {
        sessionStorage.setItem('candidate', JSON.stringify(this.candidate))
        sessionStorage.setItem('local', document.body.scrollTop)
        router.push('detail?uid=' + i);
      }
    },
    watch: {
      candidate: {
        handler: function (value) {
          var person, support, oppose, giveup
          person = 0
          support = 0
          oppose = 0
          giveup = 0
          for (var i = 0; i < value.length; i++) {
            if (value[i].type == 0) person++
            if (value[i].type == 1) support++
            if (value[i].type == 2) oppose++
            if (value[i].type == 3) giveup++
            this.person = person
            this.support = support
            this.oppose = oppose
            this.giveup = giveup
            if (person != 0) {
              this.submitMsg = '你还没给' + this.person + '人投票'
              this.condition = false;
            }
            else if (oppose < 4) {
              this.submitMsg = '反对票少于4票不能提交'
              this.condition = false;
            }
            else if (support + giveup >= 20) {
              this.submitMsg = '提交'
              this.condition = true;
            }
            else if (oppose >= 5) {
              this.submitMsg = '提交'
              this.condition = true;
            }
          }
        },
        deep: true
      },
    },
    mounted: function () {
      var data = sessionStorage.getItem('candidate');
      var local = sessionStorage.getItem('local')
      window.scrollTo(0, Number(local))
      if (data != null) {
        this.candidate = JSON.parse(data)
      }
      else {
        this.candidate = [
          {
            uid: '1',
            name: '我的姓名',
            grade: '2016级',
            faculty: '数学与信息学院',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '2',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '3',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '4',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '5',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '6',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '7',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '8',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '9',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '10',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '11',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '12',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '13',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '14',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '15',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '16',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '17',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '18',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '19',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '20',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '21',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '22',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '23',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
          {
            uid: '24',
            name: 'a',
            grade: '1',
            faculty: 'c',
            src: 'http://opqi4h4yx.bkt.clouddn.com/photo.jpg',
            type: '0'
          },
        ]
      }
    }
  }

</script>

<style scoped>
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }

  .demo1-item {
    display: block;
    text-align: center;
    color: #666;
    border: 1px solid #ececec;
    padding: 5px 15px;
  }

  .demo1-item-selected {
    background: rgb(81, 195, 50);
    border-radius: 4%;
    border: 1px solid green;
    color: white;
  }


</style>
