<template>
  <div>About</div>
</template>

<script setup>
import { request } from '@/api/index';

request.post('/api/user');
</script>

<style></style>
