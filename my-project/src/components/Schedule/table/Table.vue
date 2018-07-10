<template>
    <table>
        <thead>
            <tr>
                <th>pn</th>
                <th>vt</th>
                <th>sr</th>
                <th>cht</th>
                <th>pt</th>
                <th>sb</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="t in getTable">
              <td v-for="i in t">
                {{ i ? i.lesson_name : 'Pusto' }}
              </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
  name: 'Schedule-Table',
  props: {
    table: {
      type: Object,
      default: {}
    }
  },
  computed: {
    getTable() {
      if (this.table) {
        return this.table;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
