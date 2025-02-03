<template>
    <div class="d-flex justify-content-center align-items-center full-height">
        <div class="card" style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
            <div class="card-body p-4 p-md-5">
                <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Connection with MQTT Broker</h3>

                <!-- Error and success messages -->
                <div v-if="messages.length">
                    <div v-for="(message, index) in messages" :key="index" :class="['alert', message.type]"
                        role="alert">
                        {{ message.text }}
                    </div>
                </div>

                <form @submit.prevent="submitForm" ref="loginform">
                    <div class="row">
                        <div class="col-md-6 mb-1">
                            <label class="form-label">Username</label>
                            <input type="username" v-model="username" class="form-control ps-1"
                                placeholder="Username" required />
                        </div>

                        <div class="col-md-6 mb-1">
                            <label class="form-label">Password</label>
                            <div class="password-container">
                                <input v-model="password" :type="passwordFieldType" class="form-control ps-1"
                                    placeholder="Password" required />
                                <i :class="eyeIconClass" class="eye-icon" @click="togglePassword"></i>
                            </div>
                        </div> 
                        
                    </div>
                    <button type="submit" class="btn btn-primary btn-block mb-4" style="width: 100%;">  Connect  </button>                                     
                </form>

                <div class="row">
                    <form @submit.prevent="sendMessage" v-if="authenticated" id="message_form">
                        <div class="row">
                            <label class="form-label col-md-3">Topic</label>
                            <input type="text" v-model="topic" class="form-control ps-1 col-md-9"
                                placeholder="Topic Name" required />
                        </div>
                        <br>
                        <div class="row">
                            <label class="form-label col-md-3">Message </label>                            
                            <div data-mdb-input-init class="form-outline">
                                <textarea class="form-control" v-model="payload" placeholder="Json Format Data" id="textAreaExample1" rows="4"></textarea>                                
                            </div>
                        </div>
                        <br><br>
                        <button type="submit"  id="send_button" class="btn btn-secondary btn-block" >  Send Message  </button> 
                    </form>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    data(){
        return {
            username: '',
            password: '',
            passwordFieldType: 'password',
            eyeIconClass: 'fas fa-eye',
            messages: [],
            payload:"",
            topic:"vrsensors",
            authenticated: document.cookie ? true:false // sessionStorage.getItem('access_token') ? true:false,
          //  authenticated: sessionStorage.getItem('access_token') ? true:false,
        };
    },
    methods:{
        togglePassword() {
            if (this.passwordFieldType === 'password') {
                this.passwordFieldType = 'text';
                this.eyeIconClass = 'fas fa-eye-slash';
            } else {
                this.passwordFieldType = 'password';
                this.eyeIconClass = 'fas fa-eye';
            }
        },
        async submitForm() {
            const data = {
                username: this.username,
                password: this.password,
                remember_me: this.rememberMe,
            };                     

            this.messages = [{ type: 'alert-info', text: 'Connecting with Server....' }];
            const baseURL =   import.meta.env.VITE_BASE_URL; 

            var form_data = new FormData();
            form_data.append('username',this.username);
            form_data.append('password',this.password);

            try {
                const response = await axios.post(`${baseURL}/auth/token`, form_data, {
                    headers: { 
                       // "Content-Type": "application/x-www-form-urlencoded",
                        //"Access-Control-Allow-Origin": "*" // allow cross origin 
                    }
                });                 
                if (response.data.access_token) {

                  //  sessionStorage.setItem('access_token', response.data.access_token);

                    localStorage.setItem('access_token', response.data.access_token);  
                  //  localStorage.setItem('refreshToken', response.data.refresh);
                   
                  //localStorage.setItem('user', JSON.stringify(response.data.user));
                  //  Store tokens in cookies with appropriate flags for security                 
                    
                    var expires = (new Date(Date.now()+ 1000*10)).toUTCString(); // time in milisecond
                    document.cookie = "cookieName=cookieValue; expires=" + expires + ";path=/;"
 
                    this.messages = [{ type: 'alert-success', text: 'Susscessfully Authenticated' }];                  
                    this.authenticated = true
                } else {
                    this.messages = [{ type: 'alert-danger', text: 'Invalid Credentials!' }];
                }
            } catch (error) {                
                console.log(error);
                this.messages = [{ type: 'alert-danger', text: 'An error occurred during login. Please try again.'    }];
            }          
            
        },
        async sendMessage(){
            try{
                const form_data = {
                    'topic':this.topic,
                    'payload' : this.payload
                }                
                const baseURL =   import.meta.env.VITE_BASE_URL; 
//                 {
//   "msg": " today message from mqttx web",
//   "sessionID": "43859034805843",
//   "frameNumber": 6549671763,
//   "timestamp": 1734351949,
//   "sensorData":{}
// }

                            
                let json_data = JSON.parse(this.payload);
                json_data.topic = this.topic
                console.log(json_data); 
                const response =  await axios.post(`${baseURL}/auth/users/send-message`,json_data,{
                    headers: { 
                       // "Content-Type": "application/json",
                       // "Access-Control-Allow-Origin": "*",
                        "Authorization":"bearer "+localStorage.getItem('access_token')
                    }
                });
                if(response.data){
                    console.log(response.data)
                    this.messages = [{ type: 'alert-success', text: 'server response' }];
                }

            }catch(error){
                    console.log(error)
                    this.messages = [{ type: 'alert-danger', text: 'server response' }];
            }

        }

    }
    

};
</script>

<style scoped>
body,
html {
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ps-1 {
    padding: 10px;
}

.form-control:focus {
    border-color: #33b4e7e9;
    box-shadow: 0 0 5px rgba(65, 198, 246, 0.786);
}

.card {
    width: 100%;
    min-width: 400px;
    max-width: 700px;
}

@media (max-width: 768px) {
    .card {
        width: 80%;
    }
}

@media (max-width: 480px) {
    .card {
        width: 90%;
    }
}

.eye-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}

.password-container {
    position: relative;
}

.full-height{
    height: 100vh;
}
</style>
