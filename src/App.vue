<template>
  <div id="app">
    <TopMenuPage />
    <router-view />
  </div>
</template>

<script>
import TopMenuPage from "@/components/TopMenuPage";
export default {
  name: "App",
  components: {
    TopMenuPage,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
body {
  background-color: #f3f7f9;
}
</style>
