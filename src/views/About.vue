<template>
  <DefaultLayout>
    <template v-slot:default>
      <Card style="width: 400px; margin-bottom: 24px">
        <template v-slot:default>
          <div class="cell-list">
            <div class="tx-wrapper">Data Sync MoC</div>
            <div class="date-wrapper">Start at block 2988697 (Jan, 01 2021)</div>
          </div>
          <div class="cell-list">
            <div class="tx-wrapper">Data Sync Rsk Token Bridge</div>
            <div class="date-wrapper">Start at block 2988697 (Jan, 01 2021)</div>
          </div>
          <div class="cell-list">
            <div class="tx-wrapper">Data Sync Sov Token Bridge</div>
            <div class="date-wrapper">Start at block 3478616 (Jul, 01 2021)</div>
          </div>
        </template>
      </Card>
      <Card style="width: 400px">
        <template v-slot:default>
          <div class="cell-list">
            <div class="tx-wrapper">How can i get this data ?</div>
            <div class="date-wrapper"><a href="https://github.com/akbaridria/rskbank" target="_blank">click here</a> to link it on my github.</div>
          </div>
        </template>
      </Card>
    </template>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import Card from "@/components/elements/Card/Card.vue";
export default defineComponent({
  name: "About",
  components: {
    DefaultLayout,
    Card,
  },
});
</script>

<style lang="scss" scoped>
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