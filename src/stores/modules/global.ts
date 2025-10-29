import { useWindow } from '@/hooks/useWindow';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useGlobalStore = defineStore('global', () => {
  const { browserInfo, needCollapse } = useWindow();
  watch(
    () => browserInfo.value.screen,
    (v) => {
      menuCollapsed.value = needCollapse.value;
    }
  );
  const menuCollapsed = ref(needCollapse.value);
  const collapsedMenu = () => {
    menuCollapsed.value = true;
  };
  const expandMenu = () => {
    menuCollapsed.value = false;
  };
  const changeMenuCollapsed = () => {
    if (menuCollapsed.value) {
      expandMenu();
    } else {
      collapsedMenu();
    }
  };

  return { menuCollapsed, changeMenuCollapsed, browserInfo };
});
