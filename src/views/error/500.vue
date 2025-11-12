<template>
  <ErrorPage :img="img" title="500" text="抱歉，您的网络不见了~" />
</template>

<script setup lang="ts" name="500">
import ErrorPage from "./components/ErrorPage.vue";
import img from "@/assets/images/error/500.png";
</script>

<style lang="scss" scoped></style>
