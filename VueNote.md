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


# Storing JWT Tokens in Cookies
# Step 1: Install js-cookie package:
>> npm install js-cookie
or, 
>> yarn add js-cookie

# Step 2: submitForm method to store JWT in cookies:
    import Cookies from 'js-cookie';

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

            // Check if the login was successful and the tokens are present in the response
            if (response.data.access && response.data.refresh) {

                // Store tokens in cookies with appropriate flags for security
                Cookies.set('accessToken', response.data.access, { 
                    expires: 1,  // The cookie will expire in 1 day (adjust as needed)
                    secure: true, // Ensure cookies are sent over HTTPS
                    sameSite: 'Strict', // Prevent CSRF attacks
                });

                Cookies.set('refreshToken', response.data.refresh, {
                    expires: 7,  // Refresh token can have a longer expiration time
                    secure: true,
                    sameSite: 'Strict',
                });

                // Store user data in cookies (optional)
                Cookies.set('user', JSON.stringify(response.data.user), { expires: 1 });

                this.messages = [{ type: 'alert-success', text: 'Login successful!' }];

                // Redirect to the dashboard or a protected page
                this.$router.push('/dashboard');
            } else {
                this.messages = [{ type: 'alert-danger', text: 'Invalid credentials!' }];
            }
        } catch (error) {
            console.error('Error submitting login:', error);
            this.messages = [{ type: 'alert-danger', text: 'An error occurred during login. Please try again.' }];
        }
    }


# Step 3: Sending JWT Token with Subsequent Requests
    // Retrieve the access token from cookies and set it in the request headers
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
        try {
            const response = await axios.get(`${baseURL}/protected-endpoint/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,  // Add the JWT token to the headers
                }
            });

            // Handle the response
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching protected data:', error);
        }
    }

# Step 4: Handling JWT Expiration
    import axios from 'axios';
    import Cookies from 'js-cookie';

    // Add a request interceptor to check for token expiration
    axios.interceptors.request.use(async (config) => {
        let accessToken = Cookies.get('accessToken');

        if (accessToken) {
            const expiration = JSON.parse(atob(accessToken.split('.')[1])).exp * 1000;
            const now = Date.now();

            // If the access token is expired, try to refresh it
            if (expiration < now) {
                try {
                    const refreshToken = Cookies.get('refreshToken');

                    if (refreshToken) {
                        // Send the refresh token to the backend to get a new access token
                        const response = await axios.post('/api/token/refresh/', { refresh: refreshToken });
                        const newAccessToken = response.data.access;

                        // Store the new access token in cookies
                        Cookies.set('accessToken', newAccessToken, { expires: 1, secure: true, sameSite: 'Strict' });

                        // Update the Authorization header with the new token
                        config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    }
                } catch (error) {
                    console.error('Failed to refresh access token', error);
                    // Optionally, redirect to login page if refresh fails
                }
            } else {
                // Add the current token to the request headers
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
        }

        return config;
    });



