import { ElLoading } from "element-plus";

// 全局请求 loading
let loadingInstance: ReturnType<typeof ElLoading.service>;

// 开启 loading
const startLoading = () => {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.23)"
  });
};

// 结束 loading
const endLoading = () => {
  loadingInstance.close();
};

// 全屏加载
let needLoadingRequestCount = 0;

// 显示全屏加载
export const showFullScreenLoading = () => {
  if (needLoadingRequestCount == 0) {
    startLoading();
  }
  needLoadingRequestCount++;
};

// 隐藏全屏加载
export const tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount == 0) {
    endLoading();
  }
};
