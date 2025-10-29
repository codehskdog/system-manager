<template>
  <el-config-provider>
    <PCLayout />
  </el-config-provider>
</template>

<script setup lang="ts">
import PCLayout from './pc/index.vue';
import { useWindow } from '@/hooks/useWindow';
import { useGlobalStore } from '@/stores/modules/global';
import { watch } from 'vue';
</script>

<style></style>
