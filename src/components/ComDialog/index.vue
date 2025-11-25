<template>
    <el-dialog v-model="visible" :width="width" :center="center" :draggable="draggable" :fullscreen="fullscreen"
        :align-center="alignCenter" :append-to-body="appendToBody" :close-on-click-modal="false" v-bind="$attrs"
        :data-status="status">
        <template #header>
            <span class="el-dialog__title">{{ statusList.includes(status) ? `${title} - ${statusMap[status]}` : title
            }}</span>
            <i :class="['iconfont icon_screen', fullscreen ? 'icon-suoxiao' : 'icon-fangda']"
                @click="fullscreen = !fullscreen" />
        </template>
        <slot></slot>
        <template v-if="footer && status != 'detail'" #footer>
            <slot name="footer"></slot>
            <el-button v-if="showCancel" @click="cancel" class="dialog-btn">{{ cancelText }}</el-button>
            <el-button type="primary" v-if="showConfirm" @click="submit" class="dialog-btn">{{ confirmText
                }}</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts" name="ComDialog">
import { computed, ref } from "vue";
import { statusList, statusMap } from "@/utils/const";
import { ElMessageBox } from "element-plus";

interface ComDialog {
    modelValue?: boolean;
    status?: string;
    title?: string;
    center?: boolean;
    draggable?: boolean;
    alignCenter?: boolean;
    appendToBody?: boolean;
    width?: number | string;
    footer?: boolean;
    showCancel?: boolean;
    cancelText?: string;
    showConfirm?: boolean;
    confirmText?: string;
    fullscreen?: boolean;
    secondConfirm?: boolean;
    secondConfirmText?: string;
}

const props = withDefaults(defineProps<ComDialog>(), {
    modelValue: false,
    status: "",
    title: "",
    width: 500,
    center: true,
    draggable: true,
    alignCenter: true,
    appendToBody: false,
    footer: true,
    showCancel: true,
    cancelText: "取消",
    showConfirm: true,
    confirmText: "确定",
    fullscreen: false,
    secondConfirm: false
});

const fullscreen = ref(props.fullscreen);

const visible = computed({
    get: () => props.modelValue,
    set: val => emits("update:modelValue", val)
});

const cancel = () => {
    if (props.secondConfirm) {
        ElMessageBox.confirm(props.secondConfirmText, "温馨提示", { type: "warning", draggable: true }).then(() => {
            visible.value = false;
        });
    } else {
        visible.value = false;
    }
};

const submit = () => emits("submit");

const emits = defineEmits(["update:modelValue", "submit"]);
</script>

<style lang="scss" scoped>
.dialog-btn {
    padding: 8px 44px;
}
</style>
