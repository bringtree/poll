<template>
  <div>
    <group title="投票">
      <div v-for="i in selecter">
        <!--{{i}}-->
        <cell :title="'候选人'+i.name">
          <checker v-model="i.type" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
            <checker-item value="1">赞成</checker-item>
            <checker-item value="2">反对</checker-item>
            <checker-item value="3">弃票</checker-item>
          </checker>
        </cell>
      </div>
    </group>

    <group :title="'赞成票:'+support+'反对票:'+oppose+'弃票:'+giveup">
      <x-button type="primary" @click.native="submit()" :disabled="!condition">{{'你还没给'+person+'人投票'}}</x-button>
    </group>

  </div>
</template>

<script>
  import {Checker, CheckerItem, Popup, Divider, Group, Cell, Range, XButton, Toast} from 'vux'

  export default {
    components: {
      Checker,
      CheckerItem,
      Divider,
      Group,
      Cell,
      Popup,
      Range,
      XButton
    },
    name: 'hello',
    data () {
      return {
        person: 24,
        support: 0,
        oppose: 0,
        giveup: 0,
        condition: false,
        selecter: [
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
      }
    },
    methods: {
      submit: function () {
        console.log(this.selecter)
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
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box {
    padding: 0 15px;
  }

  .demo1-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
  }

  .demo1-item-selected {
    border: 1px solid green;
  }
</style>
