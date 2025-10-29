// 屏幕尺寸枚举
export enum ScreenSize {
  XS = 'xs', // <768px
  SM = 'sm', // 768px~991px
  MD = 'md', // 992px~1199px
  XL = 'xl', // 1200px~1919px
  FULL = 'full', // >=1920px
}

// 浏览器类型枚举
export enum BrowserType {
  CHROME = 'chrome',
  SAFARI = 'safari',
  FIREFOX = 'firefox',
  OPERA = 'opera',
  MSIE = 'msie',
  OTHER = 'other',
}

// 设备标签枚举
export enum DeviceTag {
  PC = 'pc',
  MOBILE = 'mobile',
  PAD = 'pad',
  ANDROID_PAD = 'androidPad',
}

// 浏览器前缀枚举
export enum BrowserPrefix {
  WEBKIT = 'webkit',
  MS = 'ms',
  MOZ = 'Moz',
  O = 'O',
}
