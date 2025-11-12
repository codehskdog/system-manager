<template>
  <ErrorPage :img="img" title="403" text="抱歉，您无权访问该页面~" />
</template>

<script setup lang="ts" name="403">
import ErrorPage from "./components/ErrorPage.vue";
import img from "@/assets/images/error/403.png";
</script>

<style lang="scss" scoped></style>
