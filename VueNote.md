# Step 1: Install Vue 3 Use Vite for a Modern Setup (Recommended) 
>> npm create vite@latest frontend_dashboard


# Step 2: Yarn Install
>> yarn


# Step 3: Project Run
>> yarn dev


# Step 4: Route Setup
>> npm install vue-router@4


# Step 5: Verify vite.config.js Aliases
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
