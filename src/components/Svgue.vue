<template>
    <svg v-if="mode === Mode.usingIds"
         :style="{
            width: width ??'16px',
            height: height ?? '16px',
            minWidth: width ??'16px',
            minHeight: height ??'16px',
         }">
        <use width="100%" height="100%" :href="compBasePath + icon + `.svg${useId ? '#'+useId : '#svgId'}`"></use>
    </svg>
    <div v-if="mode === Mode.usingAxios"></div>
</template>
<script setup lang="ts">
import {computed, getCurrentInstance, ref} from "vue";
import {defaultConfig} from "../config";
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
enum Mode {
    usingAxios,
    usingIds
}

interface SvgueBaseConfig {
    path: string
}

const props = defineProps<{
    mode?: Mode
    icon?: string
    path?: string
    useId?: string
    width?: string
    height?: string
}>()

const mode = ref(props.mode ?? Mode.usingIds)


const compBasePath = computed(() => {
    const config = getConfig()
    if(!config.path.endsWith('/')) config.path = config.path + '/'
    return props.path ? (props.path.endsWith('/') ? props.path : props.path+'/') : config.path
})

function getConfig(): Required<SvgueBaseConfig> {
    const instance = getCurrentInstance()
    const overrideConfig = instance?.appContext.config.globalProperties.$svgueConfig
    return overrideConfig ?? defaultConfig
}
</script>
