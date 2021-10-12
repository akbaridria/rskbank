<template>
  <template v-if="!loading">
    <DefaultLayout>
      <template v-slot:default>
        <div class="kpi-wrapper">
          <CardKpi :datas="bestTrader" />
          <CardKpi :datas="totalTradeVolume" />
          <CardKpi :datas="totalUniqueUser" />
          <CardKpi :datas="collectedFee" />
        </div>
        <div class="wrapper-body-stat">
          <div>
            <Card>
              <template v-slot:default>
                <div class="title-card">Top 10 Address</div>
                <div v-if="!store.state.loadingTopTrader">
                  <div
                    v-for="(item, index) in listTopTrader"
                    :key="index"
                    class="wrapper-best-trader"
                  >
                    <Card
                      class="wrapper-best-trader"
                      style="cursor: pointer"
                      @click="goToAddress(item.trader)"
                    >
                      <template v-slot:default>
                        <div class="box-icon">
                          <Icons
                            :select="`Wallet`"
                            style="padding: 8px"
                            color="white"
                          />
                        </div>
                        <div class="wrapper-total-volume">
                          <div class="style-font-address">
                            {{ item.trader }}
                          </div>
                          <div class="style-font-total">
                            {{
                              activeTabTotalTrade === "By Transactions"
                                ? ""
                                : "$"
                            }}
                            {{
                              item.total.toLocaleString(undefined, {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })
                            }}
                          </div>
                        </div>
                      </template>
                    </Card>
                  </div>
                </div>
                <div v-else>
                  <Skeleton
                    v-for="index in 10"
                    :key="index"
                    style="height: 50px; margin: 24px 0px"
                  />
                </div>
              </template>
            </Card>
          </div>
          <div>
            <Card style="margin-bottom: 24px">
              <template v-slot:default>
                <div class="title-card">Total Trade Volume</div>
                <TabBadge
                  :activeTab="activeTabTotalVolume"
                  :listTab="listTabTotalVolume"
                  :variant="'BadgeFilter'"
                  @changeTab="changeTabTotalTradeVolume($event)"
                />
                <div
                  v-if="!store.state.loadingTotalVolumeByDate"
                  id="chartTotalTrade"
                  style="width: 600px; margin: 0 auto"
                />
                <div v-else>
                  <Skeleton style="height: 280px; width: 600px" />
                </div>
              </template>
            </Card>
            <Card style="margin-bottom: 24px">
              <template v-slot:default>
                <div class="title-card">Total Collected Fee</div>
                <TabBadge
                  :activeTab="activeTabCollectedFee"
                  :listTab="listTabCollectedFee"
                  :variant="'BadgeFilter'"
                  @changeTab="changeTabCollectedFee($event)"
                />
                <div
                  v-if="!store.state.loadingCollectedFeeByDate"
                  id="chartCollectedFee"
                  style="width: 600px; margin: 0 auto"
                />
                <div v-else>
                  <Skeleton style="height: 280px; width: 600px" />
                </div>
              </template>
            </Card>
            <Card style="margin-bottom: 24px">
              <template v-slot:default>
                <div class="title-card">Total Unique Address</div>
                <TabBadge
                  :activeTab="activeTabTotalAddress"
                  :listTab="listTabTotalAddress"
                  :variant="'BadgeFilter'"
                  @changeTab="changeTabAddress($event)"
                />
                <div
                  v-if="!store.state.loadingTotalUniqueUserByDate"
                  id="chartUniqueAddress"
                  style="width: 600px; margin: 0 auto"
                />
                <div v-else>
                  <Skeleton style="height: 280px; width: 600px" />
                </div>
              </template>
            </Card>
          </div>
        </div>
      </template>
    </DefaultLayout>
  </template>
  <template v-else>
    <SkeletonRskBridge />
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import CardKpi from "@/components/fragments/Card/Home/CardKpi.vue";
import SkeletonRskBridge from "@/components/fragments/Skeleton/SkeletonRskBridge.vue";
import Icons from "@/components/elements/Icons/Icons.vue";
import Card from "@/components/elements/Card/Card.vue";
import TabBadge from "@/components/fragments/Tab/TabBadge.vue";
import { useStore } from "@/store";
import { generateChart, generateChartNumber } from "@/utils";
import Skeleton from "@/components/elements/Skeleton/Skeleton.vue";


