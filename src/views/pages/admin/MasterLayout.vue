<template>
    <div>
        <div class="wrapper">
            <!-- Sidebar -->
            <Sidebar :activeTab="activeTab" />

            <div class="main-panel">
                <!-- Navbar -->
                <Navbar />

                <div class="container">
                    <!-- Dynamic Content Rendered Here -->
                    <router-view />
                </div>

                <!-- Footer -->
                <Footer />
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from "../../../layouts/AdminSidebar.vue";
import Navbar from "../../../layouts/AdminNavbar.vue";
import Footer from "../../../layouts/AdminFooter.vue";

export default {
    components: {
        Sidebar,
        Navbar,
        Footer,
    },
    data() {
        return {
            activeTab: this.$route.name, // Set activeTab from current route name
        };
    },
    watch: {
        // Watch route changes to update activeTab dynamically
        $route(to) {
            this.activeTab = to.name;
        },
    },
};
</script>
