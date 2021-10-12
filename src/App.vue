<template>
  <div class="logo">
    <div class="logo-wrapper">
      <div class="box-logo">
        <Logo style="padding: 12px 0px 12px 12px" />
      </div>
      <div class="text-logo"><strong>RSbanK</strong></div>
    </div>
    <div class="wrapper-search-address">
      <div class="wrapper-search">
        <Icons :select="`Search`" style="width: 16px; padding: 0px 6px; cursor: pointer;" @click="
            $router.push({
              path: 'adresses',
              query: { address: inputUser },
            })
          " />
        <input
          type="text"
          :value="inputUser"
          @input="changeInput($event.target.value)"
          class="input-default"
          placeholder="Search your address here..."
          @keyup.enter="
            $router.push({
              path: 'adresses',
              query: { address: inputUser },
            })
          "
        />
      </div>
    </div>
  </div>
  <div class="default-layout-wrapper">
    <div class="side-navigation-bar">
      <div
        :class="
          $route.name === item.pathName
            ? `wrapper-menu`
            : `wrapper-menu-inactive`
        "
        v-for="(item, index) in listMenu"
        :key="index"
        @click="changeMenu(item.icon)"
      >
        <div
          class="box-icon"
          :style="
            $route.name === item.pathName
              ? `background-color: #4fd1c5`
              : `background-color: white`
          "
        >
          <Icons
            style="padding: 6px"
            :select="`${item.icon}`"
            :color="$route.name === item.pathName ? `white` : `#4FD1C5`"
          />
        </div>
        <router-link
          class="link-style"
          :id="item.icon"
          :style="
            $route.name === item.pathName
              ? `color: #2d3748; font-weight: bold`
              : `color: #A0AEC0; font-weight: bold`
          "
          :to="{ name: item.pathName }"
          >{{ item.name }}</router-link
        >
      </div>
    </div>
    <div style="width: 100%">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icons from "@/components/elements/Icons/Icons.vue";
import Logo from "@/static/Logo/Logo.vue";
// import { useStore } from './store'

export default defineComponent({
  name: "App",
  components: {
    Icons,
    Logo,
  },
  data() {
    return {
      inputUser: "",
      listMenu: [
        {
          icon: "StartChart",
          name: "Money On Chain Stat",
          pathName: "Home",
          path: "/",
        },
        {
          icon: "BarChart",
          name: "RSK Token Bridge",
          pathName: "RskBridge",
          path: "/rsk-token-bridge",
        },
        {
          icon: "PieChart",
          name: "Sovryn Token Bridge",
          pathName: "SovBridge",
          path: "/sov-token-bridge",
        },
        {
          icon: "Wallet",
          name: "Adresses",
          pathName: "Adresses",
          path: "/adresses",
        },
      ],
    };
  },
  async mounted() {
    // const store = useStore()
    // await store.dispatch('getData')
    // console.log(store.state.dataFetching)
  },
  methods: {
    changeInput(address: string) {
      this.$data.inputUser = address;
    },
    changeMenu(data: string) {
      document.getElementById(data)!.click();
    },
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f8f9fa;
  font-family: "Inter", sans-serif;
  max-width: 1440px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.default-layout-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1440px;
}
.side-navigation-bar {
  display: flex;
  flex-direction: column;
  width: 246.5;
  padding: 24px 24px;
  row-gap: 24px;
}
.box-icon {
  width: 30px;
  height: 30px;
  background-color: black;
  border-radius: 20px;
  box-shadow: 0px 3.5px 5.5px rgba(0, 0, 0, 0.02);
  margin-right: 8px;
}
.wrapper-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;

  min-width: 180px;

  padding: 12px;
  border-radius: 20px;
  box-shadow: 0px 3.5px 5.5px rgba(0, 0, 0, 0.02);
  cursor: pointer;
}
.wrapper-menu-inactive {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 180px;
  padding: 12px;
  cursor: pointer;
  &:hover {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
    min-width: 180px;
    padding: 12px;
    border-radius: 20px;
    box-shadow: 0px 3.5px 5.5px rgba(0, 0, 0, 0.02);
    cursor: pointer;
  }
}
.link-style {
  text-decoration: none;
  font-size: 12px;
  line-height: 150%;
}
.logo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0px 24px;
}
.logo-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.box-logo {
  width: 30px;
  height: 30px;
}
.wrapper-search-address {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 65px;
}
.wrapper-search {
  background: #ffffff;
  border: 0.5px solid #e2e8f0;
  box-sizing: border-box;
  border-radius: 15px;
  width: 250px;
  height: 30px;
  display: flex;
  flex-direction: row;
}
.text-logo {
  display: flex;
  position: absolute;
  left: 60px;
  top: 4.5px;
  align-items: center;
  height: 60px;
  font-weight: bold;
  font-size: 18px;
  line-height: 150%;
  color: #2d3748;
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
</style>
