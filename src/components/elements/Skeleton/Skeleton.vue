<template>
  <div class="skeleton loading"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Skeleton",
});
</script>

<style lang="scss" scoped>
.skeleton {
  border-radius: 8px;
}

/* The loading Class */
.loading {
  position: relative;
  background-color: #e2e2e2;
}

/* The moving element */
.loading::after {
  display: block;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(transparent),
    color-stop(rgba(255, 255, 255, 0.2)),
    to(transparent)
  );

  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );

  /* Adding animation */
  animation: loading 0.8s infinite;
}

/* Loading Animation */
@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}
</style>