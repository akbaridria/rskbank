<template>
  <component :is="select" />
</template>

<script lang="ts">
import BarChart from "@/static/icons/BarChart.vue";
import PieChart from "@/static/icons/PieChart.vue";
import StartChart from "@/static/icons/StartChart.vue";
import Wallet from "@/static/icons/Wallet.vue";
import Search from "@/static/icons/Search.vue";
import Globe from "@/static/icons/Globe.vue";
import QuestionMark from "@/static/icons/QuestionMark.vue"
export default {
  name: "Icons",
  components: {
    BarChart,
    PieChart,
    StartChart,
    Wallet,
    Search,
    Globe,
    QuestionMark
  },
  props: {
    select: {
      type: String,
      required: false,
      default: "StartChart",
    },
  },
};
</script>

<style>
</style>