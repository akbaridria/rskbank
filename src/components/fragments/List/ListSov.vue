<template>
  <div class="container-list">
    <div v-for="(item, index) in listData" :key="index" @click="$emit('goTo', item.tx_hash)" >
      <CardDarkShadow class="item-list">
        <template v-slot:default>
          <div class="cell-list">
            <div class="tx-wrapper">
              {{ item.tx_hash }}
            </div>
            <div class="date-wrapper">{{ item.sign_at }}</div>
          </div>
          <div class="cell-list">{{ item.from_token }}</div>
          <div class="cell-list">&#8594;</div>
          <div class="cell-list">{{ item.to_token }}</div>
          <div class="cell-list">
            ${{
              parseFloat(item.amount)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
            }}
          </div>
        </template>
      </CardDarkShadow>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CardDarkShadow from "@/components/elements/Card/CardDarkShadow.vue";
export default defineComponent({
  name: "ListSov",
  components: {
    CardDarkShadow,
  },
  props: {
    listData: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
});
</script>

<style lang="scss">
.container-list {
  display: flex;
  flex-direction: column;
  width: 650px;
}
.item-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  cursor: pointer;
}
.badge {
  color: white !important;
  text-align: center;
  border-radius: 8px;
}
.cell-list {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 140%;
  color: #2d3748;
  padding: 4px 24px;
}
.tx-wrapper {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date-wrapper {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 150%;
  color: #a0aec0;
}
</style>