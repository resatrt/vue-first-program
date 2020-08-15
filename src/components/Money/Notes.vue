<template>
    <div>
        <lable class="notes">
            <span class="name">备注</span>
            <input type="text" placeholder="在这里输入备注">
        </lable>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Notes'
    };
</script>

<style lang="scss" scoped>
    .notes {
        background: #f5f5f5;
        display: flex;
        font-size: 14px;
        padding-left: 16px;
        align-items: center;

        > .name {
            padding-right: 16px;
        }

        > input {
            flex-grow: 1;
            height: 64px;
            background: transparent;
            padding-right: 16px;
            border: none;
        }
    }

</style>