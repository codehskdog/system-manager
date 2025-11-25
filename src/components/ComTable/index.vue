<template>
    <div class="com-table">
        <div class="table-header">
            <slot name="header">
                <span></span>
            </slot>
            <div class="table-tools">
                <div class="tool-item" @click="refresh">
                    <el-icon>
                        <Refresh />
                    </el-icon>
                </div>
            </div>
        </div>
        <el-table :data="data" ref="tableRef" class="table-box" :loading="loading" border v-bind="$attrs">
            <template v-for="(item, index) of columns" :key="index" v-bind="item">
                <Column :column="item">
                    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                        <slot :name="slot" v-bind="scope" />
                    </template>
                </Column>
            </template>
        </el-table>
        <Pagination :total="total" v-model:page="page.page" v-bind:size="page.size" @change="handleChangePage" />
    </div>
</template>

<script setup lang="ts" name="ComTable">
import { useTable } from '@/hooks/useTable'
import type { TableColumn } from '@/types/table';
import Column from './column.vue';
import Pagination from '@/components/Pagination/index.vue'
import { ref } from 'vue';
import type { ElTable } from 'element-plus';
import { Refresh } from '@element-plus/icons-vue'

interface Props {
    api: Function;
    callback?: Function;
    initParams?: object;
    pageAble?: boolean;
    interceptor?: Function;
    columns?: Array<TableColumn>;
}

const props = withDefaults(defineProps<Props>(), {
    pageAble: true,
});

const tableRef = ref<InstanceType<typeof ElTable>>();


const { data, total, loading, page, refresh, setPage, query } = useTable({
    api: props.api,
    callback: props.callback,
    initParams: props.initParams,
    pageAble: props.pageAble,
    interceptor: props.interceptor,
})

const handleChangePage = () => {
    query()
};


defineExpose({
    refresh,
    el: tableRef
})

</script>

<style scoped lang="scss">
.com-table {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .table-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .table-tools {
            display: flex;
            align-items: center;
            gap: var(--com-table-tool-item-gap);

            .tool-item {
                font-size: var(--com-table-tool-icon-size);
                height: var(--com-table-tool-width);
                width: var(--com-table-tool-width);
                border-radius: var(--com-table-tool-width);
                border: 1px solid #dcdfe6;
                display: grid;
                place-content: center;
                cursor: pointer;
            }
        }
    }

    .table-box {
        flex: 1;
        margin-bottom: 20px;
    }
}
</style>