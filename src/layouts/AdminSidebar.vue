<template>
    <div class="sidebar" data-background-color="dark">
        <div class="sidebar-logo">
            <!-- Logo Header -->
            <div class="logo-header" data-background-color="dark">
                <a href="/" class="logo">
                    <img src="/img/kaiadmin/logo_light.svg" alt="navbar brand" class="navbar-brand" height="20" />
                </a>
                <div class="nav-toggle">
                    <button class="btn btn-toggle toggle-sidebar">
                        <i class="gg-menu-right"></i>
                    </button>
                    <button class="btn btn-toggle sidenav-toggler">
                        <i class="gg-menu-left"></i>
                    </button>
                </div>
                <button class="topbar-toggler more">
                    <i class="gg-more-vertical-alt"></i>
                </button>
            </div>
            <!-- End Logo Header -->
        </div>

        <div class="sidebar-wrapper scrollbar scrollbar-inner">
            <div class="sidebar-content">
                <ul class="nav nav-secondary">
                    <li class="nav-item" :class="{ active: activeTab === 'admin_home' }">
                        <router-link to="/admin" class="nav-link">
                            <i class="fas fa-home"></i>
                            <p>Dashboard</p>
                        </router-link>
                    </li>
                    <li class="nav-item" :class="{ active: activeTab === 'vr_list' }">
                        <router-link to="/admin/admin_vr_model_list" class="nav-link">
                            <i class="fa-solid fa-database"></i>
                            <p>VR3D List</p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Sidebar",
    props: {
        activeTab: {
            type: String,
            default: "",
        },
    },
};
</script>

<style scoped>
/* Add sidebar-specific styles if necessary */
</style>
