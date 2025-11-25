<template>
  <el-menu default-active="/" :collapse="menuCollapsed" :collapse-transition="false" class="menu" router>
    <el-menu-item index="/">
      <el-icon>
        <HomeFilled />
      </el-icon>
      <template #title>首页</template>
    </el-menu-item>

    <el-menu-item index="/about">
      <el-icon>
        <Setting />
      </el-icon>
      <template #title>About</template>
    </el-menu-item>
    <el-menu-item index="/user">
      <el-icon>
        <User />
      </el-icon>
      <template #title>用户管理</template>
    </el-menu-item>
    <el-menu-item index="/role">
      <el-icon>
        <Setting />
      </el-icon>
      <template #title>角色管理</template>
    </el-menu-item>
    <el-menu-item index="/auth">
      <el-icon>
        <Setting />
      </el-icon>
      <template #title>权限管理</template>
    </el-menu-item>
    <el-menu-item index="/apiAuth">
      <el-icon>
        <Setting />
      </el-icon>
      <template #title>接口管理</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { HomeFilled, Setting, User } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useGlobalStore } from '@/stores/modules/global';
import { storeToRefs } from 'pinia';

const store = useGlobalStore();
const { menuCollapsed } = storeToRefs(store);
const width = computed(() => {
  return menuCollapsed.value ? '80px' : '200px';
});





</script>

<style style lang="scss" scoped>
.menu {
  width: 100%;
  height: 100vh;
  width: v-bind(width);
}
</style>
