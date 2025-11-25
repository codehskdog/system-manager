<template>
    <ComTable :api="getUserList" :columns="columns" ref="tableRef">
        <template #operation="{ row }">
            <el-button type="primary" size="small" @click="handleEditUser(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDeleteUser(row)">删除</el-button>
        </template>
    </ComTable>
    <UserDialog ref="dialogRef" />
</template>

<script setup lang="tsx">
import ComTable from "@/components/ComTable/index.vue";
import { getUserList, deleteUser, type User } from "@/api/interfaces/user";
import type { TableColumn } from "@/types/table";
import { ref } from "vue";
import UserDialog from "./components/UserDialog.vue";
import { useHandleReq } from "@/hooks/useHandle";

const columns = ref<TableColumn[]>([
    {
        label: "用户名",
        prop: "username",
        align: "center",
        headerAlign: "center",
        showOverflowTooltip: true,
        render: (scope) => {
            return scope.row.username;
        },
    },
    {
        label: "邮箱",
        prop: "email",
        align: "center",
        headerAlign: "center",
    },
    {
        label: "操作",
        prop: "operation",
        align: "center",
        headerAlign: "center",
        width: 200,
    },
]);

const dialogRef = ref<InstanceType<typeof UserDialog>>();
const tableRef = ref<InstanceType<typeof ComTable>>();


const handleEditUser = (row: any) => {
    dialogRef.value?.open({
        status: 'edit',
        row,
        getTableList: () => {
            tableRef.value?.refresh()
        },
    })
};

const handleDeleteUser = async (row: User) => {
    await useHandleReq(() => deleteUser(row?.id), '确定要删除吗')
    tableRef.value?.refresh();
};


</script>

<style lang="scss" scoped></style>
