<template>
    <ComTable :api="getApiAuthList">
        <template #header>
            <el-button type="primary" @click="createApiAuth" size="small">新增</el-button>
        </template>
    </ComTable>
    <ApiAuthDialog ref="dialogRef" />
</template>

<script setup lang="ts">
import ComTable from '@/components/ComTable/index.vue'
import { getApiAuthList } from '@/api/interfaces/user/permission'
import ApiAuthDialog from './components/ApiAuthDialog.vue';
import { ref } from 'vue';

const dialogRef = ref<InstanceType<typeof ApiAuthDialog>>()

const createApiAuth = () => {
    dialogRef.value?.open({
        status: 'new',
        row: {}
    })
}


</script>

<style scoped lang="scss"></style>