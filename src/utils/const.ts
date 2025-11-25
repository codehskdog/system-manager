export const emptyTxt = '--'
export const mtl = (obj: Record<string, string>) => Object.keys(obj).map(i => i);

export const statusMap: Record<string, string> = { new: "新增", edit: "编辑", copy: "复制", detail: "详情" };
export const statusList: string[] = mtl(statusMap);