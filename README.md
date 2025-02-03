Lightweight component for rendering svg icons.  
Typescript supports.  
  
The component has two types of rendering:  
1. **usingIds** - using the "teleport", loads the required icon in the component. The id attribute is required in the svg.   
2. **usingAxios** - uses the axios instance from the config that is defined by the user.  

```ts
const props = defineProps<{
    mode?: 'usingAxios' | 'usingIds'
    icon?: string
    path?: string
    useId?: string
    width?: string
    height?: string
}>()
```


    icon - icon name without extension. (if logo.svg, then icon="logo").
    path - icon path from 'public' folder. For vite - /public. (if logo path public/icons, then path="/icons").
    useId - value of attribute "id" in target svg icon.
    width - width of svg.
    height - height of svg.


The component supports a config that users can override in their application.  

    path - Set the "path" property to a global value for all components. The global config can be overridden by passing the corresponding prop to the component.  
    axiosInstance - instance of axios.

```ts
// main.ts file of your application

import {createApp} from 'vue'
import App from './App.vue'
import {defineConfig} from "svgue";
import axios from "axios"; // or import your axios instance and pass it to the config.

const app = createApp(App)


defineConfig({
    path: '/assets/img/icons/',
    axiosInstance: axios.create()
}, app)

app.use(router)
app.mount('#app')
```