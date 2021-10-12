<template>
  <div class="wrapper-card">
      <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CardDarkShadow",
});
</script>

<style lang="scss" scoped>
.wrapper-card {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 3.5px 5.5px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 17.5px;
}
</style>