<template>
  <div>
    <x-header style="position:fixed;z-index:99; width:100% ;display:block ">投票页</x-header>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {XHeader} from 'vux'
  export default{
    components: {
      XHeader
    }
  }
</script>

<style scoped>

</style>
