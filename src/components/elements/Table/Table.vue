<template>
  <table>
      <thead>
          <tr>
              <td>oke gan disini</td>
              <td>oke gan </td>
          </tr>
      </thead>
      <tbody>

      </tbody>
  </table>
</template>

<script lang="ts">
import {defineComponent} from "vue"
export default defineComponent({
    name: 'Table'
})
</script>

<style lang="scss" scoped>
table {
    border-collapse: collapse;
    cursor: pointer;
}
thead{
    color: #a0aec0;
}
tr {
    border-bottom: 1px solid #E2E8F0;
    // padding: 6px 12px;
}
td {
    padding: 6px 12px;
}
</style>