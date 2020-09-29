<template>
    <div id="app" >
      <router-view/>
<!--        /*根据路径显示需要显示的组件，即router里的index.ts文件里的routes*/-->
    </div>
</template>
<script lang="js">
export default {
  name:'App',
  data() {
    return {
      screenWidth: document.body.clientWidth, // 屏幕尺寸
    }
  },
// 钩子函数
  mounted () {

    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        this.screenWidth = window.screenWidth
      })()
    }
  }
}

</script>
<style lang="scss">
@import "assets/style/reset.scss";
@import "assets/style/helper.scss";
    body {
        line-height: 1.5;
        font-family: $font-hei;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #333;
      background: #E5E5E5;;
    }


//@media (min-width: 375px) {
//  #app{
//    max-width: 375px;
//    margin: 0 auto;
//  }
//}
</style>
