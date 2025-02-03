<template>
    <svg v-if="mode === 'usingIds'"
         :style="{
            width: width ??'16px',
            height: height ?? '16px',
            minWidth: width ??'16px',
            minHeight: height ??'16px',
         }">
        <use width="100%" height="100%" :href="compBasePath + icon + `.svg${useId ? '#'+useId : '#svgId'}`"></use>
    </svg>
    <div v-if="mode === 'usingAxios'"
            :style="{
            width: width ??'16px',
            height: height ?? '16px',
            minWidth: width ??'16px',
            minHeight: height ??'16px',
         }"
         class="svgue-svg-container-axios"
         :id="`${uuid}-${icon}`"></div>
</template>
<script setup lang="ts">
import {computed, getCurrentInstance, onMounted, ref} from "vue";
import {defaultConfig} from "../config";
import {SvgueBaseConfig} from "../index";
/**
 * Vue3 component for render svg icons.
 *
 * Component props:
 * - icon : string
 *
 *      Icon name without extension. If your image called "my-logo.svg", then icon="my-logo".
 *
 * - path : string
 *
 *      Path to the icon. Runs from a public directory. For Vite/public.
 *      Example: if your icon is in the public/assets/images folder then path="/assets/images/".
 *
 * - width : string
 *
 *      Icon width.
 *
 * - height : string
 *
 *      Icon height.
 *
 * - mode : usingAxios | usingIds
 *
 *      This component may render by two path:
 *      1. using axios to upload svg from local folder.
 *      2. using the "use" tag to teleport the icon to this component.
 *
 *  - useId : string
 *
 *      If mode = usingIds, then you must set attribute id to your svg icon.
 *      The value of this attribute you must set to prop useId.
 *      For example:
 *      Your svg has attribute id="myIconId",
 *      means the value prop useId="myIconId".
 */

const alphabet: string[] = ["A", "B", "C", "D", "F", "I", "G", "H", "J", "K", "L", "O", "P", "Q", "W", "S"];
const uuid = ref("svgue-");
const config = ref<SvgueBaseConfig|null>(null)
const props = defineProps<{
    mode?: 'usingAxios' | 'usingIds'
    icon?: string
    path?: string
    useId?: string
    width?: string
    height?: string
}>()

const mode = ref(props.mode ?? 'usingIds')

function withSlash(param: string) {
    if(param.endsWith('/')) return param
    else return param + '/'
}

function round(x: number, precision: number){
    let delimeter = '1';
    for(let i = 0; i < precision; i++) {
        delimeter += '0'
    }
    const numberDelimeter = Number(delimeter)
    return Math.round(x * numberDelimeter) / numberDelimeter
}

const generateUUID = () => {
    for (let i = 0; i < 6; i++) {
        const number: number = round(Math.random() * 10, 0);
        if (number >= 4) {
            const number = round(Math.random() * 10, 0);
            uuid.value += alphabet[number];
        }
        uuid.value += number;
    }
};

const compBasePath = computed(() => {
    if(props.path) {
        return withSlash(props.path)
    }
    if(config.value && config.value.path) {
        return withSlash(config.value.path)
    }
    else return defaultConfig.path
})

function getConfig(): Required<SvgueBaseConfig> {
    const instance = getCurrentInstance()
    const overrideConfig = instance?.appContext.config.globalProperties.$svgueConfig
    return overrideConfig ?? defaultConfig
}


onMounted(async () => {
    config.value = getConfig()
    if(props.mode === 'usingAxios') {
        if(!config.value || !config.value.axiosInstance) {
            throw new Error('No Axios instance found. Please provide config.axiosInstance in main.{js,ts} file, or use "usingIds" mode.')
        }
        generateUUID();
        const response = await config.value.axiosInstance.get(`${compBasePath.value}${props.icon}.svg`)
        if(response?.data) {
            const container = document.querySelector(`#${uuid.value}-${props.icon}`);
            if (container) {
                container.innerHTML = response.data;
            }
        }
    }
})
</script>
<style scoped>
.svgue-svg-container-axios {
    position: relative;
    & > * {
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
    }
}
</style>
