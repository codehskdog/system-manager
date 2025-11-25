// 输入框
export const V_INPUT = { pattern: "[^ \x22]+", message: "请输入", trigger: "blur", required: true };

// 选择框
export const V_SELECT = { message: "请选择", trigger: "change", required: true };

// 价格 大于等于0 小于1亿
export const V_PRICE = {
    validator: (_: any, value: any, callback: any) => {
        const reg1 = new RegExp(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/);
        if (!reg1.test(value)) {
            callback(new Error("请输入正确的价格"));
        } else if (value && value > 99999999.99) {
            callback(new Error("价格须不大于99,999,999.99"));
        } else {
            return callback();
        }
    },
    trigger: "blur",
    required: true
};

// 手机号
export const V_PHONE = {
    pattern: /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,
    message: "请输入正确的手机号",
    trigger: "blur",
    required: true
};

// 年龄
export const V_AGE = {
    pattern: /^(0?[0-9]|[1-9][0-9])|^120/,
    message: "请输入正确的年龄0~120",
    trigger: "blur"
};

// 密码（须同时包含字母和数字，可以包含特殊字符）
export const V_PASSWORD = {
    validator: (_: any, value: any, callback: any) => {
        const reg1 = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/); // 须同时包含字母和数字
        const reg2 = new RegExp(/^[0-9a-zA-Z!@#$%^&*()~￥=_+}{":;'?/>.<,`\-\|\[\]]*$/); // 只能包含字母、数字和特殊字符
        if (value && value.length < 8) {
            callback(new Error("密码长度须大于8位"));
        } else if (value && value.length > 32) {
            callback(new Error("密码长度须小于32位"));
        } else if (!reg1.test(value)) {
            callback(new Error("密码须同时包含字母和数字"));
        } else if (!reg2.test(value)) {
            callback(new Error("密码只能包含字母、数字和特殊字符"));
        } else {
            return callback();
        }
    },
    trigger: "blur"
};

// 数量 1-9999
export const V_NUMBER = {
    pattern: /^\+?[1-9]{1}[0-9]{0,3}\d{0,0}$/,
    message: "请输入1-9999之间的整数",
    trigger: "blur",
    required: false
};

// 天数 0-999
export const V_DAY = {
    pattern: /^(0|\+?[1-9]{1}[0-9]{0,2}\d{0,0})$/,
    message: "请输入0-999之间的整数",
    trigger: "blur",
    required: false
};

// 正整数 /^([1-9][0-9]*)$/
export const V_PI = {
    pattern: /^[1-9]\d*$/,
    message: "请输入正整数",
    trigger: "blur",
    required: true
};

// 天数 1-999
export const V_1_999 = {
    pattern: /^(\+?[1-9]{1}[0-9]{0,2}\d{0,0})$/,
    message: "请输入1-999之间的整数",
    trigger: "blur",
    required: true
};

// 大于0 支持两位小数
export const V_NUMBER_2 = {
    pattern: /^([1-9]\d*(\.\d{1,2})?|0\.(?!0+$)\d{1,2})$/,
    message: "格式：大于0，支持两位小数",
    trigger: "blur",
    required: true
};
