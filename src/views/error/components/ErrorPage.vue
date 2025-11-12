<template>
  <div class="not_container">
    <img :src="props.img" :alt="props.title" class="not_img" />
    <div class="not_detail">
      <h2>{{ props.title }}</h2>
      <h4>{{ props.text }}</h4>
      <el-button type="primary" @click="goBack">返回上一页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="ErrorPage">
import { useRouter } from "vue-router";
interface ErrorPage {
  img: string;
  title: string;
  text: string;
  back?: Function;
}
const props = defineProps<ErrorPage>();
const router = useRouter();

const goBack = () => {
  if (props.back) {
    props.back();
    return;
  }
  router.back();
};
</script>

<style lang="scss" scoped>
.not_container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .not_img {
    width: 200px;
    margin-right: 120px;
  }
  .not_detail {
    display: flex;
    flex-direction: column;
    h2,
    h4 {
      padding: 0;
      margin: 0;
    }
    h2 {
      font-size: 40px;
      color: var(--el-text-color-primary);
    }
    h4 {
      margin: 20px 0;
      font-size: 20px;
      font-weight: normal;
      color: var(--el-text-color-regular);
    }
    .el-button {
      width: 100px;
    }
  }

  @media only screen and (max-width: 768px) {
    .not_img {
      width: 200px;
      margin-right: 0;
    }
  }
}
</style>
