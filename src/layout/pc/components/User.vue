<template>
  <div class="head_user">
    <el-skeleton animated :loading="true">
      <template #template>
        <el-skeleton-item variant="circle" />
      </template>
      <template #default> 用户 </template>
    </el-skeleton>
  </div>
</template>
<script lang="ts" setup></script>

<style scoped>
.head_user {
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-skeleton {
  --el-skeleton-circle-size: 40px;
}
</style>