export default defineComponent({
  name: "SovBridge",
  components: {
    DefaultLayout,
    CardKpi,
    SkeletonRskBridge,
    Icons,
    Card,
    TabBadge,
    Skeleton
  },
  data() {
    const store = useStore()
    return {
      store,
      loading: false,
      activeTabTotalVolume: 'Daily',
      listTabTotalVolume: ['Daily', 'Monthly'],
      listTabCollectedFee: ["Daily", "Monthly"],
      activeTabCollectedFee: "Daily",
      listTabTotalAddress: ["Daily", "Monthly"],
      activeTabTotalAddress: "Daily",
      bestTrader: {},
      totalTradeVolume: {},
      totalUniqueUser: {},
      collectedFee: {},
      listTopTrader: [],
      listTradeVolume: [],
      listCollectedFee: [],
      listUniqueUser: [],
      defaultKpi: {
        label: "oke gan",
        total: 2000,
        symbol: "",
      },
    };
  },
  watch: {
    "store.state.loadingTotalVolumeByDate": function (newValue) {
      if (!newValue) {
        setTimeout(() => {
          document.getElementById("chartTotalTrade")!.innerHTML = "";
          this.generateChartTotalTrade();
        }, 1500);
      }
    },
    "store.state.loadingCollectedFeeByDate": function (newValue) {
      if (!newValue) {
        setTimeout(() => {
          document.getElementById("chartCollectedFee")!.innerHTML = "";
          this.generateChartCollectedFee();
        }, 1500);
      }
    },
    "store.state.loadingTotalUniqueUserByDate": function (newValue) {
      if (!newValue) {
        setTimeout(() => {
          document.getElementById("chartUniqueAddress")!.innerHTML = "";
          this.generateChartTotalUniqueUser();
        }, 1500);
      }
    },
    async activeTabTotalAddress(newValue) {
      if (newValue === "Daily") {
        await this.$data.store.dispatch("getTotalUniqueAddressByDateSov");
        this.$data.listUniqueUser =
          this.$data.store.state.totalUniqueUserByDate;
      } else {
        await this.$data.store.dispatch("getTotalUniqueAddressByMonthSov");
        this.$data.listUniqueUser =
          this.$data.store.state.totalUniqueUserByDate;
      }
    },
    async activeTabCollectedFee(newValue) {
      if (newValue === "Daily") {
        await this.$data.store.dispatch("getColectedFeeByDateSov");
        this.$data.listCollectedFee = this.$data.store.state.collectedFeeByDate;
      } else {
        await this.$data.store.dispatch("getCollectedFeeMonthSov");
        this.$data.listCollectedFee = this.$data.store.state.collectedFeeByDate;
      }
    },
    async activeTabTotalVolume(newValue) {
      if (newValue === "Daily") {
        await this.$data.store.dispatch("getTotalTradeVolumeByDateSov");
        this.$data.listTradeVolume = this.$data.store.state.totalVolumeByDate;
      } else {
        await this.$data.store.dispatch("getTotalTradeVolumeSovMonth");
        this.$data.listTradeVolume = this.$data.store.state.totalVolumeByDate;
      }
    },
  },
  mounted(){
    this.getData()
  },
  methods: {
    generateChart,
    generateChartNumber,
    goToAddress(address: string) {
      window.open(`https://explorer.rsk.co/address/${address}`);
    },
    changeTabAddress(tabname: string) {
      this.$data.activeTabTotalAddress = tabname;
    },
     generateChartTotalUniqueUser() {
      this.generateChartNumber("chartUniqueAddress", this.$data.listUniqueUser);
    },
    changeTabTotalTradeVolume(tabName: string){
      this.$data.activeTabTotalVolume = tabName
    },
    changeTabCollectedFee(tabName: string) {
      this.$data.activeTabCollectedFee = tabName;
    },
    async getData(){
      this.$data.loading = true
      await this.$data.store.dispatch("bestTradeSovBridge");
      this.$data.bestTrader = {
        ...this.$data.store.state.kpiBiggestTrader,
        ...{ label: "Biggest Trade" },
        ...{ symbol: "$" },
      };
      await this.$data.store.dispatch("getTotalTradeVolumeSov");
      this.$data.totalTradeVolume = {
        ...this.$data.store.state.kpiTotalVolume,
        ...{ label: "Total Trade Volume" },
        ...{ symbol: "$" },
      };
      await this.$data.store.dispatch("getTotalUniqueAddressSov");
      this.$data.totalUniqueUser = {
        ...this.$data.store.state.kpiTotalUniqueUser,
        ...{ label: "Total Unique User" },
        ...{ symbol: "" },
      };
      await this.$data.store.dispatch("getTotalCollectedFeeSovryn");
      this.$data.collectedFee = {
        ...this.$data.store.state.collectedFee,
        ...{ label: "Collected Fee" },
        ...{ symbol: "$" },
      };
      await this.$data.store.dispatch("getTopTraderSov");
      this.$data.listTopTrader = this.$data.store.state.topTraderMoc;
      await this.$data.store.dispatch("getTotalTradeVolumeByDateSov");
      this.$data.listTradeVolume = this.$data.store.state.totalVolumeByDate;
      await this.$data.store.dispatch("getColectedFeeByDateSov");
      this.$data.listCollectedFee = this.$data.store.state.collectedFeeByDate;
      await this.$data.store.dispatch("getTotalUniqueAddressByDateSov");
        this.$data.listUniqueUser =
          this.$data.store.state.totalUniqueUserByDate;
      this.$data.loading = false
      
    },
    generateChartTotalTrade() {
      this.generateChart("chartTotalTrade", this.$data.listTradeVolume);
    },
    generateChartCollectedFee() {
      this.generateChart("chartCollectedFee", this.$data.listCollectedFee);
    },
  }
});
</script>

<style lang="scss" scoped>
.kpi-wrapper {
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 50px;
}
.wrapper-body-stat {
  display: grid;
  padding: 24px 0px;
  grid-template-columns: 2fr 1fr;
  gap: 50px;
}
.title-card {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 140%;
  color: #2d3748;
  margin-bottom: 6px;
}
.tv-lightweight-charts {
  margin: 0 auto;
}
.box-icon {
  width: 42px;
  height: 42px;
  background: #4fd1c5;
  box-shadow: 0px 3.5px 5.5px rgba(0, 0, 0, 0.02);
  border-radius: 12px;
}
.wrapper-best-trader {
  display: flex;
  flex-direction: row;
  padding: 12px 0px;
}
.wrapper-total-volume {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.style-font-address {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 150%;
  color: #a0aec0;
}
.style-font-total {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 140%;
  color: #2d3748;
}
</style>