<template>
    <ComFormDialog :dialog="dialog" title="用户">
        <el-form ref="formRef" :rules="rules" v-model="form" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
        </el-form>
    </ComFormDialog>
</template>

<script setup lang="ts">
import type { User } from '@/api/interfaces/user';
import ComFormDialog from '@/components/ComDialog/form.vue';
import useDialogController from '@/hooks/useDialogController.ts';
import { V_INPUT } from '@/utils/validate';
import type { FormRules } from 'element-plus';
import { ref } from 'vue';

const formRef = ref();
const initForm = {}
const rules: FormRules<User> = {
    username: [V_INPUT]
}


const { dialog, form, open } = useDialogController<Partial<User>>({
    initForm,
    formRef,
});

defineExpose({
    open
})

</script>
