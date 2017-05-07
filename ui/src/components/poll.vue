<template>
  <div>
    <div style="padding-top:43px">
      <grid :rows="2">
        <grid-item v-for="i in selecter" :key="selecter.uid">
          <div align="center"><img :src="i.src" width="80%"></div>
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
    <group :title="'赞成票:'+support+'反对票:'+oppose+'弃票:'+giveup">
      <x-button type="primary" @click.native="submit()" :disabled="!condition">{{person==0?'确认':'你还没给'+person+'人投票'}}
      </x-button>
    </group>
  </div>


</template>

<script type="text/ecmascript-6">
  import {Checker, CheckerItem, Grid, Group, GridItem, Popup, XButton} from 'vux'
  export default {
    components: {
      Checker,
      CheckerItem,
      Grid,
      Popup,
      GridItem,
      XButton,
      Group
    },
    data () {
      return {
        person: 24,
        support: 0,
        oppose: 0,
        giveup: 0,
        condition: false,
        selecter: [
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
        menus: {
          menu1: 'Take Photo',
          menu2: 'Choose from photos'
        },
        showMenus: false
      }
    },
    methods: {
      submit () {
        this.$http.post('/oauth/poll', {
          uid: this.uid,
          selecter: this.selecter
        })
          .then(function (res) {
            console.log(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    },
    watch: {
      selecter: {
        handler: function (value) {
          var person, support, oppose, giveup;
          person = 0;
          support = 0;
          oppose = 0;
          giveup = 0;
          for (var i = 0; i < value.length; i++) {
            if (value[i].type == 0) person++;
            if (value[i].type == 1) support++;
            if (value[i].type == 2) oppose++;
            if (value[i].type == 3) giveup++;
            this.person = person;
            this.support = support;
            this.oppose = oppose;
            this.giveup = giveup;
            if (person == 0 && support <= 20) {
              this.condition = true;
            }
            else {
              this.condition = false;
            }
          }
        },
        deep: true
      },
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
    border: 1px solid green;
  }


</style>
