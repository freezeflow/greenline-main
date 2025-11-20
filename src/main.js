import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

app.use(Toast, {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  transition: "Vue-Toastification__bounce",

  // Custom Greenline theme
  toastClassName: "greenline-toast",
  bodyClassName: "greenline-toast-body",
});

app.mount('#app')