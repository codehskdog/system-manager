import { isRef } from 'vue';
import { ScreenSize, BrowserType, DeviceTag, BrowserPrefix } from './enums'; // 导入枚举
import { isArray, isEmpty } from './is';
import { emptyTxt } from './const';

export function getBrowser() {
  const docEl = document.documentElement;
  const ua = navigator.userAgent.toLowerCase();
  const { platform } = navigator;

  const { clientWidth: width, clientHeight: height } = docEl;

  // 1. 检测浏览器类型
  let browserType: BrowserType = BrowserType.OTHER;
  if (ua.includes('firefox')) {
    browserType = BrowserType.FIREFOX;
  } else if (ua.includes('chrome')) {
    browserType = BrowserType.CHROME;
  } else if (ua.includes('safari')) {
    browserType = BrowserType.SAFARI;
  } else if (ua.includes('opera') || ua.includes('opr')) {
    browserType = BrowserType.OPERA;
  } else if (ua.includes('msie') || ua.includes('trident')) {
    browserType = BrowserType.MSIE;
  }

  // 2. 检测设备类型
  const isTouchDevice =
    'ontouchstart' in window || ua.includes('touch') || ua.includes('mobile');

  let deviceTag: DeviceTag = DeviceTag.PC;
  if (isTouchDevice) {
    if (ua.includes('ipad')) {
      deviceTag = DeviceTag.PAD;
    } else if (ua.includes('mobile')) {
      deviceTag = DeviceTag.MOBILE;
    } else if (ua.includes('android')) {
      deviceTag = DeviceTag.ANDROID_PAD;
    }
  }

  // 3. 确定浏览器前缀（使用枚举映射）
  const prefixMap: Record<BrowserType, BrowserPrefix> = {
    [BrowserType.CHROME]: BrowserPrefix.WEBKIT,
    [BrowserType.SAFARI]: BrowserPrefix.WEBKIT,
    [BrowserType.FIREFOX]: BrowserPrefix.MOZ,
    [BrowserType.OPERA]: BrowserPrefix.O,
    [BrowserType.MSIE]: BrowserPrefix.MS,
    [BrowserType.OTHER]: BrowserPrefix.WEBKIT,
  };
  const browserPrefix = prefixMap[browserType];

  // 4. 检测操作系统平台
  const osPlatform = ua.includes('android')
    ? 'android'
    : platform.toLowerCase();

  // 5. 屏幕尺寸分级（使用 ScreenSize 枚举）
  let screenSize: ScreenSize = ScreenSize.FULL;
  if (width < 768) {
    screenSize = ScreenSize.XS;
  } else if (width < 992) {
    screenSize = ScreenSize.SM;
  } else if (width < 1200) {
    screenSize = ScreenSize.MD;
  } else if (width < 1920) {
    screenSize = ScreenSize.XL;
  }

  // 6. 衍生辅助判断
  const isIOS = /\(i[^;]+;( u;)? cpu.+mac os x/.test(ua);
  const isPC = deviceTag === DeviceTag.PC;
  const isMobile = !isPC;
  const isMini = screenSize === ScreenSize.XS || isMobile;

  return {
    width,
    height,
    type: browserType,
    prefix: browserPrefix,
    plat: osPlatform,
    tag: deviceTag,
    screen: screenSize,
    isMobile,
    isIOS,
    isPC,
    isMini,
  };
}



export function deepClone(_obj: any) {
  let obj;
  if (isRef(_obj)) {
    obj = _obj.value;
  } else {
    obj = _obj;
  }
  let objClone: any = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      // 判断是不是自有属性，而不是继承属性
      if (obj.hasOwnProperty(key)) {
        // 判断子元素是否为对象或数组，如果是，递归复制
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone(obj[key]);
        } else {
          // 如果不是，简单复制
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}

// 深度对比判断两个对象是否完全相等
export function deepCompare(x: any, y: any) {
  let i, l, leftChain: any, rightChain: any;
  function compare2Objects(x: any, y: any) {
    let p;
    // remember that NaN === NaN returns false
    // and isNaN(undefined) returns true
    if (isNaN(x) && isNaN(y) && typeof x === "number" && typeof y === "number") {
      return true;
    }
    // Compare primitives and functions.
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (x === y) {
      return true;
    }
    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if (
      (typeof x === "function" && typeof y === "function") ||
      (x instanceof Date && y instanceof Date) ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)
    ) {
      return x.toString() === y.toString();
    }
    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
      return false;
    }
    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
      return false;
    }
    if (x.constructor !== y.constructor) {
      return false;
    }
    if (x.prototype !== y.prototype) {
      return false;
    }
    // Check for infinitive linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
      return false;
    }
    // Quick checking of one object being a subset of another.
    // todo: cache the structure of arguments[0] for performance
    for (p in y) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      } else if (typeof y[p] !== typeof x[p]) {
        return false;
      }
    }
    for (p in x) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      } else if (typeof y[p] !== typeof x[p]) {
        return false;
      }
      switch (typeof x[p]) {
        case "object":
        case "function":
          leftChain.push(x);
          rightChain.push(y);
          if (!compare2Objects(x[p], y[p])) {
            return false;
          }
          leftChain.pop();
          rightChain.pop();
          break;
        default:
          if (x[p] !== y[p]) {
            return false;
          }
          break;
      }
    }
    return true;
  }
  if (arguments.length < 1) {
    return true; //Die silently? Don't know how to handle such case, please help...
    // throw "Need two or more arguments to compare";
  }
  for (i = 1, l = arguments.length; i < l; i++) {
    leftChain = []; //Todo: this can be cached
    rightChain = [];

    if (!compare2Objects(arguments[0], arguments[i])) {
      return false;
    }
  }
  return true;
}


// 处理值无数据情况
export function fmtValue(callValue: any) {
  // 如果当前值为数组，使用 / 拼接（根据需求自定义）
  if (isArray(callValue)) return callValue.length ? callValue.join(" / ") : emptyTxt;
  return isEmpty(callValue) ? emptyTxt : callValue;
}

// 处理 prop 为多级嵌套的情况
export function handleRowAccordingToProp(row: { [key: string]: any }, prop: string) {
  if (!prop.includes(".")) return row[prop] ?? emptyTxt;
  prop.split(".").forEach(item => (row = row[item] || emptyTxt));
  return row;
}

// 处理 prop，当 prop 为多级嵌套时，返回最后一级 prop
export function handleProp(prop: string) {
  const propArr = prop.split(".");
  if (propArr.length == 1) return prop;
  return propArr[propArr.length - 1] as string;
}