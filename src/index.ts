import {defaultConfig} from "./config";

export {default as Svgue} from './components/Svgue.vue'

export function defineConfig(config: SvgueBaseConfig, app: any) {
    app.config.globalProperties.$svgueConfig = {
        ...defaultConfig,
        ...config
    }
}

export interface SvgueBaseConfig {
    path?: string
}