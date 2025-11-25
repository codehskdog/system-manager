<template>
    <Column v-bind="column" />
</template>

<script setup lang="tsx" name="TableColumn">
import type { HeaderRenderScope, RenderScope, TableColumn } from "@/types/table";
import { fmtValue, handleProp } from "@/utils";
import { useSlots } from "vue";

defineProps<{ column: TableColumn }>();
const slots = useSlots();

const Column = (item: TableColumn) => {
    return (
        <>
            {
                !item.hide && <el-table-column {...item} fixed={item.fixed}
                    showOverflowTooltip={item.showOverflowTooltip}
                >
                    {
                        {
                            default: (scope: RenderScope<any>) => {
                                if (item._children) return item._children.map(child => Column(child));
                                if (item.render) return item.render(scope);

                                if (slots[handleProp(item.prop!)]) return slots[handleProp(item.prop!)]!(scope);
                                return fmtValue(scope.row[item.prop!]);
                            },
                            header: (scope: HeaderRenderScope<any>) => {
                                if (item.headerRender) return item.headerRender(scope);
                            }
                        }
                    }
                </el-table-column>
            }
        </>
    );
};
</script>

<style scoped></style>
