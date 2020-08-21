<template>
  <layout>
    <ol class="tags">
      <Li>
        <span>衣</span>
        <Icons name="right"/>
      </Li>
      <Li>
        <span>食</span>
        <Icons name="right"/>
      </Li>
      <Li>
        <span>住</span>
        <Icons name="right"/>
      </Li>
      <Li>
        <span>行</span>
        <Icons name="right"/>
      </Li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag">新建标签</button>
    </div>
  </layout>

</template>

<script lang="ts">
export default {
  name: 'Lables',
};
</script>

<style lang="scss" scoped>

.tags{
  background: white;
  font-size: 16px;
  padding-left: 15px;
 >li{
   height: 44px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   box-shadow: inset 0px -0.5px 0px #BCBBC1;
   >svg{
     margin-right: 15px;
   }
 }
}
.createTag{
  background: #767676;
  color: white;
  padding: 9px 15px;
  border: none;
  border-radius: 4px;
  //&-wrapper表示createTag的父元素
  &-wrapper{
    text-align: center;
    margin-top: 44px;
  }
}
</style>