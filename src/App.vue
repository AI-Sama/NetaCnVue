<template>
  <div id="app">
    <TopMenuPage />
    <router-view :loadComplete="this.$root.loadComplete"/>
  </div>
</template>

<script>
import TopMenuPage from "@/components/TopMenuPage";
export default {
  name: "App",
  components: {
    TopMenuPage,
  },
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
