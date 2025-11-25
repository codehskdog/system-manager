import type { Result, ResultData } from "@/types/api";
import { deepClone, deepCompare } from "@/utils";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { watch, reactive, toRef, computed } from "vue";
import type { Ref, UnwrapRef } from 'vue'



type Status = "new" | "edit" | "detail" | "create";

export interface FormDialog<T> {
    defaultForm: T;
    oldForm: T;
    form: T;
    visible: boolean;
    status: Status; // edit | new
    btnLoading: boolean;
    refresh?: Function;
    rowData?: any;
    otherConfig?: { [key: string]: any };
}

export interface Dialog<T> {
    submit: (...args: any[]) => any;
    visible: Ref<boolean>;
    status: Ref<Status | "">; // edit | new
    hideStatus: boolean;
    showCancel: boolean;
    cancelText: string;
    showConfirm: boolean;
    confirmText: string;
    showFooter: boolean;
    realStatus: Ref<Status | "">;
}

export interface FormDialogState<T> {
    submit: (...args: any[]) => any;
    show: (...args: any[]) => any;
    showEdit: (...args: any[]) => any;
    close: (...args: any[]) => any;
    checkSame: (...args: any[]) => any;
    showBtnLoading: (...args: any[]) => any;
    hideBtnLoading: (...args: any[]) => any;
    form: Ref<UnwrapRef<T>>;
    otherConfig: Ref<UnwrapRef<any>>;
    open: (params: { status: Status; row: any; getTableList?: Function }, otherConfig?: any) => void;
    state: UnwrapRef<FormDialog<T>>;
    reset: (...args: any[]) => any;
}

export interface FormDialogController<T> extends FormDialogState<T> {
    dialog: Dialog<T>;
}

