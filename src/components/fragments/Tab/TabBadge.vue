<template>
  <div class="wrapper-badge">
    <Badge
      v-for="(item, index) in listTab"
      :key="index"
      :active="item === activeTab"
      :textBadge="item"
      :variant="variant"
      @changeTab="$emit('changeTab', $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Badge from "@/components/elements/Badge/Badge.vue";
export default defineComponent({
  name: "TabBadge",

  components: {
    Badge,
  },
  props: {
    listTab: {
      type: Array,
      required: false,
      default: () => ["Money On Chain", "RIF On Chain"],
    },
    activeTab: {
      type: String,
      required: false,
      default: "Money On Chain",
    },
    variant: {
      type: String,
      required: false,
      default: 'Badge'
    }
  },
});
</script>

<style lang="scss" scoped>
.wrapper-badge {
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
  gap: 4px;
}
</style>