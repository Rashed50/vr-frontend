<template>
    <div class="d-flex justify-content-center align-items-center full-height">
        <div class="card" style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
            <div class="card-body p-4 p-md-5">
                <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Signup Form</h3>

                <!-- Error and success messages -->
                <div v-if="messages.length">
                    <div v-for="(message, index) in messages" :key="index" :class="['alert', message.type]"
                        role="alert">
                        {{ message.text }}
                    </div>
                </div>

                <form @submit.prevent="submitForm" ref="signupForm">
                    <div class="row">
                        <div class="col-md-6 mb-1">
                            <label class="form-label">First Name</label>
                            <input type="text" v-model="form.first_name" class="form-control ps-1"
                                placeholder="First Name" required />
                        </div>

                        <div class="col-md-6 mb-1">
                            <label class="form-label">Last Name</label>
                            <input type="text" v-model="form.last_name" class="form-control ps-1"
                                placeholder="Last Name" required />
                        </div>

                        <div class="col-md-6 mb-1">
                            <label class="form-label">Email address</label>
                            <input type="email" v-model="form.email" class="form-control ps-1"
                                placeholder="Email Address" required />
                        </div>

                        <div class="col-md-6 mb-1">
                            <label class="form-label">Username</label>
                            <input type="username" v-model="form.username" class="form-control ps-1"
                                placeholder="Username" required />
                        </div>


                        <!-- <div class="col-md-6 mb-1">
                            <label class="form-label">Contact Number</label>
                            <input type="text" v-model="form.phone" class="form-control ps-1"
                                placeholder="Contact Number" minlength="11" maxlength="13" pattern="^\d{11,13}$"
                                title="Phone number must be between 11 and 13 digits" required />
                        </div>

                        <div class="col-md-6 mb-1">
                            <label class="form-label">Country Name</label>
                            <select v-model="form.selectedCountry" class="form-control ps-1">
                                <option v-for="country in countries" :value="country.id" :key="country.id">
                                    {{country.name}}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-1">
                            <label class="form-label">City</label>
                            <input type="text" v-model="form.city" class="form-control ps-1" placeholder="City Name" />
                        </div>

                        <div class="col-md-12 mb-1">
                            <label class="form-label">Address</label>
                            <textarea v-model="form.address" class="form-control ps-1" rows="2" cols="10"></textarea>
                        </div> -->

                        <div class="col-md-6 mb-1">
                            <label class="form-label">Password</label>
                            <div class="password-container">
                                <input v-model="form.password" :type="passwordFieldType" class="form-control ps-1"
                                    placeholder="Password" required />
                                <i :class="eyeIconClass" class="eye-icon" @click="togglePassword"></i>
                            </div>
                        </div>

                        <div class="col-md-6 mb-1">
                            <label class="form-label">Confirm Password</label>
                            <div class="password-container">
                                <input v-model="form.c_password" :type="confirmPasswordFieldType"
                                    class="form-control ps-1" placeholder="Confirm Password" required />
                                <i :class="eyeIconClass" class="eye-icon" @click="toggleConfirmPassword"></i>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-2 mt-4">
                        <div class="col-md-6">
                            <div class="form-check">
                                <input v-model="form.rememberMe" class="form-check-input" type="checkbox" value=""
                                    id="form2Example31" />
                                <label class="form-check-label" for="form2Example31"> Remember me </label>
                            </div>
                        </div>

                        <div class="col-md-6 d-flex justify-content-end">
                            <a href="#!"><strong>Forgot password?</strong></a>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block mb-4" style="width: 100%;">
                        Register
                    </button>

                    <div class="text-center">
                        <p>If you have an account, <a href="/login">Signin</a></p>
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
            form: {
                first_name: '',
                last_name: '',
                email: '',
                username: '',
                // phone: '',
                // city: '',
                // address: '',
                password: '',
                c_password: '',
                // selectedCountry: null,
                rememberMe: false
            },
            // countries: [],
            passwordFieldType: 'password',
            confirmPasswordFieldType: 'password',
            eyeIconClass: 'fas fa-eye',
            messages: []   // Success/Error messages
        };
    },
    mounted() {
        // this.fetchCountries();
    },
    methods: {
        // async fetchCountries() {
        //     try {
        //         const response = await fetch('/api/countries/');
        //         const data = await response.json();
        //         this.countries = data;
        //     } catch (error) {
        //         console.error('Error fetching countries:', error);
        //     }
        // },

        togglePassword() {
            this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
            this.eyeIconClass = this.passwordFieldType === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
        },

        toggleConfirmPassword() {
            this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
        },

        // Submit form method
        async submitForm() {
            console.log('Form submitted:', this.form);

            // Validate password match
            if (this.form.password !== this.form.c_password) {
                this.messages = [{ type: 'alert-danger', text: 'Passwords do not match!' }];
                return;
            }

            const baseURL = import.meta.env.VITE_BASE_URL;

            try {
                const headers = {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                };

                const response = await axios.post(`${baseURL}/signup/`, this.form, { headers });

                if (response.data.success) {

                    // Clear form inputs using reset
                    this.$refs.signupForm.reset(); // This clears input fields

                    // Reset form data manually to ensure Vue model is cleared
                    this.form = {
                        first_name: '',
                        last_name: '',
                        email: '',
                        username: '',
                        password: '',
                        c_password: '',
                        rememberMe: false
                    };

                    this.messages = [{ type: 'alert-success', text: 'Registration successful!' }];

                    // You can redirect to login page after successful registration, e.g.:
                    // this.$router.push('/login');
                } else {
                    this.messages = [{ type: 'alert-danger', text: response.data.message }];
                }
            } catch (error) {
                console.error('Error submitting the form:', error);

                if (error.response && error.response.data) {
                    const errorMessages = error.response.data;
                    this.messages = [];
                    for (const [field, messages] of Object.entries(errorMessages)) {
                        messages.forEach(msg => {
                            this.messages.push({ type: 'alert-danger', text: `${field}: ${msg}` });
                        });
                    }
                } else {
                    this.messages = [{ type: 'alert-danger', text: 'Something went wrong! Please try again later.' }];
                }
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
