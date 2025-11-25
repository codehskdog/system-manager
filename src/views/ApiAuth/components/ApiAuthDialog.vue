<<template>
    <ComFormDialog :dialog="dialog" title="接口" width="400px">
        <el-form ref="formRef" :rules v-model="form" :model="form" label-width="80px">
            <el-form-item label="接口名" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="接口路径" prop="path">
                <el-input v-model="form.path"></el-input>
            </el-form-item>
            <el-form-item label="接口描述" prop="description">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="请求方法" prop="method">
                <el-select v-model="form.method">
                    <el-option v-for="method in methods" :key="method" :value="method">
                        {{ method }}
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </ComFormDialog>
</template>

    <script setup lang="ts">
    import { createApiAuth, type ApiAuth } from '@/api/interfaces/user/permission';
    import ComFormDialog from '@/components/ComDialog/form.vue';
    import useDialogController from '@/hooks/useDialogController.ts';
    import { V_INPUT, V_SELECT } from '@/utils/validate';
    import type { FormRules } from 'element-plus';
    import { ref } from 'vue';

    const methods = ['GET', 'POST', 'PUT', 'DELETE']

    const formRef = ref();
    const initForm = {}
    const rules: FormRules<ApiAuth> = {
        name: [V_INPUT],
        description: [V_INPUT],
        method: [V_SELECT],
        path: [V_INPUT],
    }


    const { dialog, form, open } = useDialogController<Partial<ApiAuth>>({
        initForm,
        formRef,
        submitRequest: createApiAuth,
    });

    defineExpose({
        open
    })

</script>
