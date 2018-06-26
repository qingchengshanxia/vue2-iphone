<template>
  <div class="login-box">
    login
  </div>
</template>

<script>
    export default {
        name: 'login',
        data () {
            return {

            }
        },
        methods:{
            switchpwd(){
                this.ismw = !this.ismw;
            }
        },
        computed:{

        },
        mounted(){

        },
        watch:{
          // 如果 `某个属性` 发生改变，这个属性对应的函数就会运行
        }
    }
</script>
<style scoped lang="less">

</style>