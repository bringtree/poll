<template>
  <div style="padding-top:43px">
    <img :src="src">
    <div class="summary">
      <div>姓名: {{name}}</div>
      <div>年级: {{grade}}</div>
      <div>学院: {{faculty}}</div>
      <div>政治面貌: {{political}}</div>
    </div>
    <div class="detail">
      <div>曾任职务: {{work}}</div>
      <div>所获荣誉: {{honor}}</div>
      <div>自我评价: {{evaluate}}</div>
      <div>座右铭: {{motto}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default{
    data () {
      return {
        src: require('../assets/photo.png'),
        name: '我的姓名',
        grade: '2016级',
        faculty: '数学与信息学院',
        political: '党员',
        work: '',
        honor: '',
        evaluate: '',
        motto: ''
      }
    },
    mounted () {
      var uid = this.$route.query.uid
      console.log(uid)
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
