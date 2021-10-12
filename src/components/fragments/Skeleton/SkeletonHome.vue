<template>
  <div style="width: 1070px; padding: 24px">
      <div class="tab-menu">
          <Skeleton style="width: 200px; height: 50px" />
          <Skeleton style="width: 200px; height: 50px" />
      </div>
      <div class="tab-menu">
          <Skeleton v-for="index in 4" :key="index" style="width: 265px; height: 68px" />
      </div>
      <div class="wrapper-chart">
        <div class="tab-chart">
          <Skeleton :key="index"  style="width: 300px; height: 600px" />
      </div>
      <div class="tab-chart">
          <Skeleton v-for="index in 4" :key="index"  style="width: 700px; height: 400px" />
      </div>
      </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import Skeleton from "@/components/elements/Skeleton/Skeleton.vue"
export default defineComponent({
    name: 'SkeletonHome',
    components: {
        Skeleton
    }

})
</script>

<style lang="scss" scoped>
.tab-menu{
    display: flex;
    flex-direction: row;
    margin-bottom: 24px;
    & > * {
        margin-right: 8px;
    }
}
.tab-chart{
    display: flex;
    flex-direction: column;
    margin-right: 12px;
    & > * {
        margin-bottom: 24px;
    }
}
.wrapper-chart{
    display: flex;
    flex-direction: row;
}
</style>