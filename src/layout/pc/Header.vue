<template>
  <div class="header">
    <el-icon size="20" class="icon">
      <component
        :is="menuCollapsed ? Expand : Fold"
        @click="changeMenuCollapsed"
      />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/modules/global';
import { Expand, Fold } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';

const globalStore = useGlobalStore();
const { changeMenuCollapsed } = globalStore;
const { menuCollapsed } = storeToRefs(globalStore);
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #e3e3e3;
  // background-color: $header-bg-color;
  .icon {
    cursor: pointer;
  }
}
</style>
