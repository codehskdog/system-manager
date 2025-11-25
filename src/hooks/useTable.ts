import { computed, ref } from "vue";

interface UseTableColumn {
    api: Function;
    callback?: Function;
    initParams?: object;
    pageAble?: boolean;
    interceptor?: Function
}

export const useTable = (options: UseTableColumn) => {
    const data = ref([]);
    const loading = ref(false);
    const total = ref(0);
    const page = ref({
        page: 1,
        size: 10,
    });

    const query = async (params?: object) => {
        try {
            loading.value = true;
            const _page = options.pageAble ? { ...page.value } : {};
            const _params = { ...options.initParams, ..._page, ...params, };
            const queryParams = options.interceptor ? options.interceptor(_params) : _params;
            const res = await options.api(queryParams);
            const _data = options.callback ? options.callback(res.data) : res.data;
            data.value = _data.list;
            total.value = _data.total;
            loading.value = false
        } catch (error) {
            loading.value = false
        }
    };
    query();

    const setPage = (_page: number, size: number) => {
        page.value = { page: _page, size }
    };

    return {
        query,
        refresh: () => query(),
        setPage,
        data,
        loading: computed(() => loading.value),
        total,
        page: computed(() => page.value),
    };

}