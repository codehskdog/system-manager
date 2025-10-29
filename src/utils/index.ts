import { ScreenSize, BrowserType, DeviceTag, BrowserPrefix } from './enums'; // 导入枚举

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
