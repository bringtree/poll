<template>
  <div style="padding-top:43px">
    <img :src="candidate.src">
    <div class="summary">
      <div>姓名: {{candidate.name}}</div>
      <div>年级: {{candidate.grade}}</div>
      <div>学院: {{candidate.faculty}}</div>
      <div>政治面貌: {{candidate.political}}</div>
    </div>
    <div class="detail">
      <div>曾任职务: {{candidate.work}}</div>
      <div>所获荣誉: {{candidate.honor}}</div>
      <div>自我评价: {{candidate.evaluate}}</div>
      <div>座右铭: {{candidate.motto}}</div>
    </div>
    <toast v-model="success" type="text">{{msg}}</toast>
    <toast v-model="error" type="warn">{{msg}}</toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ToastPlugin, Toast} from 'vux'

  export default{
    components: {
      ToastPlugin,
      Toast
    },
    data () {
      return {
        error: false,
        success: false,
        msg: '',
        candidate: {
          src: require('../assets/photo.png'),
          name: '正在加载中',
          grade: '正在加载中',
          faculty: '正在加载中',
          political: '正在加载中',
          work: '正在加载中',
          honor: '正在加载中',
          evaluate: '正在加载中',
          motto: '正在加载中'
        }
      }
    },
    mounted () {
      var form = {uid: this.$route.query.uid}

      this.$http.post('/api/detail', form)
        .then((res) => {
          this.candidate = res.data;
          this.candidate.src = res.data.src
        })
        .catch((e) => {
          this.success = false
          this.error = true
          this.msg = '发生未知错误'
        })
    }

  }
</script>

<style scoped>
  img {
    padding: 0.5rem;
    float: left;
    width: 40%
  }

  .summary {
    padding-top: 2rem
  }

  .detail {
    clear: both
  }

  .summary div,
  .detail div {
    padding: 0.5rem;
  }
</style>
