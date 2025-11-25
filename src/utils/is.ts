// 判断值是否为某个类型
export function is(val: unknown, type: string) {
    return Object.prototype.toString.call(val) == `[object ${type}]`;
}

// 是否为函数
export function isFunction<T = Function>(val: unknown): val is T {
    return is(val, "Function");
}

// 是否已定义
export const isDef = <T = unknown>(val?: T): val is T => {
    return typeof val != "undefined";
};

// 是否未定义
export const isUnDef = <T = unknown>(val?: T): val is T => {
    return !isDef(val);
};

// 是否为对象
export const isObject = (val: any): val is Record<any, any> => {
    return val != null && is(val, "Object");
};

// 是否为时间
export function isDate(val: unknown): val is Date {
    return is(val, "Date");
}

// 是否为数值
export function isNumber(val: unknown): val is number {
    return is(val, "Number") && !Number.isNaN(val);
}

// 是否为AsyncFunction
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
    return is(val, "AsyncFunction");
}

// 是否为promise
export function isPromise<T = any>(val: unknown): val is Promise<T> {
    return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

// 是否为字符串
export function isString(val: unknown): val is string {
    return is(val, "String");
}

// 是否为布尔类型
export function isBoolean(val: unknown): val is boolean {
    return is(val, "Boolean");
}

// 是否为数组
export function isArray(val: any): val is Array<any> {
    return val && Array.isArray(val);
}

// 是否为客户端
export const isClient = () => {
    return typeof window != "undefined";
};

// 是否为浏览器
export const isWindow = (val: any): val is Window => {
    return typeof window != "undefined" && is(val, "Window");
};

// 是否为 element 元素
export const isElement = (val: unknown): val is Element => {
    return isObject(val) && !!val.tagName;
};

// 是否为 null
export function isNull(val: unknown): val is null {
    return val == null;
}

// 是否为 null || undefined
export function isNullOrUnDef(val: unknown): val is null | undefined {
    return isUnDef(val) || isNull(val);
}

// 是否为 16 进制颜色
export const isHexColor = (str: string) => {
    return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
};

// 是否为空
export const isEmpty = (value: any) => {
    if (value == null || value == undefined) {
        return true;
    } else if (isString(value)) {
        return value.trim().length == 0;
    } else if (isObject(value) && Object.keys(value).length == 0) {
        return true;
    } else if (value.length != undefined) {
        return value.length == 0;
    }
    return false;
};

export const isNotEmpty = (value: any) => {
    return !isEmpty(value);
};

// 对象里的每一项是否都为空
export const isEmptyObj = (obj: any): boolean => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (isNotEmpty(obj[key])) {
                return false;
            }
        }
    }
    return true;
};
