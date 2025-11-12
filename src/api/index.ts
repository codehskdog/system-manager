import { ElNotification } from 'element-plus';
import { extend } from 'umi-request';
import router from '@/router';
import {
  showFullScreenLoading,
  tryHideFullScreenLoading,
} from '@/utils/serviceLoading';

export const request = extend({
  timeout: 3000,
  errorHandler: (error) => {
    tryHideFullScreenLoading();
    ElNotification.error({
      title: '请求异常',
      message: error.data?.message || error.message,
      duration: 3000,
    });

    return Promise.reject(error);
  },
});

request.interceptors.request.use((url, options) => {
  showFullScreenLoading();
  const _url = `/api` + url;
  const meta = router.currentRoute.value.meta;
  let skipLogin = meta?.unNeedAuth;
  if (skipLogin) {
    return {
      url: _url,
      options,
    };
  }
  const token = localStorage.getItem('token');
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `${token}`,
    };
  } else {
    router.push('/about');
    throw new Error('请先登录');
  }
  return {
    url,
    options,
  };
});

request.interceptors.response.use(async (response) => {
  tryHideFullScreenLoading();
  if (!response.ok) {
    throw new Error('请求失败');
  }
  const data = await response.clone().json();
  console.log(data);
  return response;
});
