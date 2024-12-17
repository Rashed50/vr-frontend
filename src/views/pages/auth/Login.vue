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
        submitForm() {
            // Send the form data to your backend (assuming you use axios or fetch for API calls)
            const data = {
                email: this.email,
                password: this.password,
                remember_me: this.rememberMe,
            };

            // Mock-up form submission (replace with actual API call)
            console.log('Form submitted with data:', data);

            // Handle the success or failure response
            // Example: this.messages.push({ text: 'Login Successful', type: 'alert-success' });
            // Example: this.messages.push({ text: 'Invalid credentials', type: 'alert-danger' });
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
