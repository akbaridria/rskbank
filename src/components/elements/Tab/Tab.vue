<template>
  <div class="container-tab">
    <div
      v-for="(item, index) in listTab"
      :key="index"
      :class="item === activeTab ? 'item-tab-active' : 'item-tab'"
      @click="$emit('changeTab', item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Tab",
  props: {
    listTab: {
      type: Array,
      required: false,
      default: () => ["MoC", "MoC-Rif", "Rsk Bridge", "Sovryn Bridge"],
    },
    activeTab: {
      type: String,
      required: false,
      default: "MoC",
    },
  },
});
</script>

<style lang="scss" scoped>
.container-tab {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
  color: #a0aec0;
  padding: 0px 30px;
  & > * {
    padding: 8px 24px;
  }
}

.item-tab {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
  cursor: pointer;
  &:hover {
    color: #4fd1c5;
    border-bottom: 1px solid #4fd1c5;
  }
}

.item-tab-active {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
  cursor: pointer;
  color: #4fd1c5;
  border-bottom: 1px solid #4fd1c5;
}
</style>