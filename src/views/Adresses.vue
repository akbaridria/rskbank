<template>
  <DefaultLayout>
    <template v-slot:default>
      <Card style="width: 350px">
        <template v-slot:default>
          <div class="container-search">
            <div class="wrapper-search">
              <Icons :select="`Search`" style="width: 16px; padding: 0px 6px" />
              <input
                type="text"
                class="input-default"
                placeholder="Search your address here..."
                :value="valueInput"
                @input="changeInput($event)"
              />
            </div>
            <Button @click="clickSearch" />
          </div>
        </template>
      </Card>
      <Card style="margin-top: 24px; width: 800px">
        <template v-slot:default>
          <!-- <div class="title-card">Your History Transactions</div> -->
          <div style="margin: 35px 0px">
            <Tab
              :listTab="listTab"
              :activeTab="activeTab"
              @changeTab="changeTab($event)"
            />
          </div>
          <template v-if="!loading">
            <ListMoc
              v-if="activeTab === 'MoC'"
              :listData="listResultMoc"
              @goTo="goTo($event)"
            />
            <ListRif
              v-if="activeTab === 'MoC-Rif'"
              :listData="listResultRif"
              @goTo="goTo($event)"
            />
            <ListRsk
              v-if="activeTab === 'Rsk Bridge'"
              :listData="listRsk"
              @goTo="goTo($event)"
            />
            <ListSov
              v-if="activeTab === 'Sovryn Bridge'"
              :listData="listSovryn"
              @goTo="goTo($event)"
            />
          </template>
          <template v-else>
            <SkeletonAddress />
          </template>
        </template>
      </Card>
    </template>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import Card from "@/components/elements/Card/Card.vue";
import Button from "@/components/elements/Button/Button.vue";
import Tab from "@/components/elements/Tab/Tab.vue";
import ListMoc from "@/components/fragments/List/ListMoc.vue";
import ListRif from "@/components/fragments/List/ListRif.vue";
import ListRsk from "@/components/fragments/List/ListRsk.vue";
import ListSov from "@/components/fragments/List/ListSov.vue";
import SkeletonAddress from "@/components/fragments/Skeleton/SkeletonAddress.vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "Adresses",
  components: {
    DefaultLayout,
    Card,
    Button,
    Tab,
    ListMoc,
    ListRif,
    SkeletonAddress,
    ListRsk,
    ListSov,
  },
  watch: {
    activeTab() {
      this.clickSearch();
    },
  },
  data() {
    const listTab: any = ["MoC", "MoC-Rif", "Rsk Bridge", "Sovryn Bridge"];
    const store = useStore();
    return {
      store,
      loading: false,
      listTab,
      activeTab: "MoC",
      valueInput: "",
      listResultMoc: [],
      listResultRif: [],
      listSovryn: [],
      listRsk: [],
    };
  },
  mounted() {
    if (this.$route.query.address) {
      this.$data.valueInput = this.$route.query.address.toString();
      this.clickSearch();
    }
  },
  methods: {
    goTo(tx: string) {
      window.open(`https://explorer.rsk.co/tx/${tx}`);
    },
    changeTab(tabName: string) {
      this.$data.activeTab = tabName;
    },
    changeInput(data: any) {
      this.$data.valueInput = data.target.value.toLowerCase();
    },
    async clickSearch() {
      this.$data.loading = true;
      if (this.$data.activeTab === "MoC") {
        await this.$data.store.dispatch(
          "searchAddressMoc",
          this.$data.valueInput
        );
        this.$data.listResultMoc = this.$data.store.state.listHistory;
      }
      if (this.$data.activeTab === "MoC-Rif") {
        await this.$data.store.dispatch(
          "searchAddressRif",
          this.$data.valueInput
        );
        this.$data.listResultRif = this.$data.store.state.listHistory;
      }
      if (this.$data.activeTab === "Rsk Bridge") {
        await this.$data.store.dispatch(
          "serchAddressRsk",
          this.$data.valueInput
        );
        this.$data.listRsk = this.$data.store.state.listHistory;
      }
      if (this.$data.activeTab === "Sovryn Bridge") {
        await this.$data.store.dispatch(
          "serchAddressSov",
          this.$data.valueInput
        );
        this.$data.listSovryn = this.$data.store.state.listHistory;
        console.log(this.$data.listSovryn);
      }
      this.$data.loading = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper-search {
  background: #ffffff;
  border: 0.5px solid #e2e8f0;
  box-sizing: border-box;
  border-radius: 8px;
  width: 250px;
  height: 30px;
  display: flex;
  flex-direction: row;
}
.container-search {
  display: flex;
  flex-direction: row;
  & > * {
    margin-right: 12px;
  }
}
.input-default {
  width: 80%;
  border: none;
  color: #a0aec0;
  &:focus {
    border: none;
    outline: none;
    color: #a0aec0;
  }
}

.title-card {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 140%;
  color: #2d3748;
  margin-bottom: 6px;
}
</style>