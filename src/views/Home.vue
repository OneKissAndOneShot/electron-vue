<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="click" @click="click">Click {{ $store.state.num }}</div>
  </div>
</template>

<script>
import { getCurrentInstance, watch, computed, onMounted } from "vue";

export default {
  data() {
    return {
      count: 0
    };
  },
  setup() {
    const { ctx } = getCurrentInstance();
    console.log();
    const click = () => ctx.$store.commit("UPDATE", ctx.$store.state.num + 1);
    const num = computed(() => ctx.$store.state.num);
    watch(
      () => {
        console.log(num);
      },
      val => {
        console.log(val);
      }
    );
    onMounted(() => {
      console.log(1);
      console.log("onMounted", ctx.count);
      ctx.conso();
    });
    return {
      click
    };
  },
  methods: {
    conso() {
      console.log("100");
    }
  },
  mounted() {
    console.log(0);
    console.log("mounted", this.count);
  }
};
</script>

<style lang="less" scoped>
.click {
  width: 100px;
  line-height: 50px;
  text-align: center;
  margin: 0 auto;
  color: #fff;
  background-color: #42b983;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
}
</style>
