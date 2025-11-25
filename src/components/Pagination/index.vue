<template>
    <el-pagination v-model:current-page="page" v-model:page-size="size" :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleChange"
        @current-change="handleChange" />
</template>

<script setup lang="ts">

defineProps<{
    total: number;
}>();

const page = defineModel<number>('page');
const size = defineModel<number>('size');

const emits = defineEmits(['change']);

const handleChange = () => {
    emits('change')
};



</script>

<style scoped lang="scss"></style>