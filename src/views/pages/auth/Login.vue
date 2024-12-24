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
                        <label class="form-label">Email address</label>
                        <input v-model="email" type="email" class="form-control ps-2" placeholder="Write your email..."
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
                email: this.email,
                password: this.password,
                remember_me: this.rememberMe,
            };

            this.messages = [{ type: 'alert-info', text: 'Submitting your login credentials...' }];

            const baseURL = import.meta.env.VITE_BASE_URL;  

            try {
                const response = await axios.post(`${baseURL}/login/`, data, {
                    headers: {
                        'Content-Type': 'application/json', 
                    }
                });

                if (response.data.access && response.data.refresh) {

                    localStorage.setItem('accessToken', response.data.access);
                    localStorage.setItem('refreshToken', response.data.refresh);

                    localStorage.setItem('user', JSON.stringify(response.data.user));

                    // Store tokens in cookies with appropriate flags for security
                    // Cookies.set('accessToken', response.data.access, {
                    //     expires: 1,  // The cookie will expire in 1 day (adjust as needed)
                    //     secure: true, // Ensure cookies are sent over HTTPS
                    //     sameSite: 'Strict', // Prevent CSRF attacks
                    // });

                    // Cookies.set('refreshToken', response.data.refresh, {
                    //     expires: 7,  // Refresh token can have a longer expiration time
                    //     secure: true,
                    //     sameSite: 'Strict',
                    // });

                    // // Store user data in cookies (optional)
                    // Cookies.set('user', JSON.stringify(response.data.user), { expires: 1 });

                    this.messages = [{ type: 'alert-success', text: 'Login successful!' }];

                    // this.$router.push('/dashboard');  
                } else {
                    this.messages = [{ type: 'alert-danger', text: 'Invalid credentials!' }];
                }
            } catch (error) {
                console.error('Error submitting login:', error);

                this.messages = [{ type: 'alert-danger', text: 'An error occurred during login. Please try again.' }];
            }
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
