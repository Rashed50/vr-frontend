<template>
    <div class="d-flex justify-content-center align-items-center full-height">
        <div class="card" style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
            <div class="card-body p-4 p-md-5">
                <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Login Form</h3>

                <!-- Error and success messages -->
                <div v-if="messages.length" v-for="(message, index) in messages" :key="index">
                    <div :class="['alert', message.type]" role="alert">
                        {{ message.text }}
                    </div>
                </div>

                <!-- Login Form -->
                <form @submit.prevent="submitForm">


                    
                    <div class="mb-3">
                        <label class="form-label">User Name</label>
                        <input v-model="email" type="text" class="form-control ps-2" placeholder="Write your user name"
                            required />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <div class="password-container">
                            <input :type="passwordFieldType" class="form-control ps-2"
                                placeholder="Write your password..." v-model="password" required />
                            <i :class="eyeIconClass" class="eye-icon" @click="togglePassword"></i>
                        </div>
                    </div>

                    <div class="row mb-4">
                        <div class="col d-flex justify-content-center">
                            <div class="form-check">
                                <input v-model="rememberMe" class="form-check-input" type="checkbox"
                                    id="form2Example31" />
                                <label class="form-check-label" for="form2Example31"> Remember me </label>
                            </div>
                        </div>

                        <div class="col">
                            <a href="#!">Forgot password?</a>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block mb-4" style="width: 100%;">Sign in</button>

                    <div class="text-center">
                        <p>Not a member? <a href="/registration">Register</a></p>
                        <p>Go to home? <a href="/">Home</a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            rememberMe: false,
            passwordFieldType: 'password',
            eyeIconClass: 'fas fa-eye',
            messages: [],
        };
    },
    methods: {
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
                username: this.email,
                password: this.password,
                remember_me: this.rememberMe,
            };
                   
            this.messages = [{ type: 'alert-info', text: 'Submitting your login credentials...' }];
            const baseURL =   import.meta.env.VITE_BASE_URL;   // 'http://127.0.0.1:8081'; //

            var form_data = new FormData();
            form_data.append('username',this.email);
            form_data.append('password',this.password);

            try {
                const response = await axios.post(`${baseURL}/auth/v2/token`, form_data, {
                    headers: { 
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Access-Control-Allow-Origin": "*"
                    }
                });

                 
                if (response.data.access_token) {

                    localStorage.setItem('access_token', response.data.access_token);
                    var expires = (new Date(Date.now()+ 1000*60)).toUTCString(); // time in milisecond
                    document.cookie = "cookieName=thecookie;Secure=true; expires=" + expires + ";SameSite=Strict;path=/;"
                   //"+response.data.access_token+"

                    // // Store user data in cookies (optional)
                    // Cookies.set('user', JSON.stringify(response.data.user), { expires: 1 });
                    this.messages = [{ type: 'alert-success', text: 'Login successful!' }];
                    this.$router.push('admin'); 
                    console.log('Login success');
                    //this.$router.push('mqtt_communication') 
                } else {
                    this.messages = [{ type: 'alert-danger', text: 'Invalid credentials!' }];
                }
            } catch (error) {
              
                console.log(error);
                this.messages = [{ type: 'alert-danger', text: 'Login Failed. Please try again.'    }];
            }


          
            // var form_data = new FormData()
            // form_data.append('username','admin')
            // form_data.append('password','admin')
            // axios.post("http://127.0.0.1:8081/auth/token",
            // form_data, {
            //     headers: { 
            //         "Content-Type": "application/x-www-form-urlencoded",
            //         "Access-Control-Allow-Origin": "*"
            //     }
            //     }).then(function(response) {
            //         console.log(response);
            //        // this.messages = [{ type: 'alert-danger', text: 'server response' }];
                    
            //     });
        },

    },
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
    min-width: 300px;
    max-width: 500px;
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

.full-height {
    height: 100vh;
    /* Full viewport height */
}
</style>
