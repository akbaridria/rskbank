<template>
  <Card @click="goTo" style="cursor: pointer">
    <template v-slot:default>
      <div class="wrapper-kpi">
        <div class="left-kpi">
          <div class="wrapper-left-kpi">
            <div class="title-style">{{ datas.label }}</div>
            <div class="value-style">
              {{ datas.symbol }}
              {{
                datas.symbol !== '' ?
                parseFloat(datas.total)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                :  datas.total.toString()
                  .replace( /\d{1,3}(?=(\d{3})+(?!\d))/g , "$&,")
              }}
            </div>
          </div>
        </div>
        <div class="right-kpi">
          <div class="box-icon">
            <Icons style="padding: 12px" :color="`white`" :select="icon" />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/elements/Card/Card.vue";
import Icons from "@/components/elements/Icons/Icons.vue";
export default defineComponent({
  name: "CardKpi",
  components: {
    Card,
    Icons,
  },
  props: {
    datas: {
      type: Object,
      required: false,
      default: () => {},
    },
    icon: {
      type: String,
      required:false,
      default: 'StartChart'
    }
  },
  methods: {
    goTo() {
      if (this.$props.datas.tx_hash) {
        window.open(`https://explorer.rsk.co/tx/${this.$props.datas.tx_hash}`);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper-kpi {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.wrapper-left-kpi {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.title-style {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 150%;
  color: #a0aec0;
}
.value-style {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 140%;
  color: #2d3748;
}
.box-icon {
  width: 45px;
  height: 45px;
  background: #4fd1c5;
  box-shadow: 0px 3.5px 5.5px rgba(0, 0, 0, 0.02);
  border-radius: 12px;
}
</style>