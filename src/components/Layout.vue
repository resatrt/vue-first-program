<template>
  <div class="layout-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <!--                 /*:class="classPrefix && `${classPrefix}-content`"这个操作是让外部使用这个组件的-->
      <!--                             可以批量添加一个指定前缀的类，然后在哪个组件里写样式，有限制，需要另外写个style不能加scoped-->
      <!--                            就是允许其他组件调用的*/-->
      <!--            slot是把这个位置传进来的东西放到这里显示-->
      <slot/>
    </div>
    <Nav class='footer'/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout',
  props: ['classPrefix'],
  data() {
    return {
      screenHeight: document.documentElement.clientHeight - 62,
    };
  }
};
</script>

<style lang="scss" scoped>
.layout-wrapper {

  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
  overflow: auto; /*让超过屏幕的内容可滚动，不影响底部导航栏*/
}
.footer{
  margin-top: auto;

}
</style>