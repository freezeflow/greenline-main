import { createSSRApp } from 'vue'
import App from './App.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export function createApp() {
  const app = createSSRApp(App)

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

  return { app }
}