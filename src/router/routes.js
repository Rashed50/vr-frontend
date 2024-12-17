import { createRouter, createWebHistory } from "vue-router";
import MasterLayout from "@/views/pages/admin/MasterLayout.vue";
import Dashboard from "@/views/pages/admin/Dashboard.vue";
import VR3DList from "@/views/pages/admin/vr3d/list.vue";
import Home from "@/views/pages/AppHome.vue"
import Login from "@/views/pages/auth/Login.vue"
import Registration from "@/views/pages/auth/Registration.vue"

const routes = [
    {
            path: "/admin",
            component: MasterLayout,
            // redirect: "/admin/home",
            children: [
                {
                    path: "",
                    name: "admin_home",
                    component: Dashboard,
                },
                {
                    path: "admin_vr_model_list",
                    name: "vr_list",
                    component: VR3DList,
                },
            ], 
            
        },
        {
            path: "/",
            name: "home",
            component: Home,
            // redirect: "/admin/home",
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            // redirect: "/admin/home",
        },
        {
            path: "/registration",
            name: "registration",
            component: Registration,
            // redirect: "/admin/home",
        },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
