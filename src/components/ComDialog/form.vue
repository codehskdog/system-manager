<template>
    <ComDialog v-model="dialog.visible.value" v-bind="$attrs" :status="status" @submit="dialog.submit"
        :show-cancel="dialog.showCancel" :footer="dialog.showFooter" :cancel-text="dialog.cancelText"
        :show-confirm="dialog.showConfirm" :confirm-text="dialog.confirmText">
        <slot> </slot>
        <template #footer v-if="dialog.showFooter">
            <slot name="footer"> </slot>
        </template>
    </ComDialog>
</template>

<script setup lang="ts">
import ComDialog from "./index.vue";
import { computed } from "vue";

import type { Dialog } from "@/hooks/useDialogController.ts";

const props = defineProps<{ dialog: Dialog<any> }>()

const status = computed(() => props.dialog?.realStatus?.value);
</script>

<style></style>
