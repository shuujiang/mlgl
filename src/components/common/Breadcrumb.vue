<template>
  <el-breadcrumb separator="/" style="margin-bottom: 15px;">
  <el-breadcrumb-item v-for="item in list" :key="item.path" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
</el-breadcrumb>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  computed: {}
};
</script>
<style scoped>

</style>
