<template>
  <el-container>
    <el-aside> <Menu /></el-aside>
    <el-container>
      <el-header><Header /></el-header>
      <el-main><Page /></el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Menu from './Menu.vue';
import Header from './Header.vue';
import Page from './Page.vue';
</script>

<style></style>
