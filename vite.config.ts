import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import {viteStaticCopy} from "vite-plugin-static-copy";
import {defineConfig} from "vite";
import {resolve} from "path";
import fs from "fs";

export default defineConfig({
    build: {
        target: "esnext",
        cssCodeSplit: true,
        copyPublicDir: false,
        lib: {entry: { Svgue: 'src/components/Svgue.vue' }, formats: ["es"]},
        rollupOptions: {
            external: ["vue"],
            output: {
                entryFileNames: `components/[name].js`,
                assetFileNames: `components/[name].[ext]`,
                globals: {vue: "Vue"},
                chunkFileNames(chunkInfo) {
                    return `${chunkInfo.name}.js`
                },
            },
        },
    },

    plugins: [
        vue(),
        dts({entryRoot: "./src/components", cleanVueFileName: true, outDir: 'dist/components'}),
        viteStaticCopy({
            targets: [
                {
                    src: "src/index.ts",
                    dest: "",
                    transform: (contents) => contents.toString().replace(/.vue/g, ""),
                },
                {
                    src: "src/config.ts",
                    dest: "",
                },
            ],
        }),
        {
            name: "add-css-link",
            apply: "build",

            writeBundle(option, bundle) {
                const files = Object.keys(bundle)
                    .filter((file) => file.endsWith(".css"))
                    .map((file) => file.replace(".css", ""));

                for (const file of files) {
                    const filePath = resolve("", "dist", `${file}.js`);
                    const cssImport = `import "./Svgue.css";`;
                    const data = fs.readFileSync(filePath, { encoding: "utf8" });
                    fs.writeFileSync(filePath, `${cssImport}\n${data}`);
                }
            },
        },
    ]
});