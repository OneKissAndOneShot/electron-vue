<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{ $store.state.num }}</div>
  </div>
</template>

<script>
import electron from "electron";

export default {
  created() {
    // console.log(this.$store.state.num);
    electron.ipcRenderer.on("test", (e, m) => {
      console.log("0", e, m);
    });
  }
};
</script>
