<template>
  <div>
    <div>
      <br>
      <x-progress :percent="Number(percent1)"></x-progress>
      <br>
    </div>
  </div>
</template>

<script>
  import {XProgress, Box} from 'vux'

  export default {
    components: {
      XProgress,
      Box
    },
    name: 'hello',
    data () {
      return {
        percent1: 100
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