export default <T>(params: {
    initForm: T;
    formRef: Ref<FormInstance | undefined>;
    warningMessage?: string;
    showSuccessMsg?: boolean;
    showWarningMsg?: boolean;
    hideStatus?: boolean;
    showCancel?: boolean;
    cancelText?: string;
    showConfirm?: boolean;
    confirmText?: string;
    showFooter?: boolean;
    otherConfig?: { [key: string]: any };
    submitRequest?: (data: Required<T>) => Promise<Result>;
    detailRequest?: (data: any) => Promise<ResultData<T>>;
    submitInterceptor?: (data?: T) => any; // submit之前
    detailInterceptor?: (data?: T) => any; // beforeShow之前 detailRequest之后
    newInterceptor?: (data: any) => any; // status 为new 时使用
    formValidateInterceptor?: (data: any) => any; // formRef校验后 主要处理自定义校验规则
    beforeShow?: (data: any) => any; // 弹窗可见之前 detailRequest和detailInterceptor之后
    onDetailSuccess?: (data: T) => any;
    onSubmitSuccess?: (data: any, res: any) => any;
    onClose?: (data: any) => any;
    onReset?: (data: any) => any;
    onShow?: (data: any) => any;
    detailNotById?: boolean;
    doReset?: boolean;
}): FormDialogController<T> => {
    const {
        initForm,
        formRef,
        warningMessage = "请根据提示补全表单参数",
        showSuccessMsg = true,
        showWarningMsg = true,
        hideStatus,
        showCancel,
        cancelText,
        showConfirm,
        showFooter,
        detailNotById,
        doReset = true,
        submitRequest,
        detailRequest,
        detailInterceptor,
        submitInterceptor,
        formValidateInterceptor,
        newInterceptor,
        beforeShow,
        onDetailSuccess,
        onSubmitSuccess,
        onClose,
        onReset,
        onShow
    } = params;

    const state = reactive<FormDialog<T>>({
        defaultForm: initForm,
        oldForm: initForm,
        form: initForm,
        visible: false,
        status: "new",
        btnLoading: false
    });

    watch(
        () => state.visible,
        visible => {
            if (!visible) {
                onClose && onClose(deepClone(state.form));
            }
        }
    );

    const show = async (row: any) => {
        try {
            doReset && reset();
            state.rowData = row;
            beforeShow && beforeShow(deepClone(state.form));
            if (newInterceptor) {
                state.form = await newInterceptor(deepClone(row));
            }

            state.visible = true;
            onShow && onShow(state.form);
        } catch (error) {
            console.error(error, "show");
        }
    };
    const showEdit = async (data: any) => {
        try {
            doReset && reset();
            state.rowData = data;
            if (detailRequest) {
                const params = detailNotById ? data : { id: data.id };
                const res = detailRequest ? await detailRequest(params) : { data };
                const _data = detailInterceptor ? await detailInterceptor(deepClone(res.data)) : res.data;
                state.oldForm = _data;
                state.form = _data;
                onDetailSuccess && onDetailSuccess(_data);
            }
            beforeShow && beforeShow(deepClone(state.form));
            state.visible = true;
            onShow && onShow(deepClone(state.form));
        } catch (error) {
            console.error(error, "showEdit");
        }
    };
    const close = async (callback?: Function) => {
        if (callback) {
            await callback();
        }

        state.btnLoading = false;
        // reset();
        state.visible = false;
    };
    const reset = () => {
        state.form = deepClone(state.defaultForm);
        state.rowData = {};
        state.oldForm = deepClone(state.defaultForm);
        state.otherConfig = {};
        if (formRef?.value) {
            formRef?.value.resetFields()!;
        }
        onReset && onReset(deepClone(state.form));
    };
    const checkSame = () => {
        return deepCompare(state.form, state.oldForm);
    };
    const submit = async () => {
        const done = async () => {
            if (submitRequest) {
                state.btnLoading = true;
                const _data = submitInterceptor ? await submitInterceptor(deepClone(state.form)) : state.form;
                const res = await submitRequest(_data).finally(() => {
                    state.btnLoading = false;
                });
                if (res.success) {
                    // console.log("res success");
                    showSuccessMsg && ElMessage.success("操作成功");
                    onSubmitSuccess && onSubmitSuccess(deepClone(state.form), res);
                    close();
                } else {
                    showWarningMsg && ElMessage.warning("操作失败");
                }
            } else {
                close();
            }

            if (state.refresh) {
                state.refresh();
            }
        };
        if (formRef?.value) {
            formRef?.value.validate(async (valid: boolean) => {
                if (!valid) {
                    ElMessage.warning(warningMessage);
                    return
                }

                const otherCheck = formValidateInterceptor ? await formValidateInterceptor(deepClone(state.form)) : true;

                if (!otherCheck) {
                    return
                }
                await done();
            })
        } else {
            await done();
        }
    };

    const open = (params: { status: Status; row: any; getTableList?: Function }, otherConfig: any) => {
        try {
            const { status, row = {}, getTableList } = params;
            state.status = status;
            state.refresh = getTableList;
            // state.status = status;

            if (status == "edit" || status == "detail") {
                showEdit(row);
            } else {
                show(row);
            }

            state.otherConfig = otherConfig || {};
        } catch (error) {
            console.error(error, "open");
        }
    };

    const showBtnLoading = () => {
        state.btnLoading = true;
    };
    const hideBtnLoading = () => {
        state.btnLoading = false;
    };

    return {
        submit,
        show,
        showEdit,
        close,
        checkSame,
        showBtnLoading,
        hideBtnLoading,
        open,
        reset,
        state,
        form: toRef(state, "form"),
        otherConfig: toRef(state, "otherConfig"),
        dialog: {
            submit,
            status: computed(() => state.status),
            realStatus: computed(() => {
                const hide = typeof hideStatus == "boolean" ? hideStatus : false;
                if (hide) {
                    return "";
                } else {
                    return state.status;
                }
            }),
            visible: toRef(state, "visible"),
            hideStatus: typeof hideStatus == "boolean" ? hideStatus : false,
            showCancel: typeof showCancel == "boolean" ? showCancel : true,
            cancelText: cancelText ?? "取消",
            showConfirm: typeof showConfirm == "boolean" ? showConfirm : true,
            confirmText: cancelText ?? "确定",
            showFooter: typeof showFooter == "boolean" ? showFooter : true
        }
    };
};
