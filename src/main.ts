import { createApp } from 'vue';
import App from './App.vue';
import '@/styles/index.scss';
import pinia from '@/stores/index';
import router from '@/router/index';
import { ElLoading } from 'element-plus'

const app = createApp(App);
app.use(ElLoading);
app.use(router);

app.use(pinia).mount('#app');
