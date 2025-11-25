import type { TableColumnCtx } from "element-plus";
import type { VNode } from "vue";

export interface TableColumn<T = any> extends Partial<Omit<TableColumnCtx<T>, "children" | "renderCell" | "renderHeader">> {
    _children?: TableColumn<T>[]; // 多级表头
    headerRender?: (scope: HeaderRenderScope<T>) => VNode; // 自定义表头内容渲染（tsx语法）
    render?: (scope: RenderScope<T>) => VNode | string | number; // 自定义单元格内容渲染（tsx语法）
    hide?: boolean;
    [key: string]: any;
}

export type RenderScope<T> = {
    row: T;
    $index: number;
    column: TableColumnCtx<T>;
    [key: string]: any;
};

export type HeaderRenderScope<T> = {
    $index: number;
    column: TableColumnCtx<T>;
    [key: string]: any;
};