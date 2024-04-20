import './assets/main.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { md2 } from 'vuetify/blueprints'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import {mdi} from "vuetify/lib/iconsets/mdi";

const vuetify = createVuetify({
    components,
    directives,
    blueprint: md2,    
    icons: {
        defaultSet: 'mdi',
        sets: {
            mdi,
        }
    },
})

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')
