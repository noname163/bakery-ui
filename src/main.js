import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Button, Input, Form, Table } from 'ant-design-vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Button).use(Input).use(Form).use(Table)

app.mount('#app')
