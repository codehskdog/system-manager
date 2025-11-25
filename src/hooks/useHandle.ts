import type { Result } from "@/types/api";
import { ElMessageBox, type ElMessageBoxOptions } from "element-plus";


export const useHandleReq = (
    api: (data?: any) => Promise<Result> | Result | void,
    message: string,
    config?: ElMessageBoxOptions
): Promise<Result> => {
    return new Promise((resolve, reject) => {
        ElMessageBox.confirm(message, "温馨提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            draggable: true,
            ...config
        }).then(async () => {
            const res = await api();
            if (res?.success) {
                resolve(res);
            } else {
                reject("网络请求异常" + res?.code);
            }
        });
    });
};