import {defaultConfig} from "./config";
import {AxiosInstance} from "axios";

export {default as Svgue} from './components/Svgue.vue'

export function defineConfig(config: SvgueBaseConfig, app: any) {
    app.config.globalProperties.$svgueConfig = {
        ...defaultConfig,
        ...config
    }
}

export interface SvgueBaseConfig {
    path?: string,
    axiosInstance?: AxiosInstance | null,
}