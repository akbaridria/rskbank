<template>
  <div class="button-wrapper">
      {{ textButton }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
    name: 'Button',
    props: {
        textButton: {
            type: String,
            required:false,
            default: 'Search'
        }
    }
})
</script>

<style lang="scss" scoped>
.button-wrapper{
    display: flex;
    align-items: center;
    background-color: #4fd1c5;
    font-size: 12px;
    line-height: 150%;
    padding: 3px 16px;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        background: rgba(79, 209, 197, 0.6);
    }
}
</style>