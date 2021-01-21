<template>
  <div class="b_label">
    <a-tag
      style="margin: 5px; font-size: 1em"
      v-for="(tag, index) in tags"
      :color="tagcolor[Math.round(Math.random() * 7)]"
      :key="tag"
    >
      {{ tag }}
    </a-tag>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tags: [],
      tagcolor: [
        "#74b9ff",
        "#0984e3",
        "#ff7675",
        "#d63031",
        "#6ab04c",
        "#C4E538",
        "#FFC312",
        "#FEA47F",
      ],
    };
  },
  created() {
    this.$axios({
      method: "get",
      url: "http://localhost:8080/label/getLabels",
    }).then((response) => {
      if (response.data.resultCode == 1) {
        var arr = response.data.resultData;
        for (var x = 0; x < arr.length; x++) {
          if (this.lan) {
            this.tags[x] =
              arr[x].jpWord == "null" ? arr[x].cnWord : arr[x].jpWord;
          } else {
            this.tags[x] = arr[x].cnWord;
          }
        }
        this.$forceUpdate();
      }
    });
  },
  methods: {},
};
</script>
<style>
.b_label {
  width: 50%;
  margin: 20px auto;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border-radius: 5px;
  padding: 30px;
  min-height: 500px;
  flex-wrap: wrap;
  background-color: white;
}
</style>