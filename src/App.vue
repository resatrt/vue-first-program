<template>
    <div id="app">
      <router-view/>
<!--        /*根据路径显示需要显示的组件，即router里的index.ts文件里的rutes*/-->
    </div>
</template>

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


@media (min-width: 375px) {
  #app{
    max-width: 375px;
    margin: 0 auto;
  }
}
</style>
