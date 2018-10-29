<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
                <v-breadcrumb :list='list'></v-breadcrumb>
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import vBreadcrumb from "./Breadcrumb.vue";
export default {
  components: {
    vHead,
    vSidebar,
    vBreadcrumb
  },
  computed: {
    list() {
      return this.$route.matched;
    }
  }
};
</script>
