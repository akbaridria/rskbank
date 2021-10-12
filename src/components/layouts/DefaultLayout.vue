<template>
  <div class="layout-wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DefaultLayout",
});
</script>

<style>
.layout-wrapper {
  width: 1070px;
  padding: 24px;
}
</style>