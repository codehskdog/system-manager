import { onMounted, onUnmounted, ref } from 'vue';
import { getBrowser } from '@/utils/index'; // 导入浏览器信息检测函数
import {
  ScreenSize,
  BrowserType,
  DeviceTag,
  BrowserPrefix,
} from '@/utils/enums'; // 导入类型

export type BrowserInfo = {
  width: number;
  height: number;
  type: BrowserType;
  prefix: BrowserPrefix;
  plat: string;
  tag: DeviceTag;
  screen: ScreenSize;
  isMobile: boolean;
  isIOS: boolean;
  isPC: boolean;
  isMini: boolean;
};
export const useWindow = () => {
  // 用ref存储响应式浏览器信息
  const browserInfo = ref<BrowserInfo>({} as BrowserInfo);
  const needCollapse = ref(false);

  // 更新浏览器信息的方法
  const updateBrowserInfo = () => {
    browserInfo.value = getBrowser();
    const need = [ScreenSize.XS, ScreenSize.SM];
    if (need.includes(browserInfo.value.screen)) {
      needCollapse.value = true;
    } else {
      needCollapse.value = false;
    }
  };

  updateBrowserInfo();
  // 监听窗口变化（无节流，实时触发）
  window.addEventListener('resize', updateBrowserInfo);

  onUnmounted(() => {
    // 移除监听，避免内存泄漏
    window.removeEventListener('resize', updateBrowserInfo);
  });

  return {
    browserInfo,
    needCollapse,
    // 手动更新方法
    updateBrowserInfo,
  };
};
