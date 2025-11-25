<template>
    <ComTable :api="getPermissionList">

    </ComTable>
</template>

<script setup lang="ts">
import ComTable from '@/components/ComTable/index.vue'
import { getPermissionList } from '@/api/interfaces/user/permission'


</script>

<style scoped lang="scss"></style>