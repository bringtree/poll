<template>
  <div>
    <div class="container">
      <img src="../assets/school_type.jpg">
      <input type="text" placeholder="请输入投票码" class="cdkey" v-model="cdkey">
      <input type="button" value="提交" class="submit" @click="submit">
    </div>
    <toast v-model="success" type="text">{{msg}}</toast>
    <toast v-model="error" type="warn">{{msg}}</toast>
  </div>
</template>

<script>
  import {ToastPlugin, Toast} from 'vux'
  import router from '../router/index'
  export default {
    components: {
      ToastPlugin,
      Toast
    },
    data(){
      return {
        error: false,
        success: false,
        cdkey: "",
        msg: ''
      }
    },
    methods: {
      submit () {
        this.$http.post('/oauth/cdkey', {'cdkey': this.cdkey})
          .then((res) => {
            var data = res.data
            if (data.type == 'successfully') {
              this.success = true
              this.error = false
              this.msg = data.msg
              sessionStorage.setItem('cdkey', this.cdkey)
              router.push('header/login')
            }
            else {
              this.success = false
              this.error = true
              this.msg = data.msg
            }
          })
          .catch((e) => {
            this.success = false
            this.error = true
            this.msg = '发生未知错误'
          })
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
