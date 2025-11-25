import { watch, type Ref } from "vue"

export const useTest = (value:Ref<any>,callback:Function) => {
    watch(value,(v)=>callback(v))
    return {
        value
    }
}