<template>
  <template v-if="!loading">
    <DefaultLayout>
      <template v-slot:default>
        <TabBadge
          :active-tab="activeTab"
          :list-tab="listTab"
          @changeTab="changeTab($event)"
        />
        <div class="kpi-wrapper">
          <CardKpi :datas="bestTrader" />
          <CardKpi :datas="totalTradeVolume" />
          <CardKpi :datas="totalUniqueUser" />
          <CardKpi :datas="totalTransactions" />
        </div>
        <div class="wrapper-body-stat">
          <div>
            <Card>
              <template v-slot:default>
                <div class="title-card">Top 10 Trader</div>
                <TabBadge
                  :activeTab="activeTabTotalTrade"
                  :listTab="listTabTotalTrade"
                  :variant="'BadgeFilter'"
                  @changeTab="changeTabTradeVolume($event)"
                />
                <div v-if="!store.state.loadingTopTrader">
                  <div
                    v-for="(item, index) in topTraderMoc"
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
                  @changeTab="changeTabTotalVolume($event)"
                />
                <div
                  v-if="!store.state.loadingTotalVolumeByDate"
                  id="chartTotalTrade"
                  style="width: 600px; margin: 0 auto"
                />
                <div v-else>
                  <Skeleton style="height: 280px" />
                </div>
              </template>
            </Card>
            <Card style="margin-bottom: 24px">
              <template v-slot:default>
                <div class="title-card">Total Unique User</div>
                <TabBadge
                  :activeTab="activeTabUniqueUser"
                  :listTab="listTabUniqueUser"
                  :variant="'BadgeFilter'"
                  @changeTab="changeTabUniqueUser($event)"
                />
                <div
                  v-if="!store.state.loadingTotalUniqueUserByDate"
                  id="chartTotalUniqueUser"
                  style="width: 600px; margin: 0 auto"
                />
                <div v-else>
                  <Skeleton style="height: 280px" />
                </div>
              </template>
            </Card>
            <Card style="margin-bottom: 24px">
              <template v-slot:default>
                <div class="title-card">Total New User</div>
                <TabBadge
                  :activeTab="activeTabNewUser"
                  :listTab="listTabNewuser"
                  :variant="'BadgeFilter'"
                  @changeTab="changeTabNewUser($event)"
                />
                <div
                 v-if="!store.state.loadingTotalNewUserByDate"
                  id="chartTotalNewUser"
                  style="width: 600px; margin: 0 auto"
                />
                <div v-else>
                  <Skeleton style="height: 280px" />
                </div>
              </template>
            </Card>
          </div>
        </div>
      </template>
    </DefaultLayout>
  </template>
  <template v-if="loading">
    <SkeletonHome />
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import Card from "@/components/elements/Card/Card.vue";
import TabBadge from "@/components/fragments/Tab/TabBadge.vue";
import CardKpi from "@/components/fragments/Card/Home/CardKpi.vue";
import Icons from "@/components/elements/Icons/Icons.vue";
import SkeletonHome from "@/components/fragments/Skeleton/SkeletonHome.vue";
import Skeleton from "@/components/elements/Skeleton/Skeleton.vue";
import { generateChart, generateChartNumber } from "@/utils";
import { useStore } from "@/store";
export default defineComponent({
  name: "Home",
  components: {
    DefaultLayout,
    Card,
    CardKpi,
    TabBadge,
    Icons,
    SkeletonHome,
    Skeleton,
  },
  data() {
    const store = useStore();
    const convertActiveTab: any = {
      "Money On Chain": "moc_protocol_mint_redeem",
      "RIF On Chain": "rif_on_chain_mint_redeem",
    };
    return {
      store,
      activeTab: "Money On Chain",
      listTab: ["Money On Chain", "RIF On Chain"],
      activeTabTotalTrade: "By Volume",
      listTabTotalTrade: ["By Volume", "By Transactions"],
      listTabTotalVolume: ["Daily", "Monthly"],
      activeTabTotalVolume: "Daily",
      listTabUniqueUser: ["Daily", "Monthly"],
      activeTabUniqueUser: "Daily",
      listTabNewuser: ["Daily", "Monthly"],
      activeTabNewUser: "Daily",
      loading: false,
      bestTrader: {},
      totalTradeVolume: {},
      totalUniqueUser: {},
      totalTransactions: {},
      topTraderMoc: [],
      totalVolumeByDate: [],
      totalUniqueUserByDate: [],
      totalNewUserByDate: [],
      convertActiveTab,
    };
  },
  watch: {
    "store.state.loadingTotalVolumeByDate": function (newValue) {
      if (!newValue) {
        setTimeout(() => {
          document.getElementById("chartTotalTrade")!.innerHTML = "";
          this.generateChartTotalTrade();
        }, 500);
      }
    },
    "store.state.loadingTotalUniqueUserByDate": function (newValue) {
      if (!newValue) {
        setTimeout(() => {
          document.getElementById("chartTotalUniqueUser")!.innerHTML = "";
          this.generateChartUniqueUser();
        }, 1000);
      }
    },
    "store.state.loadingTotalNewUserByDate": function (newValue) {
      if (!newValue) {
        setTimeout(() => {
          document.getElementById("chartTotalNewUser")!.innerHTML = "";
          this.generateChartTotalNewUser();
        }, 1500);
      }
    },
    async activeTabUniqueUser(newValue) {
      if (newValue === "Daily") {
        if (this.$data.activeTab === "Money On Chain") {
          await this.$data.store.dispatch("getTotalUniqueUserByDate");
          this.$data.totalUniqueUserByDate =
            this.$data.store.state.totalUniqueUserByDate;
        } else {
          await this.$data.store.dispatch("getTotalUniqueUserByDateRif");
          this.$data.totalUniqueUserByDate =
            this.$data.store.state.totalUniqueUserByDate;
        }
      } else {
        await this.$data.store.dispatch(
          "getTotalUniqueUserByMonth",
          this.$data.convertActiveTab[this.$data.activeTab]
        );
        this.$data.totalUniqueUserByDate =
          this.$data.store.state.totalUniqueUserByDate;
      }
    },
    async activeTabTotalVolume(newValue) {
      if (newValue === "Daily") {
        if (this.$data.activeTab === "Money On Chain") {
          await this.$data.store.dispatch("getTotalVolumeByDate");
          this.$data.totalVolumeByDate =
            this.$data.store.state.totalVolumeByDate;
        } else {
          await this.$data.store.dispatch("getTotalVolumeByDateRif");
          this.$data.totalVolumeByDate =
            this.$data.store.state.totalVolumeByDate;
        }
      } else {
        await this.$data.store.dispatch(
          "getTotalVolumeMonthly",
          this.$data.convertActiveTab[this.$data.activeTab]
        );
        this.$data.totalVolumeByDate = this.$data.store.state.totalVolumeByDate;
      }
    },
    activeTab(newValue) {
      if (newValue === "Money On Chain") {
        this.getDataMoc();
      } else {
        this.generateDataRif();
      }
    },
    async activeTabNewUser(newValue) {
      if (newValue === "Daily") {
        if (this.activeTab === "Money On Chain") {
          await this.$data.store.dispatch("getTotalNewUserByDate");
          this.$data.totalNewUserByDate =
            this.$data.store.state.totalNewUserByDate;
        } else {
          await this.$data.store.dispatch("getTotalNewUserByDateRif");
          this.$data.totalNewUserByDate =
            this.$data.store.state.totalNewUserByDate;
        }
      } else {
        await this.$data.store.dispatch(
          "getTotalNewuserMonthly",
          this.$data.convertActiveTab[this.$data.activeTab]
        );
        this.$data.totalNewUserByDate =
          this.$data.store.state.totalNewUserByDate;
      }
    },
    async activeTabTotalTrade(newValue) {
      if (newValue === "By Transactions") {
        await this.$data.store.dispatch(
          "getTop10TraderByTransaction",
          this.$data.convertActiveTab[this.$data.activeTab]
        );
        this.$data.topTraderMoc = this.$data.store.state.topTraderMoc;
      } else {
        if (this.$data.activeTab === "Money On Chain") {
          await this.$data.store.dispatch("getTop10TraderMoc");
          this.$data.topTraderMoc = this.$data.store.state.topTraderMoc;
        } else {
          await this.$data.store.dispatch("getTop10TraderRif");
          this.$data.topTraderMoc = this.$data.store.state.topTraderMoc;
        }
      }
    },
  },
  mounted() {
    this.getDataMoc();
  },
  methods: {
    generateChart,
    useStore,
    generateChartNumber,
    changeTabNewUser(tabName: string) {
      this.$data.activeTabNewUser = tabName;
    },
    changeTabUniqueUser(tabName: string) {
      this.$data.activeTabUniqueUser = tabName;
    },
    changeTabTotalVolume(tabName: string) {
      this.$data.activeTabTotalVolume = tabName;
    },
    async getDataMoc() {
      this.$data.loading = true;
      this.$data.activeTabTotalTrade = this.$data.listTabTotalTrade[0];
      this.$data.activeTabTotalVolume = this.$data.listTabTotalVolume[0];
      this.$data.activeTabNewUser = this.$data.listTabNewuser[0];
      this.$data.activeTabUniqueUser = this.$data.listTabUniqueUser[0]
      await this.$data.store.dispatch(
        "getDataKpiBiggestTrader",
        "moc_protocol_mint_redeem"
      );
      this.$data.bestTrader = {
        ...this.$data.store.state.kpiBiggestTrader,
        ...{ label: "Biggest Trade" },
        ...{ symbol: "$" },
      };
      await this.$data.store.dispatch(
        "getKpiTotalTradeVolume",
        "moc_protocol_mint_redeem"
      );
      this.$data.totalTradeVolume = {
        ...this.$data.store.state.kpiTotalVolume,
        ...{ label: "Total Trade Volume" },
        ...{ symbol: "$" },
      };
      await this.$data.store.dispatch(
        "getKpiTotalUniqueUser",
        "moc_protocol_mint_redeem"
      );
      this.$data.totalUniqueUser = {
        ...this.$data.store.state.kpiTotalUniqueUser,
        ...{ label: "Total Unique User" },
        ...{ symbol: "" },
      };
      await this.$data.store.dispatch(
        "getKpiTotalTransactions",
        "moc_protocol_mint_redeem"
      );
      this.$data.totalTransactions = {
        ...this.$data.store.state.kpiTotalTransaction,
        ...{ label: "Total Transactions" },
        ...{ symbol: "" },
      };
      await this.$data.store.dispatch("getTop10TraderMoc");
      this.$data.topTraderMoc = this.$data.store.state.topTraderMoc;
      await this.$data.store.dispatch("getTotalVolumeByDate");
      this.$data.totalVolumeByDate = this.$data.store.state.totalVolumeByDate;
      await this.$data.store.dispatch("getTotalUniqueUserByDate");
      this.$data.totalUniqueUserByDate =
        this.$data.store.state.totalUniqueUserByDate;
      await this.$data.store.dispatch("getTotalNewUserByDate");
      this.$data.totalNewUserByDate = this.$data.store.state.totalNewUserByDate;
      this.$data.loading = false;
      setTimeout(() => {
        this.generateChartTotalTrade();
      }, 500);
      setTimeout(() => {
        this.generateChartUniqueUser();
      }, 500);
      setTimeout(() => {
        this.generateChartTotalNewUser();
      }, 500);
    },
    async generateDataRif() {
      this.$data.loading = true;
      this.$data.activeTabTotalTrade = this.$data.listTabTotalTrade[0];
      this.$data.activeTabTotalVolume = this.$data.listTabTotalVolume[0];
      this.$data.activeTabNewUser = this.$data.listTabNewuser[0];
      this.$data.activeTabUniqueUser = this.$data.listTabUniqueUser[0]
      await this.$data.store.dispatch(
        "getDataKpiBiggestTrader",
        "rif_on_chain_mint_redeem"
      );
      this.$data.bestTrader = {
        ...this.$data.store.state.kpiBiggestTrader,
        ...{ label: "Biggest Trade" },
        ...{ symbol: "$" },
      };
      await this.$data.store.dispatch(
        "getKpiTotalTradeVolume",
        "rif_on_chain_mint_redeem"
      );
      this.$data.totalTradeVolume = {
        ...this.$data.store.state.kpiTotalVolume,
        ...{ label: "Total Trade Volume" },
        ...{ symbol: "$" },
      };
      await this.$data.store.dispatch(
        "getKpiTotalUniqueUser",
        "rif_on_chain_mint_redeem"
      );
      this.$data.totalUniqueUser = {
        ...this.$data.store.state.kpiTotalUniqueUser,
        ...{ label: "Total Unique User" },
        ...{ symbol: "" },
      };
      await this.$data.store.dispatch(
        "getKpiTotalTransactions",
        "rif_on_chain_mint_redeem"
      );
      this.$data.totalTransactions = {
        ...this.$data.store.state.kpiTotalTransaction,
        ...{ label: "Total Transactions" },
        ...{ symbol: "" },
      };
      await this.$data.store.dispatch("getTop10TraderRif");
      this.$data.topTraderMoc = this.$data.store.state.topTraderMoc;
      await this.$data.store.dispatch("getTotalVolumeByDateRif");
      this.$data.totalVolumeByDate = this.$data.store.state.totalVolumeByDate;
      await this.$data.store.dispatch("getTotalUniqueUserByDateRif");
      this.$data.totalUniqueUserByDate =
        this.$data.store.state.totalUniqueUserByDate;
      await this.$data.store.dispatch("getTotalNewUserByDateRif");
      this.$data.totalNewUserByDate = this.$data.store.state.totalNewUserByDate;
      this.$data.loading = false;
      setTimeout(() => {
        this.generateChartTotalTrade();
      }, 500);
      setTimeout(() => {
        this.generateChartUniqueUser();
      }, 500);
      setTimeout(() => {
        this.generateChartTotalNewUser();
      }, 500);
    },
    goToAddress(address: string) {
      window.open(`https://explorer.rsk.co/address/${address}`);
    },
    generateChartTotalTrade() {
      this.generateChart("chartTotalTrade", this.$data.totalVolumeByDate);
    },
    generateChartUniqueUser() {
      this.generateChartNumber(
        "chartTotalUniqueUser",
        this.$data.totalUniqueUserByDate
      );
    },
    generateChartTotalNewUser() {
      this.generateChartNumber(
        "chartTotalNewUser",
        this.$data.totalNewUserByDate
      );
    },
    changeTab(nameTab: string) {
      this.$data.activeTab = nameTab;
    },
    changeTabTradeVolume(nameTab: string) {
      this.$data.activeTabTotalTrade = nameTab;
    },
  },
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