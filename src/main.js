import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Button, Input, Form, Table, Menu, Dropdown, Layout } from 'ant-design-vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Button).use(Input).use(Form).use(Table).use(Menu).use(Dropdown).use(Layout)

app.mount('#app')
