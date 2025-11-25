<template>
    <ComTable :api="getRoleList">

    </ComTable>
</template>

<script setup lang="ts">
import ComTable from '@/components/ComTable/index.vue'
import { getRoleList } from '@/api/interfaces/user/permission'


</script>

<style scoped lang="scss"></style>