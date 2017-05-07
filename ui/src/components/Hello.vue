<template>
  <div>
    <div class="container">
      <img src="../assets/school_type.jpg">
      <input type="text" placeholder="请输入投票码" class="cdkey" v-model="cdkey">
      <input type="button" value="提交" class="submit" @click="submit">
    </div>
  </div>
</template>

<script>
  import router from '../router/index'
  export default {
    data(){
      return {
        cdkey: ""
      }
    },
    methods: {
      submit () {
        this.$http.post('/oauth/cdkey',this.cdkey)
          .then(function () {

          })
          .catch (function () {

        })
        sessionStorage.setItem('cdkey', this.cdkey)
        router.push('header/login')
      }
    },
    mounted () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    margin-top: 8rem;
  }

  .container img {
    width: 50%;
    margin: 0 auto;
    display: block;
  }

  .cdkey {
    width: 5rem;
    margin: 0 auto;
    margin-top: 1rem;
    display: block;

  }

  .submit {
    width: 5rem;
    margin: 0 auto;
    display: block;
    border: 0.2rem skyblue solid;
    border-radius: 2rem;
    background: white;
  }
</style>
