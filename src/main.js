import { createApp } from 'vue'
import './style.css'

// import MasterComponent from './MasterLayout.vue'
import App from './App.vue'
import router from "./router/routes"; // Import the router


//! Create Vue Instance
const app = createApp(App);

// Register Vue Router with the app instance
app.use(router);

// mounted components
app.mount('#app');




