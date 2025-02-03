Lightweight component for rendering svg icons.  
  
The component has two types of rendering:  
1. **usingIds** - using the teleport, loads the required icon in the component. The id attribute is required in the svg.   
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
