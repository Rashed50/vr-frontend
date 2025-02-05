<template>
    <!-- <h1>This Is Vr3D List Page</h1> -->

    <div class="page-inner">
        <!-- <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
            <div>
                <h3 class="fw-bold mb-3">VR3D</h3>
                <h6 class="op-7 mb-2">Free Bootstrap 5 Admin Dashboard</h6>
            </div>
            <div class="ms-md-auto py-2 py-md-0">
                <a href="#" class="btn btn-label-info btn-round me-2">Manage</a>
                <a href="#" class="btn btn-primary btn-round">Add Customer</a>
            </div>
        </div> -->
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">VR Sensor Information</h4>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-head-bg-primary table-striped">
                                <thead>
                                    <tr>
                                        <th>S.N</th>
                                        <th>Topic</th>
                                        <th>Session ID</th>
                                        <th>Frame Number</th>
                                        <th>Timestamp</th>
                                        <th>Sensor Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Iterate over vrData and display each item in a row -->
                                    <tr v-for="(item, index) in vrData" :key="index">
                                        <td>{{ index+1 }}</td>
                                        <td>{{ item.topic }}</td>
                                        <td>{{ item.sessionId }}</td>
                                        <td>{{ item.frameNumber }}</td>
                                        <td>{{ item.timestamp }}</td>
                                        <td>{{ item.sensorData }}</td>
                                    </tr>

                                    <!-- Display a loading message if data is not loaded yet -->
                                    <tr v-if="loading">
                                        <td colspan="5" class="text-center">Loading...</td>
                                    </tr>

                                    <!-- Display an error message if something went wrong -->
                                    <tr v-if="error">
                                        <td colspan="5" class="text-center text-danger">Error loading data</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
            vrData: [],  
            loading: true,  
            error: false,   
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        logout(){                               
                    localStorage.setItem('access_token', null);                           
                    var expires = (new Date(Date.now()+ 100)).toUTCString(); // time in milisecond
                    document.cookie = "cookieName=cookieValue; expires=" + expires + ";path=/;"
                    this.messages = []  
                    this.authenticated = false;                 

        },
        async fetchData() {
            const baseURL = import.meta.env.VITE_BASE_URL;

            try {
              //  const response = await axios.get(`${baseURL}/vrsensor/records`);

                const response =  await axios.get(`${baseURL}/vrsensor/records`,{
                    headers: {                         
                        "Authorization":"Bearer "+localStorage.getItem('access_token')
                    }
                });
 
                if (response.status == 200) {
                    this.vrData = response.data.content;                      
                }else if(status.status == 401)   
                  this.logout(); 


            } catch (error) {
                 console.error('Error fetching VR data:', error);
                this.error = true;  
                if(error.status == 401)   
                this.logout(); 

            } finally {
                this.loading = false;  
            }
        },
    },
};
</script>
