<template>
  <div class="skeleton-wrapper-address">
      <Skeleton v-for="index in 10" :key="index" style="height: 70px;margin:12px 0px;" />
  </div>
</template>

<script lang="ts">
import Skeleton from "@/components/elements/Skeleton/Skeleton.vue";
export default {
  name: "SkeletonAddress",
  components: {
    Skeleton,
  },
};
</script>

<style lang="scss" scoped>
.skeleton-wrapper-address {
  display: flex;
  flex-direction: column;
  width: 700px;
}
</style>