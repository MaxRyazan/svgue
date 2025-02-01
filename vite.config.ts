import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import {viteStaticCopy} from "vite-plugin-static-copy";
import {defineConfig} from "vite";

export default defineConfig({
    build: {
        target: "esnext",
        cssCodeSplit: true,
        copyPublicDir: false,
        lib: {entry: { Svgue: 'src/components/Svgue.vue' }, formats: ["es"]},
        rollupOptions: {
            external: ["vue"],
            output: {
                entryFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`,
                globals: {vue: "Vue"},
                chunkFileNames(chunkInfo) {
                    return `${chunkInfo.name}.js`
                },
            },
        },
    },

    plugins: [
        vue(),
        dts({entryRoot: "./src/components", cleanVueFileName: true}),
        viteStaticCopy({
            targets: [
                {
                    src: "src/index.ts",
                    dest: "",
                    transform: (contents) => contents.toString().replace(/.vue/g, ""),
                },
            ],
        })
    ]
});