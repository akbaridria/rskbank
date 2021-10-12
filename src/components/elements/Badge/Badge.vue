<template>
  <div
    v-if="variant === 'Badge'"
    :class="active ? `badge-wrapper` : `badge-wrapper-inactive`"
    @click="$emit('changeTab', textBadge)"
  >
    {{ textBadge }}
  </div>
  <div
    v-if="variant === 'BadgeFilter'"
    :class="active ? `badge-filter` : `badge-filter-inactive`"
    @click="$emit('changeTab', textBadge)"
  >
    {{ textBadge }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Badge",
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    textBadge: {
      type: String,
      required: false,
      default: "Money On Chain",
    },
    variant: {
      type: String,
      required: false,
      default: "Badge",
    },
  },
});
</script>

<style lang="scss">
.badge-wrapper-inactive {
  padding: 10px 31.5px;
  background-color: #f8f9fa;
  color: #4fd1c5;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
  border-radius: 12px;
  border: 1px solid #4fd1c5;
  cursor: pointer;
  &:hover {
    background: #4fd1c5;
    color: white;
  }
}

.badge-filter {
  background: #4fd1c5;
  border-radius: 8px;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 140%;
  text-align: center;
  color: #ffffff;
  padding: 2px 8px;
  cursor: pointer;
}

.badge-filter-inactive {
  background: #cbd5e0;
  border-radius: 8px;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 140%;
  text-align: center;
  color: #ffffff;
  padding: 2px 8px;
  cursor: pointer;
  &:hover {
    background: #4fd1c5;
  }
}

.badge-wrapper {
  padding: 10px 31.5px;
  background-color: #4fd1c5;
  color: #f8f9fa;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
  border-radius: 12px;
  cursor: pointer;
}
</style>