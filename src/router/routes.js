import { createRouter, createWebHistory, onBeforeRouteUpdate } from "vue-router";
import MasterLayout from "@/views/pages/admin/MasterLayout.vue";
import Dashboard from "@/views/pages/admin/Dashboard.vue";
import VR3DList from "@/views/pages/admin/vr3d/list.vue";
import Home from "@/views/pages/AppHome.vue"
import Login from "@/views/pages/auth/Login.vue"
import Registration from "@/views/pages/auth/Registration.vue"
// mqtt connection
import MqttCommunication from "@/views/pages/mqtt/MqttCommunication.vue"



const routes = [
        {
            path: "/admin",
            name:"admin",
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
            
         },        
        {
            path: "/login",
            name: "login",
            component: Login,
         },
        {
            path: "/registration",
            name: "registration",
            component: Registration,
         },
         {
            path:"/mqtt",
            name:"mqtt",
            component:MqttCommunication,
            
            
         },
       
];



const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from) => {

        var authenticated = document.cookie ? true:false ;
        console.log("from url: "+from+", to url: "+to.name)
       
        if(to.name == "home" || to.name == "registration" || to.name == "login" || to.name == "mqtt"){
            console.log("public  UI")
        }
        else if(!authenticated ){
            console.log('Authentication failed  '); 
            return {name:'login'}           
        }
        console.log("login -"+localStorage.getItem('access_token'));
     
  })

export default router;
